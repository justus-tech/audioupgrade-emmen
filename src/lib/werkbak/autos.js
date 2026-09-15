/**
 * HET AUTODOSSIER — wat er per model is nagemeten en vastgelegd.
 *
 * HET PROBLEEM DAT DIT OPLOST
 * Van de RDW krijgen we merk, model, bouwjaar, kleur en brandstof. Meer niet.
 * Wat je voor een inbouw écht moet weten staat daar níét in:
 *
 *   - welke speakermaat er voor en achter in zit
 *   - welke adapterring daarbij hoort
 *   - welk fabrieksscherm erin zit en welke interface daarop past
 *   - welke stekker er achter de radio zit
 *   - of er een fabrieksversterker tussen zit
 *   - waar de stroomkabel door het schutbord kan
 *
 * Die gegevens verschillen per uitvoering, en ze zijn nergens gratis op te
 * halen. Ze zijn ook niet te raden: een gok op een stekker of een interface
 * kost een middag, en een gok op bedrading kost de fabrieksgarantie van de
 * klant. Deze app verzint ze daarom niet.
 *
 * WAT HIJ WEL DOET
 * De eerste keer dat Justus een model onder handen heeft, meet hij het na en
 * legt hij het hier vast. Vanaf dan herkent de app dat model aan het kenteken
 * en staat alles al ingevuld op de werkbon. Het dossier wordt dus met elke
 * auto beter — en het is zíjn kennis, geverifieerd aan een echte auto.
 *
 * Staat een model er nog niet in, dan zegt de werkbon dat met zoveel woorden
 * en laat hij lege regels om ter plekke in te vullen.
 *
 * WAAR HET STAAT
 * In de browser van zijn telefoon, net als de rest. Niet in deze map: die
 * staat openbaar op GitHub.
 */
import { matchAuto, normaliseerMerk, normaliseerBenaming } from '../match.js';

/**
 * De gegevens die per model worden vastgelegd.
 *
 * De volgorde is de volgorde van het werk: eerst wat je in de deur tegenkomt,
 * dan het dashboard, dan de stroom. Zo loopt het formulier gelijk met wat je
 * onder handen hebt.
 */
export const DOSSIER_VELDEN = [
  { id: 'speakerVoor', naam: 'Speakermaat voor', hint: 'bijv. 165 mm (6,5")' },
  { id: 'ringVoor', naam: 'Adapterring voor', hint: 'merk + artikelnummer' },
  { id: 'tweeterVoor', naam: 'Tweeterplek voor', hint: 'spiegeldriehoek, dashboard, …' },
  { id: 'speakerAchter', naam: 'Speakermaat achter', hint: 'leeg = geen speakers achter' },
  { id: 'ringAchter', naam: 'Adapterring achter' },
  { id: 'radio', naam: 'Fabrieksradio / scherm', hint: 'bijv. Composition Media' },
  { id: 'stekker', naam: 'Stekker achter de radio', hint: 'bijv. Quadlock' },
  { id: 'interface', naam: 'CarPlay-interface die past', hint: 'type + artikelnummer' },
  { id: 'canbus', naam: 'CAN-bus adapter' },
  { id: 'versterker', naam: 'Fabrieksversterker aanwezig?', hint: 'nee, of welk systeem' },
  { id: 'stroom', naam: 'Doorvoer naar de accu', hint: 'waar de plus doorheen kan' },
  { id: 'massa', naam: 'Massapunt' },
  { id: 'let', naam: 'Let op bij deze auto', hint: 'wat je de vorige keer tegenkwam' },
  /**
   * WAT ER VOLGENS DE FABRIKANT IN PAST.
   *
   * De velden hierboven zijn wat Justus zelf heeft nagemeten. Deze drie zijn
   * iets anders: wat de leverancier zegt dat erin past. Dat komt uit hun
   * compatibiliteitslijsten en is dus niet gemeten maar opgegeven.
   *
   * Die twee door elkaar halen is gevaarlijk, vandaar aparte velden én het
   * bronveld eronder: op de werkbon staat erbij waar het vandaan komt en van
   * wanneer. Een lijst van vijf jaar oud kent de auto van vorig jaar niet.
   */
  { id: 'pastVoor', naam: 'Past voorin (opgave leverancier)' },
  { id: 'pastAchter', naam: 'Past achterin (opgave leverancier)' },
  { id: 'pastCenter', naam: 'Center / overig (opgave leverancier)' },
  { id: 'chassis', naam: 'Chassiscode', hint: 'bijv. E90, F30, 8V' },
  { id: 'bron', naam: 'Bron van deze gegevens', hint: 'zelf nagemeten, of welke lijst' },
];

