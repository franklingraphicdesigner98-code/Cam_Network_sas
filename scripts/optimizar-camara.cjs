// Genera las copias livianas (WebP) de los fotogramas de la cámara que gira en /servicios/camaras-de-seguridad.
//   Origen:  public/img/Rotacion/Camaras arregladas/  (PNG con fondo transparente)
//   Destino: public/img/Rotacion/webp/cam_izq_10.webp … cam_der_60.webp  (lo que carga CameraSweep.vue)
// Uso: node scripts/optimizar-camara.cjs
//
// Las fotos "Izquierda" (848 px de ancho) y "derecha" (815 px) no vienen del mismo tamaño ni con la cámara a
// la misma altura: aquí se ponen todas sobre un mismo lienzo y se alinean por el domo, para que no salte.
const sharp = require('sharp');
const path = require('path');

const ORIGEN = path.join(__dirname, '../public/img/Rotacion/Camaras arregladas');
const DESTINO = path.join(__dirname, '../public/img/Rotacion/webp');
const LIENZO = { width: 848, height: 1254 };   // tamaño común (el de las fotos "Izquierda")
const ANCHO_FINAL = 700;                       // ancho de las copias para la web

// archivo de origen → nombre del fotograma, y cómo moverlo para alinearlo (en px del lienzo)
const FOTOGRAMAS = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ archivo: `Camara Izquierda ${n}.png`, nombre: `cam_izq_${n * 10}`, x: 0, recorteArriba: 0 })),
  // las "derecha" están ~37 px más abajo y ~10 px más a la derecha que las "Izquierda"
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ archivo: `Camara derecha ${n}.png`, nombre: `cam_der_${n * 10}`, x: 6, recorteArriba: 37 }))
];

(async () => {
  for (const f of FOTOGRAMAS) {
    const origen = sharp(path.join(ORIGEN, f.archivo));
    const { width, height } = await origen.metadata();
    const recorte = await origen
      .extract({ left: 0, top: f.recorteArriba, width, height: height - f.recorteArriba })
      .png().toBuffer();
    const r = await sharp({ create: { ...LIENZO, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: recorte, left: f.x, top: 0 }])
      .png().toBuffer()
      .then((b) => sharp(b).resize({ width: ANCHO_FINAL }).webp({ quality: 85, alphaQuality: 90, effort: 6 })
        .toFile(path.join(DESTINO, `${f.nombre}.webp`)));
    console.log(`${f.archivo.padEnd(22)} → ${f.nombre}.webp  ${(r.size / 1024).toFixed(0)} KB`);
  }
})();
