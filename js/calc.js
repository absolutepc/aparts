function initCalcPage() {
  const propertyId = getQueryParam('id');
  const sectorId = getQueryParam('sector');
  const flatType = getQueryParam('flatType');
  const layoutKey = getQueryParam('layout');

  const errorEl = document.getElementById('calcError');
  const contentEl = document.getElementById('calcContent');

  if (!propertyId || !flatType || !layoutKey) {
    showError();
    return;
  }

  const property = getPropertyById(propertyId);
  if (!property) {
    showError();
    return;
  }

  // Find the variant and layout
  let targetVariant = null;
  let targetLayout = null;
  let targetSector = null;

  if (sectorId && property.sectors) {
    targetSector = property.sectors.find(s => s.id === sectorId);
    if (targetSector) {
      targetVariant = targetSector.flatVariants?.find(v => v.flatType === flatType);
    }
  } else {
    targetVariant = property.flatVariants?.find(v => v.flatType === flatType);
  }

  if (targetVariant) {
    targetLayout = targetVariant.layouts?.find(l => l.key === layoutKey);
  }

  if (!targetLayout) {
    showError();
    return;
  }

  // Set up the page
  document.title = `Калькулятор: ${property.title} — Aparts`;
  
  const linkEl = document.getElementById('calcPropertyLink');
  if (linkEl) {
    linkEl.href = `property.html?id=${encodeURIComponent(property.id)}`;
    linkEl.textContent = property.title;
  }

  const titleEl = document.getElementById('calcTitle');
  if (titleEl) {
    titleEl.textContent = `Расчет стоимости: ${property.title}`;
  }

  const subtitleEl = document.getElementById('calcSubtitle');
  if (subtitleEl) {
    const sectorText = targetSector ? `Сектор ${targetSector.title}, ` : '';
    subtitleEl.textContent = `${sectorText}${getFlatTypeLabel(flatType)}`;
  }

  const area = Number(targetLayout.areaMin) || Number(targetVariant.areaMin) || 0;

  // Get available prices
  const prices = [];
  const applicablePrices = getApplicableFloorPrices(property, targetLayout);
  
  if (applicablePrices && applicablePrices.length > 0) {
    // Add all unique prices from floor ranges
    const uniquePrices = new Set();
    applicablePrices.forEach(range => {
      const p = Number(range.price);
      if (p > 0 && !uniquePrices.has(p)) {
        uniquePrices.add(p);
        prices.push({
          value: p,
          label: `${formatPrice(p)} (от ${range.floorMin} этажа)`
        });
      }
    });
  } else if (targetLayout.price > 0) {
    prices.push({ value: targetLayout.price, label: formatPrice(targetLayout.price) });
  } else if (targetVariant.price > 0) {
    prices.push({ value: targetVariant.price, label: formatPrice(targetVariant.price) });
  } else if (property.price > 0) {
    prices.push({ value: property.price, label: formatPrice(property.price) });
  }

  // Sort prices ascending
  prices.sort((a, b) => a.value - b.value);

  const priceSelectCash = document.getElementById('calcPriceSelectCash');
  const priceSelectInst = document.getElementById('calcPriceSelectInst');
  
  if (prices.length > 0) {
    const optionsHtml = prices.map(p => 
      `<option value="${p.value}">${escapeHtml(p.label)}</option>`
    ).join('');
    
    if (priceSelectCash) {
      priceSelectCash.innerHTML = optionsHtml;
      priceSelectCash.addEventListener('change', () => calculateCash(area));
    }
    
    if (priceSelectInst) {
      priceSelectInst.innerHTML = optionsHtml;
      priceSelectInst.addEventListener('change', () => calculateInst(area, property));
    }
  } else {
    const emptyOption = '<option value="0">Цена не указана</option>';
    if (priceSelectCash) {
      priceSelectCash.innerHTML = emptyOption;
      priceSelectCash.disabled = true;
    }
    if (priceSelectInst) {
      priceSelectInst.innerHTML = emptyOption;
      priceSelectInst.disabled = true;
    }
  }

  // Installment term
  const noMarkupYears = Number(property.noMarkupYears) || 0;
  const installmentMonths = noMarkupYears * 12;

  const instCard = document.getElementById('calcInstallmentCard');
  if (instCard) {
    if (installmentMonths <= 0) {
      instCard.style.display = 'none';
    } else {
      const instTitle = document.getElementById('calcInstallmentTitle');
      if (instTitle) {
        instTitle.textContent = `Рассрочка на ${noMarkupYears} ${getYearWord(noMarkupYears)} без наценки`;
      }
    }
  }

  // Setup Maternity Capital options
  const hasMaternityCapital = property.maternityCapital === 'yes';
  
  const cashOptions = document.getElementById('calcOptionsCash');
  const instOptions = document.getElementById('calcOptionsInst');
  
  if (hasMaternityCapital) {
    if (cashOptions) cashOptions.style.display = '';
    if (instOptions) instOptions.style.display = '';
  }

  const useMaternityCash = document.getElementById('calcUseMaternityCash');
  const maternityInputGroupCash = document.getElementById('calcMaternityInputGroupCash');
  const maternityAmountCash = document.getElementById('calcMaternityAmountCash');

  if (useMaternityCash && maternityInputGroupCash && maternityAmountCash) {
    useMaternityCash.addEventListener('change', (e) => {
      maternityInputGroupCash.style.display = e.target.checked ? '' : 'none';
      calculateCash(area);
    });
    maternityAmountCash.addEventListener('input', () => calculateCash(area));
  }

  const useMaternityInst = document.getElementById('calcUseMaternityInst');
  const maternityInputGroupInst = document.getElementById('calcMaternityInputGroupInst');
  const maternityAmountInst = document.getElementById('calcMaternityAmountInst');

  if (useMaternityInst && maternityInputGroupInst && maternityAmountInst) {
    useMaternityInst.addEventListener('change', (e) => {
      maternityInputGroupInst.style.display = e.target.checked ? '' : 'none';
      calculateInst(area, property);
    });
    maternityAmountInst.addEventListener('input', () => calculateInst(area, property));
  }

  // Setup Mandatory Payment
  const mandatoryPayment = Number(property.mandatoryPayment) || 0;

  contentEl.style.display = '';
  errorEl.style.display = 'none';

  // Initial calculation
  calculateCash(area);
  calculateInst(area, property);
}

