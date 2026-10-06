/**
 * HET MODELFORMULIER VOOR HERROEPING.
 *
 * Twee dingen moeten kloppen. Het formulier moet meegaan wanneer de wet het
 * vraagt en wegblijven wanneer ze dat niet doet — een zakelijke klant heeft
 * geen bedenktijd, en hem er een beloven is een recht weggeven. En de
 * wettelijke modeltekst moet er letterlijk op staan: dat blad is er niet om
 * mooi te lezen maar om te kloppen.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  herroepingPdf, herroepingBestandsnaam, hoortErBij,
} from '../src/lib/headroom/herroeping.js';
import { kernpunten, volledigeVoorwaarden } from '../src/lib/headroom/voorwaarden.js';
import { offertePdf } from '../src/lib/headroom/offerte-pdf.js';
import { factuurPdf } from '../src/lib/headroom/factuur.js';
import { STANDAARD_INSTELLINGEN } from '../src/lib/headroom/rekenen.js';
import { SITE, ADRES } from '../src/data/site.js';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OFFERTE = {
  nummer: '2026-145',
  datum: new Date('2026-09-28'),
  opAfstand: true,
  zakelijk: false,
  klant: { naam: 'Arjen van der Veen', telefoon: '06 12 34 56 78' },
  auto: { kenteken: 'XX99XX', merk: 'Ford', model: 'Focus', bouwjaar: '2016' },
};

const tekstVan = (offerte) =>
  Buffer.from(herroepingPdf(offerte).naarBytes()).toString('latin1');

describe('wanneer het formulier meegaat', () => {
  test('bij een consument die op afstand afspreekt', () => {
    assert.equal(hoortErBij({ opAfstand: true }), true);
    assert.equal(hoortErBij({ opAfstand: true, zakelijk: false }), true);
  });

  test('niet bij een zakelijke klant: die heeft geen bedenktijd', () => {
    assert.equal(hoortErBij({ opAfstand: true, zakelijk: true }), false);
  });

  test('niet als de afspraak in de werkplaats is gemaakt', () => {
    assert.equal(hoortErBij({ opAfstand: false }), false);
    assert.equal(hoortErBij({}), false);
  });

  test('dezelfde twee voorwaarden als de bedenktijd op de offerte', () => {
    /* Gaan die twee uit elkaar lopen, dan belooft de offerte een bedenktijd
       zonder formulier of andersom. */
    for (const geval of [
      { opAfstand: true, zakelijk: false },
      { opAfstand: true, zakelijk: true },
      { opAfstand: false, zakelijk: false },
      { opAfstand: false, zakelijk: true },
    ]) {
      const punten = kernpunten({ ...geval, geldigTot: '28-10-2026' }).join(' ');
      assert.equal(
        hoortErBij(geval),
        /bedenktijd/.test(punten),
        `formulier en bedenktijd lopen uit elkaar bij ${JSON.stringify(geval)}`
      );
    }
  });

  test('de offerte noemt het formulier zodra het meegaat', () => {
    const met = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(met, /modelformulier voor herroeping/i);
    const zonder = kernpunten({ opAfstand: true, zakelijk: true }).join(' ');
    assert.doesNotMatch(zonder, /modelformulier/i);
  });

  test('de offerte zegt wanneer de 14 dagen ingaan', () => {
    /* Niet vanaf de afspraak maar vanaf de ontvangst van de auto: een klus
       is onderdelen plus montage, en dan gelden alleen de regels voor
       consumentenkoop (art. 6:230g lid 2 BW). Stond er iets anders, dan is
       dat onjuiste informatie en rekt de termijn op tot twaalf maanden. */
    const punten = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(punten, /gaan in op de dag nadat je je auto/);
    assert.doesNotMatch(punten, /dag na het sluiten van de overeenkomst/);
  });

  test('de voorwaarden zetten het beginmoment uit elkaar', () => {
    const alles = volledigeVoorwaarden().artikelen
      .flatMap((a) => a.punten).join(' ');
    assert.match(alles, /6:230g lid 2/, 'de grondslag ontbreekt');
    assert.match(alles, /nadat de Klant het Voertuig met de gemonteerde apparatuur heeft ontvangen/);
    /* De dienstregel mag er staan, maar alleen voor werk zonder onderdelen. */
    assert.match(alles, /uitsluitend een dienst zonder levering van onderdelen/);
  });

  test('het vervallen bij een afgeronde dienst spreekt het beginmoment niet tegen', () => {
    /* Zou het recht vervallen zodra het werk af is, dan zou het bij een klus
       met onderdelen nooit beginnen — precies het omgekeerde van wat lid 3
       zegt. Die uitzondering hoort alleen bij werk zonder onderdelen. */
    const alles = volledigeVoorwaarden().artikelen
      .flatMap((a) => a.punten).join(' ');
    assert.match(alles, /uitsluitend een dienst zonder levering van onderdelen, dan vervalt/);
    assert.doesNotMatch(alles, /Het herroepingsrecht vervalt zodra de dienst volledig is uitgevoerd/);
  });

  test('de voorwaarden beloven het formulier ook', () => {
    const alles = volledigeVoorwaarden().artikelen
      .flatMap((a) => a.punten).join(' ');
    assert.match(alles, /modelformulier voor herroeping/i);
  });
});

