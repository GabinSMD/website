// Thème clair ou sombre : suit le système par défaut, mémorise le choix du visiteur.
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  var COLORS = { light: '#ffffff', dark: '#070d1c' };
  var query = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* stockage indisponible */ }
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  root.classList.add('js');

  function current() {
    return root.dataset.theme || (query && query.matches ? 'dark' : 'light');
  }
  // La couleur de la barre du navigateur suit le thème choisi, pas seulement le système.
  function syncBar() {
    if (!root.dataset.theme) return;
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', COLORS[root.dataset.theme]);
  }
  function label(button) {
    button.setAttribute('aria-label', current() === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
  }
  syncBar();

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    label(button);
    button.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
      syncBar();
      label(button);
    });
    if (query && query.addEventListener) query.addEventListener('change', function () { label(button); });
  });
})();
