export const SITE = {
  name: 'Audio Upgrade Emmen',
  /** Zonder schuine streep aan het eind — overal waar we adressen bouwen. */
  url: 'https://audioupgradeemmen.nl',
  phone: '+31644379844',
  /**
   * Internationaal genoteerd, dus zonder de nul vooraan. Die nul hoort alleen
   * bij binnenlands bellen; in de +31-vorm vervangt de landcode hem. "+31 06"
   * is een veelgemaakte fout en werkt op sommige toestellen niet.
   */
  phoneDisplay: '+31 6 44 37 98 44',
  email: 'info@audioupgradeemmen.nl',
  whatsapp: 'https://wa.me/message/RDCWOKTCKSPIF1',
  kvk: '96356723',
  btw: 'NL005205204B66',
  /**
   * WIE ER ONDER HET WERK STAAT.
   *
   * Het meetrapport dat de klant meekrijgt, is ondertekend. Niet met een
   * bedrijfsnaam maar met een mens: iemand heeft die auto zelf gemeten en
   * afgesteld, en dat is precies waar de klant voor betaald heeft.
   *
   * Staat hier en niet in het meetrapport zelf, want zodra hij ergens anders
   * ook nodig is — een e-mailhandtekening, een garantiebewijs — moet hij daar
   * vanzelf kloppen.
   */
  eigenaar: 'J.A. Nassi',
  eigenaarRol: 'Eigenaar / OEM+ Integration Specialist',
  /**
   * TWEE ADRESSEN, en het verschil is belangrijk.
   *
   *   street / postalCode   De werkplaats. Hier komt de klant naartoe en hier
   *                         staat de auto. Dit adres hoort op de site, op de
   *                         kaart en in de gegevens voor Google.
   *   postStreet / postPost De brievenbus. Alleen voor post. Dit adres hoort
   *                         NIET op de contactpagina — dan komt er iemand met
   *                         een auto voor de deur staan op de verkeerde plek.
   *
   * In het privacybeleid staat het postadres, want dat is waar een brief over
   * je gegevens heen moet.
   */
  street: 'Charles Darwinstraat 35',
  postalCode: '7825 AB',
  postStreet: 'Vinkenveld 9',
  postPostalCode: '7827 DP',
  city: 'Emmen',
  region: 'Drenthe',
  country: 'NL',
  /** Voor de kaartknop en de routelink. */
  mapsQuery: 'Charles Darwinstraat 35, 7825 AB Emmen',
};

/**
 * De audiomerken waar we mee werken — dezelfde zes als op de oude site.
 * Bewust géén koppeling aan een pakket: zie de uitleg in Merken.astro.
 */
export const AUDIOMERKEN = [
  'Alpine',
  'Pioneer',
  'JL Audio',
  'Musway',
  'Gladen',
  'Mosconi',
  'Steg',
];

/**
 * DE SOCIALE PROFIELEN.
 *
 * Staan in de voettekst en in de machineleesbare gegevens (sameAs). Dat
 * laatste vertelt Google dat deze profielen en de site van hetzelfde bedrijf
 * zijn, en helpt ze samen met het Google-bedrijfsprofiel te koppelen.
 *
 * Krijgt de Facebookpagina een eigen gebruikersnaam (facebook.com/
 * audioupgradeemmen), pas het adres dan hier aan. Het oude adres met het
 * nummer blijft wel werken, maar het nieuwe is wat mensen herkennen.
 */
export const SOCIALS = [
  { naam: 'Instagram', url: 'https://www.instagram.com/audioupgradeemmen/' },
  { naam: 'Facebook', url: 'https://www.facebook.com/p/Audio-Upgrade-Emmen-61590614038019/' },
  { naam: 'LinkedIn', url: 'https://www.linkedin.com/company/audio-upgrade-emmen' },
];

/** Het bezoekadres op één regel: de werkplaats. */
export const ADRES = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;

