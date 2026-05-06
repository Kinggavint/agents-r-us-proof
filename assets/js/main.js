// Agents R Us — small interactivity bundle

(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // No-backend forms — just confirm
  var forms = document.querySelectorAll('form[data-noop]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('is-success');
      // hide inputs visually if needed
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sent'; }
      var msg = form.querySelector('.form-msg');
      if (msg) msg.focus && msg.focus();
    });
  });

  // Reveal on scroll. Default-visible CSS ensures no content is ever stuck hidden.
  // When JS + IntersectionObserver are available, we add a subtle entrance animation
  // for elements that scroll into view; everything not yet observed shows immediately.
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  // Mark anything already on screen as visible immediately, observe the rest.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
  reveals.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight + 60)) {
      // already on screen — leave visible (no animation)
      return;
    }
    el.classList.add('pre-reveal');
    io.observe(el);
  });
  // Safety fallback: after 4s, ensure any remaining off-screen elements are visible if user hasn't scrolled.
  setTimeout(function () {
    document.querySelectorAll('.reveal.pre-reveal:not(.is-visible)').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 4000);
})();
