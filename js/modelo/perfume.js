import { limpiarTexto } from '../utilidades/limpiarTexto.js';

// Campos que el catálogo ya usaba + campos opcionales para la ficha de detalle.
// Los opcionales solo se muestran si el JSON los trae; si no, quedan en null.
export class Perfume {
  constructor({ id, nombre, categoria, precio, imagen, marca, descripcion, familia, existencias }) {
    Object.assign(this, {
      id, precio, imagen,
      nombre: limpiarTexto(nombre),
      categoria: limpiarTexto(categoria),
      marca: limpiarTexto(marca),
      descripcion: limpiarTexto(descripcion, { multilinea: true }),
      familia: limpiarTexto(familia),
      existencias: existencias ?? null,
    });
  }
  get tienePrecio() { return this.precio != null; }
}
