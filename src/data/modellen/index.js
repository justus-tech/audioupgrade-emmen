/**
 * Alle modelpagina's, per merk gebundeld.
 *
 * Eén bestand per merk, want 150 modellen in één bestand van ruim 6000
 * regels was niet meer te overzien. Wil je iets aan een BMW veranderen,
 * dan open je bmw.js en niets anders.
 *
 * De volgorde hieronder is de volgorde waarin de merken vroeger in het
 * grote bestand stonden. Tussen merken maakt die volgorde niet uit — het
 * merk wordt eerst gecontroleerd en geen merknaam zit in een andere — maar
 * zo blijft de vergelijking met vroeger eenvoudig.
 */
import volkswagen from './volkswagen.js';
import audi from './audi.js';
import bmw from './bmw.js';
import mercedes_benz from './mercedes-benz.js';
import volvo from './volvo.js';
import kia from './kia.js';
import ford from './ford.js';
import toyota from './toyota.js';
import renault from './renault.js';
import opel from './opel.js';
import peugeot from './peugeot.js';
import fiat from './fiat.js';
import saab from './saab.js';
import tesla from './tesla.js';
import porsche from './porsche.js';
import land_rover from './land-rover.js';
import nissan from './nissan.js';
import suzuki from './suzuki.js';
import citroen from './citroen.js';
import seat from './seat.js';
import skoda from './skoda.js';
import hyundai from './hyundai.js';
import mazda from './mazda.js';
import mitsubishi from './mitsubishi.js';
import dacia from './dacia.js';
import mini from './mini.js';
import lynk_co from './lynk-co.js';
import honda from './honda.js';

export const ALLE_MODELLEN = [
  ...volkswagen,
  ...audi,
  ...bmw,
  ...mercedes_benz,
  ...volvo,
  ...kia,
  ...ford,
  ...toyota,
  ...renault,
  ...opel,
  ...peugeot,
  ...fiat,
  ...saab,
  ...tesla,
  ...porsche,
  ...land_rover,
  ...nissan,
  ...suzuki,
  ...citroen,
  ...seat,
  ...skoda,
  ...hyundai,
  ...mazda,
  ...mitsubishi,
  ...dacia,
  ...mini,
  ...lynk_co,
  ...honda,
];

export default ALLE_MODELLEN;
