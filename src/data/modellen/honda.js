/**
 * Honda — 1 model.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ----------------------------------------------------------- HONDA JAZZ
  {
    slug: 'honda-jazz',
    brand: 'Honda',
    model: 'Jazz',
    generaties: 'Jazz tweede tot en met vierde generatie',
    matchers: { merk: 'HONDA', model: /JAZZ/ },
    title: 'Honda Jazz audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Honda Jazz. Premium speakers, akoestische deurdemping en DSP-afstemming.',
    intro:
      'De Jazz is de kleine auto met de slimste binnenruimte die er is. Die hoge, rechte vorm die dat mogelijk maakt, werkt akoestisch tegen je.',
    problems: [
      'De hoge, rechte panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Bij de hybride valt het rolgeluid extra op omdat er geen motorgeluid overheen komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Jazz haalt demping de holle nagalm weg en maakt hij de auto merkbaar rustiger — bij de hybride hoor je dat meteen terug. Daarna komt er een componentenset in met een losse tweeter en tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de Jazz vanaf 2015 met Honda Connect zit CarPlay meestal al af fabriek of is het toe te voegen.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De hoge, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Ik heb de hybride. Merk ik meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid duidelijker, dus demping levert extra veel op.',
      },
      {
        q: 'Blijft mijn slimme achterbank bruikbaar?',
        a: 'Ja. Wij plaatsen niets in de bagageruimte of onder de achterbank zonder dat vooraf te bespreken. De Magic Seats blijven volledig werken.',
      },
    ],
  },
];
