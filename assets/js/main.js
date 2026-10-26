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

  /* Карусели скриншотов ----------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (root) {
    var viewport = root.querySelector('.carousel__viewport');
    if (!viewport) return;

    var items = viewport.children;
    var counter = root.querySelector('.carousel__count');
    var prevBtn = root.querySelector('.carousel__btn--prev');
    var nextBtn = root.querySelector('.carousel__btn--next');

    if (items.length < 2) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      return;
    }

    var current = function () {
      return Math.max(0, Math.min(items.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
    };

    var update = function () {
      if (counter) counter.textContent = (current() + 1) + ' / ' + items.length;
    };

    var go = function (delta) {
      viewport.scrollBy({ left: delta * viewport.clientWidth, behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    viewport.addEventListener('scroll', update, { passive: true });
    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    });
    window.addEventListener('resize', update);

    update();
  });

  /* Поиск по каталогу программ ----------------------------------------- */
  var programFilter = document.getElementById('progFilter');
  if (programFilter) {
    var progCount = document.getElementById('progCount');
    var progs = Array.prototype.slice.call(document.querySelectorAll('.prog'));
    var progGroups = Array.prototype.slice.call(document.querySelectorAll('[data-group]'));

    var applyFilter = function () {
      var query = programFilter.value.trim().toLowerCase();
      var shown = 0;

      progs.forEach(function (item) {
        var hit = !query || (item.getAttribute('data-search') || '').indexOf(query) !== -1;
        item.classList.toggle('is-hidden', !hit);
        if (hit) shown++;
      });

      progGroups.forEach(function (group) {
        var visible = group.querySelectorAll('.prog:not(.is-hidden)').length > 0;
        group.classList.toggle('is-empty', !visible);
      });

      if (progCount) {
        progCount.textContent = query
          ? 'найдено ' + shown + ' из ' + progs.length
          : progs.length + ' программ';
      }
    };

    programFilter.addEventListener('input', applyFilter);
    applyFilter();
  }

  /* Год в подвале ------------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll('.js-year'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
