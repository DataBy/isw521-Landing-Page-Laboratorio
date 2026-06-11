const root = document.documentElement;
const header = document.querySelector('[data-header]');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const reveals = [...document.querySelectorAll('.reveal')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fontSteps = [0.9, 1, 1.1, 1.2, 1.3];
let fontIndex = fontSteps.indexOf(Number(localStorage.getItem('fontScale')) || 1);

function setFont(index) {
  fontIndex = Math.max(0, Math.min(fontSteps.length - 1, index));
  const value = fontSteps[fontIndex];
  root.style.setProperty('--font-scale', value);
  localStorage.setItem('fontScale', value);
}

setFont(fontIndex < 0 ? 1 : fontIndex);

function updateHeader() {
  header.classList.toggle('is-scrolled', scrollY > 24);
}

function updateActiveLink(id) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.16 });
  reveals.forEach(element => revealObserver.observe(element));
} else {
  reveals.forEach(element => element.classList.add('is-visible'));
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) updateActiveLink(entry.target.id);
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(section => sectionObserver.observe(section));

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// Menú hamburguesa
const navToggle = document.querySelector('[data-nav-toggle]');
const siteNav = document.querySelector('[data-nav]');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  });
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Widget de accesibilidad
const a11yToggle = document.querySelector('[data-a11y-toggle]');
const a11yPanel = document.querySelector('[data-a11y-panel]');
if (a11yToggle && a11yPanel) {
  a11yToggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = a11yPanel.classList.toggle('is-open');
    a11yToggle.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.accessibility')) {
      a11yPanel.classList.remove('is-open');
      a11yToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

a11yPanel?.addEventListener('click', event => {
  const action = event.target.dataset.font;
  if (action === 'down') setFont(fontIndex - 1);
  if (action === 'reset') setFont(1);
  if (action === 'up') setFont(fontIndex + 1);
});

addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ─── EFECTO TILT 3D — hero image ────────────────────────────────────────────
// Solo en escritorio (dispositivos con hover real). En móvil el inline style
// del mouseleave sobreescribiría el transform: none del media query.
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const heroImg = document.querySelector('.hero__img');

  if (heroImg) {
    const STRENGTH = 12;
    const SCALE    = 1.04;

    heroImg.style.transition = 'transform 0.1s ease-out';
    heroImg.style.willChange = 'transform';

    heroImg.addEventListener('mousemove', e => {
      const { left, top, width, height } = heroImg.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;  // -0.5 a 0.5
      const y = (e.clientY - top)  / height - 0.5;

      const rotY =  x * STRENGTH;
      const rotX = -y * STRENGTH;

      heroImg.style.transform =
        `translateY(-60px) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${SCALE})`;
    });

    heroImg.addEventListener('mouseleave', () => {
      heroImg.style.transition = 'transform 0.4s ease-out';
      heroImg.style.transform  = 'translateY(-60px) perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
}
