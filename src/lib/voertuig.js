/**
 * WAT DE RDW-GEGEVENS BETEKENEN VOOR HET GELUID.
 *
 * De RDW geeft veel meer terug dan merk en model. Uit een handvol van die
 * velden valt iets zinnigs te zeggen over de auto van de bezoeker — en dat is
 * precies wat een pagina persoonlijk maakt: niet "wij doen car audio", maar
 * "jouw auto is 26 jaar oud, dus je speakers zijn waarschijnlijk vergaan".
 *
 * De regel hierbij: alleen dingen zeggen die we ook kunnen waarmaken. Geen
 * "jouw auto heeft 6 speakers" als we dat niet weten. Wat hier staat volgt
 * rechtstreeks uit een RDW-veld en uit hoe geluid in een auto werkt.
 *
 * Bewust NIET gebruikt: geluidsniveau_rijdend en geluidsniveau_stationair.
 * Dat zijn typekeuringswaarden van het geluid dat de auto naar BUITEN maakt,
 * gemeten naast de weg. Ze zeggen niets over hoe stil het bínnen is, en zo
 * gebruiken zou de klant misleiden.
 */

/** '19990906' → 1999. Geeft null als er niets bruikbaars staat. */
export function bouwjaar(datumEersteToelating) {
  const s = String(datumEersteToelating || '');
  const jaar = Number(s.slice(0, 4));
  return jaar >= 1900 && jaar <= 2100 ? jaar : null;
}

/** Leeftijd in hele jaren, of null. */
export function leeftijd(datumEersteToelating, nu = new Date()) {
  const jaar = bouwjaar(datumEersteToelating);
  return jaar === null ? null : Math.max(0, nu.getFullYear() - jaar);
}

/**
 * De brandstofregels van de RDW samenvatten tot één woord.
 *
 * Let op: de RDW geeft één regel PER brandstof. Een hybride staat er dus
 * twee keer in — één keer benzine, één keer elektriciteit. Daarom kijken we
 * naar de hele lijst en niet naar de eerste regel.
 */
export function brandstofSoort(regels) {
  const soorten = (Array.isArray(regels) ? regels : [])
    .map((r) => String(r.brandstof_omschrijving || '').toLowerCase())
    .filter(Boolean);

  if (!soorten.length) return null;

  const elektrisch = soorten.includes('elektriciteit');
  const verbranding = soorten.some((s) =>
    ['benzine', 'diesel', 'lpg', 'cng', 'lng', 'alcohol'].includes(s)
  );

  if (elektrisch && verbranding) return 'hybride';
  if (elektrisch) return 'elektrisch';
  if (soorten.includes('diesel')) return 'diesel';
  if (soorten.includes('waterstof')) return 'elektrisch';
  return 'benzine';
}

const BRANDSTOF_TEKST = {
  elektrisch: {
    kop: 'Volledig elektrisch',
    tekst:
      'Zonder motorgeluid hoor je alles — nu nog vooral wat je speakers niet kunnen, straks elk detail. Elektrische auto\'s winnen van alle auto\'s het meest bij een upgrade.',
  },
  hybride: {
    kop: 'Hybride',
    tekst:
      'Een deel van de tijd rijd je stil. Juist dan valt op wat het fabriekssysteem niet kan, en juist dan hoor je het verschil het duidelijkst.',
  },
  diesel: {
    kop: 'Diesel',
    tekst:
      'Een dieselmotor zet lage trillingen in het plaatwerk. Demping doet hier dubbel werk: het wordt stiller én de bas wordt strakker, omdat de deur niet meer meetrilt.',
  },
  benzine: {
    kop: 'Benzine',
    tekst:
      'Op de snelweg is rolgeluid je grootste concurrent, niet de motor. Daarom begint elk pakket bij ons met demping en niet met meer vermogen.',
  },
};

const CARROSSERIE_TEKST = {
  hatchback: {
    kop: 'Hatchback',
    tekst:
      'Cabine en bagageruimte lopen in elkaar over. Dat helpt de bas een handje, maar laat ook het rolgeluid van achteren ongehinderd door.',
  },
  stationwagen: {
    kop: 'Stationwagen',
    tekst:
      'Die lange laadruimte werkt als klankkast: mooi voor de bas, maar ook de plek waar het meeste rolgeluid binnenkomt. Vloer en achterklep dempen pakt allebei aan.',
  },
  mpv: {
    kop: 'MPV',
    tekst:
      'Veel ruimte om te vullen. Hier is een subwoofer geen luxe maar het verschil tussen geluid dat meekomt en geluid dat de auto vult.',
  },
  sedan: {
    kop: 'Sedan',
    tekst:
      'De kofferbak is gescheiden van de cabine. Akoestisch is dat rustig, maar het vraagt om een subwoofer die goed door de hoedenplank heen werkt.',
  },
  coupe: {
    kop: 'Coupé',
    tekst:
      'Twee grote deurpanelen en een korte cabine. Akoestisch een van de dankbaarste vormen die er is — hier haal je snel een groot verschil.',
  },
  cabriolet: {
    kop: 'Cabriolet',
    tekst:
      'Met het dak open verlies je vrijwel je hele bas. Met de juiste plaatsing en een aparte afstemming voor open rijden houd je een compleet geluidsbeeld.',
  },
};