describe('het blad zelf', () => {
  test('past op één pagina', () => {
    assert.equal(herroepingPdf(OFFERTE).paginas, 1);
  });

  test('de wettelijke modeltekst staat er letterlijk op', () => {
    const pdf = tekstVan(OFFERTE);
    assert.match(pdf, /Modelformulier voor herroeping/);
    assert.match(pdf, /dit formulier alleen invullen en terugzenden/);
    assert.match(pdf, /Ik\/Wij \\\(\*\\\) deel\/delen \\\(\*\\\) u hierbij mede/);
    assert.match(pdf, /herroep\/herroepen \\\(\*\\\)/);
    assert.match(pdf, /Doorhalen wat niet van toepassing is/);
    for (const veld of [
      'Naam consument', 'Adres consument', 'Handtekening van consument',
      'Offerte- of ordernummer', 'IBAN voor de terugbetaling',
    ]) {
      assert.ok(pdf.includes(veld), `het veld "${veld}" ontbreekt`);
    }
  });

  test('de klant kan zien naar wie hij het moet sturen', () => {
    const pdf = tekstVan(OFFERTE);
    assert.ok(pdf.includes(SITE.name), 'de bedrijfsnaam staat er niet op');
    assert.ok(pdf.includes(ADRES), 'het adres staat er niet op');
    assert.ok(pdf.includes(SITE.email), 'het e-mailadres staat er niet op');
  });

  test('nummer en naam staan voorgevuld', () => {
    const pdf = tekstVan(OFFERTE);
    assert.match(pdf, /2026-145/);
    assert.match(pdf, /Arjen van der Veen/);
  });

  test('het zegt erbij dat het formulier niet verplicht is', () => {
    /* Een consument mag ook gewoon een berichtje sturen. Suggereren dat
       dit blad de enige weg is, maakt het hem moeilijker dan de wet doet. */
    assert.match(tekstVan(OFFERTE), /hoeft dit formulier niet te gebruiken/i);
  });

  test('zonder nummer of klant loopt hij niet stuk', () => {
    const doc = herroepingPdf({});
    assert.equal(doc.paginas, 1);
    assert.ok(doc.naarBytes().length > 0);
  });
});

describe('de bestandsnaam', () => {
  test('draagt het offertenummer, zodat twee bladen niet op elkaar vallen', () => {
    assert.equal(herroepingBestandsnaam(OFFERTE), 'modelformulier-herroeping-2026-145.pdf');
  });

  test('is verschillend van die van de offerte', () => {
    assert.notEqual(herroepingBestandsnaam(OFFERTE), 'offerte-2026-145-XX99XX.pdf');
  });

  test('blijft een geldige naam zonder nummer', () => {
    assert.equal(herroepingBestandsnaam({}), 'modelformulier-herroeping.pdf');
  });
});

