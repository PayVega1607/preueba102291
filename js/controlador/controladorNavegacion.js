import { pintarVista } from './controladorCatalogo.js';
import { pintarDetalle, pintarNoEncontrado } from '../vista/vistaDetalle.js';

const RUTAS = ['inicio', 'destacados', 'hombre', 'dama', 'catalogo', 'contacto', 'detalle'];
const TITULO = 'Herrera Perfumes — Colección Exclusiva';

export function iniciarNavegacion(catalogo) {
  const main = document.getElementById('vista');
  const menu = document.getElementById('menu');
  const botonMenu = document.getElementById('btn-menu');

  async function mostrar() {
    // "#/detalle/<id>" → ruta "detalle", id "<id>"
    const [base, ...resto] = location.hash.replace('#/', '').split('/');
    let ruta = RUTAS.includes(base) ? base : 'inicio';
    let id = '';
    if (ruta === 'detalle') {
      try { id = decodeURIComponent(resto.join('/')); } catch { id = ''; }
    }
    try {
      const resp = await fetch(`vistas/${ruta}.html`);
      if (!resp.ok) throw new Error(resp.status);
      main.innerHTML = await resp.text(); // HTML propio del proyecto (carpeta vistas/)
    } catch {
      main.textContent = 'No se pudo cargar la sección. Abre el sitio con un servidor local (ver README).';
      return;
    }
    document.title = TITULO;
    if (ruta === 'detalle') {
      const perfume = catalogo.porId(id);
      if (perfume) {
        pintarDetalle(main, perfume);
        document.title = `${perfume.nombre} — Herrera Perfumes`;
      } else {
        pintarNoEncontrado(main);
      }
    } else {
      pintarVista(main, catalogo);
    }
    // La ficha pertenece al catálogo: se mantiene resaltado ese enlace del menú.
    const activa = ruta === 'detalle' ? 'catalogo' : ruta;
    menu.querySelectorAll('a').forEach((a) => a.classList.toggle('activo', a.dataset.ruta === activa));
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
  }

  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });
  window.addEventListener('hashchange', mostrar);
  return mostrar();
}
