/**
 * DE GOUDEN LIJST — echte RDW-schrijfwijzen met de pagina waar ze horen uit
 * te komen.
 *
 * Dit is de enige plek waar deze gevallen staan. Ze worden gebruikt door:
 *   tests/matchers.test.js          offline, draait bij elke `npm test`
 *   scripts/valideer-kenteken.mjs   samen met de live dekkingsscan
 *
 * Eerder stonden ze in twee scripts door elkaar heen, met overlap en kleine
 * verschillen. Dat is precies hoe een test langzaam onwaar wordt.
 *
 * TWEE SYSTEMEN, TWEE VERWACHTINGEN
 * De site herkent auto's op twee manieren, en die zijn niet hetzelfde:
 *
 *   model   de kenteken-check op de homepage. Draait op de RUWE
 *           handelsbenaming in hoofdletters en stuurt door naar een
 *           modelpagina uit src/data/modellen/.
 *   auto    de upgradepagina. Draait op de GENORMALISEERDE tekst (merk
 *           vooraan eraf, leestekens weg) en gebruikt src/data/autos.js,
 *           dat ook auto's kent waar nog geen pagina voor is.
 *
 * `null` betekent: hier hoort géén treffer uit te komen. Dat zijn de
 * belangrijkste regels in dit bestand — een patroon dat te veel vangt merk
 * je pas als iemand op de verkeerde pagina belandt.
 *
 * Staat er `auto: undefined`, dan doet dit geval geen uitspraak over het
 * tweede systeem.
 */