/**
 * WAT DE KLANT BIJ HERROEPING WÉL EN NIET BETAALT.
 *
 * Artikel 4 zei twee dingen die niet klopten. Dat de klant bij ontbinding de
 * "speciaal voor het Voertuig bestelde onderdelen" betaalt — die gaan terug en
 * dat geld gaat terug. En dat het verrichte werk "tegen het geldende uurtarief"
 * wordt afgerekend — er staat geen uurtarief op de offerte, en de wet rekent
 * het evenredige deel over de overeengekomen totaalprijs.
 *
 * Allebei die fouten zijn informatie over het herroepingsrecht, en onjuiste
 * informatie daarover kost drie dingen tegelijk: de termijn loopt op tot
 * twaalf maanden, de aanspraak op waardevermindering vervalt, en voor het
 * verrichte werk is helemaal niets verschuldigd. Deze tests houden ze eruit.
 */
const alleVoorwaarden = () =>
  volledigeVoorwaarden().artikelen.flatMap((a) => a.punten).join(' ');

const artikel4 = () =>
  volledigeVoorwaarden().artikelen
    .find((a) => /Artikel 4/.test(a.kop)).punten.join(' ');

describe('wat de klant bij herroeping betaalt', () => {
  test('de onderdelen gaan terug en worden niet betaald', () => {
    const tekst = artikel4();
    assert.match(tekst, /gaan de geleverde onderdelen terug naar Audio Upgrade Emmen/);
    assert.match(tekst, /gaat het daarvoor betaalde bedrag terug naar de Klant/);
    /* De oude formulering mag nergens meer staan. */
    assert.doesNotMatch(tekst, /speciaal voor het Voertuig bestelde onderdelen/);
  });

  test('het werk wordt niet tegen een uurtarief afgerekend', () => {
    const tekst = artikel4();
    assert.doesNotMatch(tekst, /tegen het geldende uurtarief/);
    assert.match(tekst, /evenredig is aan dat gedeelte van de verbintenis/);
    assert.match(tekst, /berekend over de voor deze opdracht overeengekomen totaalprijs/);
    assert.match(tekst, /geen uurtarief en geen urenopgave/);
  });

  test('zonder verzoek of met onjuiste informatie is er niets verschuldigd', () => {
    /* Dit staat erin omdat het de wet is, niet omdat het ons gunstig is: het
       is precies de sanctie die het oude lid 4 over ons afriep. */
    /* De bijlage strijkt **vet** weg, dus hier staat "niets" zonder sterretjes. */
    assert.match(artikel4(), /niet of onjuist geïnformeerd, dan is hij voor de Werkzaamheden niets verschuldigd/);
  });

  test('de waardevermindering staat erin, en de voorwaarde eraan ook', () => {
    const tekst = artikel4();
    assert.match(tekst, /aansprakelijk voor de waardevermindering van de geleverde onderdelen/);
    assert.match(tekst, /aard, de kenmerken en de werking ervan vast te stellen/);
    /* Hij vervalt als de klant niet vooraf is geïnformeerd. Dat hoort erbij,
       anders staat er alleen wat ons uitkomt. */
    assert.match(tekst, /niet vooraf over zijn herroepingsrecht geïnformeerd, dan is hij deze waardevermindering niet verschuldigd/);
  });

  test('het recht om met terugbetalen te wachten is niet weggegeven', () => {
    /* Bij een ingebouwde installatie is dit het enige echte drukmiddel. Artikel
       4 beloofde eerder onvoorwaardelijk binnen 14 dagen te betalen. */
    assert.match(artikel4(), /mag Audio Upgrade Emmen met de terugbetaling wachten/);
    /* En het formulier mag het niet alsnog weggeven: de klant mag de voor hem
       gunstigste tekst kiezen. */
    assert.match(tekstVan(OFFERTE), /mogen wij met de terugbetaling wachten/);
    assert.match(tekstVan(OFFERTE), /waardevermindering/);
  });

  test('de kosten van het terugbrengen staan erin', () => {
    /* Verplichte informatie vooraf. Staat ze er niet, dan draagt Justus die
       kosten zelf. */
    assert.match(artikel4(), /rechtstreekse kosten van het terugbrengen draagt de Klant/);
    const punten = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(punten, /het rijden naar de werkplaats is voor jou/);
  });
});

