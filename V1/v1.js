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

/* 【V1迭代新增·R9】The framed window bar was removed with the app shell; the
   editorial bar marks position with a hairline underline instead, so only the
   screen-reader equivalent of the active link still needs keeping in sync. */

/* 【V1迭代新增·R12】A skill line opens onto its evidence. The collapsed panel
   is inert, the same pattern the education rows already use, so keyboard and
   screen-reader users never tab into text they cannot see. */
document.querySelectorAll('.skill-note').forEach(note => {
 const toggle = note.querySelector('.skill-note-toggle');
 const detail = note.querySelector('.skill-detail');
 if (!toggle || !detail) return;
 const label = toggle.querySelector('strong')?.textContent.trim() || 'this skill';
 toggle.setAttribute('aria-label', `${label} — show details`);
 toggle.addEventListener('click', () => {
  const open = note.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', `${label} — ${open ? 'hide' : 'show'} details`);
  detail.inert = !open;
 });
});

/* Jumping from a skill panel to a project story also unfolds that story, so the
   reader lands on the evidence rather than on a folded note. */
document.querySelectorAll('.skill-project-link').forEach(link => {
 link.addEventListener('click', () => {
  const target = document.getElementById(link.getAttribute('href').slice(1));
  if (target && !target.classList.contains('open')) target.querySelector('.row-toggle')?.click();
 });
});

// State labels remain in sync when a tool chip is selected by mouse or keyboard.
document.querySelectorAll('.skill-chip').forEach(chip => {
 chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
 chip.addEventListener('click', () => {
  requestAnimationFrame(() => document.querySelectorAll('.skill-chip').forEach(item => {
   item.setAttribute('aria-pressed', String(item.classList.contains('active')));
  }));
 });
});
