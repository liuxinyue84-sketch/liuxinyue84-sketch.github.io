'use strict';
/* 【V1迭代新增】Few-shot 生成的语义反馈与可访问状态同步。 */

// 【V1迭代新增】Contribution facts are rendered as their own named block in the project atlas DOM.

// The navigation's visual active state also has a screen-reader equivalent.
const v1NavLinks = [...document.querySelectorAll('[data-nav]')];
function syncCurrentNav() {
 const active = document.querySelector('[data-nav].active');
 v1NavLinks.forEach(link => {
  if (link === active) link.setAttribute('aria-current', 'location');
  else link.removeAttribute('aria-current');
 });
}
syncCurrentNav();
addEventListener('scroll', syncCurrentNav, { passive: true });

// State labels remain in sync when a tool chip is selected by mouse or keyboard.
document.querySelectorAll('.skill-chip').forEach(chip => {
 chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
 chip.addEventListener('click', () => {
  requestAnimationFrame(() => document.querySelectorAll('.skill-chip').forEach(item => {
   item.setAttribute('aria-pressed', String(item.classList.contains('active')));
  }));
 });
});
