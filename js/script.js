'use strict';

/* ─── Scroll-driven animation ────────────────────────────── */

const FRAME_COUNT  = 300;
const FRAME_PREFIX = 'ezgif-frame-';

const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `${FRAME_PREFIX}${String(i + 1).padStart(3, '0')}.png`
);

const FRAMES_BASE   = 'assets/images/frames/';
const PX_PER_FRAME  = 40;

const canvas      = document.getElementById('canvas');
const ctx         = canvas.getContext('2d');
const driver      = document.getElementById('scroll-driver');
const loader      = document.getElementById('loader');
const barFill     = document.getElementById('loader-bar-fill');
const loaderText  = document.getElementById('loader-text');
const heroCard    = document.querySelector('.hero__card');

const images = new Array(FRAMES.length);
let loadedCount  = 0;
let currentFrame = 0;
let rafPending   = false;
let resizeTimer  = null;

function setCanvasSize() {
  const dpr = window.devicePixelRatio || 1;
  const w   = window.innerWidth;
  const h   = window.innerHeight;

  canvas.width        = Math.round(w * dpr);
  canvas.height       = Math.round(h * dpr);
  canvas.style.width  = `${w}px`;
  canvas.style.height = `${h}px`;
}

function setDriverHeight() {
  driver.style.height = `${FRAMES.length * PX_PER_FRAME + window.innerHeight}px`;
}

function drawFrame(index) {
  const img = images[index];
  if (!img?.complete) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const dw = img.naturalWidth  * scale;
  const dh = img.naturalHeight * scale;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

function updateHeroParallax() {
  if (!heroCard) return;
  const zone0 = document.querySelector('.scene__zone');
  const p = Math.min(window.scrollY / zone0.offsetHeight, 1);
  heroCard.style.opacity   = String(Math.max(0, 1 - p * 1.5).toFixed(3));
  heroCard.style.transform = `translateY(${(p * -60).toFixed(1)}px)`;
}

function handleScroll() {
  updateHeroParallax();
  updateCardAnims();

  const frameIndex = Math.min(
    Math.floor(window.scrollY / PX_PER_FRAME),
    FRAMES.length - 1
  );

  if (frameIndex === currentFrame) return;
  currentFrame = frameIndex;

  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      drawFrame(currentFrame);
      rafPending = false;
    });
  }
}

function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    setCanvasSize();
    setDriverHeight();
    drawFrame(currentFrame);
  }, 100);
}

function onImageLoaded() {
  loadedCount++;
  const pct = Math.round((loadedCount / FRAMES.length) * 100);
  barFill.style.width    = `${pct}%`;
  loaderText.textContent = `${pct}%`;

  if (loadedCount === FRAMES.length) onAllLoaded();
}

function onAllLoaded() {
  loader.classList.add('loader--hidden');
  loader.addEventListener('transitionend', () => {
    loader.style.display = 'none';
  }, { once: true });

  drawFrame(0);
  initCardAnims();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

function preloadFrames() {
  FRAMES.forEach((name, i) => {
    const img   = new Image();
    img.onload  = onImageLoaded;
    img.onerror = onImageLoaded;
    img.src     = FRAMES_BASE + name;
    images[i]   = img;
  });
}

function init() {
  setCanvasSize();
  setDriverHeight();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  preloadFrames();
}

init();

/* ─── Menú móvil ─────────────────────────────────────────── */

const toggle = document.querySelector('.site-header__menu-toggle');
const nav    = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label',
      isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
    nav.classList.toggle('site-header__nav--open', !isOpen);
  });

  nav.querySelectorAll('.site-header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      nav.classList.remove('site-header__nav--open');
    });
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      nav.classList.remove('site-header__nav--open');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('site-header__nav--open')) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      nav.classList.remove('site-header__nav--open');
      toggle.focus();
    }
  });
}

