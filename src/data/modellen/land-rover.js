/**
 * Land Rover — 6 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------- RANGE ROVER SPORT
  // LET OP de volgorde: Sport, Velar en Evoque staan vóór de gewone Range
  // Rover, en Discovery Sport vóór Discovery. De eerste match wint.
  {
    slug: 'range-rover-sport',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    generaties: 'L320, L494 en L461',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER SPORT/ },
    title: 'Range Rover Sport audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover Sport. Echt vermogen voor het grote cabinevolume, demping en DSP-afstemming.',
    intro:
      'De Range Rover Sport combineert het formaat van een grote SUV met een sportievere inslag. Die grote, stille cabine is precies wat goede audio nodig heeft, en precies wat het basissysteem niet benut.',
    problems: [
      'Het cabinevolume is groot en vraagt vermogen dat de basisinstallatie niet levert. Lage tonen komen daardoor nooit op niveau.',
      'De hoge zitpositie zet je ver van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Range Rover Sport telt vermogen. Wij zetten er een DSP-versterker in die het cabinevolume aankan, dempen de deuren en de klep, en plaatsen een subwoofer in de zijwand van de bagageruimte. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en de terreininstellingen.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb het Meridian-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Meridian geeft je goede componenten en meer vermogen, maar laat de deuren en de klep ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer in de zijwand, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Blijven de terreinsystemen werken?',
        a: 'Ja. Alle waarschuwingen, camerabeelden en instellingen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // ------------------------------------------------- RANGE ROVER VELAR
  {
    slug: 'range-rover-velar',
    brand: 'Land Rover',
    model: 'Range Rover Velar',
    generaties: 'L560',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER VELAR/ },
    title: 'Range Rover Velar audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover Velar. DSP-afstemming, high-end speakers en demping, met behoud van het strakke interieur.',
    intro:
      'De Velar is de Range Rover die het van zijn vormgeving moet hebben: strak, minimalistisch en vol schermen. Dat minimalisme heeft een akoestische keerzijde.',
    problems: [
      'Het interieur is strak en hard afgewerkt met veel glas en gladde panelen, waardoor hoge tonen scherp terugkaatsen.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie levert.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Velar past een ingreep die net zo onzichtbaar is als het interieur. Wij dempen de deuren en de klep, kiezen een speakerset met een zachtere hoge kant die niet met de gladde panelen gaat vechten, en zetten er een DSP-versterker achter. Aan het interieur verandert niets zichtbaars — alleen wat je hoort.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele schermsysteem, met behoud van de volledige bediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Waarom klinkt mijn Velar scherp?',
        a: 'Veel glas en gladde, harde panelen laten hoge tonen vaker terugkaatsen voordat ze bij je oor zijn. Dat is met de juiste speakerkeuze en afstemming goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Blijft het interieur er origineel uitzien?',
        a: 'Ja. Alles wat wij doen zit achter panelen en in de deuren. Bij een auto die het van zijn vormgeving moet hebben, is dat wat ons betreft een harde eis.',
      },
      {
        q: 'Ik heb Meridian Signature. Wat kunnen jullie toevoegen?',
        a: 'Demping en een afstemming op jouw stoel. De componenten zijn dan uitstekend en die laten we zitten. Wij zeggen eerlijk wanneer de winst het werk niet waard is.',
      },
    ],
  },

  // ------------------------------------------------ RANGE ROVER EVOQUE
  {
    slug: 'range-rover-evoque',
    brand: 'Land Rover',
    model: 'Range Rover Evoque',
    generaties: 'L538 en L551',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER EVOQUE/ },
    title: 'Range Rover Evoque audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Range Rover Evoque. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Evoque is de compacte Range Rover met de lage daklijn. Die vorm verkoopt uitstekend, maar kost akoestisch precies de ruimte waar lage tonen hun werk doen.',
    problems: [
      'De lage daklijn en de kleine ruiten geven weinig cabinevolume, waardoor het geluidsbeeld snel benauwd wordt.',
      'De hoge zitpositie in een lage cabine legt het geluidsbeeld laag terwijl er boven je weinig ruimte is.',
      'De achterklep resoneert hoorbaar mee en de bagageruimte is te klein om lage tonen goed op te bouwen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Evoque plaatsen we de subwoofer bij voorkeur vooraan, onder een stoel, omdat de kleine ruimte achterin niet meewerkt. De deuren en de klep dempen we, en met tijdcorrectie leggen we het geluidsbeeld bewust wat hoger zodat de lage daklijn niet drukkend werkt. In deze cabine heb je minder vermogen nodig dan in een grote Range Rover.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera en sensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet achterin?',
        a: 'De bagageruimte van een Evoque is klein en de daklijn loopt af, waardoor lage tonen zich daar minder goed opbouwen. Een compacte subwoofer onder de stoel zit dichter bij je en geeft in deze carrosserie een strakker resultaat.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen. De laadvloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Evoque-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // ------------------------------------------------------- RANGE ROVER
  {
    slug: 'range-rover',
    brand: 'Land Rover',
    model: 'Range Rover',
    generaties: 'L322, L405 en L460',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER/ },
    title: 'Range Rover audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover. Afstemming voor voor- en achterbank, echt vermogen en grondige demping.',
    intro:
      'Een Range Rover verkoopt zichzelf op rust en ruimte. Die grote, stille cabine is een uitstekend uitgangspunt voor geluid. Juist in die stilte hoor je waar het systeem tekortschiet.',
    problems: [
      'Het cabinevolume is groot en vraagt vermogen dat de basisinstallatie niet levert.',
      'Achterin zitten passagiers ver van de voorste speakers, en in deze auto zit daar vaak juist iemand.',
      'De uitstekende isolatie werkt tegen je: er is weinig rolgeluid dat tekortkomingen maskeert.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Range Rover is het zware isolatiewerk al gedaan, dus wij gaan direct naar de kern: een DSP-versterker die het cabinevolume aankan, gerichte demping in de deuren en de klep, en een subwoofer in de zijwand van de bagageruimte. Omdat er in deze auto vaak achterin gezeten wordt, leggen we standaard een tweede afstemming vast die daar klopt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle comfort-, terrein- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja, en bij deze auto doen we dat standaard. Met een DSP slaan we twee afstemmingen op: één voor de bestuurdersstoel en één die op de achterbank klopt. Je kiest ze zelf.',
      },
      {
        q: 'Ik heb Meridian Signature. Moet ik hier wel iets aan doen?',
        a: 'Waarschijnlijk weinig, en dat zeggen we dan ook. Bij dat systeem zit de winst hooguit in demping en een afstemming op jouw luisterpositie. Wij verkopen je geen vervanging van componenten die al beter zijn.',
      },
      {
        q: 'Blijven de terrein- en comfortsystemen werken?',
        a: 'Ja. Alle waarschuwingen, camerabeelden, hoogteverstelling en instellingen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // ------------------------------------------------ DISCOVERY SPORT
  {
    slug: 'land-rover-discovery-sport',
    brand: 'Land Rover',
    model: 'Discovery Sport',
    generaties: 'L550',
    matchers: { merk: 'LAND ROVER', model: /DISCOVERY SPORT/ },
    title: 'Discovery Sport audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Land Rover Discovery Sport. Premium speakers, demping van deuren en achterklep, DSP en draadloos CarPlay.',
    intro:
      'De Discovery Sport is de praktische Land Rover: hoog, recht en met plek voor zeven. Die rechte, hoge vormen maken hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'Met de derde zitrij in gebruik zitten passagiers ver van elke speaker.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Discovery Sport is demping het halve werk: de rechte panelen en de grote klep stilleggen haalt de holle nagalm weg die je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Gebruik je de derde rij vaak, dan leggen we daar een tweede afstemming voor vast.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en terreininstellingen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een holle dreun bij bas. Wat is dat?',
        a: 'Meestal de achterklep of een zijpaneel dat meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Ik gebruik de derde zitrij regelmatig. Kan het daar ook goed?',
        a: 'Beter dan nu, maar wees realistisch: wie ver achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming komen we een heel eind.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de zijwand verdwijnen. De vloer blijft vlak.',
      },
    ],
  },

  // ------------------------------------------------------- DISCOVERY
  {
    slug: 'land-rover-discovery',
    brand: 'Land Rover',
    model: 'Discovery',
    generaties: 'Discovery 3, 4 en 5',
    matchers: { merk: 'LAND ROVER', model: /DISCOVERY/ },
    title: 'Land Rover Discovery audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Land Rover Discovery. Echt vermogen voor het grote cabinevolume, afstemming per zitrij en grondige demping.',
    intro:
      'De Discovery is een grote, rechte auto met zeven volwaardige zitplaatsen. Dat is veel ruimte om te vullen, en precies daar loopt het fabriekssysteem op vast.',
    problems: [
      'Het cabinevolume is groot en recht van vorm. Lage tonen vragen hier veel vermogen dat de basisinstallatie niet geeft.',
      'De uitgestrekte, vlakke panelen en de grote klep resoneren over een fors oppervlak mee.',
      'Passagiers op de derde rij zitten meters van de voorste speakers en horen een compleet andere auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Discovery is dit een systeemklus. Er is echt vermogen nodig, en er moet nagedacht worden over wie er waar zit. Wij werken met meerdere afstemmingen in de DSP: één die de bestuurdersstoel scherp neerzet en één die de hele auto bedient. De klep en de vlakke zijpanelen dempen we grondig, want over dit oppervlak telt resonantie dubbel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle terrein- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie meters achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming en waar nodig extra speakers achterin komen we een heel eind.',
      },
      {
        q: 'Mijn Discovery is wat ouder. Is het dat nog waard?',
        a: 'Dat hangt van jou af, niet van de auto. Blijf je er nog jaren in rijden, dan is het goed besteed: gedempte deuren en een goede speakerset gaan langer mee dan de auto. Wij controleren wel eerst het plaatwerk voordat we iets plakken.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Vaak langer dan een dag. Bij een Discovery met volledige demping en een meerkanaals opbouw plannen we meerdere dagen, en dat zeggen we vooraf.',
      },
    ],
  },
];
