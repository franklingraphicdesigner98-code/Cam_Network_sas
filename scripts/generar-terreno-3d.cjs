// Genera el modelo digital de terreno en malla alámbrica 3D (decorativo) que usan
// el mapa de Cobertura del inicio y el fondo de la página Cobertura.
// Uso: node scripts/generar-terreno-3d.cjs [seed ancho alto archivo]
//   sin argumentos → mapa del inicio:            11 1800 760 terreno-3d.webp
//   fondo de la página Cobertura:                 5 2400 760 terreno-3d-ancho.webp
const sharp = require('sharp');

const [SEED = 11, OUT_W = 1800, OUT_H = 760] = process.argv.slice(2, 5).map(Number);
const OUT_FILE = process.argv[5] || 'terreno-3d.webp';
const COLS = 200, ROWS = 140;             // resolución de la malla
const X_HALF = 16 * (OUT_W / OUT_H) / (1800 / 760), Z_NEAR = 1.4, Z_FAR = 26;
const CAM_H = 2.1, FOCAL = 980, HORIZON = OUT_H * 0.16;

// ---------- Ruido de valor + fBm ----------
let s = SEED * 9973;
const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
const P = 256, perm = Array.from({ length: P }, () => rnd());
const hash = (i, j) => perm[(((i * 73856093) ^ (j * 19349663)) >>> 0) % P];
const smooth = t => t * t * (3 - 2 * t);
function noise(x, y) {
  const i = Math.floor(x), j = Math.floor(y), fx = smooth(x - i), fy = smooth(y - j);
  const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function fbm(x, y, oct = 5) {
  let v = 0, amp = 0.5, f = 1;
  for (let o = 0; o < oct; o++) { v += amp * noise(x * f, y * f); f *= 2.03; amp *= 0.5; }
  return v;
}
const ridged = (x, y) => { let v = 0, amp = .5, f = 1; for (let o = 0; o < 5; o++) { v += amp * (1 - Math.abs(noise(x * f, y * f) * 2 - 1)) ** 2; f *= 2.1; amp *= .5; } return v; };

// Altura: lomas suaves al frente, cordilleras más altas y quebradas al fondo
function height(x, z) {
  const depth = (z - Z_NEAR) / (Z_FAR - Z_NEAR);              // 0 cerca → 1 lejos
  const hills = (fbm(x * .26 + 3, z * .26) - .45) * 3.2;
  const mountains = ridged(x * .16 + 10, z * .16 + 4) * (1.2 + 2.6 * depth);
  const leftBias = 0.6 + 0.5 * smooth(Math.min(1, Math.max(0, (-x / X_HALF + 1) / 2)));
  return Math.max(-0.4, hills * 0.9 + mountains * leftBias * (0.35 + depth));
}

// ---------- Malla proyectada ----------
const grid = [];
for (let r = 0; r < ROWS; r++) {
  const z = Z_NEAR + (Z_FAR - Z_NEAR) * Math.pow(r / (ROWS - 1), 1.35);   // más filas cerca
  grid[r] = [];
  for (let c = 0; c < COLS; c++) {
    const x = -X_HALF + (2 * X_HALF) * c / (COLS - 1);
    const y = height(x, z);
    grid[r][c] = { X: OUT_W / 2 + FOCAL * x / z, Y: HORIZON + FOCAL * (CAM_H + 2.2 - y) / z, y, z };
  }
}

// Pintor: de atrás hacia adelante; cada celda se rellena (oculta lo de atrás) y se traza
const quads = [];
for (let r = ROWS - 2; r >= 0; r--) {
  for (let c = 0; c < COLS - 1; c++) {
    const a = grid[r][c], b = grid[r][c + 1], d = grid[r + 1][c + 1], e = grid[r + 1][c];
    const xs = [a.X, b.X, d.X, e.X], ys = [a.Y, b.Y, d.Y, e.Y];
    if (Math.max(...xs) < 0 || Math.min(...xs) > OUT_W || Math.min(...ys) > OUT_H) continue;
    const depth = (a.z - Z_NEAR) / (Z_FAR - Z_NEAR);
    // sombreado suave según pendiente (luz desde la izquierda)
    const slope = (b.y - a.y) * 0.9 + (a.y - e.y) * 0.5;
    const shade = Math.max(0, Math.min(1, 0.5 - slope * 0.6));
    const fill = `rgb(${Math.round(250 - 14 * shade)},${Math.round(252 - 8 * shade)},${Math.round(250 - 12 * shade)})`;
    const alpha = (0.85 - depth * 0.55).toFixed(2);                       // se desvanece a lo lejos
    const width = (1.1 - depth * 0.65).toFixed(2);
    quads.push(`<path d="M${a.X.toFixed(1)} ${a.Y.toFixed(1)}L${b.X.toFixed(1)} ${b.Y.toFixed(1)}L${d.X.toFixed(1)} ${d.Y.toFixed(1)}L${e.X.toFixed(1)} ${e.Y.toFixed(1)}Z" fill="${fill}" stroke="rgba(21,128,61,${alpha})" stroke-width="${width}"/>`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OUT_W}" height="${OUT_H}" viewBox="0 0 ${OUT_W} ${OUT_H}"><g stroke-linejoin="round">${quads.join('')}</g></svg>`;
sharp(Buffer.from(svg)).webp({ quality: 74, alphaQuality: 80, effort: 6 })
  .toFile('public/img/' + OUT_FILE)
  .then(i => console.log(OUT_FILE, i.width + 'x' + i.height, Math.round(i.size / 1024) + ' KB'));
