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

    const syncFloorPriceSelects = (sourceSelect) => {
      const value = sourceSelect?.value;
      if (value == null) return;
      if (priceSelectCash && priceSelectCash !== sourceSelect) priceSelectCash.value = value;
      if (priceSelectInst && priceSelectInst !== sourceSelect) priceSelectInst.value = value;
    };

    const recalculateAfterPriceChange = () => {
      const animate = true;
      if (cashOption) calculateCash(area, { animate });
      if (noMarkupOption) calculateInst(area, property, noMarkupOption, { animate });
      if (installmentNoDownOption) {
        calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption, { animate });
      }
      if (installmentWithDownOption) {
        calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption, { animate });
      }
    };

    if (priceSelectCash) {
      priceSelectCash.innerHTML = optionsHtml;
      priceSelectCash.addEventListener('change', () => {
        syncFloorPriceSelects(priceSelectCash);
        recalculateAfterPriceChange();
      });
    }

    if (priceSelectInst) {
      priceSelectInst.innerHTML = optionsHtml;
      priceSelectInst.addEventListener('change', () => {
        syncFloorPriceSelects(priceSelectInst);
        recalculateAfterPriceChange();
      });
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
      calculateCash(area, { animate: true });
    });
    maternityAmountCash.addEventListener('input', debounceCalc(() => {
      calculateCash(area, { animate: true });
    }, 280));
  }

  const useMaternityInst = document.getElementById('calcUseMaternityInst');
  const maternityInputGroupInst = document.getElementById('calcMaternityInputGroupInst');
  const maternityAmountInst = document.getElementById('calcMaternityAmountInst');

  if (useMaternityInst && maternityInputGroupInst && maternityAmountInst) {
    useMaternityInst.addEventListener('change', (e) => {
      maternityInputGroupInst.style.display = e.target.checked ? '' : 'none';
      calculateInst(area, property, noMarkupOption, { animate: true });
    });
    maternityAmountInst.addEventListener('input', debounceCalc(() => {
      calculateInst(area, property, noMarkupOption, { animate: true });
    }, 280));
  }

  const useMaternityInst6Y = document.getElementById('calcUseMaternityInst6Y');
  const maternityInputGroupInst6Y = document.getElementById('calcMaternityInputGroupInst6Y');
  const maternityAmountInst6Y = document.getElementById('calcMaternityAmountInst6Y');

  if (useMaternityInst6Y && maternityInputGroupInst6Y && maternityAmountInst6Y) {
    useMaternityInst6Y.addEventListener('change', (e) => {
      maternityInputGroupInst6Y.style.display = e.target.checked ? '' : 'none';
      calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption, { animate: true });
    });
    maternityAmountInst6Y.addEventListener('input', debounceCalc(() => {
      calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption, { animate: true });
    }, 280));
  }

  const useMaternityInst6Y30 = document.getElementById('calcUseMaternityInst6Y30');
  const maternityInputGroupInst6Y30 = document.getElementById('calcMaternityInputGroupInst6Y30');
  const maternityAmountInst6Y30 = document.getElementById('calcMaternityAmountInst6Y30');

  if (useMaternityInst6Y30 && maternityInputGroupInst6Y30 && maternityAmountInst6Y30) {
    useMaternityInst6Y30.addEventListener('change', (e) => {
      maternityInputGroupInst6Y30.style.display = e.target.checked ? '' : 'none';
      calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption, { animate: true });
    });
    maternityAmountInst6Y30.addEventListener('input', debounceCalc(() => {
      calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption, { animate: true });
    }, 280));
  }

  contentEl.style.display = '';
  errorEl.style.display = 'none';

  const animationQueue = [];
  if (cashOption && cashCard) {
    animationQueue.push({
      card: cashCard,
      statusId: 'calcStatusCash',
      compute: () => calculateCash(area),
    });
  }
  if (noMarkupOption && instCard) {
    animationQueue.push({
      card: instCard,
      statusId: 'calcStatusInst',
      compute: () => calculateInst(area, property, noMarkupOption),
    });
  }
  if (installmentNoDownOption) {
    const card = document.getElementById('calcInstallment6YearsCard');
    if (card) {
      animationQueue.push({
        card,
        statusId: 'calcStatusInst6Y',
        compute: () => calculateInstallmentNoDown(area, property, targetLayout, installmentNoDownOption),
      });
    }
  }
  if (installmentWithDownOption) {
    const card = document.getElementById('calcInstallment6Years30Card');
    if (card) {
      animationQueue.push({
        card,
        statusId: 'calcStatusInst6Y30',
        compute: () => calculateInstallmentWithDown(area, property, targetLayout, installmentWithDownOption),
      });
    }
  }

  // Hide enabled cards until their turn; keep disabled cards hidden
  [cashCard, instCard,
    document.getElementById('calcInstallment6YearsCard'),
    document.getElementById('calcInstallment6Years30Card'),
  ].forEach((card) => {
    if (!card) return;
    const inQueue = animationQueue.some(item => item.card === card);
    if (inQueue) {
      card.classList.add('is-pending');
      card.style.display = '';
    }
  });

  setCalcControlsLocked(true);
  runCalcRevealSequence(animationQueue).finally(() => {
    setCalcControlsLocked(false);
  });
}

