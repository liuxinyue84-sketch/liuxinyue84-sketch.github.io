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

/* 【V1迭代新增·R8】The window bar names the section currently on screen, so a
   visitor always knows where they are without reading the whole page. */
const paneCrumb = document.querySelector('#pane-crumb-text');
const paneCount = document.querySelector('#pane-count');
function syncPaneBar() {
 const active = document.querySelector('[data-nav].active');
 if (!active || !paneCrumb) return;
 const index = v1NavLinks.indexOf(active);
 paneCrumb.textContent = active.textContent.trim();
 if (paneCount) paneCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(v1NavLinks.length).padStart(2, '0')}`;
}
syncPaneBar();
addEventListener('scroll', syncPaneBar, { passive: true });
const v1PaneScroller = document.querySelector('.app-main main');
if (v1PaneScroller) v1PaneScroller.addEventListener('scroll', syncPaneBar, { passive: true });
v1NavLinks.forEach(link => link.addEventListener('click', () => requestAnimationFrame(syncPaneBar)));

// State labels remain in sync when a tool chip is selected by mouse or keyboard.
document.querySelectorAll('.skill-chip').forEach(chip => {
 chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
 chip.addEventListener('click', () => {
  requestAnimationFrame(() => document.querySelectorAll('.skill-chip').forEach(item => {
   item.setAttribute('aria-pressed', String(item.classList.contains('active')));
  }));
 });
});
