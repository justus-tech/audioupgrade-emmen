/**
 * Nissan — 4 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------ NISSAN QASHQAI
  {
    slug: 'nissan-qashqai',
    brand: 'Nissan',
    model: 'Qashqai',
    generaties: 'J10, J11 en J12',
    matchers: { merk: 'NISSAN', model: /QASHQAI/ },
    title: 'Nissan Qashqai audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Nissan Qashqai. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Qashqai heeft de compacte SUV in Nederland groot gemaakt. Miljoenen mensen rijden erin, en vrijwel niemand met een systeem dat bij het formaat past.',
    problems: [
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag bij je knieën blijft hangen.',
      'Het cabinevolume is groter dan bij een hatchback terwijl de aansturing even bescheiden is.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Qashqai doet tijdcorrectie het meeste werk: door het signaal per speaker te vertragen tillen we het geluidsbeeld naar ooghoogte. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, en dempen we de deuren én de achterklep zodat dat vermogen in muziek gaat zitten en niet in rammelend plaatwerk.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Qashqai\'s vanaf 2017 zit CarPlay al af fabriek. Zit het er niet in en heb je wel een scherm, dan kunnen we het meestal toevoegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid bij mij van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel, waardoor het beeld voor je op ooghoogte komt.',
      },
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak.',
      },
    ],
  },

  // -------------------------------------------------------- NISSAN MICRA
  {
    slug: 'nissan-micra',
    brand: 'Nissan',
    model: 'Micra',
    generaties: 'K12, K13 en K14',
    matchers: { merk: 'NISSAN', model: /MICRA/ },
    title: 'Nissan Micra audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Nissan Micra. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs en garantie behouden.',
    intro:
      'De Micra is al generaties lang de betrouwbare stadsauto. Aan geluid is er in de basisuitvoering weinig aandacht besteed, en dat maakt de sprong hier groot.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter op veel uitvoeringen, waardoor stemmen dof blijven.',
      'Het lichte deurblik trilt hoorbaar mee op elke basnoot.',
      'Weinig isolatie: op de snelweg is het rolgeluid het luidste geluid in de auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Micra levert demping direct meer bas op zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluidsbeeld vóór je komt te zitten in plaats van bij je voeten. Door de kleine cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Bij de nieuwere Micra met NissanConnect-scherm is CarPlay vaak al aanwezig of toe te voegen. Bij de oudere generaties zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Bij een compacte auto is dat de grootste sprong per euro.',
      },
      {
        q: 'Passen er grotere speakers in de deur?',
        a: 'Wij gebruiken CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, zonder boren of zagen.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Micra-opdrachten één werkdag.',
      },
    ],
  },

  // ---------------------------------------------------------- NISSAN NOTE
  {
    slug: 'nissan-note',
    brand: 'Nissan',
    model: 'Note',
    generaties: 'Note E11 en E12',
    matchers: { merk: 'NISSAN', model: /\bNOTE\b/ },
    title: 'Nissan Note audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Nissan Note. Speakers, akoestische deurdemping en DSP-afstemming.',
    intro:
      'De Note is klein van buiten en verrassend ruim van binnen. Die hoge, rechte vorm is precies wat het geluid parten speelt.',
    problems: [
      'De hoge, rechte panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Eenvoudige speakers zonder aparte tweeter, waardoor stemmen dof blijven.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Note haalt demping de holle nagalm weg en maakt hij de auto merkbaar rustiger. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je knieën. In deze compacte cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Bij de latere Note met NissanConnect-scherm is CarPlay soms toe te voegen. Bij de oudere generatie zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De hoge, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt.',
      },
    ],
  },

  // ---------------------------------------------------------- NISSAN JUKE
  {
    slug: 'nissan-juke',
    brand: 'Nissan',
    model: 'Juke',
    generaties: 'Juke F15 en F16',
    matchers: { merk: 'NISSAN', model: /JUKE/ },
    title: 'Nissan Juke audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Nissan Juke. Premium speakers, deurdemping en DSP-afstemming.',
    intro:
      'De Juke valt op door zijn vorm: hoog, met kleine ruiten en een aflopende daklijn. Dat ontwerp kost precies de ruimte waar lage tonen hun werk doen.',
    problems: [
      'De kleine ruiten en aflopende daklijn geven weinig cabinevolume, waardoor het geluidsbeeld snel benauwd wordt.',
      'De hoge zitpositie legt het geluidsbeeld laag, terwijl het lagere dak de ruimte erboven beperkt.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Juke plaatsen we de subwoofer bij voorkeur vooraan, onder een stoel, omdat de kleine ruimte achterin niet meewerkt. De deuren en de klep dempen we, en met tijdcorrectie leggen we het geluidsbeeld bewust wat hoger zodat de lage daklijn niet drukkend werkt.',
    },
    carplay: {
      possible: true,
      text: 'Op de nieuwere Juke met NissanConnect zit CarPlay al af fabriek. Bij de eerste generatie bekijken we per auto wat er kan.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet achterin?',
        a: 'De bagageruimte is klein en de daklijn loopt af, waardoor lage tonen zich daar minder goed opbouwen. Onder de stoel zit hij dichter bij je en geeft een strakker resultaat.',
      },
      {
        q: 'Ik heb het Bose Personal-systeem met speakers in de hoofdsteun. Wat dan?',
        a: 'Dat is een bijzonder systeem en daar gaan wij zorgvuldig mee om. Meestal laten we die hoofdsteunspeakers zitten en pakken we de deuren en de afstemming aan. Meld het vooraf.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen.',
      },
    ],
  },
];
