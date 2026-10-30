(function () {
  // Efecto de escritura en el terminal (se muestra completo si se prefiere menos movimiento)
  var el = document.getElementById('term');
  var lines = JSON.parse(el.getAttribute('data-lines'));
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) { el.textContent = lines.join('\n'); }
  else {
    var out = '', l = 0, c = 0;
    (function type() {
      if (l >= lines.length) return;
      var cmd = lines[l].charAt(0) === '$';
      if (c < lines[l].length) { out += lines[l].charAt(c++); el.textContent = out; setTimeout(type, cmd ? 70 : 25); }
      else { out += '\n'; l++; c = 0; setTimeout(type, cmd ? 350 : 500); }
    })();
  }
  // Formulario: abre el correo del visitante con el mensaje preparado
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, body = f.mensaje.value + '\n\n' + f.nombre.value + ' (' + f.email.value + ')';
    window.location.href = 'mailto:camil.curro@salesianaslpsjb.es?subject=' +
      encodeURIComponent('Mensaje desde tu portfolio') + '&body=' + encodeURIComponent(body);
    document.getElementById('msg').textContent = 'Se ha abierto tu programa de correo para enviar el mensaje.';
  });
})();
