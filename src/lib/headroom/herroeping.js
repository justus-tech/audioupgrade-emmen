/**
 * HET MODELFORMULIER VOOR HERROEPING.
 *
 * Bij een overeenkomst op afstand is het niet genoeg om de klant over zijn
 * bedenktijd te vertellen: de wet wil dat je hem ook het modelformulier
 * meegeeft waarmee hij die bedenktijd kan gebruiken. Dat staat in bijlage I
 * deel B bij richtlijn 2011/83/EU, bij ons in art. 6:230m BW. Doe je dat
 * niet, dan loopt de termijn van veertien dagen door tot maximaal een jaar,
 * en dat is een jaar waarin een klant zijn geld kan terugvragen voor werk
 * dat allang in zijn auto zit.
 *
 * Bijna alles gaat hier per WhatsApp de deur uit, dus bijna elke offerte is
 * er een op afstand. Daarom hoort dit blad niet in een laatje maar aan de
 * knop: wie de offerte deelt, deelt dit vanzelf mee.
 *
 * De tekst van de verklaring en van de in te vullen regels is de wettelijke
 * modeltekst. Die is stug, en dat mag: hij is er niet om mooi te lezen maar
 * om te kloppen. De toelichting eronder is van ons, en zegt precies één
 * ding — dat de klant dit formulier niet hoeft te gebruiken. Een
 * ondubbelzinnige mededeling per app is evengoed geldig, en een formulier
 * dat anders suggereert maakt het de klant moeilijker dan de wet doet.
 */
import { nieuwPdf, breekAf } from './pdf.js';
import { SITE, ADRES } from '../../data/site.js';
import {
  KLEUR, LINKS, RECHTS, kopbalk, voetregel, blokkop, invulregel,
} from './opmaak.js';

/**
 * Hoort het formulier bij deze offerte?
 *
 * Dezelfde twee voorwaarden als bij de bedenktijd zelf in kernpunten():
 * op afstand gesloten én een consument. Een zakelijke klant heeft geen
 * herroepingsrecht, dus voor hem is dit blad een belofte die de wet niet
 * vraagt. Staat de klant in de werkplaats, dan bestaat het recht ook niet.
 */
export function hoortErBij(offerte = {}) {
  return !!offerte.opAfstand && !offerte.zakelijk;
}

export function herroepingBestandsnaam(offerte = {}) {
  return ['modelformulier-herroeping', offerte.nummer].filter(Boolean).join('-') + '.pdf';
}

/**
 * Het blad zelf. Eén pagina, in dezelfde opmaak als de offerte, zodat de
 * klant ziet dat het bij elkaar hoort en niet ergens vandaan geplukt is.
 */
export function herroepingPdf(offerte = {}) {
  const nummer = offerte.nummer || '';
  const klant = offerte.klant?.naam || '';
  const datum = offerte.datum || new Date();

  const doc = nieuwPdf({
    titel: ['Modelformulier voor herroeping', nummer].filter(Boolean).join(' — '),
    maker: SITE.name,
  });

  let y = kopbalk(doc, { soort: 'Herroeping', nummer: nummer || '—', datum }) + 26;

  doc.tekst('Modelformulier voor herroeping', LINKS, y, { grootte: 16, vet: true });
  y += 15;
  doc.tekst(
    '(dit formulier alleen invullen en terugzenden wanneer u de overeenkomst wilt herroepen)',
    LINKS, y, { grootte: 9, kleur: KLEUR.zacht },
  );
  y += 30;

  /* Aan wie het gericht moet worden. Dat hoort de ondernemer zelf in te
     vullen, anders moet de klant het opzoeken op het moment dat hij juist
     van je af wil. */
  blokkop(doc, 'Aan', LINKS, y);
  y += 14;
  for (const regel of [SITE.name, ADRES, `${SITE.email}  ·  ${SITE.phoneDisplay}`]) {
    doc.tekst(regel, LINKS, y, { grootte: 10 });
    y += 13;
  }
  y += 16;

  const verklaring =
    'Ik/Wij (*) deel/delen (*) u hierbij mede dat ik/wij (*) onze overeenkomst betreffende ' +
    'de verkoop van de volgende goederen/levering van de volgende dienst (*) herroep/herroepen (*):';
  for (const stuk of breekAf(verklaring, RECHTS - LINKS, 10)) {
    doc.tekst(stuk, LINKS, y, { grootte: 10 });
    y += 14;
  }
  y += 10;

  /* Wat we al weten vullen we voor. De klant hoeft dan niet op te zoeken
     over welke offerte het ging, en wij weten meteen welke het is. */
  const velden = [
    ['Offerte- of ordernummer', nummer],
    ['Overeenkomst gesloten op (*) / ontvangen op (*)', ''],
    ['Naam consument(en)', klant],
    ['Adres consument(en)', ''],
    ['IBAN voor de terugbetaling', ''],
    ['Datum', ''],
  ];
  for (const [label, ingevuld] of velden) {
    doc.tekst(label, LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
    y += 15;
    if (ingevuld) doc.tekst(ingevuld, LINKS, y - 3, { grootte: 10.5, vet: true });
    invulregel(doc, LINKS, y, RECHTS - LINKS);
    y += 22;
  }

  y += 6;
  doc.tekst('Handtekening van consument(en)', LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
  doc.tekst('(alleen wanneer dit formulier op papier wordt ingediend)', LINKS + 150, y, {
    grootte: 8, kleur: KLEUR.zacht,
  });
  y += 46;
  invulregel(doc, LINKS, y, (RECHTS - LINKS) / 2);
  y += 24;

  doc.tekst('(*) Doorhalen wat niet van toepassing is.', LINKS, y, {
    grootte: 8, kleur: KLEUR.zacht,
  });
  y += 30;

  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijnZacht);
  y += 18;
  /* Deze alinea stond er onvoorwaardelijk: binnen 14 dagen terugbetalen, met
     als enige aftrekpost het evenredige bedrag. Daarmee gaf dit blad twee
     dingen weg die de wet wél geeft. Dat we mogen wachten tot de apparatuur
     terug is — en bij een ingebouwde installatie is dat het enige echte
     drukmiddel. En de waardevermindering van apparatuur die in- en weer
     uitgebouwd is, die hier als aftrekpost ontbrak. Een formulier dat gunstiger
     is dan de voorwaarden achterop telt, want de klant mag de voor hem
     gunstigste tekst kiezen. Zie artikel 4. */
  const toelichting =
    'U hoeft dit formulier niet te gebruiken: een eigen, ondubbelzinnige mededeling per e-mail ' +
    `of WhatsApp binnen de termijn is net zo geldig. Stuur het naar ${SITE.email} of via ` +
    'WhatsApp. Reeds betaalde bedragen worden binnen 14 dagen na uw melding terugbetaald, onder ' +
    'aftrek van het evenredige bedrag en de waardevermindering die in artikel 4 van onze ' +
    'algemene voorwaarden staan. Is de apparatuur in uw voertuig gemonteerd, dan mogen wij met ' +
    'de terugbetaling wachten tot wij die terug hebben of tot u het voertuig daarvoor in de ' +
    'werkplaats heeft aangeboden.';
  for (const stuk of breekAf(toelichting, RECHTS - LINKS, 9)) {
    doc.tekst(stuk, LINKS, y, { grootte: 9, kleur: KLEUR.zacht });
    y += 12.5;
  }

  voetregel(doc, 1);
  return doc;
}
