/* =========================================================================
   PRINTLAB — script.js
   Vanilla JS, no dependencies, no build step.
   1 header + scroll progress   5 reveal on scroll
   2 mobile nav                 6 counters
   3 scroll spy                 7 reviews carousel
   4 portfolio filter+lightbox  8 contact form (Web3Forms)
   ========================================================================= */
(function () {
  'use strict';

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. HEADER STATE + SCROLL PROGRESS BAR
     --------------------------------------------------------------- */
  var header = $('#site-header');
  var progress = $('#scroll-progress');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-stuck', y > 24);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    spy(y);
  }

  /* ---------------------------------------------------------------
     2. MOBILE NAV
     --------------------------------------------------------------- */
  var navToggle = $('#nav-toggle');
  var nav = $('#nav');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Any nav click closes the mobile drawer
  $$('#nav a').forEach(function (a) { a.addEventListener('click', closeNav); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------------------------------------------------------------
     3. SCROLL SPY — highlight the section you're looking at
     --------------------------------------------------------------- */
  var sections = ['hero', 'services', 'work', 'reviews', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var navLinks = $$('.nav-link');

  function spy(y) {
    var offset = y + (window.innerHeight * 0.32);
    var currentId = sections.length ? sections[0].id : '';

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= offset) currentId = sections[i].id;
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });
  }

  /* ---------------------------------------------------------------
     4. REVEAL ON SCROLL
     --------------------------------------------------------------- */
  var revealables = $$('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------------
     5. STAT COUNTERS
     --------------------------------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);

    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    var duration = 1400;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }

  var counters = $$('.count');
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------------------------------------------------------------
     6. PORTFOLIO — filtering
     --------------------------------------------------------------- */
  var filters = $$('.filter');
  var tiles = $$('.tile');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filter;

      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      tiles.forEach(function (tile) {
        var show = cat === 'all' || tile.dataset.cat === cat;
        tile.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------------------------------------------------------------
     7. PORTFOLIO — lightbox
     --------------------------------------------------------------- */
  var lightbox = $('#lightbox');
  var lbImg = $('#lb-img');
  var lbTitle = $('#lb-title');
  var lbMeta = $('#lb-meta');
  var lbDesc = $('#lb-desc');
  var lbClose = $('#lb-close');
  var lastFocused = null;

  function openLightbox(tile) {
    lastFocused = document.activeElement;

    lbImg.src = tile.dataset.img || '';
    lbImg.alt = tile.dataset.title || '';
    lbTitle.textContent = tile.dataset.title || '';
    lbMeta.textContent = tile.dataset.meta || '';
    lbDesc.textContent = tile.dataset.desc || '';

    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () { openLightbox(tile); });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;

    if (e.key === 'Escape') { closeLightbox(); return; }

    // Simple focus trap
    if (e.key === 'Tab') {
      var focusable = $$('button, a[href], input, textarea, select', lightbox)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  /* ---------------------------------------------------------------
     8. REVIEWS CAROUSEL
     --------------------------------------------------------------- */
  var track = $('#carousel-track');
  var slides = $$('.slide', track);
  var dotsWrap = $('#dots');
  var carousel = $('#carousel');
  var index = 0;
  var timer = null;
  var AUTOPLAY_MS = 6500;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' is-active' : '');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Review ' + (i + 1));
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });

  var dots = $$('.dot', dotsWrap);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';

    dots.forEach(function (d, di) {
      d.classList.toggle('is-active', di === index);
      d.setAttribute('aria-selected', String(di === index));
    });

    slides.forEach(function (s, si) {
      // Keep off-screen slides out of the tab order
      s.setAttribute('aria-hidden', String(si !== index));
    });
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    if (reduceMotion || slides.length < 2) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  $('#next-slide').addEventListener('click', function () { next(); restart(); });
  $('#prev-slide').addEventListener('click', function () { prev(); restart(); });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // Keyboard
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft')  { prev(); restart(); }
  });

  // Touch swipe
  var touchX = 0;
  var touchY = 0;
  carousel.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
    stop();
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    // Horizontal intent only — don't hijack vertical page scrolling
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
    start();
  }, { passive: true });

  goTo(0);
  start();

  /* ---------------------------------------------------------------
     9. SERVICE CARD → prefill the contact form
     --------------------------------------------------------------- */
  var SERVICE_MAP = {
    art:      'Album Covers & Art',
    robotics: 'Robotics & Engineering',
    models:   '3D Models'
  };

  $$('.js-request').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var select = $('#service');
      var wanted = SERVICE_MAP[btn.dataset.service];

      if (select && wanted) {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].value === wanted) { select.selectedIndex = i; break; }
        }
      }

      document.getElementById('contact').scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      // Focus the first empty field once the scroll settles
      setTimeout(function () {
        var name = $('#name');
        if (name && !name.value) name.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 700);
    });
  });

  /* ---------------------------------------------------------------
     10. CONTACT FORM — Web3Forms, no backend
     --------------------------------------------------------------- */
  var form = $('#quote-form');
  var status = $('#form-status');
  var submitBtn = $('#submit-btn');
  var btnLabel = $('.btn-label', submitBtn);
  var PLACEHOLDER_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'form-status is-visible ' + (kind === 'ok' ? 'is-ok' : 'is-err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var key = form.elements.access_key.value.trim();
    if (!key || key === PLACEHOLDER_KEY) {
      setStatus(
        'Form not connected yet. Add your free Web3Forms access key to the ' +
        'access_key field in index.html — see README.md, step "Wire up the contact form".',
        'err'
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('is-sending');
    btnLabel.textContent = 'Sending…';
    status.className = 'form-status';

    var payload = Object.fromEntries(new FormData(form).entries());

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (result.ok && result.data.success) {
          setStatus('Request sent. I’ll get back to you within one business day.', 'ok');
          form.reset();
          form.classList.remove('was-validated');
        } else {
          setStatus(
            (result.data && result.data.message) ||
            'Something went wrong sending that. Please email me directly.',
            'err'
          );
        }
      })
      .catch(function () {
        setStatus('Network error — check your connection, or email me directly.', 'err');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-sending');
        btnLabel.textContent = 'Send request';
      });
  });

  /* ---------------------------------------------------------------
     11. MISC
     --------------------------------------------------------------- */
  $('#year').textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { onScroll(); }, { passive: true });
  onScroll();
})();
