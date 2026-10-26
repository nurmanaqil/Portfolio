import { sessions } from './content.js';
import { archivePose } from './archive-motion.js';
import { initPixelCursor } from './pixel-cursor.js';
import { initSmokeBackground } from './smoke-background.js';

document.documentElement.dataset.enhanced = 'true';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
initSmokeBackground(reduceMotion);
initPixelCursor(reduceMotion, finePointer);
const navigation = [...document.querySelectorAll('.section-nav a')];
const sections = [...document.querySelectorAll('.page-section')];
const chapters = [...document.querySelectorAll('.story-chapter')];
const storyImages = [...document.querySelectorAll('.story-image')];
const orbit = document.querySelector('.archive-orbit');
const orbitRing = document.querySelector('.orbit-ring');
const orbitCards = [...document.querySelectorAll('.orbit-ring .archive-item')];
let scheduled = false;
function updateScrollState() {
  const anchor = window.innerHeight * .44;
  let active = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= anchor) active = section;
  navigation.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  let nearest = 0, distance = Infinity;
  chapters.forEach((chapter, index) => {
    const box = chapter.getBoundingClientRect();
    const delta = Math.abs(box.top + box.height / 2 - window.innerHeight / 2);
    if (delta < distance) { distance = delta; nearest = index; }
  });
  storyImages.forEach((image, index) => {
    image.classList.toggle('is-active', index === nearest);
    image.setAttribute('aria-hidden', String(index !== nearest));
  });
  const caption = document.querySelector('[data-story-caption]');
  if (chapters[nearest] && caption) caption.textContent = sessions[Number(chapters[nearest].dataset.session)].caption;
  if (orbit && orbitRing) {
    const bounds = orbit.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -bounds.top / travel));
    if (!reduceMotion.matches) {
      const height = orbit.querySelector('.orbit-stage').clientHeight;
      orbitCards.forEach((card, index) => {
        const pose = archivePose(index, orbitCards.length, progress, height, innerWidth <= 700);
        card.style.setProperty('--card-x', `${pose.x}px`);
        card.style.setProperty('--card-y', `${pose.y}px`);
        card.style.setProperty('--card-z', `${pose.z}px`);
        card.style.setProperty('--card-turn', `${pose.rotateY}deg`);
        card.style.setProperty('--card-tilt', `${pose.rotateZ}deg`);
        card.style.setProperty('--card-opacity', pose.opacity);
        const edgeBlur = Math.max(0, Math.abs(pose.y) / (height * .5) - .55) * 10;
        card.style.setProperty('--card-blur', `${Math.min(18, pose.blur + edgeBlur)}px`);
        card.style.visibility = pose.opacity < .015 ? 'hidden' : 'visible';
      });
    } else orbitCards.forEach(card => { card.style.removeProperty('visibility'); });
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { requestAnimationFrame(updateScrollState); scheduled = true; }
}, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();

const preview = document.querySelector('.hover-preview');
const previewImage = preview.querySelector('img');
function positionPreview(x, y) {
  const width = preview.offsetWidth;
  const height = preview.offsetHeight;
  preview.style.left = `${Math.max(16, Math.min(x + 22, innerWidth - width - 18))}px`;
  preview.style.top = `${Math.max(16, Math.min(y - height - 22, innerHeight - height - 18))}px`;
}
function showPreview(item, event) {
  if (!finePointer.matches || reduceMotion.matches || innerWidth <= 700) return;
  const session = sessions[Number(item.dataset.archiveIndex)];
  previewImage.src = session.image;
  preview.querySelector('span').textContent = session.caption.toUpperCase();
  preview.classList.add('is-visible');
  const rect = item.getBoundingClientRect();
  positionPreview(event?.clientX ?? rect.left, event?.clientY ?? rect.top);
}
const hidePreview = () => preview.classList.remove('is-visible');
document.querySelectorAll('[data-archive-index]').forEach(item => {
  item.addEventListener('pointerenter', event => showPreview(item, event));
  item.addEventListener('pointermove', event => {
    if (preview.classList.contains('is-visible')) positionPreview(event.clientX, event.clientY);
  });
  item.addEventListener('pointerleave', hidePreview);
  item.addEventListener('focus', () => showPreview(item));
  item.addEventListener('blur', hidePreview);
  item.addEventListener('click', event => { event.preventDefault(); openArchive(Number(item.dataset.archiveIndex)); });
});
window.addEventListener('scroll', hidePreview, { passive: true });
reduceMotion.addEventListener('change', hidePreview);
reduceMotion.addEventListener('change', updateScrollState);
finePointer.addEventListener('change', hidePreview);

const dialog = document.querySelector('.archive-dialog');
let currentImage = 0;
let lastTrigger;
function renderArchive() {
  const session = sessions[currentImage];
  const image = dialog.querySelector('[data-dialog-image]');
  image.src = session.image; image.alt = session.alt;
  dialog.querySelector('[data-dialog-count]').textContent = `${String(currentImage + 1).padStart(2, '0')} / ${sessions.length}`;
  dialog.querySelector('[data-dialog-caption]').textContent = session.caption;
}
function openArchive(index) {
  currentImage = index; lastTrigger = document.activeElement; hidePreview(); renderArchive();
  dialog.showModal(); document.body.classList.add('dialog-open');
  dialog.querySelector('.dialog-close').focus();
}
function stepArchive(step) { currentImage = (currentImage + step + sessions.length) % sessions.length; renderArchive(); }
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('[data-dialog-prev]').addEventListener('click', () => stepArchive(-1));
dialog.querySelector('[data-dialog-next]').addEventListener('click', () => stepArchive(1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); stepArchive(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); stepArchive(-1); }
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open'); lastTrigger?.focus(); hidePreview();
});

// Keep collaboration images accessible even when a derivative is unavailable.
document.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
  image.classList.add('image-unavailable');
  image.style.opacity = '1';
}));
