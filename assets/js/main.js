/* brainstable.github.io — небольшие улучшения, без зависимостей */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Тень у шапки при прокрутке ---------------------------------------- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Появление блоков при прокрутке ------------------------------------ */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* Подсветка текущего раздела в навигации ---------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length === links.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* Переключение темы -------------------------------------------------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  var setTheme = function (theme, persist) {
    root.dataset.theme = theme;

    if (toggle) {
      var light = theme === 'light';
      toggle.setAttribute('aria-pressed', String(light));
      toggle.setAttribute('aria-label', light ? 'Включить тёмную тему' : 'Включить светлую тему');
      toggle.title = light ? 'Тёмная тема' : 'Светлая тема';
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8fb' : '#0a0e13');

    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* приватный режим */ }
    }
  };

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
    });
  }

  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);

  /* Год в подвале ------------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll('.js-year'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
