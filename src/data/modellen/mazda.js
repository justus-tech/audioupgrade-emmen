/**
 * Mazda — 3 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // --------------------------------------------------------- MAZDA CX-5
  {
    slug: 'mazda-cx-5',
    brand: 'Mazda',
    model: 'CX-5',
    generaties: 'KE en KF',
    matchers: { merk: 'MAZDA', model: /CX-?5\b/ },
    title: 'Mazda CX-5 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Mazda CX-5. Premium speakers, demping tegen rolgeluid en DSP-afstemming met behoud van Mazda Connect.',
    intro:
      'De CX-5 rijdt scherper dan de meeste SUV\'s en is van binnen mooi afgewerkt. Waar hij bekend om staat is minder plezierig: rolgeluid.',
    problems: [
      'De CX-5 laat op ruwer asfalt meer bandengeluid door dan zijn concurrenten, en dat maskeert precies het gebied waar stemmen zitten.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
      'De hoge zitpositie legt het geluidsbeeld laag, en de grote achterklep resoneert mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een CX-5 is demping geen bijzaak maar de kern. Deuren, wielkasten en waar gewenst de vloer aanpakken haalt hoorbaar rolgeluid weg — het effect dat CX-5-rijders het eerst terugmelden, nog vóór de muziek. Daarna zetten we er een componentenset in en een DSP-versterker die het geluidsbeeld met tijdcorrectie op ooghoogte legt. Mazda Connect blijft volledig intact.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste CX-5-uitvoeringen vanaf 2018 zit CarPlay al af fabriek, bediend met de draaiknop. Bij oudere modellen is het vaak alsnog toe te voegen.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik vind mijn CX-5 luidruchtig op de snelweg. Kunnen jullie dat oplossen?',
        a: 'Voor een groot deel wel. Demping van deuren, wielkasten en vloer haalt hoorbaar bandengeluid weg. Wij beloven geen cijfer, maar dit is precies de auto waar klanten het verschil het duidelijkst merken.',
      },
      {
        q: 'Blijft de draaiknopbediening werken?',
        a: 'Ja. Alles wat wij doen zit achter het dashboard en in de deuren. Mazda Connect, de draaiknop en de stuurbediening blijven origineel.',
      },
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, en bij deze auto vooral in de vorm van demping. Bose geeft je meer speakers, maar tegen rolgeluid helpt alleen isolatie.',
      },
    ],
  },

  // ------------------------------------------------------------ MAZDA 2
  {
    slug: 'mazda-2',
    brand: 'Mazda',
    model: '2',
    generaties: 'Mazda2 DE, DJ en Hybrid',
    matchers: { merk: 'MAZDA', model: /MAZDA ?2\b/ },
    title: 'Mazda 2 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Mazda 2. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van Mazda Connect.',
    intro:
      'De Mazda 2 rijdt scherper dan de meeste auto\'s in zijn klasse en is netjes afgewerkt. Waar Mazda bekend om staat is minder plezierig: rolgeluid.',
    problems: [
      'Mazda\'s laten op ruwer asfalt meer bandengeluid door dan hun concurrenten, en dat maskeert precies waar stemmen zitten.',
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je opendraait.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mazda 2 is demping geen bijzaak maar de kern. Deuren en wielkasten aanpakken haalt hoorbaar rolgeluid weg — het effect dat Mazda-rijders het eerst terugmelden, nog vóór de muziek. Daarna zetten we er een componentenset in met een losse tweeter. Mazda Connect blijft volledig intact.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Mazda 2-uitvoeringen vanaf 2018 zit CarPlay al af fabriek, bediend met de draaiknop. Bij oudere modellen is het vaak alsnog toe te voegen.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik vind mijn Mazda luidruchtig op de snelweg. Kunnen jullie dat oplossen?',
        a: 'Voor een groot deel wel. Demping van deuren en wielkasten haalt hoorbaar bandengeluid weg. Wij beloven geen cijfer, maar dit is de auto waar klanten het verschil het duidelijkst merken.',
      },
      {
        q: 'Blijft de draaiknopbediening werken?',
        a: 'Ja. Alles wat wij doen zit achter het dashboard en in de deuren.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'Bij deze auto isolatie, en daarna pas speakers. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
    ],
  },

  // -------------------------------------------------------- MAZDA CX-3
  {
    slug: 'mazda-cx-3',
    brand: 'Mazda',
    model: 'CX-3',
    generaties: 'CX-3 vanaf 2015',
    // Let op: mag niet matchen op CX-30, dat is een ander model.
    matchers: { merk: 'MAZDA', model: /CX-?3\b/ },
    title: 'Mazda CX-3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Mazda CX-3. Demping tegen rolgeluid, premium speakers en DSP-afstemming met behoud van Mazda Connect.',
    intro:
      'De CX-3 is de compacte crossover van Mazda: scherp rijdend en netjes afgewerkt. En net als de rest van het merk laat hij meer bandengeluid door dan je zou willen.',
    problems: [
      'Op ruwer asfalt komt er veel bandengeluid binnen, precies in het gebied waar stemmen zitten.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een CX-3 is demping de kern: deuren, wielkasten en waar gewenst de vloer aanpakken haalt hoorbaar rolgeluid weg. Dat is het effect dat Mazda-rijders het eerst terugmelden, nog vóór de muziek. Daarna zetten we er een componentenset in en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste CX-3-uitvoeringen vanaf 2018 zit CarPlay al af fabriek, bediend met de draaiknop. Bij oudere modellen is het vaak alsnog toe te voegen.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik vind mijn CX-3 luidruchtig. Kunnen jullie dat oplossen?',
        a: 'Voor een groot deel wel. Demping van deuren, wielkasten en vloer haalt hoorbaar bandengeluid weg. Wij beloven geen cijfer, maar dit is precies de auto waar klanten het verschil het duidelijkst merken.',
      },
      {
        q: 'Blijft Mazda Connect werken?',
        a: 'Ja. Alles wat wij doen zit achter het dashboard en in de deuren. De draaiknop en het scherm blijven origineel.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },
];
