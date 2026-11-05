// Rejilla de canales de TV (página /servicios/television, componente ServicioTV.vue).
// Solo número y nombre de cada canal, por categoría. Para agregar o quitar un canal, edita esta lista.
//   OJO: no mencionar al proveedor de la señal.
//   Tercer valor "true" → nombre leído de un logo poco legible en la imagen de origen: confírmalo.
const lista = [
  { key: 'nacionales', canales: [
    [1, 'Canal TRO'], [2, 'Canal Institucional', true], [3, 'Caracol'], [4, 'Canal 1'], [5, 'RCN'],
    [6, 'Canal Institucional TV', true], [7, 'Canal Congreso', true], [9, 'Citytv'], [10, 'Señal Colombia'],
    [11, 'Canal Trece'], [92, 'Telecaribe'], [93, 'Telepacífico'], [94, 'Zoom'], [95, 'Canal Capital'],
    [96, 'Teleantioquia'], [97, 'Teleislas', true]
  ] },
  { key: 'deportes', canales: [
    [26, 'ESPN'], [27, 'ESPN 2'], [28, 'ESPN 3'], [29, 'ESPN 4'], [30, 'ESPN 5'], [31, 'ESPN 6'], [32, 'ESPN 7'], [33, 'Win Sports']
  ] },
  { key: 'peliculas', canales: [
    [45, 'HGTV'], [49, 'Sony Series', true], [50, 'Food Network'], [51, 'TLC'], [52, 'Atreseries', true], [53, 'H&H'],
    [54, 'E!'], [55, 'TCM'], [56, 'Lifetime'], [58, 'Cinecanal'], [59, 'Star Channel'], [60, 'FX'],
    [61, 'Sony Channel'], [62, 'Sony Movies'], [63, 'TNT Series'], [64, 'Universal TV'], [65, 'USA Network', true],
    [66, 'A&E'], [67, 'AXN'], [68, 'Warner Channel'], [69, 'Cinemax'], [70, 'TNT'], [71, 'Space'],
    [72, 'FMH Movies'], [73, 'De Película'], [74, 'Cine Latino', true], [75, 'Golden'], [76, 'Golden Edge'],
    [77, 'Studio Universal']
  ] },
  { key: 'cultura', canales: [
    [34, 'Discovery Theater', true], [35, 'Animal Planet'], [36, 'National Geographic'], [37, 'Discovery Channel'],
    [38, 'History'], [39, 'H2'], [40, 'Discovery Science'], [41, 'Discovery Turbo'], [43, 'Investigation Discovery'],
    [46, 'Planeta Salvaje', true], [47, 'Discovery A Fondo', true], [48, 'Universal Crime']
  ] },
  { key: 'infantiles', canales: [
    [12, 'Discovery Familia', true], [13, 'NatGeo Kids', true], [14, 'Disney Junior'], [15, 'Discovery Kids'],
    [16, 'Cartoonito'], [17, 'Baby TV'], [18, 'BitMe'], [19, 'Tooncast'], [20, 'Disney Channel'],
    [21, 'Cartoon Network'], [22, 'Adult Swim'], [23, 'Max Anime', true], [25, 'DreamWorks']
  ] },
  { key: 'noticias', canales: [[8, 'CNN'], [42, 'RT'], [44, 'DW']] },
  { key: 'comedia', canales: [[57, 'Universal Comedy'], [78, 'Distrito Comedia']] },
  { key: 'telenovelas', canales: [[79, 'Telemundo'], [80, 'Las Estrellas'], [81, 'Tlnovelas'], [82, 'TNT Novelas'], [83, 'Univision']] },
  { key: 'musica', canales: [
    [84, 'Telehit Música'], [85, 'Telehit'], [86, 'Bandamax'], [87, 'Ritmoson', true], [88, 'Kalle'],
    [89, 'Música 1', true], [90, 'Música 2', true], [91, 'Ulram TV', true]
  ] },
  { key: 'religiosos', canales: [
    [98, 'Tele VID'], [99, 'Teleamiga'], [100, 'EWTN'], [101, '3ABN'], [102, 'Enlace'], [103, 'EJTV'],
    [104, 'Canal religioso', true], [105, 'Cristovisión'], [106, 'Avivamiento'], [107, 'Bethel'], [108, 'TV Familia', true]
  ] },
  { key: 'gamers', canales: [[24, 'Esports Max']] }
];

export const categoriasTV = lista.map((c) => ({
  key: c.key,
  canales: c.canales.map(([numero, nombre, revisar]) => ({ numero, nombre, revisar: !!revisar }))
}));

export const totalCanales = categoriasTV.reduce((n, c) => n + c.canales.length, 0);