describe('de 25% van artikel 9 botst niet meer met de bedenktijd', () => {
  test('artikel 4 zet artikel 9, 10 en 5 buiten toepassing', () => {
    const tekst = artikel4();
    assert.match(tekst, /Artikel 9 over annulering en no-show blijft dan buiten toepassing/);
    assert.match(tekst, /stallingskosten uit artikel 10/);
    assert.match(tekst, /vrijgave tegen volledige betaling uit artikel 5/);
  });

  test('ook een afzegging zonder het woord herroepen telt', () => {
    assert.match(artikel4(), /ook wanneer hij het woord herroepen niet gebruikt/);
  });

  test('de voorkant belooft niet twee dingen tegelijk', () => {
    /* Bij een consument op afstand staat de 25%-regel met voorbehoud op het
       blad; anders onverkort. Zonder dat voorbehoud leest de klant dat
       afzeggen hem 25% kost terwijl hij dan niets verschuldigd is. */
    const metRecht = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(metRecht, /25%/);
    assert.match(metRecht, /brengen we die 25% niet in rekening/);

    for (const geval of [{ opAfstand: true, zakelijk: true }, { opAfstand: false }]) {
      const zonder = kernpunten(geval).join(' ');
      assert.match(zonder, /25%/);
      assert.doesNotMatch(zonder, /niet in rekening/);
    }
  });
});

describe('de punten op de voorkant zeggen hetzelfde als artikel 4', () => {
  test('het startvinkje belooft niet dat de klant de onderdelen betaalt', () => {
    const punten = kernpunten({ opAfstand: true, zakelijk: false, startDirect: true }).join(' ');
    assert.match(punten, /gaan de onderdelen terug en krijg je dat geld terug/);
    assert.match(punten, /evenredig deel van het afgesproken bedrag/);
    assert.match(punten, /waardevermindering/);
    assert.match(punten, /Een uurtarief rekenen we niet/);
    /* De oude belofte mag nergens meer staan. */
    assert.doesNotMatch(punten, /onderdelen die\s+speciaal voor jouw auto zijn besteld/);
    assert.doesNotMatch(punten, /speciaal voor jouw auto zijn besteld/);
  });

  test('zonder startvinkje blijft dat punt weg', () => {
    const punten = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.doesNotMatch(punten, /uitdrukkelijk om te beginnen/);
  });

  test('een voorgedrukt vinkje geldt niet als verzoek van de klant', () => {
    /* Daarom staat `startDirect` standaard uit en moet het verzoek van de klant
       zelf komen. Zou de app het vinkje vanzelf aanzetten, dan beweert de
       offerte iets wat de klant nooit heeft gevraagd. */
    assert.match(artikel4(), /voorgedrukt vinkje of een standaardinstelling geldt niet als verzoek/);
  });
});

describe('het maatwerk is niet opgerekt', () => {
  test('apparatuur uit het assortiment is geen maatwerk', () => {
    const tekst = artikel4();
    assert.match(tekst, /geldt uitdrukkelijk niet voor apparatuur uit het assortiment/);
    assert.match(tekst, /Uitzoeken, samenstellen of inkopen is geen vervaardigen/);
  });

  test('de demping loopt via de waardevermindering, niet via een uitzondering', () => {
    /* De uitzondering voor onherroepelijk vermengde zaken is hier niet gebruikt:
       verlijmd butyl wordt bestanddeel en niet "vermengd", en een artikel bouwen
       op een uitzondering die niet past kost meer dan het oplevert. */
    const tekst = artikel4();
    assert.match(tekst, /Ook voor de deurdemping en het ontdreuningsmateriaal kan de Klant ontbinden/);
    assert.match(tekst, /ten hoogste de waarde van het materiaal zelf/);
    assert.doesNotMatch(tekst, /onherroepelijk vermengd/);
  });
});

