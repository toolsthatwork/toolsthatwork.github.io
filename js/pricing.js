/* ============================================
   Tools That Work — Pricing Toggle
   ============================================ */

(function () {
  'use strict';

  const toggleSwitch = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.toggle-monthly');
  const annualLabel = document.querySelector('.toggle-annual');

  if (!toggleSwitch) return;

  let isAnnual = false;

  toggleSwitch.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleSwitch.classList.toggle('annual', isAnnual);
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    document.querySelectorAll('.price-monthly').forEach(el => {
      el.style.display = isAnnual ? 'none' : 'block';
    });
    document.querySelectorAll('.price-annual').forEach(el => {
      el.style.display = isAnnual ? 'block' : 'none';
    });
  });
})();
