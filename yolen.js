/**
 * yolen.js
 * Modal (services) + reveal on scroll + accessible focus trap
 */
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const openBtn = document.getElementById('open-services-modal');
  const modal = document.getElementById('services-modal');
  const modalPanel = modal ? modal.querySelector('.modal__panel') : null;
  const modalCloseButtons = modal ? modal.querySelectorAll('[data-modal-close], .modal__close') : [];
  let lastFocused = null;

  /* ---------- Open modal ---------- */
  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock background scroll

    // focus first focusable element inside panel (close button)
    const first = modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();

    document.addEventListener('keydown', handleKeydown);
  }

  /* ---------- Close modal ---------- */
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', handleKeydown);
  }

  /* ---------- Key handling (Escape & Tab trap) ---------- */
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      // simple focus trap
      const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* ---------- Clicks: open/close/backdrop ---------- */
  if (openBtn) openBtn.addEventListener('click', openModal);

  if (modal) {
    // backdrop & data-modal-close
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal__backdrop') || e.target.hasAttribute('data-modal-close')) {
        closeModal();
      }
    });
    // close buttons
    modalCloseButtons.forEach(btn => btn.addEventListener('click', closeModal));
  }

  /* ---------- Reveal on scroll for vitrine items ---------- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  function revealOnScroll() {
    const vh = window.innerHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  // init
  revealOnScroll();

  /* ---------- Option: smooth scroll to modal-content on open (if needed) ----------
     Not enabled by default. If you want modal to automatically scroll to a specific service,
     you can add code here to find the element and call element.scrollIntoView({behavior:'smooth'});
  */

});

// FAQ accordéon simple
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const open = item.getAttribute('aria-expanded') === 'true';
      // close all
      faqItems.forEach(i => i.setAttribute('aria-expanded', 'false'));
      // toggle clicked
      item.setAttribute('aria-expanded', !open);
    });
  });

  // CTA: focus on contact form (optional)
  const contactCta = document.getElementById('contact-cta');
  if (contactCta) contactCta.addEventListener('click', () => {
    const contactForm = document.querySelector('#contact .contact-form input[name="name"]');
    if (contactForm) contactForm.focus();
    // optionally scroll to contact section
    document.getElementById('contact') && document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  });
});
// ===== Header: burger + scroll-to-top =====
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.main-nav ul');
  const scrollBtn = document.querySelector('.scroll-to-top');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('active');
    });

    // close menu when clicking a nav link (mobile)
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-to-top: show after 300px
  const showAfter = 300;
  const onScroll = () => {
    if (!scrollBtn) return;
    if (window.scrollY > showAfter) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // smooth scroll to top
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

const slides = document.querySelectorAll(".slide");
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  // Change toutes les 6 secondes
  setInterval(showNextSlide, 6000);