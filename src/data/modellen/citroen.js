/**
 * Citroën — 3 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // --------------------------------------------------------- CITROEN C1
  {
    slug: 'citroen-c1',
    brand: 'Citroën',
    model: 'C1',
    generaties: 'C1 eerste en tweede generatie',
    matchers: { merk: 'CITROEN', model: /\bC1\b/ },
    title: 'Citroën C1 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Citroën C1. Speakers, deurdemping en minder rolgeluid, met all-in prijs en behoud van fabrieksgarantie.',
    intro:
      'De C1 deelt zijn techniek met de Toyota Aygo en de Peugeot 107, en deelt daarmee ook hun grootste tekortkoming: er is aan geluid vrijwel niets gedaan.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus alles komt uit je knieën.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
      'De dunne deurpanelen resoneren mee, waardoor bas als geklapper terugkomt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Wij beginnen met stiller maken, want zolang de weg luider is dan de muziek hoor je van betere speakers maar de helft. Demping van de deuren en de vloer haalt hoorbaar rolgeluid weg. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. In deze kleine cabine is dat genoeg voor een groot verschil.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw C1 het multimediascherm, dan kunnen we CarPlay meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik heb een Aygo of 107. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen het grootste deel van de carrosserie en het interieur. De aanpak is identiek.',
      },
      {
        q: 'Waarom eerst isolatie en dan pas speakers?',
        a: 'Omdat het rolgeluid hier het grootste probleem is. Stiller maken levert bij deze auto meer op dan harder maken.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in, inclusief montage en btw. Alleen isolatie maken we op maat, afhankelijk van hoeveel oppervlak je wilt aanpakken.',
      },
    ],
  },

  // --------------------------------------------------------- CITROEN C3
  {
    slug: 'citroen-c3',
    brand: 'Citroën',
    model: 'C3',
    generaties: 'C3 tweede, derde en vierde generatie',
    matchers: { merk: 'CITROEN', model: /\bC3\b/ },
    title: 'Citroën C3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Citroën C3. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'Citroën verkoopt de C3 op comfort, en daar hoort rust bij. Het audiosysteem doet daar in de basisuitvoering weinig aan mee.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor stemmen dof blijven en het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De C3 is gekocht om zijn comfort, dus daar sluiten wij op aan. Demping van de deuren maakt de auto niet alleen muzikaler maar ook stiller, wat precies past bij waarom je hem hebt. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Een DSP-afstemming maakt het geheel rustig in plaats van luid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste C3-uitvoeringen met touchscreen is CarPlay al aanwezig of eenvoudig toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik koos deze auto voor het comfort. Past dit daarbij?',
        a: 'Uitstekend. Demping maakt de auto stiller, ook als je de muziek uit laat. Veel klanten merken dat effect het eerst en waarderen het meer dan de betere bas.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Dat is bij een C3 de grootste sprong per euro.',
      },
      {
        q: 'Blijft mijn scherm werken?',
        a: 'Ja. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm en stuurbediening blijven origineel.',
      },
    ],
  },

  // ------------------------------------------------- CITROEN C4 PICASSO
  {
    slug: 'citroen-c4-picasso',
    brand: 'Citroën',
    model: 'C4 Picasso',
    generaties: 'C4 Picasso en Grand C4 Picasso / SpaceTourer',
    matchers: { merk: 'CITROEN', model: /C4 ?PICASSO|SPACETOURER/ },
    title: 'Citroën C4 Picasso audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Citroën C4 Picasso. Premium speakers, deurdemping en DSP-afstemming voor de hele auto.',
    intro:
      'De C4 Picasso is de ruimtewagen met de enorme voorruit en het lichte interieur. Al dat glas is prettig om in te zitten en lastig voor geluid.',
    problems: [
      'Het grote glasoppervlak kaatst hoge tonen terug, waardoor het geheel scherp en vermoeiend wordt.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'Bij de Grand met zeven stoelen zitten passagiers achterin ver van de voorste speakers.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een C4 Picasso kiezen we een speakerset met een zachtere hoge kant die niet met al dat glas gaat vechten, en temmen we de reflecties met de DSP-afstemming. De deuren en de klep dempen we. Rijd je vaak met zeven mensen, dan leggen we een tweede afstemming vast die de hele auto bedient.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste C4 Picasso-uitvoeringen met touchscreen is CarPlay al aanwezig of toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt het scherp in mijn Picasso?',
        a: 'Door het enorme glasoppervlak. Hoge tonen kaatsen daar meerdere keren op terug voordat ze bij je oor zijn. Met de juiste speakerkeuze en afstemming is dat goed te temmen.',
      },
      {
        q: 'Ik heb de Grand met zeven stoelen. Kan het achterin ook goed?',
        a: 'Met een tweede afstemming die de hele auto bedient wel. Die kun je zelf kiezen naast de scherpe afstemming voor de bestuurdersstoel.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen.',
      },
    ],
  },
];