/**
 * ==========================================================================
 * DE OPENINGSTIJDEN
 * ==========================================================================
 * Hier stond niets, en op de site stond alleen "uitsluitend op afspraak".
 * Dat kostte klanten op twee manieren.
 *
 * Een profiel zonder openingstijden valt buiten het filter "nu geopend" in
 * Google Maps, oogt verlaten, en bedrijvengidsen die de gegevens van Google
 * overnemen zetten er "onbekend" neer. Op afspraak werken is prima — maar
 * dat is een eigenschap van het bedrijf en geen reden om geen tijden te
 * hebben.
 *
 * Voor 24/7 is bewust niet gekozen. Dat leest bij een werkplaats als een
 * leugen, en het ís er ook een: wie 's avonds laat appt en pas de volgende
 * ochtend antwoord krijgt, voelt zich in de maling genomen. Deze hele site
 * draait op vertrouwen (all-in prijzen, levenslange garantie) en daar past
 * geen openingstijd bij die niet waargemaakt wordt.
 *
 * ZATERDAG IS DE BELANGRIJKSTE REGEL VAN DEZE LIJST
 * Car audio is geen pech maar een wens: mensen regelen dat in hun vrije tijd.
 * Zonder zaterdag moet iemand een halve dag vrij nemen om zijn auto te
 * brengen, en dat stelt hij uit tot nooit. De meeste garages in de omgeving
 * zijn zaterdag dicht. Het CarPlay-pakket is in twee uur klaar: dat is
 * precies een zaterdagochtend.
 *
 * De donderdagavond vangt de klant die van negen tot vijf werkt — en dat is
 * ook het moment waarop mensen op hun telefoon kijken wat er in hun auto kan.
 *
 * LET OP: DEZE TIJDEN ZIJN EEN BELOFTE
 * Ze staan op de site, in de machineleesbare gegevens én in het
 * Google-profiel. Die drie moeten gelijk zijn, anders vertrouwt Google er
 * geen van alle. Verandert er iets, pas het hier aan en zet het dezelfde dag
 * in het Google-profiel.
 *
 * Bevestigd door Justus op 12 september 2026.
 */
export const OPENINGSTIJDEN = [
  { dag: 'Maandag', kort: 'ma', schema: 'Monday', open: '09:00', dicht: '17:30' },
  { dag: 'Dinsdag', kort: 'di', schema: 'Tuesday', open: '09:00', dicht: '17:30' },
  { dag: 'Woensdag', kort: 'wo', schema: 'Wednesday', open: '09:00', dicht: '17:30' },
  /* Koopavond: de klant die overdag werkt kan hier alleen 's avonds heen. */
  { dag: 'Donderdag', kort: 'do', schema: 'Thursday', open: '09:00', dicht: '20:00' },
  { dag: 'Vrijdag', kort: 'vr', schema: 'Friday', open: '09:00', dicht: '17:30' },
  { dag: 'Zaterdag', kort: 'za', schema: 'Saturday', open: '09:00', dicht: '14:00' },
  { dag: 'Zondag', kort: 'zo', schema: 'Sunday', gesloten: true },
];

/**
 * De tijden gegroepeerd: opeenvolgende dagen met dezelfde uren bij elkaar.
 * Zo staat er "Maandag t/m woensdag 09:00 - 17:30" in plaats van drie keer
 * dezelfde regel, en zo wil schema.org het ook hebben.
 */
export const openingsblokken = () => {
  const blokken = [];
  for (const dag of OPENINGSTIJDEN) {
    if (dag.gesloten) {
      blokken.push({ dagen: [dag], gesloten: true });
      continue;
    }
    const vorige = blokken[blokken.length - 1];
    const zelfde =
      vorige && !vorige.gesloten && vorige.open === dag.open && vorige.dicht === dag.dicht;
    if (zelfde) vorige.dagen.push(dag);
    else blokken.push({ dagen: [dag], open: dag.open, dicht: dag.dicht });
  }
  return blokken;
};

/**
 * Eén korte regel voor de voettekst.
 *
 * Blok voor blok opsommen werd te lang ("ma t/m wo 09:00–17:30 · do 09:00–
 * 20:00 · vr 09:00–17:30 · za 09:00–14:00"). Daarom: één regel voor de
 * doordeweekse dagen, met de koopavond tussen haakjes als uitzondering, en de
 * zaterdag erachter.
 *
 * `woorden` levert de dagafkortingen en de twee verbindingswoorden, want die
 * verschillen per taal: "ma t/m vr" in het Nederlands, "Mo bis Fr" in het
 * Duits. De tijden zelf zijn overal gelijk. Zie tijdenKortVan() in
 * src/i18n/teksten.js voor de tabellen.
 */
