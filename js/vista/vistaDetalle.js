import { formatoPrecio } from '../utilidades/formatoPrecio.js';

const ETIQUETA_CATEGORIA = { hombre: 'Hombre', dama: 'Dama' };

// Rellena la ficha (vistas/detalle.html) con los datos de UN perfume.
export function pintarDetalle(contenedor, p) {
  const img = contenedor.querySelector('.detalle-img');
  img.src = p.imagen;
  img.alt = p.nombre ?? '';
  contenedor.querySelector('.detalle-nombre').textContent = p.nombre ?? '';

  const marca = contenedor.querySelector('.detalle-marca');
  marca.textContent = p.marca ?? '';
  marca.hidden = !p.marca;

  const precio = contenedor.querySelector('.detalle-precio');
  precio.textContent = formatoPrecio(p.precio);
  precio.classList.toggle('consultar', !p.tienePrecio);

  const desc = contenedor.querySelector('.detalle-desc');
  desc.textContent = p.descripcion ?? '';
  desc.hidden = !p.descripcion;

  // Solo se crean los bloques cuyos datos existen de verdad.
  const atributos = [['Categoría', ETIQUETA_CATEGORIA[p.categoria] ?? p.categoria]];
  if (p.familia) atributos.push(['Familia aromática', p.familia]);
  if (typeof p.existencias === 'number') {
    atributos.push(['Disponibilidad', p.existencias > 0 ? 'Disponible' : 'Agotado']);
    atributos.push(['Existencias', String(p.existencias)]);
  }
  const lista = contenedor.querySelector('.detalle-atributos');
  lista.replaceChildren(...atributos.filter(([, v]) => v).map(([k, v]) => {
    const d = document.createElement('div');
    d.className = 'atributo';
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    d.append(dt, dd);
    return d;
  }));

  // data-id: el oyente de controladorCarrito.js ya añade al carrito con este atributo.
  const boton = contenedor.querySelector('.detalle-acciones button');
  boton.dataset.id = p.id;
  boton.addEventListener('click', () => {
    boton.textContent = 'Añadido ✓';
    setTimeout(() => { boton.textContent = 'Añadir al carrito'; }, 1400);
  });
}

export function pintarNoEncontrado(contenedor) {
  contenedor.innerHTML = '<section class="seccion aviso"><h2>Perfume no encontrado</h2><p>No existe un perfume con ese identificador.</p><a class="btn btn-lleno" href="#/catalogo">Volver al catálogo</a></section>';
}