describe('alle voorwaarden samen', () => {
  test('de twee foute beloftes staan in geen enkel artikel meer', () => {
    /* Niet alleen in artikel 4 kijken: zou een van deze zinnen ooit in een ander
       artikel opduiken, dan is het effect hetzelfde. */
    const alles = alleVoorwaarden();
    assert.doesNotMatch(alles, /speciaal voor het Voertuig bestelde onderdelen/);
    assert.doesNotMatch(alles, /reeds verrichte werk tegen het geldende uurtarief/);
  });

  test('artikel 4 gaat voor, en de wet gaat voor artikel 4', () => {
    const tekst = artikel4();
    assert.match(tekst, /ook niet langs artikel 2/);
    assert.match(tekst, /wijkt het daarvan op enig punt ten nadele van de Klant af, dan geldt de wet/);
  });
});

/**
 * HET OFFERTESCRIPT MOET HET FORMULIER OOK MAKEN.
 *
 * De deelknop in de app deed dat al, `npm run offerte` niet. Dan verstuur je een
 * offerte die op de voorkant zegt dat het formulier erbij zit terwijl er één
 * bestand uit het script rolt — en juist die bijlage is wat de wet vraagt.
 * Daarom draaien deze twee tests het echte script, in een tijdelijke map.
 */
describe('het offertescript levert de bijlage mee', () => {
  const script = fileURLToPath(new URL('../scripts/offerte.mjs', import.meta.url));

  function draai(extra) {
    const map = mkdtempSync(join(tmpdir(), 'offerte-'));
    const blad = join(map, 'invoer.json');
    writeFileSync(blad, JSON.stringify({
      nummer: '2026-900',
      datum: '2026-10-01',
      klant: { naam: 'Testklant' },
      auto: { kenteken: 'XX99XX', merk: 'Ford', model: 'Focus' },
      regels: [{ omschrijving: 'Werk', incl: '345,00' }],
      verwachtTotaalIncl: '345,00',
      ...extra,
    }));
    execFileSync(process.execPath, [script, '--invoer', blad, '--uit', map], { encoding: 'utf8' });
    return readdirSync(map).filter((n) => n.endsWith('.pdf')).sort();
  }

  test('bij een consument op afstand komen er twee bestanden uit', () => {
    const bestanden = draai({ opAfstand: true });
    assert.equal(bestanden.length, 2, bestanden.join(', '));
    assert.match(bestanden[1], /^offerte-2026-900-XX99XX\.pdf$/);
    assert.match(bestanden[0], /^modelformulier-herroeping-2026-900\.pdf$/);
  });

  test('zonder herroepingsrecht blijft het bij de offerte alleen', () => {
    assert.deepEqual(draai({ opAfstand: false }), ['offerte-2026-900-XX99XX.pdf']);
    assert.deepEqual(draai({ opAfstand: true, zakelijk: true }), ['offerte-2026-900-XX99XX.pdf']);
  });
});

