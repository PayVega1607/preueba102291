// Normaliza textos que vienen de los datos:
//  - convierte secuencias "\n" escritas literalmente en saltos de línea reales,
//  - recorta espacios,
//  - devuelve null si queda vacío o es el texto "undefined" / "null".
// Los valores que no son texto (números, null) se devuelven tal cual.
export function limpiarTexto(valor, { multilinea = false } = {}) {
  if (typeof valor !== 'string') return valor ?? null;
  let t = valor.replace(/\\r\\n|\\n|\\r/g, '\n').replace(/\r\n?/g, '\n').trim();
  if (!multilinea) t = t.replace(/\s*\n\s*/g, ' ');
  return t === '' || t === 'undefined' || t === 'null' ? null : t;
}
