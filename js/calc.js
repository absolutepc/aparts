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
  const paymentOptions = typeof getPropertyPaymentOptions === 'function'
    ? getPropertyPaymentOptions(property)
    : [{ type: 'cash' }];

  const cashOption = paymentOptions.find(opt => opt.type === 'cash') || null;
  const noMarkupOption = paymentOptions.find(opt => opt.type === 'noMarkup') || null;
  const installmentNoDownOption = paymentOptions.find(
    opt => opt.type === 'installment' && !(Number(opt.downPaymentPercent) > 0)
  ) || null;
  const installmentWithDownOption = paymentOptions.find(
    opt => opt.type === 'installment' && Number(opt.downPaymentPercent) > 0
  ) || null;

  // Prices for cash / short installment (полная оплата)
  const prices = [];
  const sectorGroup = (typeof getSectorPriceGroupForSector === 'function'
    && typeof resolveLayoutSectorTitle === 'function')
    ? getSectorPriceGroupForSector(
      property,
      resolveLayoutSectorTitle(targetLayout) || targetSector?.title
    )
    : null;

  if (sectorGroup?.full > 0) {
    prices.push({ value: sectorGroup.full, label: formatPrice(sectorGroup.full) });
  } else {
    const applicablePrices = getApplicableFloorPrices(property, targetLayout);
    if (applicablePrices && applicablePrices.length > 0) {
      const uniquePrices = new Set();
      applicablePrices.forEach(range => {
        const p = Number(range.price);
        if (p > 0 && !uniquePrices.has(p)) {
          uniquePrices.add(p);
          prices.push({
            value: p,
            label: formatPrice(p),
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
  }

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
      priceSelectInst.addEventListener('change', () => calculateInst(area, property, noMarkupOption));
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

  const cashCard = document.getElementById('calcCashCard');
  if (cashCard) {
    cashCard.style.display = cashOption ? '' : 'none';
  }

  const instCard = document.getElementById('calcInstallmentCard');
  if (instCard) {
    if (!noMarkupOption) {
      instCard.style.display = 'none';
    } else {
      instCard.style.display = '';
      const instTitle = document.getElementById('calcInstallmentTitle');
      if (instTitle) {
        instTitle.textContent = noMarkupOption.title
          || `Рассрочка на ${noMarkupOption.years} ${getYearWord(noMarkupOption.years)} без наценки`;
      }
    }
  }

  const hasMaternityCapital = property.maternityCapital === 'yes';

  const cashOptions = document.getElementById('calcOptionsCash');
  const instOptions = document.getElementById('calcOptionsInst');
  const instNoDownOptions = document.getElementById('calcOptionsInst6Y');
  const instWithDownOptions = document.getElementById('calcOptionsInst6Y30');

  if (hasMaternityCapital) {
    if (cashOptions && cashOption) cashOptions.style.display = '';
    if (instOptions && noMarkupOption) instOptions.style.display = '';
    if (instNoDownOptions && installmentNoDownOption) instNoDownOptions.style.display = '';
    if (instWithDownOptions && installmentWithDownOption) instWithDownOptions.style.display = '';
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
      calculateInst(area, property, noMarkupOption);
    });
    maternityAmountInst.addEventListener('input', () => calculateInst(area, property, noMarkupOption));
  }

  const useMaternityInst6Y = document.getElementById('calcUseMaternityInst6Y');
  const maternityInputGroupInst6Y = document.getElementById('calcMaternityInputGroupInst6Y');
  const maternityAmountInst6Y = document.getElementById('calcMaternityAmountInst6Y');

  if (useMaternityInst6Y && maternityInputGroupInst6Y && maternityAmountInst6Y) {
    useMaternityInst6Y.addEventListener('change', (e) => {
      maternityInputGroupInst6Y.style.display = e.target.checked ? '' : 'none';
      calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption);
    });
    maternityAmountInst6Y.addEventListener('input', () => {
      calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption);
    });
  }

  const useMaternityInst6Y30 = document.getElementById('calcUseMaternityInst6Y30');
  const maternityInputGroupInst6Y30 = document.getElementById('calcMaternityInputGroupInst6Y30');
  const maternityAmountInst6Y30 = document.getElementById('calcMaternityAmountInst6Y30');

  if (useMaternityInst6Y30 && maternityInputGroupInst6Y30 && maternityAmountInst6Y30) {
    useMaternityInst6Y30.addEventListener('change', (e) => {
      maternityInputGroupInst6Y30.style.display = e.target.checked ? '' : 'none';
      calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption);
    });
    maternityAmountInst6Y30.addEventListener('input', () => {
      calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption);
    });
  }

  contentEl.style.display = '';
  errorEl.style.display = 'none';

  if (cashOption) calculateCash(area);
  if (noMarkupOption) calculateInst(area, property, noMarkupOption);
  calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption);
  calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption);
}

