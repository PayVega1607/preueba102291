import { formatoPrecio } from '../utilidades/formatoPrecio.js';

// Clona la plantilla HTML #tpl-tarjeta por cada perfume y rellena sus datos.
export function pintarTarjetas(contenedor, perfumes) {
  const plantilla = document.getElementById('tpl-tarjeta');
  const frag = document.createDocumentFragment();
  for (const p of perfumes) {
    const t = plantilla.content.cloneNode(true);
    const img = t.querySelector('img');
    img.src = p.imagen;
    img.alt = p.nombre;
    t.querySelector('.tarjeta-nombre a').textContent = p.nombre;
    // Foto, nombre y "Ver detalles" llevan a la ficha del mismo perfume.
    t.querySelectorAll('a[data-detalle]').forEach((a) => {
      a.href = `#/detalle/${encodeURIComponent(p.id)}`;
    });
    t.querySelector('.tarjeta-ver').setAttribute('aria-label', `Ver detalles de ${p.nombre}`);
    const precio = t.querySelector('.tarjeta-precio');
    precio.textContent = formatoPrecio(p.precio);
    precio.classList.toggle('consultar', !p.tienePrecio);
    t.querySelector('button').dataset.id = p.id;
    frag.append(t);
  }
  contenedor.replaceChildren(frag);
}
