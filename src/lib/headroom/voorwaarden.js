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
 *
 * `alleenWerk` is voor een klus zonder nieuwe onderdelen, zoals alleen het
 * inmeten en afstellen van een installatie die er al in zit. Dan begint de
 * bedenktijd bij het akkoord en niet bij het ophalen van de auto, en is er
 * niets om uit te bouwen.
 */
export function kernpunten({
  soort = 'offerte',
  geldigTot = '',
  vervaldatum = '',
  opAfstand = true,
  startDirect = false,
  zakelijk = false,
  alleenWerk = false,
  annuleerDagen = 7,
} = {}) {
  const punten = [];
  const prijzen = zakelijk
    ? 'Alle genoemde prijzen zijn all-in: inclusief montage. De btw staat er apart bij.'
    : 'Alle genoemde prijzen zijn all-in: inclusief montage en btw.';
  /* Heeft deze klant een bedenktijd? Dat bepaalt niet alleen of de
     bedenktijdregels erbij komen, maar ook dat de 25%-regel hieronder niet
     onvoorwaardelijk mag worden opgeschreven: binnen de bedenktijd gelden de
     regels van artikel 4 en niet die van artikel 9. Stonden die twee
     onvoorwaardelijk naast elkaar op één blad, dan leest de klant dat
     afzeggen hem 25% kost terwijl hij op dat moment niets verschuldigd is. */
  const herroeping = opAfstand && !zakelijk;

  if (soort === 'offerte') {
    if (geldigTot) punten.push(`Deze offerte is geldig tot en met ${geldigTot}.`);
    punten.push(zakelijk ? prijzen : `${prijzen} Wat je ziet is wat je betaalt.`);
  } else {
    if (vervaldatum) punten.push(`Graag betalen vóór ${vervaldatum}, onder vermelding van het factuurnummer.`);
    punten.push(prijzen);
  }

  punten.push(
    `Afzeggen of verzetten kan kosteloos tot ${annuleerDagen} dagen voor de afgesproken dag. ` +
    'Daarna brengen we 25% van het offertebedrag in rekening voor de gereserveerde tijd' +
    (alleenWerk ? '.' : ' en de al bestelde onderdelen.') +
    (herroeping
      ? ' Zeg je af binnen je bedenktijd hieronder, dan geldt dat niet: dan gelden alleen de' +
        ' regels van die bedenktijd en brengen we die 25% niet in rekening.'
      : '')
  );

  punten.push(
    'Op onze installatie en bekabeling zit levenslange garantie, persoonsgebonden. ' +
    'Op de apparatuur zelf geldt de garantie van de fabrikant.'
  );

  punten.push('Je fabrieksgarantie blijft 100% behouden; er wordt niet in de originele bedrading geknipt.');

  punten.push(
    'Werk gebeurt uitsluitend op afspraak.' +
    (alleenWerk ? '' : ' Levertijd van onderdelen in overleg.')
  );

  /* De bedenktijd is een consumentenrecht. Bij een zakelijke klant bestaat
     hij niet, ook niet als je het per WhatsApp afspreekt. */
  if (herroeping) {
    /* WANNEER DIE 14 DAGEN INGAAN.
       Een klus van Justus is onderdelen én montage in één opdracht. Daarvoor
       gelden volgens art. 6:230g lid 2 BW alleen de regels voor
       consumentenkoop, en dan loopt de termijn vanaf de ontvangst van de
       zaak (6:230o lid 1 sub b) — hier dus vanaf het moment dat de klant
       zijn auto met de apparatuur erin terugkrijgt, niet vanaf de dag van
       de afspraak. Dat scheelt weken, en te weinig of verkeerde informatie
       hierover rekt de termijn op tot twaalf maanden.

       ALLEEN WERK, GEEN ONDERDELEN.
       Dan is het een dienst en geen koop, en loopt de termijn vanaf het
       sluiten van de overeenkomst (art. 6:230o BW); artikel 4 achterop zegt
       dat ook. De zin voor een klus met onderdelen zou hier niet alleen meer
       tijd geven maar het werk zelf binnen de bedenktijd zetten, en zonder
       uitdrukkelijk verzoek is de klant voor dat werk dan niets
       verschuldigd. Komt de offerte pas ná het akkoord bij de klant, zoals
       bij een afspraak die per WhatsApp al rond is, dan eindigt de termijn
       14 dagen na de dag waarop hij deze informatie ontvangt. "Nooit eerder
       dan" dekt allebei de gevallen met één zin. */
    punten.push(
      alleenWerk
        ? 'Omdat we dit op afstand afspreken heb je 14 dagen bedenktijd: je mag de ' +
          'overeenkomst zonder opgaaf van reden ontbinden. Het gaat hier alleen om werk aan ' +
          'wat er al in je auto zit, zonder nieuwe onderdelen. Daarom gaan die 14 dagen in ' +
          'op de dag nadat je akkoord geeft, en nooit eerder dan de dag nadat je de offerte ' +
          'hebt ontvangen.'
        : 'Omdat we dit op afstand afspreken heb je 14 dagen bedenktijd: je mag de overeenkomst ' +
          'zonder opgaaf van reden ontbinden. Die 14 dagen gaan in op de dag nadat je je auto ' +
          'met de nieuwe apparatuur erin terugkrijgt.'
    );
    /* De wet wil dat het modelformulier meegaat, niet alleen dat je de
       bedenktijd noemt. Het blad zit als losse pdf bij de offerte; hier
       staat waarom de klant het ziet, en dat hij het niet hoeft te
       gebruiken. Zie herroeping.js. */
    punten.push(
      'Het modelformulier voor herroeping zit bij deze offerte. Gebruiken hoeft niet: een ' +
      'berichtje per e-mail of WhatsApp binnen de termijn is net zo geldig.'
    );
    /* Wat er met de auto en met het geld gebeurt als iemand zich bedenkt.
       De wet wil dat je vooraf zegt dat de kosten van het terugbrengen voor
       de klant zijn, en bij een zaak die niet per post terug kan ook hoe dat
       praktisch gaat. Zeg je dat niet, dan draag je die kosten zelf.
       Bij alleen werk is er niets uit te bouwen; wat de klant dan wil weten
       is dat afzeggen voordat er iets gedaan is hem niets kost (artikel 4). */
    punten.push(
      alleenWerk
        ? 'Bedenk je je binnen die 14 dagen voordat we aan je auto begonnen zijn, dan ' +
          'betaal je niets en krijg je een aanbetaling volledig terug.'
        : 'Bedenk je je, dan breng je de auto binnen 14 dagen langs zodat we de apparatuur ' +
          'eruit kunnen halen. Dat uitbouwen en het terugzetten van je originele onderdelen ' +
          'kost je niets; het rijden naar de werkplaats is voor jou.'
    );
    if (startDirect && alleenWerk) {
      /* Een dienst die helemaal is uitgevoerd op uitdrukkelijk verzoek van de
         klant, die wist dat zijn bedenktijd dan vervalt, kan niet meer
         worden herroepen. Zegt hij eerder af, dan betaalt hij het gedane werk
         naar evenredigheid. Zie artikel 4 van de voorwaarden. */
      punten.push(
        'Je vraagt ons uitdrukkelijk om te beginnen voordat je bedenktijd om is, en je weet ' +
        'dat je bedenktijd vervalt zodra het werk helemaal klaar is. Zeg je eerder af, dan ' +
        'betaal je een evenredig deel van het afgesproken bedrag voor het werk dat al gedaan ' +
        'is. Een uurtarief rekenen we niet.'
      );
    } else if (startDirect) {
      /* Hier stond dat de klant bij afzeggen ook de onderdelen betaalt. Dat is
         niet zo: die gaan terug en dat geld gaat terug. Hij betaalt het werk
         naar evenredigheid, plus de waardevermindering van apparatuur die
         in- en weer uitgebouwd is. Zie artikel 4 van de voorwaarden. */
      punten.push(
        'Je vraagt ons uitdrukkelijk om te beginnen voordat je bedenktijd om is. Zeg je ' +
        'daarna alsnog af, dan gaan de onderdelen terug en krijg je dat geld terug. Je ' +
        'betaalt dan een evenredig deel van het afgesproken bedrag voor het werk dat al ' +
        'gedaan is, plus de waardevermindering van apparatuur die ingebouwd en weer ' +
        'uitgebouwd is. Een uurtarief rekenen we niet.'
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