function resolveInstallmentUnitPrice(property, targetLayout, priceKey) {
  const key = String(priceKey || '').trim();
  let sectorGroup = null;

  if (typeof getSectorPriceGroupForSector === 'function' && typeof resolveLayoutSectorTitle === 'function') {
    sectorGroup = getSectorPriceGroupForSector(property, resolveLayoutSectorTitle(targetLayout));
  }

  if (sectorGroup && key && Number(sectorGroup[key]) > 0) {
    return Number(sectorGroup[key]);
  }

  const priceSelect = document.getElementById('calcPriceSelectInst')
    || document.getElementById('calcPriceSelectCash');
  const base = priceSelect ? Number(priceSelect.value) || 0 : 0;

  if (key === 'floorTo') {
    const offset = Number(property.floorPriceToOffset) || 0;
    return base + offset;
  }

  return base;
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

function calculateInst(area, property, option) {
  if (!option) return;

  const priceSelect = document.getElementById('calcPriceSelectInst');
  const price = priceSelect ? Number(priceSelect.value) || 0 : 0;
  const years = Number(option.years) || Number(property.noMarkupYears) || 0;
  const installmentMonths = years * 12;
  if (installmentMonths <= 0) return;

  let totalCost = area * price;
  let amountToDivide = totalCost;

  const mandatoryBlock = document.getElementById('calcFormulaInstMandatoryBlock');
  const mandatoryPayment = option.useMandatoryPayment === false
    ? 0
    : (Number(property.mandatoryPayment) || 0);

  if (mandatoryPayment > 0) {
    const mandatoryTotal = area * mandatoryPayment;
    amountToDivide = Math.max(0, amountToDivide - mandatoryTotal);

    if (mandatoryBlock) {
      mandatoryBlock.style.display = 'inline-flex';
      mandatoryBlock.style.alignItems = 'center';
      mandatoryBlock.style.gap = '8px';
      document.getElementById('calcFormulaInstMandatoryTotal').textContent = `${formatPrice(mandatoryTotal)}`;
    }
  } else if (mandatoryBlock) {
    mandatoryBlock.style.display = 'none';
  }

  const useMaternity = document.getElementById('calcUseMaternityInst')?.checked;
  if (useMaternity) {
    const maternityAmount = Number(document.getElementById('calcMaternityAmountInst')?.value) || 0;
    amountToDivide = Math.max(0, amountToDivide - maternityAmount);
    totalCost = Math.max(0, totalCost - maternityAmount);
  }

  const monthlyPayment = amountToDivide / installmentMonths;

  document.getElementById('calcFormulaInstArea').textContent = `${formatArea(area)} м²`;
  document.getElementById('calcFormulaInstMonths').textContent = `${installmentMonths} мес.`;

  document.getElementById('calcMonthlyPayment').textContent = `${formatPrice(Math.round(monthlyPayment))}`;
  document.getElementById('calcTotalInstallment').textContent = `${formatPrice(totalCost)}`;
}

function calculateInstallmentNoDown(area, property, targetLayout, option) {
  const card = document.getElementById('calcInstallment6YearsCard');
  if (!card) return;

  if (!option) {
    card.style.display = 'none';
    return;
  }

  card.style.display = '';

  const years = Number(option.years) || 0;
  const installmentMonths = years * 12;
  const price = resolveInstallmentUnitPrice(property, targetLayout, option.priceKey);

  const titleEl = document.getElementById('calcInstallment6YearsTitle');
  if (titleEl) {
    titleEl.textContent = option.title
      || `Рассрочка на ${years} ${getYearWord(years)} без взноса`;
  }

  const monthsEl = document.getElementById('calcFormulaInst6YMonths');
  if (monthsEl) {
    monthsEl.textContent = `${installmentMonths} мес.`;
  }

  let totalCost = area * price;
  let amountToDivide = totalCost;

  const mandatoryBlock = document.getElementById('calcFormulaInst6YMandatoryBlock');
  const mandatoryPayment = option.useMandatoryPayment === false
    ? 0
    : (Number(property.mandatoryPayment) || 0);

  if (mandatoryPayment > 0) {
    const mandatoryTotal = area * mandatoryPayment;
    amountToDivide = Math.max(0, amountToDivide - mandatoryTotal);

    if (mandatoryBlock) {
      mandatoryBlock.style.display = 'inline-flex';
      mandatoryBlock.style.alignItems = 'center';
      mandatoryBlock.style.gap = '8px';
      document.getElementById('calcFormulaInst6YMandatoryTotal').textContent = `${formatPrice(mandatoryTotal)}`;
    }
  } else if (mandatoryBlock) {
    mandatoryBlock.style.display = 'none';
  }

  const useMaternity = document.getElementById('calcUseMaternityInst6Y')?.checked;
  if (useMaternity) {
    const maternityAmount = Number(document.getElementById('calcMaternityAmountInst6Y')?.value) || 0;
    amountToDivide = Math.max(0, amountToDivide - maternityAmount);
    totalCost = Math.max(0, totalCost - maternityAmount);
  }

  const monthlyPayment = installmentMonths > 0 ? amountToDivide / installmentMonths : 0;

  document.getElementById('calcFormulaInst6YArea').textContent = `${formatArea(area)} м²`;
  document.getElementById('calcFormulaInst6YPrice').textContent = `${formatPrice(price)}`;

  document.getElementById('calcMonthlyPayment6Y').textContent = `${formatPrice(Math.round(monthlyPayment))}`;
  document.getElementById('calcTotalInstallment6Y').textContent = `${formatPrice(totalCost)}`;
}

function calculateInstallmentWithDown(area, property, targetLayout, option) {
  const card = document.getElementById('calcInstallment6Years30Card');
  if (!card) return;

  if (!option) {
    card.style.display = 'none';
    return;
  }

  card.style.display = '';

  const years = Number(option.years) || 0;
  const installmentMonths = years * 12;
  const downPaymentPercent = Number(option.downPaymentPercent) || 0;
  const price = resolveInstallmentUnitPrice(property, targetLayout, option.priceKey);

  const titleEl = document.getElementById('calcInstallment6Years30Title');
  if (titleEl) {
    titleEl.textContent = option.title
      || `Рассрочка на ${years} ${getYearWord(years)} (взнос ${downPaymentPercent}%)`;
  }

  const monthsEl = document.getElementById('calcFormulaInst6Y30Months');
  if (monthsEl) {
    monthsEl.textContent = `${installmentMonths} мес.`;
  }

  let totalCost = area * price;
  const downPayment = totalCost * (downPaymentPercent / 100);
  // При покупке со взносом обязательный платёж по умолчанию не вычитается
  let amountToDivide = totalCost - downPayment;

  if (option.useMandatoryPayment) {
    const mandatoryPayment = Number(property.mandatoryPayment) || 0;
    if (mandatoryPayment > 0) {
      amountToDivide = Math.max(0, amountToDivide - area * mandatoryPayment);
    }
  }

  const useMaternity = document.getElementById('calcUseMaternityInst6Y30')?.checked;
  if (useMaternity) {
    const maternityAmount = Number(document.getElementById('calcMaternityAmountInst6Y30')?.value) || 0;
    amountToDivide = Math.max(0, amountToDivide - maternityAmount);
    totalCost = Math.max(0, totalCost - maternityAmount);
  }

  const monthlyPayment = installmentMonths > 0 ? amountToDivide / installmentMonths : 0;

  document.getElementById('calcFormulaInst6Y30Area').textContent = `${formatArea(area)} м²`;
  document.getElementById('calcFormulaInst6Y30Price').textContent = `${formatPrice(price)}`;
  document.getElementById('calcFormulaInst6Y30DownPayment').textContent =
    `${formatPrice(downPayment)} (${downPaymentPercent}%)`;

  document.getElementById('calcDownPayment6Y30').textContent = `${formatPrice(downPayment)}`;
  document.getElementById('calcMonthlyPayment6Y30').textContent = `${formatPrice(Math.round(monthlyPayment))}`;
  document.getElementById('calcTotalInstallment6Y30').textContent = `${formatPrice(totalCost)}`;
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