export const GEVALLEN = [
  // ---------------------------------------------------------------
  // BMW — series en X-modellen mogen elkaar niet vangen. Let op: in
  // "320I" zit geen woordgrens tussen de 0 en de I, dus \b werkt hier
  // niet. Daar staat een vooruitblik (?!\d) in het patroon.
  // ---------------------------------------------------------------
  { merk: 'BMW', benaming: '3ER REIHE', model: 'bmw-3-serie' },
  { merk: 'BMW', benaming: '320I', model: 'bmw-3-serie' },
  { merk: 'BMW', benaming: '330E', model: 'bmw-3-serie' },
  { merk: 'BMW', benaming: '118I', model: 'bmw-1-serie' },
  { merk: 'BMW', benaming: '116D', model: 'bmw-1-serie' },
  { merk: 'BMW', benaming: '1ER REIHE', model: 'bmw-1-serie' },
  { merk: 'BMW', benaming: '218I ACTIVE TOURER', model: 'bmw-2-serie' },
  { merk: 'BMW', benaming: '420D', model: 'bmw-4-serie' },
  { merk: 'BMW', benaming: '520D', model: 'bmw-5-serie', auto: 'bmw-5-serie' },
  { merk: 'BMW', benaming: '530E', model: 'bmw-5-serie' },
  { merk: 'BMW', benaming: '640I', model: 'bmw-6-serie' },
  { merk: 'BMW', benaming: '730D', model: 'bmw-7-serie' },
  { merk: 'BMW', benaming: '740I', model: 'bmw-7-serie', auto: 'bmw-7-serie' },
  { merk: 'BMW', benaming: '840I', model: 'bmw-8-serie' },
  { merk: 'BMW', benaming: 'X1 SDRIVE18I', model: 'bmw-x1' },
  { merk: 'BMW', benaming: 'X1 SDRIVE20I', model: 'bmw-x1', auto: 'bmw-x1' },
  { merk: 'BMW', benaming: 'X3 XDRIVE30D', model: 'bmw-x3' },
  { merk: 'BMW', benaming: 'X5 XDRIVE40I', model: 'bmw-x5', auto: 'bmw-x5' },
  { merk: 'BMW', benaming: 'X7 XDRIVE40I', model: 'bmw-x7' },
  { merk: 'BMW', benaming: 'IX3', model: null, auto: null, waarom: 'iX3 is geen X3' },
  { merk: 'BMW', benaming: 'IX1 EDRIVE20', model: null, auto: null, waarom: 'iX1 is geen X1' },
  { merk: 'BMW', benaming: 'I3', model: null, waarom: 'i3 is geen 3-serie' },
  { merk: 'BMW', benaming: 'M3', auto: null, waarom: 'M3 valt buiten de reeks' },
  { merk: 'BMW', benaming: 'R 1200 GS', model: null, auto: null, waarom: 'motor: "120" zit in "1200"' },

  // ---------------------------------------------------------------
  // Mercedes — de letterklassen mogen elkaar niet opeten.
  // ---------------------------------------------------------------
  { merk: 'MERCEDES-BENZ', benaming: 'C 180', auto: 'mercedes-c-klasse' },
  { merk: 'MERCEDES-BENZ', benaming: 'A 180', auto: 'mercedes-a-klasse' },
  { merk: 'MERCEDES-BENZ', benaming: 'E 200', auto: 'mercedes-e-klasse' },
  { merk: 'MERCEDES-BENZ', benaming: 'CLA 180', auto: 'mercedes-cla', waarom: 'CLA is geen C-klasse' },
  { merk: 'MERCEDES-BENZ', benaming: 'CLS 350', auto: 'mercedes-cls', waarom: 'CLS is geen C-klasse' },
  { merk: 'MERCEDES-BENZ', benaming: 'GLC 300 E 4MATIC', auto: 'mercedes-glc' },
  { merk: 'MERCEDES-BENZ', benaming: 'SPRINTER', auto: null, waarom: 'bestelbus, geen personenauto' },
  { merk: 'MERCEDES-BENZ', benaming: 'CITAN', auto: null },

  // ---------------------------------------------------------------
  // Land Rover — het specifieke model moet vóór het algemene staan.
  // ---------------------------------------------------------------
  { merk: 'LAND ROVER', benaming: 'RANGE ROVER SPORT', auto: 'range-rover-sport' },
  { merk: 'LAND ROVER', benaming: 'RANGE ROVER EVOQUE', auto: 'range-rover-evoque' },
  { merk: 'LAND ROVER', benaming: 'RANGE ROVER', auto: 'range-rover' },
  { merk: 'LAND ROVER', benaming: 'DISCOVERY SPORT', auto: 'land-rover-discovery-sport' },
  { merk: 'LAND ROVER', benaming: 'DISCOVERY', auto: 'land-rover-discovery' },
  { merk: 'LAND ROVER', benaming: 'DEFENDER', auto: null },

  // ---------------------------------------------------------------
  // Volumemerken. Let op de gevallen waar het merk dubbel in de
  // handelsbenaming staat — dat doet de RDW vaak.
  // ---------------------------------------------------------------
  { merk: 'VOLKSWAGEN', benaming: 'GOLF', model: 'volkswagen-golf', auto: 'volkswagen-golf' },
  { merk: 'VOLKSWAGEN', benaming: 'PASSAT VARIANT', model: 'volkswagen-passat' },
  { merk: 'VOLKSWAGEN', benaming: 'POLO', auto: 'volkswagen-polo' },
  { merk: 'VOLKSWAGEN', benaming: 'UP!', auto: 'volkswagen-up', waarom: 'leesteken in de naam' },
  { merk: 'VOLKSWAGEN', benaming: 'T-ROC', auto: 'volkswagen-t-roc' },
  { merk: 'KIA', benaming: 'PICANTO', auto: 'kia-picanto' },
  { merk: 'FORD', benaming: 'FIESTA', auto: 'ford-fiesta' },
  { merk: 'FORD', benaming: 'KUGA', auto: null, waarom: 'Kuga is geen Ka' },
  { merk: 'TOYOTA', benaming: 'TOYOTA AYGO', auto: 'toyota-aygo', waarom: 'merk staat dubbel' },
  { merk: 'RENAULT', benaming: 'CLIO', auto: 'renault-clio' },
  { merk: 'OPEL', benaming: 'CORSA', auto: 'opel-corsa' },
  { merk: 'PEUGEOT', benaming: '208', model: 'peugeot-208', auto: 'peugeot-208' },
  { merk: 'PEUGEOT', benaming: '2008', model: 'peugeot-2008', auto: 'peugeot-2008', waarom: '2008 is geen 208' },
  { merk: 'FIAT', benaming: 'FIAT 500', auto: 'fiat-500' },
  { merk: 'FIAT', benaming: 'FIAT 500L', model: null, auto: null, waarom: '500L is geen 500' },
  { merk: 'CITROEN', benaming: 'CITROEN C1', auto: 'citroen-c1' },
  { merk: 'CITROEN', benaming: 'C15', auto: null, waarom: 'C15 is geen C1' },
  { merk: 'SKODA', benaming: 'OCTAVIA', auto: 'skoda-octavia' },
  { merk: 'HYUNDAI', benaming: 'I10', auto: 'hyundai-i10' },
  { merk: 'NISSAN', benaming: 'NISSAN QASHQAI', auto: 'nissan-qashqai' },
  { merk: 'VOLVO', benaming: 'XC40', auto: 'volvo-xc40' },

  // ---------------------------------------------------------------
  // Premium en bijzondere gevallen.
  // ---------------------------------------------------------------
  { merk: 'AUDI', benaming: 'A3 SPORTBACK', auto: 'audi-a3' },
  { merk: 'AUDI', benaming: 'Q5', auto: 'audi-q5' },
  { merk: 'PORSCHE', benaming: '911 CARRERA 4S', auto: 'porsche-911' },
  { merk: 'PORSCHE', benaming: 'CAYENNE E-HYBRID', auto: 'porsche-cayenne' },
  { merk: 'PORSCHE', benaming: 'TAYCAN', auto: null },
  { merk: 'SAAB', benaming: 'SAAB 9-3', model: 'saab-9-3', auto: 'saab-9-3' },
  { merk: 'SAAB', benaming: '9-3', auto: 'saab-9-3', waarom: 'zonder merk ervoor' },
  { merk: 'SAAB', benaming: '9000 CS', auto: 'saab-9000', waarom: '9000 is geen 900' },
  { merk: 'TESLA', benaming: 'MODEL S', auto: 'tesla-model-s' },
  { merk: 'TESLA', benaming: 'Model 3', auto: 'tesla-model-3', waarom: 'kleine letters' },
  { merk: 'TESLA', benaming: 'MODEL Y', auto: 'tesla-model-y', waarom: 'Model Y is geen Model 3' },
  { merk: 'BENTLEY', benaming: 'BENTLEY CONTINENTAL GT', auto: 'bentley-continental-gt' },
  { merk: 'FERRARI', benaming: '812 SUPERFAST', auto: 'ferrari-812-superfast' },
];

/**
 * Voertuigen die we sowieso weigeren, ongeacht het merk. De check is er niet
 * voor vrachtwagens en aanhangers.
 */
export const GEWEIGERDE_SOORTEN = [
  { merk: 'VOLVO', benaming: 'V60', soort: 'Vrachtauto' },
  { merk: 'VOLVO', benaming: 'FH', soort: 'Vrachtauto' },
  { merk: 'VOLKSWAGEN', benaming: 'GOLF', soort: 'Aanhangwagen' },
];

export default GEVALLEN;
