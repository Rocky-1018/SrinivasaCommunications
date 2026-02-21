/* =============================================
   SRINIVASA COMMUNICATIONS — SCRIPTS
   ============================================= */

// ── Scroll Progress Bar ──────────────────────
const scrollProgress = document.getElementById('scrollProgress');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
  header.classList.toggle('scrolled', scrollTop > 50);
  backToTop.classList.toggle('visible', scrollTop > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile Navigation ────────────────────────
const menuToggle = document.getElementById('menuToggle');
const nav        = document.getElementById('nav');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  nav.classList.add('open');
  menuToggle.classList.add('open');
  navOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('open');
  menuToggle.classList.remove('open');
  navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
  nav.classList.contains('open') ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// ── Service Tabs ─────────────────────────────
const tabBtns  = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const activePane = document.querySelector(`.tab-pane[data-pane="${target}"]`);
    activePane.classList.add('active');

    // Re-trigger staggered reveal animations for the new tab's cards
    activePane.querySelectorAll('.reveal').forEach((el, i) => {
      el.classList.remove('visible');
      el.style.transitionDelay = `${i * 0.055}s`;
      // Allow paint before re-adding visible
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    });
  });
});

// ── Intersection Observer – Reveal Animations ─
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// Stagger children inside grid/flex parents
document.querySelectorAll('.service-grid, .process-steps, .whyus-features, .contact-info').forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated Number Counters ─────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const fps      = 60;
  const steps    = duration / (1000 / fps);
  const increment = target / steps;
  let current = 0;

  const tick = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = Math.floor(current);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── Footer Year ───────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
