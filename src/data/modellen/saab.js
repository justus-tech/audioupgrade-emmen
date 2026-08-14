/**
 * Saab — 1 model.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------------- SAAB 9-3
  {
    slug: 'saab-9-3',
    brand: 'Saab',
    model: '9-3',
    generaties: '9-3 I (1998-2002) en 9-3 II (2002-2012)',
    // De RDW schrijft "SAAB 9-3"; deze matcher draait op de ruwe tekst.
    matchers: { merk: 'SAAB', model: /9-3/ },
    title: 'Saab 9-3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Saab 9-3. Vergane speakers vervangen, deuren dempen en het originele dashboard volledig intact laten.',
    intro:
      'Een 9-3 die nog rijdt, rijdt vaak bij iemand die er bewust voor kiest. Het geluid is meestal het enige onderdeel dat níét is bijgehouden. Daar valt bij deze auto meer te winnen dan bij welke nieuwe auto ook.',
    problems: [
      'De schuimrand rond de originele speakerconussen vergaat na twintig jaar. Je hoort een dunne, rammelende bas terwijl er niets kapot lijkt: de speaker is het gewoon uit zichzelf.',
      'De radio werkt samen met het informatiescherm in het dashboard. Er zomaar een andere radio in zetten kost je functies die je liever houdt.',
      'De deurpanelen zijn na al die jaren bros en de bevestigingsclips breken snel. Demontage vraagt hier meer geduld dan bij een auto van vijf jaar oud.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 9-3 laten we de radio zitten. Dat is geen concessie maar de beste keuze: je houdt je informatiescherm en je originele bediening, en de winst zit toch ergens anders. Wij vervangen de vergane speakers door een nieuwe set en dempen de deuren, waarbij we het plaatwerk eerst controleren — bij een auto van deze leeftijd wil je geen demping op blik plakken waar roest onder zit. Wil je meer, dan zetten we er een compacte DSP-versterker achter die het signaal van de originele radio oppikt.',
    },
    carplay: {
      possible: false,
      text: 'Een 9-3 uit de eerste generatie heeft geen scherm waar CarPlay in past, dus ons CarPlay-pakket is voor deze auto niet van toepassing. Wil je toch draadloos muziek streamen en handsfree bellen, dan kan dat met een discrete oplossing achter het dashboard, zonder dat er aan de buitenkant iets verandert. Bij een 9-3 van de tweede generatie met scherm kijken we per auto wat er kan.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn geluid klinkt dun, maar er is niets stuk. Hoe kan dat?',
        a: 'Dat is bijna altijd de schuimrand rond de speakerconus. Die vergaat langzaam en scheurt uiteindelijk, waardoor de speaker zijn bas verliest zonder dat hij ophoudt met werken. Het is de meest voorkomende klacht bij auto\'s van deze leeftijd en tegelijk de makkelijkste om op te lossen.',
      },
      {
        q: 'Blijft mijn informatiescherm in het dashboard werken?',
        a: 'Ja, want wij laten de originele radio zitten. Alles wat via dat scherm loopt blijft ongewijzigd. Dat is precies waarom wij bij een Saab liever de speakers en de versterking aanpakken dan de bron.',
      },
      {
        q: 'Is demping wel verstandig bij een auto van deze leeftijd?',
        a: 'Mits je eerst kijkt. Wij controleren het plaatwerk voordat we iets plakken — demping op blik met beginnende roest eronder is vragen om problemen. Zit het goed, dan is een 9-3 juist een dankbare auto om te dempen, omdat er af fabriek vrijwel niets in zat.',
      },
    ],
  },
];
