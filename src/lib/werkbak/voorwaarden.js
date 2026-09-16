/**
 * DE VOORWAARDEN OP DE PAPIEREN STUKKEN.
 *
 * WAAROM DIT BESTAAT
 * Justus moest bij elke klus dezelfde dingen los via WhatsApp vertellen: hoe
 * lang de offerte geldig is, wanneer je kosteloos kunt afzeggen, wat de
 * garantie inhoudt, wanneer er betaald moet zijn. Dat kost tijd, je vergeet
 * er een, en achteraf staat het nergens zwart op wit.
 *
 * Nu staat het op de offerte en op de factuur.
 *
 * ÉÉN BRON
 * De teksten komen uit src/data/juridisch.js — exact dezelfde die op
 * audioupgradeemmen.nl/algemene-voorwaarden staan. Dat is geen luxe: staan er
 * op papier andere voorwaarden dan op je site, dan kan een klant kiezen welke
 * hem het beste uitkomt.
 *
 * WAT ER OP DE VOORKANT KOMT EN WAT ACHTERIN
 * Op de voorkant een handvol korte punten die je anders zou appen. Achterin,
 * als bijlage, de volledige voorwaarden. Niemand leest die bijlage, maar wie
 * hem opzoekt moet hem hebben — en juridisch tellen ze pas mee als ze zijn
 * meegestuurd.
 *
 * LET OP: dit is geen juridisch advies. Zie de waarschuwing boven in
 * src/data/juridisch.js.
 */
import { ALGEMENE_VOORWAARDEN, BIJGEWERKT } from '../../data/juridisch.js';
import { SITE } from '../../data/site.js';

/** **vet** heeft in een pdf geen betekenis; die sterretjes moeten eruit. */
export function zonderOpmaak(tekst) {
  return String(tekst || '').replace(/\*\*(.+?)\*\*/g, '$1');
}

/** Eén artikel opzoeken op een woord uit de kop. */
function artikel(zoek) {
  return ALGEMENE_VOORWAARDEN.artikelen.find((a) => new RegExp(zoek, 'i').test(a.kop));
}

/**
 * DE KORTE PUNTEN OP DE VOORKANT.
 *
 * Dit is precies de lijst die Justus anders per WhatsApp doorgeeft. Kort
 * gehouden: wie vijf regels ziet leest ze, wie twintig regels ziet leest er
 * geen een.
 *
 * `opAfstand` bepaalt of het herroepingsrecht erbij komt. Dat recht bestaat
 * alleen als de afspraak op afstand is gemaakt — per WhatsApp of telefoon.
 * Komt de klant in de werkplaats en spreken jullie het daar af, dan bestaat
 * het niet, en dan zou het een belofte zijn die je niet hoeft te doen.
 *
 * `zakelijk` doet twee dingen. De bedragen staan dan exclusief btw, dus
 * "inclusief btw" zou er pertinent naast zitten. En de bedenktijd is een
 * consumentenrecht: een bedrijf heeft hem niet. Hem toch beloven is een recht
 * weggeven dat de wet niet van je vraagt — zie artikel 4 van de voorwaarden.
 */
export function kernpunten({
  soort = 'offerte',
  geldigTot = '',
  vervaldatum = '',
  opAfstand = true,
  startDirect = false,
  zakelijk = false,
  annuleerDagen = 7,
} = {}) {
  const punten = [];
  const prijzen = zakelijk
    ? 'Alle genoemde prijzen zijn all-in: inclusief montage. De btw staat er apart bij.'
    : 'Alle genoemde prijzen zijn all-in: inclusief montage en btw.';

  if (soort === 'offerte') {
    if (geldigTot) punten.push(`Deze offerte is geldig tot en met ${geldigTot}.`);
    punten.push(zakelijk ? prijzen : `${prijzen} Wat je ziet is wat je betaalt.`);
  } else {
    if (vervaldatum) punten.push(`Graag betalen vóór ${vervaldatum}, onder vermelding van het factuurnummer.`);
    punten.push(prijzen);
  }

  punten.push(
    `Afzeggen of verzetten kan kosteloos tot ${annuleerDagen} dagen voor de afgesproken dag. ` +
    `Daarna brengen we 25% van het offertebedrag in rekening voor de gereserveerde tijd en ` +
    'de al bestelde onderdelen.'
  );

  punten.push(
    'Op onze installatie en bekabeling zit levenslange garantie, persoonsgebonden. ' +
    'Op de apparatuur zelf geldt de garantie van de fabrikant.'
  );

  punten.push('Je fabrieksgarantie blijft 100% behouden; er wordt niet in de originele bedrading geknipt.');

  punten.push('Werk gebeurt uitsluitend op afspraak. Levertijd van onderdelen in overleg.');

  /* De bedenktijd is een consumentenrecht. Bij een zakelijke klant bestaat
     hij niet, ook niet als je het per WhatsApp afspreekt. */
  if (opAfstand && !zakelijk) {
    punten.push(
      'Omdat we dit op afstand afspreken heb je 14 dagen bedenktijd: je mag de overeenkomst ' +
      'binnen die termijn zonder opgaaf van reden ontbinden.'
    );
    if (startDirect) {
      punten.push(
        'Je vraagt ons uitdrukkelijk om al binnen die 14 dagen te beginnen. Zeg je daarna ' +
        'alsnog af, dan betaal je alleen het werk dat dan al gedaan is en de onderdelen die ' +
        'speciaal voor jouw auto zijn besteld.'
      );
    }
  }

  if (soort !== 'offerte') {
    punten.push(
      'Alle gemonteerde onderdelen blijven ons eigendom totdat de factuur volledig is betaald.'
    );
  }

  punten.push(`De volledige voorwaarden staan achterop en op ${SITE.url}/algemene-voorwaarden.`);
  return punten;
}

/**
 * DE VOLLEDIGE VOORWAARDEN ALS BIJLAGE.
 *
 * Eén op één de artikelen van de site, in dezelfde volgorde en met dezelfde
 * nummering. Zo kun je in een gesprek naar "artikel 9" verwijzen en heeft de
 * klant hetzelfde artikel voor zich.
 */
export function volledigeVoorwaarden() {
  return {
    kop: ALGEMENE_VOORWAARDEN.kop,
    bijgewerkt: BIJGEWERKT,
    artikelen: ALGEMENE_VOORWAARDEN.artikelen.map((a) => ({
      kop: a.kop,
      punten: [
        ...(a.alineas || []).map(zonderOpmaak),
        ...(a.lijst || []).map(zonderOpmaak),
      ],
    })),
  };
}

/** Hoeveel dagen je kosteloos kunt afzeggen, volgens de eigen voorwaarden. */
export function annuleertermijn() {
  const tekst = (artikel('Annulering')?.lijst || []).join(' ');
  const m = tekst.match(/tot uiterlijk (\d+) dagen/);
  return m ? Number(m[1]) : 7;
}