describe('alleen werk, geen nieuwe onderdelen', () => {
  /* Bijvoorbeeld alleen het inmeten en afstellen van een installatie die er
     al in zit. Dan is het een dienst: de bedenktijd loopt vanaf het akkoord,
     en niet vanaf het ophalen van de auto. Stond daar de zin voor een klus
     met onderdelen, dan viel het werk zelf binnen de bedenktijd, en dan is de
     klant voor dat werk niets verschuldigd als hij zich daarna bedenkt. */
  const WERK = { opAfstand: true, zakelijk: false, alleenWerk: true };

  /* De tekst van een pdf als één lopende zin: de regels die breekAf maakte
     weer aan elkaar, zodat een zin over twee regels gewoon te vinden is. */
  const lopend = (bytes) => [...Buffer.from(bytes).toString('latin1')
    .matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)]
    .map((m) => m[1].replace(/\\(.)/g, '$1'))
    .join(' ')
    .replace(/\s+/g, ' ');

  test('de bedenktijd begint bij het akkoord, niet bij het ophalen', () => {
    const punten = kernpunten(WERK).join(' ');
    assert.match(punten, /14 dagen bedenktijd/);
    assert.match(punten, /op de dag nadat je akkoord geeft/);
    /* Komt de offerte pas na het akkoord, dan telt de dag dat hij hem krijgt. */
    assert.match(punten, /nooit eerder dan de dag nadat je de offerte hebt ontvangen/);
    assert.doesNotMatch(punten, /met de nieuwe apparatuur erin terugkrijgt/);
  });

  test('er is niets uit te bouwen, en afzeggen vooraf kost niets', () => {
    const punten = kernpunten(WERK).join(' ');
    assert.doesNotMatch(punten, /apparatuur eruit kunnen halen/);
    assert.match(punten, /betaal je niets en krijg je een aanbetaling volledig terug/);
    assert.doesNotMatch(punten, /bestelde onderdelen/);
    assert.doesNotMatch(punten, /Levertijd van onderdelen/);
  });

  test('het modelformulier hoort er nog steeds bij', () => {
    assert.equal(hoortErBij(WERK), true);
    assert.match(kernpunten(WERK).join(' '), /modelformulier voor herroeping zit bij deze offerte/);
  });

  test('met het startvinkje: de bedenktijd vervalt als het werk klaar is', () => {
    const punten = kernpunten({ ...WERK, startDirect: true }).join(' ');
    assert.match(punten, /uitdrukkelijk om te beginnen/);
    assert.match(punten, /vervalt zodra het werk helemaal klaar is/);
    assert.match(punten, /evenredig deel van het afgesproken bedrag/);
    /* Geen onderdelen, dus ook geen zin over onderdelen die teruggaan. */
    assert.doesNotMatch(punten, /onderdelen terug/);
    assert.doesNotMatch(punten, /waardevermindering/);
  });

  test('zonder bedenktijd verandert er aan de bedenktijd niets', () => {
    for (const geval of [{ opAfstand: false }, { opAfstand: true, zakelijk: true }]) {
      const punten = kernpunten({ ...geval, alleenWerk: true }).join(' ');
      assert.doesNotMatch(punten, /bedenktijd/i);
    }
  });

  test('zonder het vinkje blijft alles zoals het was', () => {
    const punten = kernpunten({ opAfstand: true, zakelijk: false }).join(' ');
    assert.match(punten, /met de nieuwe apparatuur erin terugkrijgt/);
    assert.match(punten, /het rijden naar de werkplaats is voor jou/);
    assert.match(punten, /de al bestelde onderdelen/);
  });

  test('artikel 4 achterop zegt hetzelfde als de voorkant', () => {
    assert.match(
      artikel4(),
      /uitsluitend een dienst zonder levering van onderdelen, zoals alleen het inmeten en afstellen van een bestaande installatie, dan begint de termijn op de dag na het sluiten van de overeenkomst/
    );
  });

  test('de offerte en de factuur nemen het vinkje over', () => {
    const offerte = {
      ...OFFERTE,
      ...WERK,
      geldigTot: new Date('2026-10-28'),
      regels: [{ omschrijving: 'Inmeten en afstellen', aantal: 1, vastExclCent: 53306 }],
    };
    for (const bytes of [
      offertePdf(offerte, STANDAARD_INSTELLINGEN).naarBytes(),
      factuurPdf(offerte, STANDAARD_INSTELLINGEN, { soort: 'aanbetaling', nummer: '2026-F900' }).naarBytes(),
    ]) {
      const tekst = lopend(bytes);
      assert.match(tekst, /op de dag nadat je akkoord geeft/);
      assert.doesNotMatch(tekst, /met de nieuwe apparatuur erin terugkrijgt/);
    }
  });
});
