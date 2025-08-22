document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Hero background crossfade every 10s
  var heroBgs = Array.prototype.slice.call(document.querySelectorAll('.hero-bg'));
  if (heroBgs.length > 1) {
    var activeIdx = heroBgs.findIndex(function (el) { return el.classList.contains('is-active'); });
    if (activeIdx < 0) activeIdx = 0;
    setInterval(function () {
      var current = heroBgs[activeIdx];
      var nextIdx = (activeIdx + 1) % heroBgs.length;
      var next = heroBgs[nextIdx];
      if (current) current.classList.remove('is-active');
      if (next) next.classList.add('is-active');
      activeIdx = nextIdx;
    }, 10000);
  }

  // Simple slider for Recent Projects
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dotsWrap = slider.querySelector('.slider-dots');
    var prevBtn = document.querySelector('.projects .slider-ctrl.prev');
    var nextBtn = document.querySelector('.projects .slider-ctrl.next');
    var idx = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
    if (idx < 0) idx = 0;

    function setActive(newIdx) {
      slides[idx].classList.remove('is-active');
      idx = (newIdx + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      dotsWrap.querySelectorAll('button').forEach(function (b, i) {
        b.setAttribute('aria-selected', String(i === idx));
      });
    }

    // Dots
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.setAttribute('aria-selected', String(i === idx));
      b.addEventListener('click', function () { setActive(i); });
      dotsWrap.appendChild(b);
    });

    // Controls
    if (prevBtn) prevBtn.addEventListener('click', function () { setActive(idx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { setActive(idx + 1); });

    // Autoplay
    var intervalMs = Number(slider.getAttribute('data-interval') || '6000');
    var autoplay = slider.getAttribute('data-autoplay') === 'true';
    if (autoplay) {
      setInterval(function () { setActive(idx + 1); }, intervalMs);
    }
  }

  // FAQ Accordion functionality
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function () {
      var isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').hidden = true;
        }
      });
      
      // Toggle current item
      if (isExpanded) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
});