const CALC_CARD_DURATION_MS = 10000;
const CALC_ROULETTE_DURATION_MS = 500;
const CALC_ROULETTE_STEPS = 5;
let calcRevealToken = 0;
let calcRevealComplete = false;
const calcRouletteStates = new WeakMap();

function prefersCalcReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function shouldAnimateCalcTotals() {
  return calcRevealComplete && !prefersCalcReducedMotion();
}

function parseCalcPriceNumber(text) {
  const digits = String(text || '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

function stopCalcRoulette(el) {
  const state = calcRouletteStates.get(el);
  if (!state) return;
  if (state.raf) cancelAnimationFrame(state.raf);
  if (state.timer) clearTimeout(state.timer);
  calcRouletteStates.delete(el);
  el.classList.remove('is-roulette');
}

function animateRouletteValue(el, targetText, durationMs = CALC_ROULETTE_DURATION_MS) {
  if (!el) return;

  const finalText = String(targetText ?? '');
  if (!shouldAnimateCalcTotals()) {
    stopCalcRoulette(el);
    el.textContent = finalText;
    return;
  }

  const from = parseCalcPriceNumber(el.textContent);
  const to = parseCalcPriceNumber(finalText);
  if (from === to && el.textContent === finalText) return;

  stopCalcRoulette(el);
  el.classList.add('is-roulette');

  const steps = CALC_ROULETTE_STEPS;
  const stepMs = durationMs / steps;
  const state = { timer: 0, raf: 0 };
  calcRouletteStates.set(el, state);

  let step = 0;
  function tick() {
    step += 1;
    if (step >= steps) {
      el.textContent = finalText;
      el.classList.remove('is-roulette');
      calcRouletteStates.delete(el);
      return;
    }

    const t = step / steps;
    const ease = 1 - Math.pow(1 - t, 2);
    const value = Math.max(0, Math.round(from + (to - from) * ease));
    el.textContent = formatPrice(value);
    state.timer = setTimeout(tick, stepMs);
  }

  state.timer = setTimeout(tick, stepMs);
}

function setCalcValueText(elOrId, text, animate = false) {
  const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
  if (!el) return;
  const finalText = String(text ?? '');
  if (animate && shouldAnimateCalcTotals()) {
    animateRouletteValue(el, finalText);
  } else {
    stopCalcRoulette(el);
    el.textContent = finalText;
  }
}

function debounceCalc(fn, waitMs) {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  };
}

function setCalcControlsLocked(locked) {
  document.querySelectorAll(
    '#calcContent input, #calcContent select, #calcContent button'
  ).forEach((el) => {
    if (locked) {
      el.dataset.calcWasDisabled = el.disabled ? '1' : '0';
      el.disabled = true;
    } else if (el.dataset.calcWasDisabled != null) {
      el.disabled = el.dataset.calcWasDisabled === '1';
      delete el.dataset.calcWasDisabled;
    }
  });
}

function calcSleep(ms, signal) {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
  });
}