export const tijdenKort = (woorden) => {
  const kortVan = (dag) => woorden[dag.schema] ?? dag.kort;
  const doordeweeks = OPENINGSTIJDEN.filter((d) => !d.gesloten && d.schema !== 'Saturday');
  /* De uren die het vaakst voorkomen zijn de gewone; de rest is uitzondering. */
  const hoevaak = new Map();
  for (const d of doordeweeks) {
    const sleutel = `${d.open}–${d.dicht}`;
    hoevaak.set(sleutel, (hoevaak.get(sleutel) ?? 0) + 1);
  }
  const gewoon = [...hoevaak.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const anders = doordeweeks.filter((d) => `${d.open}–${d.dicht}` !== gewoon);

  const eerste = kortVan(doordeweeks[0]);
  const laatste = kortVan(doordeweeks[doordeweeks.length - 1]);
  let regel = `${eerste} ${woorden.totEnMet} ${laatste} ${gewoon}`;
  if (anders.length) {
    regel += ` (${anders.map((d) => `${kortVan(d)} ${woorden.tot} ${d.dicht}`).join(', ')})`;
  }

  const zaterdag = OPENINGSTIJDEN.find((d) => d.schema === 'Saturday' && !d.gesloten);
  if (zaterdag) regel += ` · ${kortVan(zaterdag)} ${zaterdag.open}–${zaterdag.dicht}`;
  return regel;
};

/** De Nederlandse versie, voor llms.txt en de veelgestelde vragen. */
export const TIJDEN_KORT = tijdenKort({ totEnMet: 't/m', tot: 'tot' });

/**
 * DE VIER AUDIOPAKKETTEN, IN OPLOPENDE PRIJS.
 *
 * Dit is de rij die de bezoeker vergelijkt. Alleen pakketten die over
 * geluidskwaliteit gaan, want dat is wat je tegen elkaar afweegt.
 *
 * Draadloze CarPlay en Akoestische Isolatie staan er bewust naast en niet
 * in. CarPlay gaat over je scherm en je gemak, isolatie over stilte — dat
 * zijn andere vragen. Stonden ze in dezelfde rij, dan vergelijkt iemand die
 * CarPlay wil zijn 695 euro met een DSP-pakket van 2.195 en haakt af op een
 * prijs die niet over hetzelfde gaat.
 */
export const AUDIOPAKKETTEN = [
  'akoestische-basis',
  'oem-plus-executive',
  'reference-edition',
  'competitie-show',
];

/** De twee losse opties, náást de vier hierboven. */
export const LOSSE_OPTIES = ['carplay-upgrade', 'accu-voeding', 'akoestische-isolatie'];

/**
 * ==========================================================================
 * DE BALKJES, EN WAAROM ZE ONDERIN LAAG ZIJN
 * ==========================================================================
 * Ze stonden eerst zo: Basis 3/4/4, Executive 4/5/5, Reference 5/5/5. Alles
 * hoog, en tussen Executive en Reference één blokje verschil op vijftien.
 * Iemand die 1.500 euro meer betaalt zag dus vrijwel niets veranderen, en dat
 * is een argument om het niet te doen.
 *
 * Nu: Basis 3/2/3, Executive 4/4/4, Reference 5/5/5. Elke trede is zichtbaar.
 *
 * TWEE REGELS, EN DE EERSTE IS DE MOEILIJKE
 *
 *   1. De onderkant moet laag durven zijn. De verleiding is om je instapper
 *      ook mooi te laten scoren, maar dan zeggen de balkjes niets meer en
 *      heeft niemand een reden om hoger te kijken. Erger nog: wie de Basis
 *      koopt in de verwachting van 4 op bas, komt teleurgesteld terug. Die
 *      teleurstelling kost meer dan het verschil in de verkoop.
 *
 *   2. De vijf is van het duurste pakket. Staat er bij Executive al een vijf
 *      op bas, dan valt er voor de Reference niets meer te verkopen.
 *
 * En het klopt ook gewoon. De cijfers van de Basis komen van Justus zelf:
 * volume op 3 omdat betere speakers meer aankunnen zonder schel te worden,
 * bas op 2 omdat geen sub naar wel sub minstens twee streepjes scheelt, en
 * zuiverheid op 3 omdat het loepzuiver is tegenover de fabrieksspeakers maar
 * nog lang niet op het niveau van de Reference.
 * De Executive heeft die DSP wel, plus een verstopte sub. De Reference heeft
 * acht kanalen, een op maat gebouwde kast en urenlange fase-afstemming.
 *
 * The Competition Build heeft helemaal geen balkjes meer — zie `uitgelicht`
 * daar. Die stond op 5/5/5, precies als de Reference ernaast.
 */

/** Hulpje: de pakketten van een lijst met slugs, in díé volgorde. */
export const pakkettenVan = (slugs) =>
  slugs.map((s) => PACKAGES.find((p) => p.slug === s)).filter(Boolean);

/**
 * Wat voor soort bedrijf dit is, voor de machineleesbare gegevens die in elke
 * pagina staan (zie Base.astro).
 *
 * HIER STOND 'AutoRepair', EN DAT WAS FOUT.
 * Daarmee vertelde elke pagina aan Google dat dit een autoreparatiebedrijf is.
 * Gevolg: je komt naar boven bij iemand met een kapotte koppeling en niet bij
 * iemand die CarPlay wil. Diezelfde fout stond in het Google-bedrijfsprofiel.
 *
 * 'AutoPartsStore' is de dichtstbijzijnde soort die schema.org kent — een
 * winkel in auto-onderdelen. Een apart type voor car audio bestaat niet.
 *
 * Staat hier en niet in Base.astro, omdat de tests hem ook nodig hebben. Toen
 * hij op twee plekken stond, liepen die twee bij de eerste wijziging meteen
 * uit elkaar.
 */
export const SCHEMA_SOORT = 'AutoPartsStore';

/** Het postadres op één regel. Alleen voor post — zie de uitleg bij SITE. */
export const POSTADRES = `${SITE.postStreet}, ${SITE.postPostalCode} ${SITE.city}`;

/**
 * De vijf pakketten, LETTERLIJK overgenomen van audioupgradeemmen.nl.
 *
 * Prijzen, kopregels, omschrijvingen, opsommingen, knopteksten en de
 * scorebalkjes komen woord voor woord van de oude site. Verander hier niets
 * zonder dat Justus het zegt: dit is de prijslijst waar klanten op afgaan.
 *
 * TWEE AFWIJKINGEN, allebei op verzoek van Justus:
 *
 *   1. De oude site sprak de klant in drie pakketten met "u" aan en in de
 *      rest met "je". Dat is nu overal "je", zodat het niet lijkt alsof er
 *      twee mensen aan geschreven hebben.
 *   2. Het CarPlay-pakket heet nu "Draadloze CarPlay Upgrade" en de regel
 *      onder de prijs begint met "Draadloze". Draadloos is precies waar
 *      mensen op zoeken en waar de goedkope kastjes het laten afweten, dus
 *      dat hoort in de naam te staan en niet pas in het lijstje eronder.
 *
 * De slug blijft `carplay-upgrade`: die zit in de webadressen en in de
 * sitemap, dus daar blijven we vanaf.
 *
 *   tagline    de kopregel boven de omschrijving (upgradepagina)
 *   short      de één-regelsamenvatting (homepage)
 *   body       de volledige omschrijving (upgradepagina)
 *   features   het lijstje "Dit zit erin" (homepage)
 *   scores     de balkjes van de oude site, op een schaal van 5
 *   populair   het label "Meest Gekozen"
 *   duur       hoe lang de auto bij ons staat
 *
 * De tijden bij `duur` zijn door Justus nagelopen en bevestigd op 24 augustus
 * 2026. Het blijft een belofte aan de klant: verandert er iets aan de manier
 * van werken, pas ze dan hier aan.
 */
export const PACKAGES = [
  {
    slug: 'carplay-upgrade',
    name: 'Draadloze CarPlay Upgrade',
    tagline: 'Apple CarPlay & Android Auto',
    price: 'Vanaf € 695,00',
    // Het kale bedrag, voor de machineleesbare gegevens. Zie Base.astro.
    bedrag: 695,
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 574,- excl. btw',
    short: 'Draadloze Apple CarPlay en Android Auto, naadloos in je originele scherm.',
    body: 'Het perfecte pakket om af te rekenen met verouderde autonavigatie en lelijke losse telefoonhouders. Wij integreren Apple CarPlay en Android Auto 100% naadloos in je huidige systeem. Je bedient Flitsmeister, Spotify en Google Maps gewoon via het originele beeldscherm en stuurwiel.',
    features: [
      'Draadloze Apple CarPlay & Android Auto integratie.',
      'Op je originele fabrieksscherm (of nieuw high-end display).',
      'Bediening via je originele stuurwielknoppen of touchpad.',
      '100% behoud van fabriekssysteem en boordcomputer.',
      'Inclusief carkit-functie voor kraakhelder bellen.',
    ],
    cta: 'Kies CarPlay',
    duur: 'Klaar in ± 2 uur',
    /* Audio op 2 en niet op 3. Dit pakket raakt je speakers niet aan; het
       enige dat je wint is een betere bron. Stond het hoger, dan leek CarPlay
       op een modelpagina beter te klinken dan de Akoestische Basis ernaast —
       en dan stuur je iemand die geluid wil naar het verkeerde pakket. */
    scores: [
      { label: 'Integratie', waarde: 5 },
      { label: 'Snelheid', waarde: 5 },
      { label: 'Audio', waarde: 2 },
    ],
  },
  {
    slug: 'akoestische-basis',
    name: 'Akoestische Basis',
    tagline: 'Rust in de cabine, helder aan de telefoon.',
    price: '€ 995,00',
    bedrag: 995,
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 822,- excl. btw',
    short: 'De perfecte upgrade voor rust in de cabine en loepzuivere details.',
    body: 'Het perfecte pakket om de zwakke papieren fabrieksspeakers te elimineren. We vervangen de luidsprekers voorin door een krachtige 2-weg composet. Maar we doen meer dan dat: de deuren worden voorzien van tweelaags premium ontdreuningsmateriaal.',
    features: [
      'Premium 2-weg composet luidsprekers.',
      'Hoogwaardige tweelaags akoestische deurdemping.',
      'Massieve, onverslijtbare montage-ringen.',
      '100% onzichtbare OEM integratie.',
    ],
    cta: 'Kies Basis',
    duur: 'Klaar in een halve dag',
    /**
     * Deze drie zijn door Justus zelf bepaald, en per onderdeel om een reden:
     *
     *   Volume 3      betere speakers kunnen meer aan zonder schel te worden
     *   Bass 2        geen sub naar wel sub is minstens twee streepjes
     *   Zuiverheid 3  loepzuiver tegenover de fabrieksspeakers, maar nog
     *                 lang niet op het niveau van de Reference — die
     *                 laatste stap komt van de DSP
     *
     * Zie verder DE BALKJES hierboven.
     */
    scores: [
      { label: 'Volume', waarde: 3 },
      { label: 'Bass', waarde: 2 },
      { label: 'Zuiverheid', waarde: 3 },
    ],
  },
  {
    slug: 'oem-plus-executive',
    name: 'The OEM+ Executive',
    tagline: '0% laadruimteverlies. 100% dynamiek.',
    price: '€ 2.195,00',
    bedrag: 2195,
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 1.814,- excl. btw',
    short: 'Voor de veelrijder en echte autoliefhebber die het maximale eist met 0% laadruimteverlies.',
    body: 'Voor de veelrijder en ondernemer. Dit is niet zomaar een speaker-upgrade; dit is een totale herziening van je akoestiek. Het hart van dit systeem is een geavanceerde Digitale Sound Processor (DSP). Hiermee sturen we elke luidspreker actief aan en corrigeren we de looptijden van het geluid, zodat je letterlijk in het midden van de muziek zit. Aangevuld met een onzichtbare, voelbare subwoofer.',
    features: [
      'Geavanceerde DSP-versterker (Digitale Sound Processor).',
      'Voertuigspecifieke High-End luidsprekerset.',
      'Onzichtbare, ultra-compacte actieve subwoofer.',
      'Extreme drielaags ontdreuning van deuren.',
      'Volledig akoestisch op maat ingemeten.',
      'Accu en laadspanning gemeten, met de waarden op je werkbon.',
    ],
    cta: 'Kies Executive',
    duur: 'Je auto staat één werkdag bij ons',
    /* Vier over de hele linie: een DSP-versterker, een verstopte subwoofer
       en een volledige afstemming. De vijf blijft voor de Reference. */
    scores: [
      { label: 'Volume', waarde: 4 },
      { label: 'Bass', waarde: 4 },
      { label: 'Zuiverheid', waarde: 4 },
    ],
  },
  {
    slug: 'reference-edition',
    name: 'The Reference Edition',
    tagline: 'Compromisloze audiofiele perfectie.',
    /**
     * GEEN "VANAF" MEER, EN DAT IS EEN BELOFTE.
     *
     * Hier stond "Vanaf € 3.695,00". Dat woord kost klanten: wie "vanaf"
     * leest, weet niet wat hij gaat betalen en stelt de beslissing uit. Op
     * elke pagina van deze site staat dat de prijs die je ziet de prijs is
     * die je betaalt, en "vanaf" spreekt dat tegen.
     *
     * Het kan nu weg omdat The Competition Build ernaast staat. Dat is het
     * pakket waar de prijs wél per project verschilt. Daarmee krijgt de rij
     * een eerlijk verhaal: drie vaste prijzen en één op aanvraag.
     *
     * Voorwaarde: dit bedrag hoort bij een vastgelegde samenstelling. Wil een
     * klant er componenten in die daar niet in zitten, dan is dat een ander
     * gesprek — en dat gesprek heet The Competition Build.
     */
    price: '€ 3.695,00',
    bedrag: 3695,
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 3.053,- excl. btw',
    /**
     * Het label stond eerst op The OEM+ Executive en zei "Meest gekozen".
     * Twee dingen daaraan veranderd, en het tweede is het belangrijkst:
     *
     *   1. Het staat nu bij The Reference Edition. Met het competitiepakket
     *      erboven leest 3.695 als het verstandige midden in plaats van als
     *      het dure eind — mensen vergelijken alleen met wat ernaast staat.
     *   2. Er staat niet meer "Meest gekozen" maar "Onze aanrader". Dat
     *      eerste is een bewering over wat andere klanten deden, en die
     *      klopte niet. Onware beweringen over populariteit staan met naam
     *      op de zwarte lijst van misleidende handelspraktijken (art. 6:193g
     *      BW). "Onze aanrader" is een mening, en die mag Justus geven.
     *
     * Het werkt voor hem waarschijnlijk ook beter: de hele site verkoopt
     * zijn oordeel — conservatorium, eigen speakerbouw, afstellen op gehoor.
     * Dan weegt "dit zou ik kiezen" zwaarder dan "anderen kozen dit".
     */
    populair: true,
    short: 'Ongeëvenaarde audiofiele perfectie voor wie weigert concessies te doen.',
    body: 'Voor de purist die weigert concessies te doen. Dit pakket wordt volledig rondom jouw voertuig en muzieksmaak ontworpen. We combineren de absolute wereldtop in versterking en luidsprekers met urenlange, specialistische fase-tuning via de laptop. Inclusief maatwerk subwoofer-behuizingen.',
    features: [
      'High-End 8-kanaals versterker met geïntegreerde DSP.',
      'Absolute wereldtop luidsprekercomponenten.',
      'Op maat gebouwde en beklede subwoofer-behuizing.',
      'Totale ontdreuning (buitenschaal, binnenschaal, paneel).',
      'Urenlange specialistische fase-tuning via laptop.',
      'Accu en laadspanning gemeten, met de waarden op je werkbon.',
    ],
    /* Stond op 'Bespreek maatwerk'. Dat past niet meer: maatwerk is nu het
       pakket ernaast, en een vaste prijs verdient een knop die kiest in
       plaats van een knop die overlegt. */
    cta: 'Kies Reference',
    duur: 'Twee tot drie dagen, inclusief tuning',
    scores: [
      { label: 'Volume', waarde: 5 },
      { label: 'Bass', waarde: 5 },
      { label: 'Zuiverheid', waarde: 5 },
    ],
  },
  {
    /**
     * NIEUW, september 2026. Het enige pakket dat niet van de oude site komt.
     *
     * WAAROM DIT ER IS
     * Twee redenen, en allebei kloppen ze.
     *
     * De eerste is dat Justus dit werk kan en wil doen. Wedstrijd- en
     * showopbouw is een echt onderdeel van car audio, en met een
     * conservatoriumopleiding en zelfgebouwde kasten is hij er de man voor.
     *
     * De tweede is dat het de prijzen leesbaar maakt. Mensen weten niet wat
     * car audio hoort te kosten; ze vergelijken alleen met wat ernaast staat.
     * Met dit pakket erboven leest The Reference Edition als het verstandige
     * midden in plaats van als de dure uitschieter. Dat is geen trucje: het
     * is hoe mensen prijzen lezen, en het pakket bestaat echt.
     *
     * LET OP DE SPANNING MET DE REST VAN DE SITE
     * Overal staat "onzichtbaar ingebouwd". Een showbuild is per definitie
     * het tegenovergestelde. Dat wordt hieronder expliciet gezegd in plaats
     * van weggemoffeld — anders leest het als een tegenspraak.
     */
    slug: 'competitie-show',
    name: 'The Competition Build',
    tagline: 'Voor wie het juist wél wil laten zien.',
    /**
     * PRIJS OP AANVRAAG, MET HET STARTBEDRAG ERONDER.
     *
     * Er stond "Vanaf € 12.500,00". Dat is voor dit pakket niet eerlijk: bij
     * een showbouw hangt de prijs af van wat er getekend wordt, en dat kan
     * het dubbele zijn.
     *
     * Het startbedrag blijft er wel staan, in de kleine regel eronder, en
     * daar is een reden voor. Dit pakket staat in de rij omdat het de prijs
     * ernaast leesbaar maakt: naast 12.500 is 3.695 het verstandige midden.
     * Haal je dat getal helemaal weg, dan is 3.695 weer het duurste bedrag
     * op de pagina en werkt de rij tegen je in plaats van vóór je.
     *
     * Dus: de kop nodigt uit tot een gesprek, de kleine regel houdt het anker
     * overeind, en allebei zijn ze waar.
     */
    price: 'Prijs op aanvraag',
    bedrag: 12500,
    priceNote: 'Projecten starten rond € 12.500',
    priceExcl: 'Inclusief btw en montage',
    short: 'Wedstrijd- en showopbouw op maat, waarbij de installatie zelf het pronkstuk is.',
    body: 'Overal op deze site staat dat je er niets van ziet. Dit pakket is de uitzondering, en dat is precies de bedoeling. Een wedstrijd- of showopbouw wordt getekend voordat er een schroef in gaat: zichtbare versterkers achter plexiglas, een kofferbak die opengeklapt een installatie laat zien, en luidsprekerbehuizingen die in vorm en bekleding bij het interieur horen. Daaronder zit techniek die het waarmaakt — meerdere versterkers, actieve aansturing per weg, en een afstemming die over meerdere sessies gaat. Dit is geen pakket dat je bestelt; dit is een project dat we samen ontwerpen.',
    features: [
      'Ontwerp vooraf, in overleg getekend en besproken.',
      'Zichtbare opbouw: plexiglas, verlichting en bekleding op maat.',
      'Meerdere versterkers, volledig actief per weg aangestuurd.',
      'Behuizingen met de hand gebouwd, passend bij het interieur.',
      'Afstemming over meerdere sessies, met meetapparatuur.',
      "Minimaal twee accu's, met een laadvoorziening die dat aankan.",
    ],
    cta: 'Bespreek je project',
    duur: 'Een week of langer — in overleg',
    /**
     * GEEN SCOREBALKJES, MAAR DRIE REGELS OVER WAT HET ÁNDERS MAAKT.
     *
     * Hier stonden Volume, Bass en Zuiverheid op vijf van de vijf. Precies
     * dezelfde balkjes als bij The Reference Edition ernaast, en daarmee
     * zeiden ze het verkeerde: "even goed als het pakket hiernaast, maar dan
     * een stuk duurder". Dat is een argument om het níét te kopen.
     *
     * Dit pakket is ook geen hogere trede op dezelfde ladder. Het gaat over
     * iets anders: zichtbaar in plaats van onzichtbaar, getekend in plaats
     * van besteld. Daarom staat er nu dat. Dezelfde vorm als de balkjes —
     * label links, inhoud rechts — zodat de rij kaarten op één lijn blijft,
     * maar met een andere boodschap.
     */
    uitgelicht: [
      { label: 'Stijl', waarde: 'Zichtbaar en over de top' },
      { label: 'Ontwerp', waarde: 'Vooraf getekend, samen bepaald' },
      { label: 'Bouw', waarde: 'Met de hand, volledig op maat' },
    ],
    /* Een open vlaggetje op de plek van "Onze aanrader". Zonder oranje vulling,
       want het is een soort en geen aanbeveling — die hoort bij één pakket. */
    vlag: 'Op maat',
    scores: [],
  },
  {
    /**
     * ACCU & VOEDING — EEN LOSSE OPTIE, GEEN VERPLICHT NUMMERTJE.
     *
     * Een versterker met subwoofer legt een zwakke accu genadeloos bloot:
     * dimmende lichten, spanning die inzakt, en een klant die dáár jouw
     * installatie de schuld van geeft.
     *
     * Toch zit dit bewust níét standaard in de Executive en de Reference.
     * Wat daar wel in zit is de méting. Zodra je bij elk pakket automatisch
     * een accu meeverkoopt, ben je de man die er altijd iets bij verkoopt —
     * en dat is precies het tegenovergestelde van waar deze site op drijft.
     * Meet je het en blijkt de accu goed, dan zeg je dat gewoon.
     *
     * En het is geen losse accu maar een voedingspakket. Een accu alleen
     * googelt de klant binnen een minuut na; de dikkere hoofdkabel, de
     * zekering en de massaverbinding zijn het vakwerk waar het verschil in
     * zit — en waar de marge in zit.
     *
     * LET OP BIJ DE PRIJS: die gaat uit van een AGM-accu in een normale
     * personenauto, inclusief aanmelden bij het accubeheer. Klopt de inkoop
     * niet, dan is dit de enige regel die je hoeft aan te passen.
     */
    slug: 'accu-voeding',
    name: 'Accu & Voeding',
    tagline: 'Stroom die niet inzakt.',
    price: '€ 395,00',
    bedrag: 395,
    priceNote: 'Inclusief BTW & Montage',
    priceExcl: '€ 326,- excl. btw',
    short: 'Een gezonde accu en zware voeding, zodat je installatie krijgt waar hij om vraagt.',
    body: 'Een DSP-versterker met subwoofer vraagt meer stroom dan de fabrieksbedrading ooit hoefde te leveren. Zakt de spanning in, dan hoor je dat als slappe bas en zie je het als dimmende koplampen. Wij vervangen de accu door een AGM-accu die bij je auto past, melden hem aan bij het accubeheer zodat hij ook goed geladen wordt, trekken een dikkere hoofdkabel met zekering en versterken de massaverbinding. Voor en na meten we de spanning, en die waarden komen op je werkbon te staan.',
    features: [
      'AGM-accu, passend bij jouw auto en bij je systeem.',
      'Aangemeld bij het accubeheer, dus met de juiste laadspanning.',
      'Dikkere hoofdkabel met zekering direct bij de accu.',
      'Versterkte massaverbinding naar carrosserie en motorblok.',
      'Spanning gemeten voor en na, met de waarden op je werkbon.',
    ],
    cta: 'Kies Accu & Voeding',
    duur: 'Klaar in ± 2 uur',
    scores: [],
  },
  {
    slug: 'akoestische-isolatie',
    name: 'Akoestische Isolatie',
    tagline: 'Alleen op zoek naar stilte?',
    // De oude site toont hier "€ 0,00" — een placeholder van Squarespace.
    price: 'Prijs op aanvraag',
    priceNote: '',
    short: 'Losse, extreme akoestische isolatie-pakketten voor deuren, vloeren en daken.',
    body: 'Heb je al een premium audiosysteem (zoals Harman Kardon of Dynaudio) maar stoor je je aan windgeruis, rolgeluiden en rammelende plastic panelen? Wij bieden ook losse, extreme akoestische isolatie-pakketten aan voor deuren, vloeren en daken.',
    features: [],
    cta: 'Informeer naar geluidsisolatie',
    duur: 'In overleg — hangt af van wat je aangepakt wilt hebben',
    scores: [],
  },
];