/* ─── Scroll suave ───────────────────────────────────────── */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id     = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const zone = target.closest('.scene__zone');

    // Para secciones animadas, aterriza al 35% de la zona (card ya totalmente visible).
    // Para el hero (sin data-entry) o links sin zona, usa el tope exacto.
    const hasAnim = zone && target.dataset.entry !== undefined;
    const base    = zone ? zone.offsetTop : target.offsetTop;
    const offset  = hasAnim ? zone.offsetHeight * 0.35 : 0;

    window.scrollTo({
      top:      base + offset,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

/* ─── Enlace activo por zona ─────────────────────────────── */

const navLinks = document.querySelectorAll('[data-nav-link]');
const HEADER_H = 64;

function setActiveLink() {
  const scrollY = window.scrollY;
  let activeId  = navLinks[0]?.getAttribute('href')?.slice(1) ?? null;

  document.querySelectorAll('.scene__zone').forEach(zone => {
    const section = zone.querySelector('section[id]');
    if (section && scrollY >= zone.offsetTop - HEADER_H - 32) activeId = section.id;
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('site-header__nav-link--active', isActive);
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ─── Widget de accesibilidad — tamaño de texto ─────────── */

const LEVELS = [
  { id: 'pequeno',    label: 'Pequeño',    scale: 0.875 },
  { id: 'normal',     label: 'Normal',     scale: 1     },
  { id: 'grande',     label: 'Grande',     scale: 1.15  },
  { id: 'muy-grande', label: 'Muy grande', scale: 1.30  },
];

const BASE_SIZES = {
  '--fz-xs':   [11, 1.4, 12],
  '--fz-sm':   [13, 1.8, 14],
  '--fz-base': [15, 2.0, 17],
  '--fz-md':   [18, 2.4, 22],
  '--fz-lg':   [24, 3.5, 34],
};

const a11yToggleBtn  = document.getElementById('a11y-toggle');
const a11yPanel      = document.getElementById('a11y-panel');
const a11yLevelLabel = document.getElementById('a11y-level');
const a11yDecBtn     = document.getElementById('a11y-decrease');
const a11yResetBtn   = document.getElementById('a11y-reset');
const a11yIncBtn     = document.getElementById('a11y-increase');

const savedLevel = localStorage.getItem('a11y-font-level');
const savedIdx   = LEVELS.findIndex(l => l.id === savedLevel);
let levelIndex   = savedIdx !== -1 ? savedIdx : 1;
applyLevel(false);

if (a11yToggleBtn && a11yPanel) {
  a11yToggleBtn.addEventListener('click', () => {
    const isOpen = !a11yPanel.hidden;
    a11yPanel.hidden = isOpen;
    a11yToggleBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', e => {
    const widget = document.getElementById('a11y-widget');
    if (widget && !widget.contains(e.target)) {
      a11yPanel.hidden = true;
      a11yToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !a11yPanel.hidden) {
      a11yPanel.hidden = true;
      a11yToggleBtn.setAttribute('aria-expanded', 'false');
      a11yToggleBtn.focus();
    }
  });
}

a11yDecBtn?.addEventListener('click',   () => { levelIndex = Math.max(levelIndex - 1, 0);               applyLevel(true); });
a11yResetBtn?.addEventListener('click', () => { levelIndex = 1;                                          applyLevel(true); });
a11yIncBtn?.addEventListener('click',   () => { levelIndex = Math.min(levelIndex + 1, LEVELS.length-1); applyLevel(true); });

/* ─── Animaciones de cards por scroll ───────────────── */

function easeOutCubic(t) { return 1 - (1 - t) ** 3; }
function easeInCubic(t)  { return t * t * t; }

const CARD_ZONES = [];

function initCardAnims() {
  document.querySelectorAll('.scene__zone').forEach(zone => {
    const section = zone.querySelector('.scene-section:not(.scene-section--center)');
    if (!section) return;
    const card = section.querySelector('.scene-section__card');
    if (!card) return;

    CARD_ZONES.push({
      zone,
      card,
      entry:  section.dataset.entry  || 'bottom',
      rotate: parseFloat(section.dataset.rotate ?? '0'),
    });
  });
  updateHeroParallax();
  updateCardAnims();
}

function updateCardAnims() {
  const sy       = window.scrollY;
  const isMobile = window.innerWidth < 768;

  CARD_ZONES.forEach(({ zone, card, entry: rawEntry, rotate }) => {
    const top = zone.offsetTop;
    const h   = zone.offsetHeight;
    const p   = Math.max(0, Math.min(1, (sy - top) / h));

    const enter = easeOutCubic(Math.min(p / 0.28, 1));
    const exit  = easeInCubic(Math.max(0, (p - 0.72) / 0.28));
    const t     = enter * (1 - exit);

    // En mobile todas las cards entran desde abajo
    const entry = isMobile ? 'bottom' : rawEntry;
    const dist  = isMobile ? 56 : 80;

    let tx = 0, ty = 0;
    if (entry === 'left')   tx = (enter - 1) * dist;
    if (entry === 'right')  tx = (1 - enter) * dist;
    if (entry === 'bottom') ty = (1 - enter) * dist;
    if (entry === 'top')    ty = (enter - 1) * dist;

    // Parallax: deriva suavemente mientras la zona avanza
    const drift = (p - 0.5) * -22 * enter * (1 - exit);

    // Scale: 0.94 → 1.0 al entrar, 1.0 → 0.94 al salir
    const scale = 0.94 + 0.06 * t;

    card.style.opacity   = t.toFixed(3);
    card.style.transform = `translate(${tx.toFixed(1)}px,${(ty + drift).toFixed(1)}px) rotate(${(rotate * enter).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });
}

function applyLevel(announce) {
  const { id, label, scale } = LEVELS[levelIndex];

  for (const [prop, [min, vw, max]] of Object.entries(BASE_SIZES)) {
    document.documentElement.style.setProperty(
      prop,
      `clamp(${(min * scale).toFixed(1)}px, ${vw}vw, ${(max * scale).toFixed(1)}px)`
    );
  }

  if (a11yLevelLabel) {
    a11yLevelLabel.setAttribute('aria-live', announce ? 'polite' : 'off');
    a11yLevelLabel.textContent = label;
  }

  if (a11yDecBtn)   a11yDecBtn.disabled   = levelIndex === 0;
  if (a11yIncBtn)   a11yIncBtn.disabled   = levelIndex === LEVELS.length - 1;
  if (a11yResetBtn) a11yResetBtn.disabled = levelIndex === 1;

  localStorage.setItem('a11y-font-level', id);
}
