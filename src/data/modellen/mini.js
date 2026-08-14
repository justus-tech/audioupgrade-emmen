/**
 * Mini — 1 model.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // --------------------------------------------------------- MINI COOPER
  {
    slug: 'mini-cooper',
    brand: 'Mini',
    model: 'Cooper',
    generaties: 'R56, F56 en Countryman',
    matchers: { merk: 'MINI', model: /COOPER|^MINI|ONE\b|CLUBMAN|COUNTRYMAN/ },
    title: 'Mini Cooper audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Mini. Premium speakers, deurdemping en DSP-afstemming, met behoud van het originele scherm.',
    intro:
      'Een Mini is klein van buiten en vol karakter van binnen: veel hard kunststof, veel chroom en veel rechte vlakken. Dat is leuk om naar te kijken en lastig voor geluid.',
    problems: [
      'Het interieur zit vol harde, glanzende oppervlakken die hoge tonen scherp terugkaatsen.',
      'De cabine is klein, waardoor je heel dicht op de speakers zit en het beeld snel naar één kant trekt.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mini kiezen we een speakerset met een zachtere hoge kant die niet met al dat harde materiaal gaat vechten, en gebruiken we tijdcorrectie om het beeld te centreren — bij deze zitafstand is dat het verschil tussen links-rechts en één beeld vóór je. De deuren dempen we, en een compacte subwoofer past onder de stoel of achter de bekleding.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Mini-uitvoeringen met het ronde middenscherm is CarPlay al aanwezig of toe te voegen, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt mijn Mini zo scherp?',
        a: 'Veel harde, glanzende oppervlakken per kubieke meter cabine. Hoge tonen kaatsen daardoor vaker terug voordat ze bij je oor zijn. Met de juiste speakerkeuze en afstemming is dat goed te temmen.',
      },
      {
        q: 'Ik heb het Harman Kardon-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan goed; de winst zit in het temmen van de deuren en een afstemming op jouw stoel.',
      },
      {
        q: 'Past er wel een subwoofer in?',
        a: 'Ja, mits compact. Wij werken met kleine behuizingen die onder de stoel of achter de bekleding verdwijnen.',
      },
    ],
  },
];
