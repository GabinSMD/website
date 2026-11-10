// Thème clair ou sombre : suit le système par défaut, mémorise le choix du visiteur.
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* stockage indisponible */ }
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  root.classList.add('js');

  function current() {
    return root.dataset.theme ||
      (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function label(button) {
    button.setAttribute('aria-label', current() === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    label(button);
    button.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
      label(button);
    });
  });
})();
