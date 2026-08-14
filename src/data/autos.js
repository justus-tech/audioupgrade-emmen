/**
 * ALLE AUTO'S DIE DE KENTEKEN-CHECK HERKENT.
 *
 * Dit is bewust alleen DATA: naam, matchpatroon en een fotoplek. De teksten
 * op de upgradepagina zijn voor elke auto hetzelfde (src/data/generiek.js) —
 * alleen de naam en de foto wisselen. Daarom kunnen hier veel auto's in staan
 * zonder dat we honderden pagina's met dunne tekst maken.
 *
 * VOLGORDE TELT. De eerste match wint, dus specifieke modellen staan bóven
 * algemene: "Range Rover Sport" vóór "Range Rover", anders vangt de laatste
 * de eerste weg.
 *
 * MATCHERS draaien op de genormaliseerde handelsbenaming (zie src/lib/match.js):
 * hoofdletters, leestekens vervangen door spaties, merk vooraan eraf. Dus:
 *   "T-ROC"     wordt  "T ROC"     -> patroon /^T ROC\b/
 *   "C-KLASSE"  wordt  "C KLASSE"  -> patroon /^C KLASSE\b/
 *   "UP!"       wordt  "UP"        -> patroon /^UP\b/
 * Gebruik geen \b direct achter cijfers: in "320I" zit geen woordgrens tussen
 * de 0 en de I. Gebruik daar een lookahead: /^3\d{2}(?!\d)/
 *
 * `foto` verwijst naar een bestand in /public/autos/. Staat er niets, dan
 * toont de site een nette naamweergave in plaats van een gebroken plaatje.
 * Vul dit met EIGEN werkfoto's — foto's van internet zijn auteursrechtelijk
 * beschermd en horen niet op een commerciële site.
 */

import { modelPerSlug } from './models.js';

