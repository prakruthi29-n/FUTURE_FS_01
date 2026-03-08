document.addEventListener('DOMContentLoaded', () => {

  // ── YEAR ──────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ── NAVBAR SCROLL ─────────────────────────
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // ── ACTIVE NAV LINK ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });


  // ── HAMBURGER MENU ────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });


  // ── SCROLL REVEAL ─────────────────────────
  const revealTargets = document.querySelectorAll(
    '.skill-group, .project-card, .about-text, .contact-info, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revObs.observe(el));


  // ── SECTION TITLE SHIMMER ON SCROLL ───────
  const sectionTitles = document.querySelectorAll('.section-title');

  const titleObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        titleObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  sectionTitles.forEach(t => titleObs.observe(t));


  // ── PROJECT FILTER ────────────────────────
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (f === 'all' || card.getAttribute('data-category') === f) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.45s cubic-bezier(0.34,1.56,0.64,1) both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // ── CONTACT FORM ──────────────────────────
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const success   = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = form.querySelector('#uname').value.trim();
      const email   = form.querySelector('#uemail').value.trim();
      const subject = form.querySelector('#subject').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !subject || !message) {
        shakeEl(form); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        shakeField(form.querySelector('#uemail')); return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending…';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1400);
    });
  }

  function shakeEl(el) {
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = 'shake 0.4s ease'; });
    setTimeout(() => { el.style.animation = ''; }, 400);
  }

  function shakeField(el) {
    el.style.borderColor = '#d63384';
    el.focus();
    setTimeout(() => { el.style.borderColor = ''; }, 1500);
  }


  // ── SMOOTH SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });


  // ── INJECT KEYFRAMES ──────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
  `;
  document.head.appendChild(style);


  // ── SKILL TAG TILT ON HOVER ───────────────
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      const rand = (Math.random() * 10 - 5).toFixed(1);
      tag.style.transform = `scale(1.08) rotate(${rand}deg)`;
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });

});