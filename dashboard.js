const root = document.documentElement;
const revealTargets = document.querySelectorAll('[data-section-reveal]');
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const magneticButtons = document.querySelectorAll('.magnetic-button');
const sidebar = document.querySelector('.luxury-sidebar');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const searchInput = document.querySelector('.topbar-search input');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((target) => revealObserver.observe(target));

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigationLinks.forEach((item) => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
    sidebar?.classList.remove('sidebar-is-open');
  });
});

magneticButtons.forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) scale(1.02)`;
  });

  button.addEventListener('pointerleave', () => {
    button.style.transform = '';
  });
});

window.addEventListener('scroll', () => {
  root.style.setProperty('--scroll-y', `${window.scrollY * 0.04}px`);
}, { passive: true });

mobileMenuButton?.addEventListener('click', () => {
  sidebar?.classList.toggle('sidebar-is-open');
});

document.addEventListener('keydown', (event) => {
  const isCommandSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
  if (isCommandSearch) {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === 'Escape') {
    sidebar?.classList.remove('sidebar-is-open');
  }
});