function calculateCash(area) {
  const priceSelect = document.getElementById('calcPriceSelectCash');
  const price = priceSelect ? Number(priceSelect.value) || 0 : 0;
  
  let totalCash = area * price;
  
  const useMaternity = document.getElementById('calcUseMaternityCash')?.checked;
  if (useMaternity) {
    const maternityAmount = Number(document.getElementById('calcMaternityAmountCash')?.value) || 0;
    totalCash = Math.max(0, totalCash - maternityAmount);
  }
  
  document.getElementById('calcFormulaCashArea').textContent = `${formatArea(area)} м²`;
  document.getElementById('calcTotalCash').textContent = `${formatPrice(totalCash)}`;
}

function calculateInst(area, property) {
  const priceSelect = document.getElementById('calcPriceSelectInst');
  const price = priceSelect ? Number(priceSelect.value) || 0 : 0;
  
  const noMarkupYears = Number(property.noMarkupYears) || 0;
  const installmentMonths = noMarkupYears * 12;

  if (installmentMonths > 0) {
    let totalCost = area * price;
    let amountToDivide = totalCost;
    
    // Subtract mandatory payment if applicable
    const mandatoryPayment = Number(property.mandatoryPayment) || 0;
    const mandatoryBlock = document.getElementById('calcFormulaInstMandatoryBlock');
    
    if (mandatoryPayment > 0) {
      const mandatoryTotal = area * mandatoryPayment;
      amountToDivide = Math.max(0, amountToDivide - mandatoryTotal);
      
      if (mandatoryBlock) {
        mandatoryBlock.style.display = 'inline-flex';
        mandatoryBlock.style.alignItems = 'center';
        mandatoryBlock.style.gap = '8px';
        document.getElementById('calcFormulaInstMandatoryTotal').textContent = `${formatPrice(mandatoryTotal)} ₽`;
      }
    } else if (mandatoryBlock) {
      mandatoryBlock.style.display = 'none';
    }
    
    // Subtract maternity capital if checked
    const useMaternity = document.getElementById('calcUseMaternityInst')?.checked;
    if (useMaternity) {
      const maternityAmount = Number(document.getElementById('calcMaternityAmountInst')?.value) || 0;
      amountToDivide = Math.max(0, amountToDivide - maternityAmount);
      totalCost = Math.max(0, totalCost - maternityAmount); // Reduce total cost by maternity capital too
    }
    
    const monthlyPayment = amountToDivide / installmentMonths;
    
    document.getElementById('calcFormulaInstArea').textContent = `${formatArea(area)} м²`;
    document.getElementById('calcFormulaInstMonths').textContent = `${installmentMonths} мес.`;
    
    document.getElementById('calcMonthlyPayment').textContent = `${formatPrice(Math.round(monthlyPayment))}`;
    document.getElementById('calcTotalInstallment').textContent = `${formatPrice(totalCost)}`;
  }
}

function getYearWord(years) {
  if (years === 1) return 'год';
  if (years >= 2 && years <= 4) return 'года';
  return 'лет';
}

function showError() {
  const errorEl = document.getElementById('calcError');
  const contentEl = document.getElementById('calcContent');
  if (errorEl) errorEl.style.display = '';
  if (contentEl) contentEl.style.display = 'none';
}