/** De velden die zwaar genoeg wegen om een dossier "ingevuld" te noemen. */
const KERNVELDEN = ['speakerVoor', 'radio', 'stekker'];

/**
 * De sleutel waaronder een auto in het dossier staat.
 *
 * Eerst proberen we het model te herkennen met dezelfde patronen als de
 * kenteken-check op de site (`matchAuto`). Lukt dat, dan is de sleutel de
 * slug van die modelpagina — "volkswagen-golf". Zo staat een Golf altijd
 * onder dezelfde noemer, hoe de RDW hem ook schrijft: GOLF, GOLF PLUS,
 * GOLF VII 1.4 TSI.
 *
 * Kennen we het model niet, dan maken we zelf een sleutel van merk en
 * benaming. Dan werkt het dossier nog steeds, alleen minder slim.
 */
export function autoSleutel(voertuig, modellen = []) {
  const gevonden = matchAuto(voertuig, modellen);
  if (gevonden) return gevonden.slug;

  const merk = normaliseerMerk(voertuig?.merk);
  const benaming = normaliseerBenaming(voertuig?.merk, voertuig?.handelsbenaming);
  const kaal = `${merk} ${benaming}`.trim().toLowerCase().replace(/\s+/g, '-');
  return kaal || 'onbekend';
}

/**
 * Het dossier dat bij deze auto hoort.
 *
 * Eén model kan meerdere dossiers hebben, want een Golf 7 is geen Golf 4.
 * Daarom heeft elk dossier een reeks bouwjaren. We nemen het dossier waarvan
 * de reeks het bouwjaar bevat; is er geen dossier met een reeks, dan het
 * dossier zonder reeks (dat geldt dan voor alle jaren).
 */
export function zoekDossier(dossiers = [], sleutel, bouwjaar) {
  const jaar = Number(String(bouwjaar ?? '').slice(0, 4));
  const vanModel = dossiers.filter((d) => d.sleutel === sleutel);
  if (!vanModel.length) return null;

  if (Number.isFinite(jaar) && jaar > 0) {
    const passend = vanModel.find((d) => {
      const van = Number(d.vanJaar) || 0;
      const tot = Number(d.totJaar) || 9999;
      return jaar >= van && jaar <= tot;
    });
    if (passend) return passend;
  }
  return vanModel.find((d) => !d.vanJaar && !d.totJaar) || null;
}

/** Hoe een dossier in een lijstje heet: "Volkswagen Golf (2013-2020)". */
export function dossierNaam(dossier) {
  if (!dossier) return '';
  const jaren = dossier.vanJaar || dossier.totJaar
    ? ` (${dossier.vanJaar || '…'}-${dossier.totJaar || 'nu'})`
    : '';
  return `${dossier.naam || dossier.sleutel}${jaren}`;
}

/**
 * Hoe compleet is dit dossier? Levert een getal van 0 tot 1 en welke
 * kernvelden er nog ontbreken.
 *
 * Dit staat op de werkbon. Niet om te oordelen, maar omdat je moet kunnen
 * zien of je op vastgelegde gegevens vaart of op je geheugen.
 */
export function dossierStand(dossier) {
  if (!dossier) return { deel: 0, ontbreekt: KERNVELDEN, ingevuld: 0, totaal: DOSSIER_VELDEN.length };
  const ingevuld = DOSSIER_VELDEN.filter((v) => String(dossier[v.id] || '').trim()).length;
  const ontbreekt = KERNVELDEN.filter((id) => !String(dossier[id] || '').trim());
  return { deel: ingevuld / DOSSIER_VELDEN.length, ontbreekt, ingevuld, totaal: DOSSIER_VELDEN.length };
}

/** Een leeg dossier om mee te beginnen. */
export function leegDossier(sleutel = '', naam = '') {
  const leeg = { sleutel, naam, vanJaar: '', totJaar: '' };
  for (const veld of DOSSIER_VELDEN) leeg[veld.id] = '';
  return leeg;
}