export const AUTOS = [
  // ============================================================
  // NEDERLANDSE VOLUMEAUTO'S — hier rijdt Drenthe in rond.
  // Aantallen: RDW-registraties personenauto's, aug 2026.
  // ============================================================
  { slug: 'volkswagen-polo', merk: 'Volkswagen', model: 'Polo', nl: 290390, matchers: { merk: 'VOLKSWAGEN', model: /^POLO\b/ }, foto: null },
  { slug: 'volkswagen-golf', merk: 'Volkswagen', model: 'Golf', nl: 262679, matchers: { merk: 'VOLKSWAGEN', model: /^GOLF\b/ }, foto: null },
  { slug: 'kia-picanto', merk: 'Kia', model: 'Picanto', nl: 168936, matchers: { merk: 'KIA', model: /^PICANTO\b/ }, foto: null },
  { slug: 'ford-fiesta', merk: 'Ford', model: 'Fiesta', nl: 167786, matchers: { merk: 'FORD', model: /^FIESTA\b/ }, foto: null },
  { slug: 'toyota-aygo', merk: 'Toyota', model: 'Aygo', nl: 160942, matchers: { merk: 'TOYOTA', model: /^AYGO\b/ }, foto: null },
  { slug: 'renault-clio', merk: 'Renault', model: 'Clio', nl: 156379, matchers: { merk: 'RENAULT', model: /^CLIO\b/ }, foto: null },
  { slug: 'ford-focus', merk: 'Ford', model: 'Focus', nl: 152351, matchers: { merk: 'FORD', model: /^FOCUS\b/ }, foto: null },
  { slug: 'toyota-yaris', merk: 'Toyota', model: 'Yaris', nl: 137681, matchers: { merk: 'TOYOTA', model: /^YARIS\b/ }, foto: null },
  { slug: 'opel-corsa', merk: 'Opel', model: 'Corsa', nl: 125706, matchers: { merk: 'OPEL', model: /^CORSA\b/ }, foto: null },
  { slug: 'peugeot-208', merk: 'Peugeot', model: '208', nl: 112708, matchers: { merk: 'PEUGEOT', model: /^208\b/ }, foto: null },
  { slug: 'fiat-500', merk: 'Fiat', model: '500', nl: 110353, matchers: { merk: 'FIAT', model: /^500\b/ }, foto: null },
  { slug: 'nissan-qashqai', merk: 'Nissan', model: 'Qashqai', nl: 107083, matchers: { merk: 'NISSAN', model: /^QASHQAI\b/ }, foto: null },
  { slug: 'renault-twingo', merk: 'Renault', model: 'Twingo', nl: 103829, matchers: { merk: 'RENAULT', model: /^TWINGO\b/ }, foto: null },
  { slug: 'peugeot-107', merk: 'Peugeot', model: '107', nl: 102085, matchers: { merk: 'PEUGEOT', model: /^107\b/ }, foto: null },
  { slug: 'renault-captur', merk: 'Renault', model: 'Captur', nl: 97043, matchers: { merk: 'RENAULT', model: /^CAPTUR\b/ }, foto: null },
  { slug: 'suzuki-swift', merk: 'Suzuki', model: 'Swift', nl: 92477, matchers: { merk: 'SUZUKI', model: /^SWIFT\b/ }, foto: null },
  { slug: 'volkswagen-tiguan', merk: 'Volkswagen', model: 'Tiguan', nl: 91652, matchers: { merk: 'VOLKSWAGEN', model: /^TIGUAN\b/ }, foto: null },
  { slug: 'citroen-c1', merk: 'Citroën', model: 'C1', nl: 90109, matchers: { merk: 'CITROEN', model: /^C1\b/ }, foto: null },
  { slug: 'kia-niro', merk: 'Kia', model: 'Niro', nl: 88123, matchers: { merk: 'KIA', model: /^NIRO\b/ }, foto: null },
  { slug: 'peugeot-2008', merk: 'Peugeot', model: '2008', nl: 77283, matchers: { merk: 'PEUGEOT', model: /^2008\b/ }, foto: null },
  { slug: 'citroen-c3', merk: 'Citroën', model: 'C3', nl: 76379, matchers: { merk: 'CITROEN', model: /^C3\b/ }, foto: null },
  { slug: 'seat-ibiza', merk: 'Seat', model: 'Ibiza', nl: 72132, matchers: { merk: 'SEAT', model: /^IBIZA\b/ }, foto: null },
  { slug: 'skoda-octavia', merk: 'Škoda', model: 'Octavia', nl: 70815, matchers: { merk: 'SKODA', model: /^OCTAVIA\b/ }, foto: null },
  { slug: 'volvo-xc40', merk: 'Volvo', model: 'XC40', nl: 67407, matchers: { merk: 'VOLVO', model: /^XC40\b/ }, foto: null },
  { slug: 'tesla-model-3', merk: 'Tesla', model: 'Model 3', nl: 66234, matchers: { merk: 'TESLA', model: /^MODEL ?3\b/ }, foto: null },
  { slug: 'volkswagen-up', merk: 'Volkswagen', model: 'Up!', nl: 65229, matchers: { merk: 'VOLKSWAGEN', model: /^UP\b/ }, foto: null },
  { slug: 'skoda-fabia', merk: 'Škoda', model: 'Fabia', nl: 63568, matchers: { merk: 'SKODA', model: /^FABIA\b/ }, foto: null },
  { slug: 'peugeot-308', merk: 'Peugeot', model: '308', nl: 62677, matchers: { merk: 'PEUGEOT', model: /^308\b/ }, foto: null },
  { slug: 'volkswagen-passat', merk: 'Volkswagen', model: 'Passat', nl: 59326, matchers: { merk: 'VOLKSWAGEN', model: /^PASSAT\b/ }, foto: null },
  { slug: 'toyota-corolla', merk: 'Toyota', model: 'Corolla', nl: 58685, matchers: { merk: 'TOYOTA', model: /^COROLLA\b/ }, foto: null },
  { slug: 'renault-megane', merk: 'Renault', model: 'Mégane', nl: 58683, matchers: { merk: 'RENAULT', model: /^MEGANE\b/ }, foto: null },
  { slug: 'hyundai-i10', merk: 'Hyundai', model: 'i10', nl: 57894, matchers: { merk: 'HYUNDAI', model: /^I10\b/ }, foto: null },
  { slug: 'fiat-panda', merk: 'Fiat', model: 'Panda', nl: 57613, matchers: { merk: 'FIAT', model: /^PANDA\b/ }, foto: null },
  { slug: 'toyota-auris', merk: 'Toyota', model: 'Auris', nl: 57443, matchers: { merk: 'TOYOTA', model: /^AURIS\b/ }, foto: null },
  { slug: 'volkswagen-t-roc', merk: 'Volkswagen', model: 'T-Roc', nl: 56363, matchers: { merk: 'VOLKSWAGEN', model: /^T ROC\b/ }, foto: null },
  { slug: 'tesla-model-y', merk: 'Tesla', model: 'Model Y', nl: 55796, matchers: { merk: 'TESLA', model: /^MODEL ?Y\b/ }, foto: null },
  { slug: 'volvo-xc60', merk: 'Volvo', model: 'XC60', nl: 55116, matchers: { merk: 'VOLVO', model: /^XC60\b/ }, foto: null },
  { slug: 'volvo-v60', merk: 'Volvo', model: 'V60', nl: 42992, matchers: { merk: 'VOLVO', model: /^V60\b/ }, foto: null },
  { slug: 'kia-sportage', merk: 'Kia', model: 'Sportage', nl: 51738, matchers: { merk: 'KIA', model: /^SPORTAGE\b/ }, foto: null },
  { slug: 'ford-ka', merk: 'Ford', model: 'Ka', nl: 52289, matchers: { merk: 'FORD', model: /^KA\b/ }, foto: null },
  { slug: 'volkswagen-transporter', merk: 'Volkswagen', model: 'Transporter', nl: 83564, matchers: { merk: 'VOLKSWAGEN', model: /^(TRANSPORTER|CARAVELLE|MULTIVAN)\b/ }, foto: null },
  { slug: 'volkswagen-arteon', merk: 'Volkswagen', model: 'Arteon', matchers: { merk: 'VOLKSWAGEN', model: /^ARTEON\b/ }, foto: null },

  // ============================================================
  // PREMIUM — de modellen die Gray Audio dekt.
  // ============================================================

  // ---- Audi (specifiek vóór algemeen niet nodig, patronen sluiten elkaar uit)
  { slug: 'audi-a1', merk: 'Audi', model: 'A1', matchers: { merk: 'AUDI', model: /^A1\b/ }, foto: null },
  { slug: 'audi-a3', merk: 'Audi', model: 'A3', matchers: { merk: 'AUDI', model: /^A3\b/ }, foto: null },
  { slug: 'audi-a4', merk: 'Audi', model: 'A4', matchers: { merk: 'AUDI', model: /^A4\b/ }, foto: null },
  { slug: 'audi-a5', merk: 'Audi', model: 'A5', matchers: { merk: 'AUDI', model: /^A5\b/ }, foto: null },
  { slug: 'audi-a6', merk: 'Audi', model: 'A6', matchers: { merk: 'AUDI', model: /^A6\b/ }, foto: null },
  { slug: 'audi-a7', merk: 'Audi', model: 'A7', matchers: { merk: 'AUDI', model: /^A7\b/ }, foto: null },
  { slug: 'audi-a8', merk: 'Audi', model: 'A8', matchers: { merk: 'AUDI', model: /^A8\b/ }, foto: null },
  { slug: 'audi-q2', merk: 'Audi', model: 'Q2', matchers: { merk: 'AUDI', model: /^Q2\b/ }, foto: null },
  { slug: 'audi-q3', merk: 'Audi', model: 'Q3', matchers: { merk: 'AUDI', model: /^Q3\b/ }, foto: null },
  { slug: 'audi-q5', merk: 'Audi', model: 'Q5', matchers: { merk: 'AUDI', model: /^Q5\b/ }, foto: null },
  { slug: 'audi-q7', merk: 'Audi', model: 'Q7', matchers: { merk: 'AUDI', model: /^Q7\b/ }, foto: null },
  { slug: 'audi-tt', merk: 'Audi', model: 'TT', matchers: { merk: 'AUDI', model: /^TT\b/ }, foto: null },

  // ---- BMW. X-modellen eerst: "IX3" mag geen X3 worden, vandaar de ankers.
  { slug: 'bmw-x1', merk: 'BMW', model: 'X1', matchers: { merk: 'BMW', model: /^X1\b/ }, foto: null },
  { slug: 'bmw-x2', merk: 'BMW', model: 'X2', matchers: { merk: 'BMW', model: /^X2\b/ }, foto: null },
  { slug: 'bmw-x3', merk: 'BMW', model: 'X3', matchers: { merk: 'BMW', model: /^X3\b/ }, foto: null },
  { slug: 'bmw-x4', merk: 'BMW', model: 'X4', matchers: { merk: 'BMW', model: /^X4\b/ }, foto: null },
  { slug: 'bmw-x5', merk: 'BMW', model: 'X5', matchers: { merk: 'BMW', model: /^X5\b/ }, foto: null },
  { slug: 'bmw-x6', merk: 'BMW', model: 'X6', matchers: { merk: 'BMW', model: /^X6\b/ }, foto: null },
  { slug: 'bmw-x7', merk: 'BMW', model: 'X7', matchers: { merk: 'BMW', model: /^X7\b/ }, foto: null },
  { slug: 'bmw-1-serie', merk: 'BMW', model: '1-serie', matchers: { merk: 'BMW', model: /^1ER\b|^1 SERIE\b|^1\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-2-serie', merk: 'BMW', model: '2-serie', matchers: { merk: 'BMW', model: /^2ER\b|^2 SERIE\b|^2\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-3-serie', merk: 'BMW', model: '3-serie', matchers: { merk: 'BMW', model: /^3ER\b|^3 SERIE\b|^3\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-4-serie', merk: 'BMW', model: '4-serie', matchers: { merk: 'BMW', model: /^4ER\b|^4 SERIE\b|^4\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-5-serie', merk: 'BMW', model: '5-serie', matchers: { merk: 'BMW', model: /^5ER\b|^5 SERIE\b|^5\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-6-serie', merk: 'BMW', model: '6-serie', matchers: { merk: 'BMW', model: /^6ER\b|^6 SERIE\b|^6\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-7-serie', merk: 'BMW', model: '7-serie', matchers: { merk: 'BMW', model: /^7ER\b|^7 SERIE\b|^7\d{2}(?!\d)/ }, foto: null },
  { slug: 'bmw-8-serie', merk: 'BMW', model: '8-serie', matchers: { merk: 'BMW', model: /^8ER\b|^8 SERIE\b|^8\d{2}(?!\d)/ }, foto: null },

  // ---- Mercedes-Benz. CLA/CLS/GL* vóór de losse letterklassen.
  { slug: 'mercedes-cla', merk: 'Mercedes-Benz', model: 'CLA', matchers: { merk: 'MERCEDES', model: /^CLA\b/ }, foto: null },
  { slug: 'mercedes-cls', merk: 'Mercedes-Benz', model: 'CLS-klasse', matchers: { merk: 'MERCEDES', model: /^CLS\b/ }, foto: null },
  { slug: 'mercedes-gla', merk: 'Mercedes-Benz', model: 'GLA', matchers: { merk: 'MERCEDES', model: /^GLA\b/ }, foto: null },
  { slug: 'mercedes-glc', merk: 'Mercedes-Benz', model: 'GLC-klasse', matchers: { merk: 'MERCEDES', model: /^GLC\b/ }, foto: null },
  { slug: 'mercedes-gle', merk: 'Mercedes-Benz', model: 'GLE-klasse', matchers: { merk: 'MERCEDES', model: /^GLE\b/ }, foto: null },
  { slug: 'mercedes-gls', merk: 'Mercedes-Benz', model: 'GLS-klasse', matchers: { merk: 'MERCEDES', model: /^GLS\b/ }, foto: null },
  { slug: 'mercedes-a-klasse', merk: 'Mercedes-Benz', model: 'A-klasse', matchers: { merk: 'MERCEDES', model: /^A ?\d{3}(?!\d)|^A KLASSE\b/ }, foto: null },
  { slug: 'mercedes-b-klasse', merk: 'Mercedes-Benz', model: 'B-klasse', matchers: { merk: 'MERCEDES', model: /^B ?\d{3}(?!\d)|^B KLASSE\b/ }, foto: null },
  { slug: 'mercedes-c-klasse', merk: 'Mercedes-Benz', model: 'C-klasse', matchers: { merk: 'MERCEDES', model: /^C ?\d{3}(?!\d)|^C KLASSE\b/ }, foto: null },
  { slug: 'mercedes-e-klasse', merk: 'Mercedes-Benz', model: 'E-klasse', matchers: { merk: 'MERCEDES', model: /^E ?\d{3}(?!\d)|^E KLASSE\b/ }, foto: null },
  { slug: 'mercedes-s-klasse', merk: 'Mercedes-Benz', model: 'S-klasse', matchers: { merk: 'MERCEDES', model: /^S ?\d{3}(?!\d)|^S KLASSE\b/ }, foto: null },

  // ---- Porsche
  { slug: 'porsche-911', merk: 'Porsche', model: '911', matchers: { merk: 'PORSCHE', model: /^911\b/ }, foto: null },
  { slug: 'porsche-cayenne', merk: 'Porsche', model: 'Cayenne', matchers: { merk: 'PORSCHE', model: /^CAYENNE\b/ }, foto: null },
  { slug: 'porsche-macan', merk: 'Porsche', model: 'Macan', matchers: { merk: 'PORSCHE', model: /^MACAN\b/ }, foto: null },
  { slug: 'porsche-panamera', merk: 'Porsche', model: 'Panamera', matchers: { merk: 'PORSCHE', model: /^PANAMERA\b/ }, foto: null },
  { slug: 'porsche-boxster', merk: 'Porsche', model: 'Boxster', matchers: { merk: 'PORSCHE', model: /^BOXSTER\b/ }, foto: null },
  { slug: 'porsche-cayman', merk: 'Porsche', model: 'Cayman', matchers: { merk: 'PORSCHE', model: /^CAYMAN\b/ }, foto: null },

  // ---- Land Rover. LET OP de volgorde: Sport en Velar vóór Range Rover,
  //      en Discovery Sport vóór Discovery.
  { slug: 'range-rover-sport', merk: 'Land Rover', model: 'Range Rover Sport', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER SPORT\b/ }, foto: null },
  { slug: 'range-rover-velar', merk: 'Land Rover', model: 'Range Rover Velar', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER VELAR\b/ }, foto: null },
  { slug: 'range-rover-evoque', merk: 'Land Rover', model: 'Range Rover Evoque', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER EVOQUE\b/ }, foto: null },
  { slug: 'range-rover', merk: 'Land Rover', model: 'Range Rover', matchers: { merk: 'LAND ROVER', model: /^RANGE ROVER\b/ }, foto: null },
  { slug: 'land-rover-discovery-sport', merk: 'Land Rover', model: 'Discovery Sport', matchers: { merk: 'LAND ROVER', model: /^DISCOVERY SPORT\b/ }, foto: null },
  { slug: 'land-rover-discovery', merk: 'Land Rover', model: 'Discovery', matchers: { merk: 'LAND ROVER', model: /^DISCOVERY\b/ }, foto: null },

  // ---- Tesla (Model 3 en Y staan hierboven bij de volumeauto's)
  { slug: 'tesla-model-s', merk: 'Tesla', model: 'Model S', matchers: { merk: 'TESLA', model: /^MODEL ?S\b/ }, foto: null },
  { slug: 'tesla-model-x', merk: 'Tesla', model: 'Model X', matchers: { merk: 'TESLA', model: /^MODEL ?X\b/ }, foto: null },

  // ---- Bentley. De RDW zet het merk er soms dubbel voor; dat wordt
  //      genormaliseerd weggehaald, dus deze ankers kloppen.
  { slug: 'bentley-continental-gt', merk: 'Bentley', model: 'Continental GT', matchers: { merk: 'BENTLEY', model: /^CONTINENTAL GT\b/ }, foto: null },
  { slug: 'bentley-bentayga', merk: 'Bentley', model: 'Bentayga', matchers: { merk: 'BENTLEY', model: /^BENTAYGA\b/ }, foto: null },

  // ---- Saab. LET OP: de RDW schrijft "SAAB 9-3" (merk dubbel) én "9-3".
  //      Na het normaliseren wordt het streepje een spatie, dus het patroon
  //      is "9 3" en niet "9-3". Zie de uitleg bovenaan dit bestand.
  { slug: 'saab-9-3', merk: 'Saab', model: '9-3', nl: 18397, matchers: { merk: 'SAAB', model: /^9 3\b/ }, foto: null },
  { slug: 'saab-9-5', merk: 'Saab', model: '9-5', nl: 4793, matchers: { merk: 'SAAB', model: /^9 5\b/ }, foto: null },
  // "9000" vóór "900": anders vangt 900 de 9000 weg.
  { slug: 'saab-9000', merk: 'Saab', model: '9000', matchers: { merk: 'SAAB', model: /^9000\b/ }, foto: null },
  { slug: 'saab-900', merk: 'Saab', model: '900', matchers: { merk: 'SAAB', model: /^900\b/ }, foto: null },

  // ---- Ferrari
  { slug: 'ferrari-488', merk: 'Ferrari', model: '488', matchers: { merk: 'FERRARI', model: /^488\b/ }, foto: null },
  { slug: 'ferrari-812-superfast', merk: 'Ferrari', model: '812 Superfast', matchers: { merk: 'FERRARI', model: /^812\b/ }, foto: null },
  { slug: 'ferrari-gtc4lusso', merk: 'Ferrari', model: 'GTC4Lusso', matchers: { merk: 'FERRARI', model: /^GTC4/ }, foto: null },
  { slug: 'ferrari-portofino', merk: 'Ferrari', model: 'Portofino', matchers: { merk: 'FERRARI', model: /^PORTOFINO\b/ }, foto: null },
];

/** Compacte tabel voor in de browser: regexes als string. */
/**
 * De tabel die de browser krijgt.
 *
 * De slug gaat alléén mee als er ook echt een modelpagina bestaat. Een aantal
 * auto's hier (Bentley, Ferrari, Tesla Model S/X, Saab 900/9-5/9000, Arteon)
 * herkennen we wel bij naam, maar er is nog geen pagina voor geschreven. Zou
 * hun slug gewoon meegaan, dan onthoudt de site een verwijzing naar een
 * pagina die niet bestaat. Zodra de pagina er is, gaat de slug vanzelf mee —
 * hier hoeft dan niets aangepast te worden.
 */
export const autoTabel = AUTOS.map((a) => ({
  slug: modelPerSlug[a.slug] ? a.slug : null,
  merk: a.merk,
  model: a.model,
  foto: a.foto,
  matchers: { merk: a.matchers.merk, model: a.matchers.model.source },
}));

export const autoPerSlug = Object.fromEntries(AUTOS.map((a) => [a.slug, a]));

export default AUTOS;