function calcTypeText(el, text, durationMs, signal) {
  return new Promise((resolve) => {
    if (!el) {
      resolve();
      return;
    }
    const full = String(text ?? '');
    if (!durationMs || prefersCalcReducedMotion() || signal?.aborted) {
      el.textContent = full;
      el.classList.remove('is-typing');
      resolve();
      return;
    }

    el.textContent = '';
    el.classList.add('is-typing');
    const start = performance.now();

    function frame(now) {
      if (signal?.aborted) {
        el.textContent = full;
        el.classList.remove('is-typing');
        resolve();
        return;
      }
      const progress = Math.min(1, (now - start) / durationMs);
      const count = Math.floor(full.length * progress);
      el.textContent = full.slice(0, count);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = full;
        el.classList.remove('is-typing');
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

function collectFormulaParts(card) {
  const formula = card.querySelector('.calc-formula');
  if (!formula) return [];
  return Array.from(formula.children).filter((el) => {
    if (el.style.display === 'none') return false;
    return getComputedStyle(el).display !== 'none';
  });
}

function collectTotalRows(card) {
  return Array.from(card.querySelectorAll('.calc-total')).filter((row) => {
    if (row.style.display === 'none') return false;
    return getComputedStyle(row).display !== 'none';
  });
}

async function animateCalcCard(card, statusId, durationMs, signal) {
  const statusEl = statusId ? document.getElementById(statusId) : null;
  const formulaParts = collectFormulaParts(card);
  const totalRows = collectTotalRows(card);

  card.classList.remove('is-pending', 'is-done');
  card.classList.add('is-animating');
  card.style.display = '';

  if (statusEl) {
    statusEl.textContent = 'Считаю вариант';
    statusEl.classList.add('is-thinking');
    statusEl.classList.remove('is-done');
  }

  const formulaSnapshots = formulaParts.map((el) => {
    if (el.tagName === 'SELECT') {
      return { el, kind: 'select' };
    }
    if (el.classList.contains('calc-formula-op') && !el.querySelector('.calc-formula-item')) {
      return { el, kind: 'op', text: el.textContent };
    }
    const item = el.classList.contains('calc-formula-item')
      ? el
      : el.querySelector('.calc-formula-item');
    if (item) {
      return { el, kind: 'text', item, text: item.textContent };
    }
    return { el, kind: 'op', text: el.textContent };
  });

  const totalSnapshots = totalRows.map((row) => {
    const valueEl = row.querySelector('.calc-total-value');
    return {
      row,
      valueEl,
      text: valueEl ? valueEl.textContent : '',
    };
  });

  formulaSnapshots.forEach((part) => {
    part.el.classList.add('calc-formula-part-hidden');
    if (part.kind === 'text' && part.item) part.item.textContent = '';
  });
  totalSnapshots.forEach((total) => {
    total.row.classList.add('is-total-hidden');
    if (total.valueEl) total.valueEl.textContent = '';
  });

  await calcSleep(700, signal);

  const formulaBudget = durationMs * 0.52;
  const perFormula = formulaSnapshots.length
    ? formulaBudget / formulaSnapshots.length
    : 0;

  for (const part of formulaSnapshots) {
    if (signal?.aborted) break;
    part.el.classList.remove('calc-formula-part-hidden');
    part.el.classList.add('calc-formula-part-typing');

    if (part.kind === 'text' && part.item) {
      await calcTypeText(part.item, part.text, Math.max(450, perFormula * 0.75), signal);
    } else if (part.kind === 'select') {
      await calcSleep(Math.max(350, perFormula * 0.55), signal);
    } else {
      await calcSleep(Math.max(220, perFormula * 0.35), signal);
    }

    part.el.classList.remove('calc-formula-part-typing');
    await calcSleep(Math.max(120, perFormula * 0.15), signal);
  }

  if (statusEl && !signal?.aborted) {
    statusEl.textContent = 'Считаю итог';
  }

  const totalsBudget = durationMs * 0.28;
  const perTotal = totalSnapshots.length ? totalsBudget / totalSnapshots.length : 0;

  for (const total of totalSnapshots) {
    if (signal?.aborted) break;
    total.row.classList.remove('is-total-hidden');
    await calcTypeText(
      total.valueEl,
      total.text,
      Math.max(700, perTotal * 0.8),
      signal
    );
    await calcSleep(Math.max(180, perTotal * 0.15), signal);
  }

  // Restore final values in case animation was interrupted mid-type
  formulaSnapshots.forEach((part) => {
    part.el.classList.remove('calc-formula-part-hidden', 'calc-formula-part-typing');
    if (part.kind === 'text' && part.item) part.item.textContent = part.text;
  });
  totalSnapshots.forEach((total) => {
    total.row.classList.remove('is-total-hidden');
    if (total.valueEl) {
      total.valueEl.classList.remove('is-typing');
      total.valueEl.textContent = total.text;
    }
  });

  if (statusEl) {
    statusEl.textContent = 'Готово';
    statusEl.classList.remove('is-thinking');
    statusEl.classList.add('is-done');
  }

  card.classList.remove('is-animating');
  card.classList.add('is-done');
}

async function runCalcRevealSequence(queue) {
  const token = ++calcRevealToken;
  const controller = new AbortController();
  calcRevealComplete = false;

  if (!queue.length) {
    calcRevealComplete = true;
    return;
  }

  if (prefersCalcReducedMotion()) {
    queue.forEach((item) => {
      item.card.classList.remove('is-pending');
      item.card.style.display = '';
      item.compute();
      const statusEl = document.getElementById(item.statusId);
      if (statusEl) {
        statusEl.textContent = 'Готово';
        statusEl.classList.add('is-done');
      }
      item.card.classList.add('is-done');
    });
    calcRevealComplete = true;
    return;
  }

  for (const item of queue) {
    if (token !== calcRevealToken) {
      controller.abort();
      return;
    }
    item.card.classList.remove('is-pending');
    item.compute();
    await animateCalcCard(item.card, item.statusId, CALC_CARD_DURATION_MS, controller.signal);
  }

  if (token === calcRevealToken) {
    calcRevealComplete = true;
  }
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

function setMandatoryPaymentTotal(rowId, valueId, mandatoryTotal, animate = false) {
  const row = document.getElementById(rowId);
  const valueEl = document.getElementById(valueId);
  if (!row || !valueEl) return;

  if (mandatoryTotal > 0) {
    row.style.display = '';
    setCalcValueText(valueEl, `${formatPrice(mandatoryTotal)}`, animate);
  } else {
    row.style.display = 'none';
    stopCalcRoulette(valueEl);
    valueEl.textContent = `${formatPrice(0)}`;
  }
}

function calculateCash(area, options = {}) {
  const animate = Boolean(options.animate);
  const priceSelect = document.getElementById('calcPriceSelectCash');
  const price = priceSelect ? Number(priceSelect.value) || 0 : 0;

  let totalCash = area * price;

  const useMaternity = document.getElementById('calcUseMaternityCash')?.checked;
  if (useMaternity) {
    const maternityAmount = Number(document.getElementById('calcMaternityAmountCash')?.value) || 0;
    totalCash = Math.max(0, totalCash - maternityAmount);
  }

  document.getElementById('calcFormulaCashArea').textContent = `${formatArea(area)} м²`;
  setCalcValueText('calcTotalCash', `${formatPrice(totalCash)}`, animate);
}

function calculateInst(area, property, option, options = {}) {
  if (!option) return;
  const animate = Boolean(options.animate);

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
  let mandatoryTotal = 0;

  if (mandatoryPayment > 0) {
    mandatoryTotal = area * mandatoryPayment;
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

  setCalcValueText('calcMonthlyPayment', `${formatPrice(Math.round(monthlyPayment))}`, animate);
  setCalcValueText('calcTotalInstallment', `${formatPrice(totalCost)}`, animate);
  setMandatoryPaymentTotal('calcMandatoryRowInst', 'calcMandatoryPaymentInst', mandatoryTotal, animate);
}

function calculateInstallmentNoDown(area, property, targetLayout, option, options = {}) {
  const card = document.getElementById('calcInstallment6YearsCard');
  if (!card) return;
  const animate = Boolean(options.animate);

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
  let mandatoryTotal = 0;

  if (mandatoryPayment > 0) {
    mandatoryTotal = area * mandatoryPayment;
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

  setCalcValueText('calcMonthlyPayment6Y', `${formatPrice(Math.round(monthlyPayment))}`, animate);
  setCalcValueText('calcTotalInstallment6Y', `${formatPrice(totalCost)}`, animate);
  setMandatoryPaymentTotal('calcMandatoryRowInst6Y', 'calcMandatoryPaymentInst6Y', mandatoryTotal, animate);
}

function calculateInstallmentWithDown(area, property, targetLayout, option, options = {}) {
  const card = document.getElementById('calcInstallment6Years30Card');
  if (!card) return;
  const animate = Boolean(options.animate);

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
  let mandatoryTotal = 0;

  if (option.useMandatoryPayment) {
    const mandatoryPayment = Number(property.mandatoryPayment) || 0;
    if (mandatoryPayment > 0) {
      mandatoryTotal = area * mandatoryPayment;
      amountToDivide = Math.max(0, amountToDivide - mandatoryTotal);
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

  setCalcValueText('calcDownPayment6Y30', `${formatPrice(downPayment)}`, animate);
  setCalcValueText('calcMonthlyPayment6Y30', `${formatPrice(Math.round(monthlyPayment))}`, animate);
  setCalcValueText('calcTotalInstallment6Y30', `${formatPrice(totalCost)}`, animate);
  setMandatoryPaymentTotal('calcMandatoryRowInst6Y30', 'calcMandatoryPaymentInst6Y30', mandatoryTotal, animate);
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
