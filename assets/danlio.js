/* DANLIO Garage Door Repair — shared behaviours */
(function () {
  'use strict';

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // FAQ accordion — one open at a time
  var items = document.querySelectorAll('details.q');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) { return; }
      items.forEach(function (o) { if (o !== d) { o.open = false; } });
    });
  });

  // Lead form
  // NOTE FOR DEV: this is a front-end confirmation only. On the live WordPress
  // site, wire this form to the existing Elementor Pro form action so that
  // submissions reach the same inbox as the homepage form.
  var form = document.getElementById('leadform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      btn.textContent = 'Thank you — we will call you shortly';
      btn.style.background = '#1E9E55';
      btn.disabled = true;
    });
  }
})();

/* Styled dropdown ---------------------------------------------------------
   Wraps every <select> in a themed list. The native element stays in the DOM
   and keeps its value, so the form still submits normally and keyboard and
   screen-reader users get the real control. */
(function () {
  'use strict';
  document.querySelectorAll('select').forEach(function (sel) {
    if (sel.closest('.selectwrap')) { return; }

    var wrap = document.createElement('div');
    wrap.className = 'selectwrap';
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    if (sel.id) { btn.setAttribute('aria-labelledby', sel.id + '-label'); }

    var list = document.createElement('ul');
    list.className = 'sel-list';
    list.setAttribute('role', 'listbox');

    var label = document.createElement('span');
    label.textContent = sel.options[sel.selectedIndex].text;
    btn.appendChild(label);

    Array.prototype.forEach.call(sel.options, function (opt, i) {
      var li = document.createElement('li');
      li.textContent = opt.text;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === sel.selectedIndex));
      li.addEventListener('click', function () {
        sel.selectedIndex = i;
        label.textContent = opt.text;
        list.querySelectorAll('li').forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
        li.setAttribute('aria-selected', 'true');
        close();
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      });
      list.appendChild(li);
    });

    wrap.appendChild(btn);
    wrap.appendChild(list);

    function open() { wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.contains('open') ? close() : open();
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) { close(); }
    });
  });
})();

/* Review carousel --------------------------------------------------------- */
(function () {
  'use strict';
  document.querySelectorAll('.revcar').forEach(function (car) {
    var track = car.querySelector('.revtrack');
    var prev = car.parentElement.querySelector('.revnav .prev');
    var next = car.parentElement.querySelector('.revnav .next');
    if (!track || !prev || !next) { return; }

    function step() {
      var card = track.querySelector('.reviewcard');
      if (!card) { return 320; }
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      return card.getBoundingClientRect().width + gap;
    }
    function sync() {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', sync);
    window.addEventListener('resize', sync);
    sync();
  });
})();

/* Review "see more" toggles ------------------------------------------------
   Only shown on cards whose text is actually clamped. */
(function () {
  'use strict';
  document.querySelectorAll('.reviewcard').forEach(function (card) {
    var p = card.querySelector('p');
    if (!p || p.scrollHeight <= p.clientHeight + 2) { return; }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'seemore';
    btn.textContent = 'see more';
    btn.addEventListener('click', function () {
      var open = card.classList.toggle('open');
      btn.textContent = open ? 'see less' : 'see more';
    });
    p.insertAdjacentElement('afterend', btn);
  });
})();