/** RDW schrijft 'MPV' en 'hatchback' door elkaar heen; dit maakt er één sleutel van. */
function carrosserieSleutel(inrichting) {
  const s = String(inrichting || '').toLowerCase().trim();
  if (!s || s === 'niet geregistreerd') return null;
  if (s.includes('station')) return 'stationwagen';
  if (s.includes('mpv')) return 'mpv';
  if (s.includes('sedan')) return 'sedan';
  if (s.includes('cabrio')) return 'cabriolet';
  if (s.includes('coupe') || s.includes('coupé')) return 'coupe';
  if (s.includes('hatchback')) return 'hatchback';
  return null;
}

function leeftijdTekst(jaren, jaar) {
  if (jaren === null) return null;
  if (jaren >= 18) {
    return {
      kop: `${jaren} jaar oud`,
      tekst:
        'De schuimrand rond een speakerconus vergaat in vijftien tot twintig jaar. Klinkt je bas dun terwijl er niets kapot lijkt? Dan is dit bijna zeker de oorzaak.',
    };
  }
  if (jaren >= 10) {
    return {
      kop: `${jaren} jaar oud`,
      tekst:
        'Rond deze leeftijd beginnen fabrieksspeakers hun bas te verliezen. Dat gaat zo langzaam dat je het zelf nauwelijks merkt — tot je het verschil hoort.',
    };
  }
  if (jaren >= 4) {
    return {
      kop: `Uit ${jaar}`,
      tekst:
        'Nog geen slijtage, wel de zuinigheid van de fabriek: het vermogen voor al je speakers komt uit één klein eindtrapje in de radio.',
    };
  }
  return {
    kop: `Uit ${jaar}`,
    tekst:
      'Zo goed als nieuw. Alles wat wij doen is Plug & Play en volledig terug te bouwen, dus je fabrieksgarantie blijft ongemoeid.',
  };
}

/**
 * Maakt van de RDW-gegevens maximaal vier korte inzichten.
 *
 *   voertuig   de regel uit m9d7-ebf2
 *   brandstof  de regels uit 8ys7-d773 (mag ontbreken)
 *
 * Vier is bewust het maximum: dit staat naast de pakketten en moet in één
 * blik te lezen zijn, niet nog een lap tekst worden.
 */
export function inzichten(voertuigIn, brandstof, nu = new Date()) {
  // Let op: een standaardwaarde springt alleen in bij `undefined`, niet bij
  // `null`. En `null` is precies wat JSON.parse van sessionStorage teruggeeft
  // als er ooit iets misging. Vandaar deze extra vangnetten.
  const voertuig = voertuigIn || {};
  const uit = [];

  const soort = brandstofSoort(brandstof);
  if (soort && BRANDSTOF_TEKST[soort]) uit.push(BRANDSTOF_TEKST[soort]);

  const jaren = leeftijd(voertuig.datum_eerste_toelating, nu);
  const ouderdom = leeftijdTekst(jaren, bouwjaar(voertuig.datum_eerste_toelating));
  if (ouderdom) uit.push(ouderdom);

  const vorm = carrosserieSleutel(voertuig.inrichting);
  if (vorm && CARROSSERIE_TEKST[vorm]) uit.push(CARROSSERIE_TEKST[vorm]);

  const zitplaatsen = Number(voertuig.aantal_zitplaatsen);
  if (zitplaatsen >= 7) {
    uit.push({
      kop: `${zitplaatsen} zitplaatsen`,
      tekst:
        'Achterin zitten de mensen die nu het minste horen. Met een DSP stemmen we af op alle rijen in plaats van alleen op de bestuurdersstoel.',
    });
  }

  return uit.slice(0, 4);
}

/** De feitenregel onder de kentekenplaat: kleur · carrosserie · brandstof · jaar. */
export function kenmerken(voertuigIn, brandstof, kleurNaam) {
  const voertuig = voertuigIn || {};
  const delen = [];
  if (kleurNaam) delen.push(kleurNaam);
  if (voertuig.inrichting && voertuig.inrichting !== 'Niet geregistreerd') {
    delen.push(voertuig.inrichting);
  }
  const soort = brandstofSoort(brandstof);
  if (soort) delen.push(soort === 'elektrisch' ? 'elektrisch' : soort);
  const jaar = bouwjaar(voertuig.datum_eerste_toelating);
  if (jaar) delen.push(String(jaar));
  return delen;
}
