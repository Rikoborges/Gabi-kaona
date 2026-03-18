// ══════════════════════════════════
// GABI KAOANA — main.js
// ══════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  
 // ── NAV HAMBURGER ──
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');

      const href = a.getAttribute('href');

      // só faz scroll se for âncora na mesma página
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        // para links externos ou outras páginas — deixa o browser navegar normalmente
      }
    });
  });
}
  // ── COOKIE BANNER ──
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    if (!localStorage.getItem('gk_cookies')) {
      setTimeout(() => banner.classList.add('show'), 600);
    }
    document.getElementById('cookie-ok')?.addEventListener('click', () => {
      localStorage.setItem('gk_cookies', 'accepted');
      banner.classList.remove('show');
    });
    document.getElementById('cookie-no')?.addEventListener('click', () => {
      localStorage.setItem('gk_cookies', 'declined');
      banner.classList.remove('show');
    });
  }

  // ── FALLBACK SCROLL REVEAL ──
  // Para browsers que não suportam animation-timeline
  if (!CSS.supports('animation-timeline', 'view()')) {
    const els = document.querySelectorAll('.anim-scroll, .anim-stagger > *');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('on'), i * 100);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  // ── NAV ACTIVE LINK ──
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (path.endsWith(href) || (href === 'index.html' && path === '/')) {
      a.classList.add('active');
    }
  });

});

// ── VOLTAR AO TOPO ──
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}