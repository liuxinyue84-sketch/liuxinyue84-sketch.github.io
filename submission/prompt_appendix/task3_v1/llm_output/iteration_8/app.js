'use strict';

/* ================= projects: render, filter, save ================= */
const list = document.querySelector('#project-list');
let selectedFilter = 'all';
let selectedSkill = '';
let onlySaved = false;
let filterRevision = 0;
const saved = new Set((() => {
 try {
  const value = JSON.parse(localStorage.getItem('aria-saved-projects') || '[]');
  return Array.isArray(value) ? value : [];
 } catch { return []; }
})());

function renderProjects() {
 if (!list.children.length) {
  list.innerHTML = projects.map((p, i) => `
   <li class="project-entry project-entry-${i}" data-index="${i}">
    <article id="project-story-${i}" class="project-row project-card paper-project paper-${i}" data-index="${i}" style="--paper-angle:${[-1.3, 1.5, .8, -1.6][i % 4]}deg">
     <span class="project-tape" aria-hidden="true"></span>
     <header class="project-card-heading">
      <div class="project-heading-copy"><span class="row-type">${p.label}</span><h3>${p.title}</h3></div>
      <span class="row-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
     </header>
     <p class="project-purpose">${p.purpose}</p>
     <p class="project-contribution"><span class="contribution-copy">My contribution · ${p.contribution}</span></p>
     <div class="paper-actions">
      <button class="row-toggle" aria-label="Expand details of ${p.title}" aria-expanded="false" aria-controls="project-detail-${i}"><span class="project-action-icon" aria-hidden="true">＋</span><span class="project-open-label">Open this note</span></button>
      <button class="save-project" aria-label="Save ${p.title}" aria-pressed="false"><span class="heart-icon" aria-hidden="true">♡</span></button>
     </div>
     <div id="project-detail-${i}" class="project-detail" inert>
      <div><div class="detail-inner">
       <ul>${p.detail.map(x => `<li>${x}</li>`).join('')}</ul>
       <p>${p.tags}</p>
       ${p.link ? `<a class="paper-source-link" href="${p.link}" target="_blank" rel="noopener noreferrer">Read the paper ↗</a>` : ''}
      </div></div>
     </div>
    </article>
   </li>`).join('');

  list.querySelectorAll('.row-toggle').forEach(button => button.addEventListener('click', () => {
   const article = button.closest('.project-row');
   const open = article.classList.toggle('open');
   button.setAttribute('aria-expanded', String(open));
   button.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} details of ${projects[article.dataset.index].title}`);
   article.querySelector('.project-open-label').textContent = open ? 'Fold this note' : 'Open this note';
   article.querySelector('.project-detail').inert = !open;
  }));

  list.querySelectorAll('.save-project').forEach(button => button.addEventListener('click', () => {
   const index = Number(button.closest('.project-row').dataset.index);
   saved.has(index) ? saved.delete(index) : saved.add(index);
   try { localStorage.setItem('aria-saved-projects', JSON.stringify([...saved])); } catch {}
   updateHearts();
   button.classList.remove('heart-feedback');
   void button.offsetWidth;
   button.classList.add('heart-feedback');
   if (onlySaved) renderProjects();
  }));
 }
 updateHearts();
 const revision = ++filterRevision;
 const cards = [...list.querySelectorAll('.project-row')];
 const oldRects = new Map(cards.map(card => [card.closest('.project-entry'), card.closest('.project-entry').getBoundingClientRect()]));
 const matches = cards.filter(card => {
  const i = Number(card.dataset.index), p = projects[i];
  return onlySaved ? saved.has(i)
   : (selectedFilter === 'all' || p.category === selectedFilter)
   && (!selectedSkill || p.tags.toLowerCase().includes(selectedSkill.toLowerCase()));
 });
 const prefix = selectedSkill ? `${selectedSkill} · ` : onlySaved ? 'Saved · ' : '';
 document.querySelector('#project-count').textContent = `${prefix}${matches.length} ${matches.length === 1 ? 'story' : 'stories'}`;
 cards.forEach(card => {
  if (!matches.includes(card)) { card.classList.add('filter-leaving'); card.inert = true; }
 });
 const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380;
 setTimeout(() => {
  if (revision !== filterRevision) return;
  cards.forEach(card => {
   const visible = matches.includes(card);
   card.hidden = !visible;
   card.inert = !visible;
   card.closest('.project-entry').hidden = !visible;
  });
  document.querySelector('#projects-empty').hidden = matches.length > 0;
  if (filterRevision > 1) {
   const moving = matches.map(card => card.closest('.project-entry'));
   moving.forEach(entry => {
    const before = oldRects.get(entry), after = entry.getBoundingClientRect();
    if (!before || entry.hidden) return;
    const dx = before.left - after.left, dy = before.top - after.top;
    if (Math.abs(dx) + Math.abs(dy) < 2) return;
    entry.style.transition = 'none';
    entry.style.transform = `translate(${dx}px, ${dy}px)`;
   });
   requestAnimationFrame(() => requestAnimationFrame(() => moving.forEach(entry => {
    entry.style.transition = '';
    entry.style.transform = '';
   })));
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
   if (revision === filterRevision) matches.forEach(card => card.classList.remove('filter-leaving'));
  }));
 }, filterRevision === 1 ? 0 : delay);
}

/* 【V1迭代新增】The index is generated only from V0 project titles and labels. */
const projectIndex = document.querySelector('.project-atlas-index');
if (projectIndex) projectIndex.innerHTML = projects.map((project, index) => `<a href="#project-story-${index}" aria-label="${project.title}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${project.title}</strong></a>`).join('');

function updateHearts() {
 document.querySelector('#saved-count').textContent = saved.size;
 list.querySelectorAll('.save-project').forEach(button => {
  const i = Number(button.closest('.project-row').dataset.index);
  const active = saved.has(i);
  button.classList.toggle('saved', active);
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', `${active ? 'Unsave' : 'Save'} ${projects[i].title}`);
  button.querySelector('.heart-icon').textContent = active ? '♥' : '♡';
 });
}

document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
 selectedFilter = b.dataset.filter;
 onlySaved = false;
 selectedSkill = '';
 document.querySelector('#saved-filter').classList.remove('on');
 document.querySelector('#saved-filter').setAttribute('aria-pressed', 'false');
 document.querySelectorAll('.skill-chip').forEach(chip => { chip.classList.remove('active'); chip.setAttribute('aria-pressed', 'false'); });
 document.querySelectorAll('[data-filter]').forEach(el => {
  const active = el === b;
  el.classList.toggle('active', active);
  el.setAttribute('aria-pressed', String(active));
 });
 renderProjects();
}));

document.querySelector('#saved-filter').addEventListener('click', e => {
 onlySaved = !onlySaved;
 selectedFilter = 'all';
 selectedSkill = '';
 document.querySelectorAll('.skill-chip').forEach(chip => { chip.classList.remove('active'); chip.setAttribute('aria-pressed', 'false'); });
 e.currentTarget.classList.toggle('on', onlySaved);
 e.currentTarget.setAttribute('aria-pressed', String(onlySaved));
 document.querySelectorAll('[data-filter]').forEach(el => {
  const active = !onlySaved && el.dataset.filter === 'all';
  el.classList.toggle('active', active);
  el.setAttribute('aria-pressed', String(active));
 });
 renderProjects();
});

renderProjects();

document.querySelectorAll('.skill-chip').forEach(chip => chip.addEventListener('click', () => {
 const wasActive = chip.classList.contains('active');
 selectedSkill = wasActive ? '' : chip.dataset.skill;
 selectedFilter = 'all';
 onlySaved = false;
 document.querySelector('#saved-filter').classList.remove('on');
 document.querySelector('#saved-filter').setAttribute('aria-pressed', 'false');
 document.querySelectorAll('.skill-chip').forEach(el => {
  const active = !wasActive && el === chip;
  el.classList.toggle('active', active);
  el.setAttribute('aria-pressed', String(active));
 });
 document.querySelectorAll('[data-filter]').forEach(el => {
  const active = el.dataset.filter === 'all';
  el.classList.toggle('active', active);
  el.setAttribute('aria-pressed', String(active));
 });
 renderProjects();
 if (!wasActive) document.querySelector('#projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

/* ================= hero scenery carousel ================= */
const scenes = [
 { src: 'hero-1.jpg', alt: 'Graduate in gown holding a bouquet on the campus track', caption: 'A bright start on the campus track' },
 { src: 'hero-2.jpg', alt: 'Woman in a yellow qipao by a lake with willows', caption: 'Willows and quiet waters' },
 { src: 'hero-3.jpg', alt: 'Woman in a floral dress at the PolyU entrance sign', caption: 'A new chapter at PolyU' }
];
let activeScene = 0;
const sceneImage = document.querySelector('#hero-art-image');
const sceneCaption = document.querySelector('#art-caption-text');
const sceneCounter = document.querySelector('#art-counter');
const dots = document.querySelector('#art-dots');
scenes.forEach((scene, i) => {
 const dot = document.createElement('button');
 dot.type = 'button';
 dot.className = 'scene-dot';
 dot.setAttribute('aria-label', `View scene ${i + 1}: ${scene.caption}`);
 dot.setAttribute('aria-pressed', String(i === 0));
 dot.innerHTML = `<img src="assets/${scene.src}" alt="" loading="lazy"><span>${scene.caption}</span>`;
 dot.addEventListener('click', () => showScene(i));
 dots.append(dot);
});
function showScene(i) {
 activeScene = (i + scenes.length) % scenes.length;
 const scene = scenes[activeScene];
 sceneImage.style.opacity = '.35';
 sceneCaption.style.opacity = '0';
 const requestedScene = activeScene;
 const nextSrc = `assets/${scene.src}`;
 const preload = new Image();
 preload.onload = () => {
  if (requestedScene !== activeScene) return;
  setTimeout(() => {
   if (requestedScene !== activeScene) return;
   sceneImage.src = nextSrc;
   sceneImage.alt = scene.alt;
   sceneCaption.textContent = scene.caption;
   sceneCounter.textContent = `— ${String(activeScene + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
   sceneImage.style.opacity = '1';
   [...dots.children].forEach((d, j) => d.setAttribute('aria-pressed', String(j === activeScene)));
   sceneCaption.style.opacity = '1';
  }, 380);
 };
 preload.onerror = () => {
  if (requestedScene !== activeScene) return;
  sceneImage.style.opacity = '1';
  sceneCaption.style.opacity = '1';
 };
 preload.src = nextSrc;
}
document.querySelector('#art-prev').addEventListener('click', () => showScene(activeScene - 1));
document.querySelector('#art-next').addEventListener('click', () => showScene(activeScene + 1));
sceneImage.addEventListener('click', () => showScene(activeScene + 1));
sceneImage.tabIndex = 0;
sceneImage.setAttribute('role', 'button');
sceneImage.setAttribute('aria-label', 'Show the next hero scene');
sceneImage.addEventListener('keydown', e => {
 if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showScene(activeScene + 1); }
});

/* ================= section navigation ================= */
const sectionLinks = [...document.querySelectorAll('[data-nav]')];
const indicator = document.querySelector('.nav-indicator');
/* 【V1迭代新增·R9】The editorial bar uses a hairline underline instead of a
   sliding pill, so the indicator is sized and placed from the active link's
   own box. That keeps it correct even though the labels differ in width. */
function setActive(id) {
 const i = Math.max(0, sectionLinks.findIndex(a => a.dataset.nav === id));
 sectionLinks.forEach((a, j) => a.classList.toggle('active', j === i));
 if (!indicator) return;
 const target = sectionLinks[i];
 if (!target) return;
 indicator.style.width = `${target.offsetWidth}px`;
 indicator.style.transform = `translateX(${target.offsetLeft}px)`;
}
function updateSectionNav() {
 const sections = [...document.querySelectorAll('main > section')];
 let current = sections[0].id;
 sections.forEach(section => {
  if (section.getBoundingClientRect().top < innerHeight * .5) current = section.id;
 });
 const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 12;
 if (atEnd) current = 'guestbook';
 setActive(current);
}
addEventListener('scroll', updateSectionNav, { passive: true });
addEventListener('resize', () => {
 const active = document.querySelector('[data-nav].active');
 updateSectionNav();
 if (active) setActive(active.dataset.nav);
}, { passive: true });
updateSectionNav();
sectionLinks.forEach(a => a.addEventListener('click', () => setActive(a.dataset.nav)));

/* ================= progress bar & back to top ================= */
const progress = document.querySelector('#progress-bar');
const topButton = document.querySelector('.back-top');
function onScroll() {
 const max = document.documentElement.scrollHeight - innerHeight;
 progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
 topButton.classList.toggle('visible', scrollY > 450);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
topButton.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ================= school cards: expand / collapse ================= */
document.querySelectorAll('.school-head').forEach(button => button.addEventListener('click', () => {
 const card = button.closest('.education-leaf');
 const open = card.classList.toggle('open');
 button.setAttribute('aria-expanded', String(open));
 button.querySelector('.school-action-hint').textContent = open ? 'Click to hide details' : 'Click to view details';
 card.querySelector('.school-detail').inert = !open;
}));
document.querySelectorAll('.education-leaf').forEach(card => card.addEventListener('click', event => {
 if (event.target.closest('.school-head, .school-detail, a, button')) return;
 card.querySelector('.school-head').click();
}));

/* ================= life media gallery ================= */
const gallery = document.querySelector('#media-gallery');
const galleryEmpty = document.querySelector('#gallery-empty');
const dialog = document.querySelector('#media-dialog');
const mediaContent = document.querySelector('#media-content');
const mediaCaption = document.querySelector('#media-caption');
const soundtrack = document.querySelector('#soundtrack');
const audioStatus = document.querySelector('#audio-status');

function addGalleryItem(url, label, kind) {
 const item = document.createElement('button');
 item.className = 'media-item';
 item.type = 'button';
 item.dataset.galleryIndex = String(gallery.children.length);
 item.dataset.mediaKind = kind;
 item.setAttribute('aria-haspopup', 'dialog');
 item.setAttribute('aria-label', `Preview ${kind === 'image' ? 'photo' : 'video'}: ${label}`);
 const el = document.createElement(kind === 'image' ? 'img' : 'video');
 el.src = url;
 el.loading = 'lazy';
 if (kind === 'image') el.alt = label;
 if (kind === 'video') { el.preload = 'metadata'; el.muted = true; el.playsInline = true; }
 item.append(el);
 const caption = document.createElement('span');
 caption.textContent = label;
 item.append(caption);
 item.addEventListener('click', () => openMedia(url, label, kind));
 gallery.append(item);
}

/* Prefill the gallery with travel and music snapshots. */
const lifePhotos = [
 { src: 'life-1.jpg', label: 'Looking back by the lake' },
 { src: 'life-2.jpg', label: 'Before the chapel lawn' },
 { src: 'life-3.jpg', label: 'Jungfrau cable car' },
 { src: 'life-4.jpg', label: 'By the lakeside bridge' },
 { src: 'life-5.jpg', label: 'Florence Cathedral' },
 { src: 'life-6.jpg', label: 'Old town rooftops' },
 { src: 'life-7.jpg', label: 'Double bass in the concert hall' }
];
lifePhotos.forEach(photo => addGalleryItem(`assets/${photo.src}`, photo.label, 'image'));

/* Two short films from life, ready to play. */
const lifeVideos = [
 { src: 'life-video-1.mp4', label: 'Life in motion · I' },
 { src: 'life-video-2.mp4', label: 'Life in motion · II' }
];
lifeVideos.forEach(video => addGalleryItem(`assets/${video.src}`, video.label, 'video'));

function openMedia(url, name, kind) {
 mediaContent.replaceChildren();
 const el = document.createElement(kind === 'image' ? 'img' : 'video');
 el.src = url;
 if (kind === 'video') {
  el.controls = true;
  el.autoplay = true;
  el.playsInline = true;
  soundtrack.pause();
  audioStatus.textContent = 'Background music paused while the video plays.';
 }
 mediaContent.append(el);
 mediaCaption.textContent = name || '';
 dialog.showModal();
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
 const video = mediaContent.querySelector('video');
 if (video) {
  video.pause();
  audioStatus.textContent = 'Video closed; the music stays in your control.';
 }
 mediaContent.replaceChildren();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) soundtrack.pause(); });
/* 【V1迭代新增·R9】`mediaURLs` is referenced here but never declared anywhere in
   the bundle, so this handler threw on every page hide (a latent defect carried
   over unchanged from the frozen V0). The guard keeps the intended cleanup
   behaviour if the list is ever added, and stays silent until then. */
addEventListener('pagehide', () => {
 if (typeof mediaURLs !== 'undefined') mediaURLs.forEach(URL.revokeObjectURL);
});

/* ================= music toggle (navigation bar) ================= */
const soundToggle = document.querySelector('#sound-toggle');
function updateSoundToggle(playing) {
 soundToggle.classList.toggle('is-playing', playing);
 soundToggle.setAttribute('aria-pressed', String(playing));
 const label = playing ? 'Pause Schumann’s Träumerei' : 'Play Schumann’s Träumerei';
 soundToggle.setAttribute('aria-label', label);
 soundToggle.title = label;
}
soundToggle.addEventListener('click', () => {
 if (soundtrack.paused) {
  soundtrack.play().catch(() => {
   updateSoundToggle(false);
   audioStatus.textContent = 'The audio cannot be played right now — please try again later.';
  });
 } else soundtrack.pause();
});
soundtrack.addEventListener('play', () => {
 updateSoundToggle(true);
 audioStatus.textContent = 'Now playing Schumann’s Träumerei — click the note in the navigation bar to pause.';
});
soundtrack.addEventListener('pause', () => {
 updateSoundToggle(false);
 if (!document.hidden) audioStatus.textContent = 'Background music paused — click the note in the navigation bar to play.';
});
soundtrack.addEventListener('error', () => {
 updateSoundToggle(false);
 audioStatus.textContent = 'The audio source cannot be read right now.';
});
soundtrack.play().catch(() => {
 updateSoundToggle(false);
 audioStatus.textContent = 'Autoplay was blocked by the browser — click the note in the navigation bar to play.';
});

/* ================= guestbook ================= */
const guestForm = document.querySelector('#guestbook-form');
const guestList = document.querySelector('#guestbook-list');
const guestEmpty = document.querySelector('#guestbook-empty');
/* Guestbook storage key retained for compatibility with existing local messages. */
let guestEntries = (() => {
 try {
  const value = JSON.parse(localStorage.getItem('aria-guestbook-v2') || '[]');
  return Array.isArray(value) ? value : [];
 } catch { return []; }
})();

function renderGuestbook() {
 guestList.replaceChildren();
 guestEmpty.hidden = guestEntries.length > 0;
 guestEntries.forEach((entry, i) => {
  const note = document.createElement('article');
  note.className = 'guest-note';
  note.style.setProperty('--note-angle', `${[-1.2, 1.4, -.8, 1.1][i % 4]}deg`);
  const message = document.createElement('p');
  message.textContent = entry.message;
  const meta = document.createElement('span');
  meta.className = 'guest-meta';
  meta.textContent = `— ${entry.name} · ${entry.date}`;
  note.append(message, meta);
  guestList.append(note);
 });
}
guestForm.addEventListener('submit', e => {
 e.preventDefault();
 const nameInput = document.querySelector('#guest-name');
 const messageInput = document.querySelector('#guest-message');
 const name = nameInput.value.trim();
 const message = messageInput.value.trim();
 if (!name || !message) return;
 guestEntries.unshift({
  name,
  message,
  date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
 });
 try { localStorage.setItem('aria-guestbook-v2', JSON.stringify(guestEntries)); } catch {}
 guestForm.reset();
 renderGuestbook();
 guestList.firstElementChild?.classList.add('just-added');
 nameInput.focus();
});
renderGuestbook();

/* ================= scroll reveal ================= */
const revealObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  if (entry.isIntersecting) {
   entry.target.classList.add('in-view');
   revealObserver.unobserve(entry.target);
  }
 });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* V1 base decorative interactions inherited from frozen V0. */
'use strict';
/* ============================================================
   Aria's Sky Journal — V1 decorative interactions inherited from frozen V0
   Paper layout, card tilt, stickers, parallax, stars.
   ============================================================ */

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
/* 【V1迭代新增】The project atlas now uses semantic grid entries with FLIP-style reflow; it no longer absolutely positions V0 paper rows. */
/* Cards tilt only for fine pointers, never more than ~1.5 degrees. */
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('[data-tilt]').forEach(card => {
 card.addEventListener('pointermove', event => {
  if (motionPreference.matches || !finePointer.matches) return;
  const box = card.getBoundingClientRect();
  card.style.setProperty('--tilt-x', `${-(event.clientY - box.top - box.height / 2) / box.height * 2.5}deg`);
  card.style.setProperty('--tilt-y', `${(event.clientX - box.left - box.width / 2) / box.width * 2.5}deg`);
 });
 card.addEventListener('pointerleave', () => {
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
 });
});

/* Hero stickers lean gently away from the cursor. */
const hero = document.querySelector('#home');
const stickers = [...document.querySelectorAll('.float-sticker')];
hero.addEventListener('pointermove', event => {
 if (motionPreference.matches || !finePointer.matches) return;
 stickers.forEach(sticker => {
  const box = sticker.getBoundingClientRect();
  const dx = box.left + box.width / 2 - event.clientX;
  const dy = box.top + box.height / 2 - event.clientY;
  const distance = Math.hypot(dx, dy);
  const strength = Math.max(0, 1 - distance / 110) * 13;
  sticker.style.setProperty('--sticker-x', `${dx / (distance || 1) * strength}px`);
  sticker.style.setProperty('--sticker-y', `${dy / (distance || 1) * strength}px`);
 });
}, { passive: true });
hero.addEventListener('pointerleave', () => stickers.forEach(sticker => {
 sticker.style.setProperty('--sticker-x', '0px');
 sticker.style.setProperty('--sticker-y', '0px');
}));

/* Sky parallax: background and cloud layer drift within a few pixels. */
let skyFrame = 0;
function updateSky() {
 skyFrame = 0;
 const scroll = motionPreference.matches ? 0 : Math.min(scrollY, 1300);
 document.documentElement.style.setProperty('--mountain-shift', `${scroll * .007}px`);
 document.documentElement.style.setProperty('--cloud-shift', `${-scroll * .02}px`);
}
addEventListener('scroll', () => { if (!skyFrame) skyFrame = requestAnimationFrame(updateSky); }, { passive: true });
motionPreference.addEventListener('change', updateSky);
updateSky();

/* Little note bounce when the music toggle is clicked. */
soundToggle.addEventListener('click', () => {
 soundToggle.classList.remove('sound-feedback');
 void soundToggle.offsetWidth;
 soundToggle.classList.add('sound-feedback');
});

/* Stars drift up once when the guestbook enters the viewport. */
const guestbookStars = document.querySelector('.guestbook-stars');
const starsObserver = new IntersectionObserver(entries => {
 if (entries.some(entry => entry.isIntersecting)) {
  guestbookStars.classList.add('arrived');
  starsObserver.disconnect();
 }
}, { threshold: .2 });
starsObserver.observe(document.querySelector('.guestbook-postcard'));
