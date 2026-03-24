/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ── HERO ANIMATION ── */
window.addEventListener('load', () => {
  const bg      = document.getElementById('heroBg');
  const content = document.getElementById('heroContent');
  if (bg)      bg.classList.add('zoomed');
  if (content) setTimeout(() => content.classList.add('visible'), 200);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow =
    document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── COLLECTION TAB SWITCHER ── */
function switchMetal(metal, btn) {
  document.querySelectorAll('.tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.cat-grid').forEach(panel => {
    panel.classList.toggle('hidden', panel.id !== `panel-${metal}`);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const defaultBtn = document.querySelector('.tab-btn.active');
  if (defaultBtn) {
    switchMetal('gold', defaultBtn);
  }
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const grid  = el.closest('.cat-grid') || el.closest('.product-grid');
    const delay = grid ? [...el.parentElement.children].indexOf(el) * 90 : 0;
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── CONTACT FORM — opens Gmail/mail app with details pre-filled ── */

// ✏️ Change this to your email address
const OWNER_EMAIL = 'pavanrevankar211@gmail.com';

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validation
    let valid = true;
    const err = (id, show) => document.getElementById(id).classList.toggle('show', show);

    const fn  = document.getElementById('firstName');
    const em  = document.getElementById('email');
    const msg = document.getElementById('message');

    if (!fn.value.trim())                                     { err('firstNameErr', true); valid = false; } else err('firstNameErr', false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { err('emailErr',     true); valid = false; } else err('emailErr',     false);
    if (!msg.value.trim())                                    { err('messageErr',   true); valid = false; } else err('messageErr',   false);
    if (!valid) return;

    // Collect values
    const name     = fn.value.trim() + ' ' + document.getElementById('lastName').value.trim();
    const email    = em.value.trim();
    const phone    = document.getElementById('phone').value.trim()    || 'Not provided';
    const interest = document.getElementById('interest').value        || 'Not selected';
    const message  = msg.value.trim();

    // Build mailto link
    const subject = encodeURIComponent('New Enquiry – Chandrodaya Jewels');
    const body    = encodeURIComponent(
      'Name     : ' + name     + '\n' +
      'Email    : ' + email    + '\n' +
      'Phone    : ' + phone    + '\n' +
      'Interest : ' + interest + '\n' +
      'Message  : ' + message
    );

    // Open email app with all details filled in
    window.open('mailto:' + OWNER_EMAIL + '?subject=' + subject + '&body=' + body);

    // Show success message
    contactForm.style.display = 'none';
    document.getElementById('successMsg').classList.add('show');
  });
}