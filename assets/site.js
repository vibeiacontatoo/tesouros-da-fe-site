/* Revelação discreta e CTA fixo no celular. Sem dependências; o conteúdo funciona sem este arquivo. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.rv, .hero .arco');
  if (!('IntersectionObserver' in window) || reduce) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  var fixo = document.getElementById('fixo');
  if (!fixo || !('IntersectionObserver' in window)) return;
  var ocultar = {};
  function atualiza() {
    var esconde = Object.keys(ocultar).some(function (k) { return ocultar[k]; });
    var passouHero = !ocultar.hero;
    var mostra = passouHero && !esconde;
    fixo.classList.toggle('on', mostra);
    fixo.setAttribute('aria-hidden', mostra ? 'false' : 'true');
    var a = fixo.querySelector('a');
    if (a) a.tabIndex = mostra ? 0 : -1;
  }
  [['hero', '#cta-hero'], ['oferta', '#comprar'], ['rodape', 'footer.site']].forEach(function (p) {
    var el = document.querySelector(p[1]);
    if (!el) return;
    new IntersectionObserver(function (l) { ocultar[p[0]] = l[0].isIntersecting; atualiza(); }).observe(el);
  });
})();
