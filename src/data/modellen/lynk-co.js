/**
 * Lynk & Co — 1 model.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [
  // -------------------------------------------------------- LYNK & CO 01
  {
    slug: 'lynk-co-01',
    brand: 'Lynk & Co',
    model: '01',
    generaties: '01 plug-in hybride',
    matchers: { merk: 'LYNK', model: /\b01\b|LYNK/ },
    title: 'Lynk & Co 01 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Lynk & Co 01. Premium speakers, deurdemping en DSP-afstemming — extra effectief bij elektrisch rijden.',
    intro:
      'De 01 kwam via het abonnementsmodel in korte tijd op tienduizenden Nederlandse opritten terecht. Onder de huid is het een Volvo, en dat zie je terug in de opzet — maar niet in het geluid.',
    problems: [
      'Rijd je elektrisch, dan is het rolgeluid het luidste geluid in de auto en maskeert het precies waar stemmen zitten.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een stekkerauto levert demping dubbel op: de auto wordt stiller én muzikaler, en zonder motorgeluid hoor je dat meteen. Wij dempen de deuren en de klep, zetten er een DSP-versterker achter voor het vermogen dat het volume vraagt, en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'De 01 heeft een groot staand scherm met een eigen systeem. Wat er precies mogelijk is verschilt per softwareversie; stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik rij vooral elektrisch. Merk ik meer verschil?',
        a: 'Ja. Zonder verbrandingsmotor hoor je het rolgeluid en elke resonantie veel duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Ik heb de auto via een abonnement. Mag ik er dan aan laten werken?',
        a: 'Dat hangt van je contract af, en dat moet je daar even nakijken. Wat wij doen is volledig terug te bouwen naar origineel, wat het gesprek meestal een stuk makkelijker maakt.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt.',
      },
    ],
  },
];
