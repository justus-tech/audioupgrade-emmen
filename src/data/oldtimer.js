/**
 * DE OLDTIMERPAGINA.
 *
 * WAAROM DIT GEEN MODELPAGINA'S ZIJN
 * De populairste oldtimer van Nederland is de Citroën 2CV6, met 4.101 stuks
 * (RDW, aug 2026). Daarna zakt het meteen naar 2.500 en lager, over honderden
 * modellen. Voor die aantallen een eigen pagina schrijven levert niets op.
 *
 * Youngtimers zijn een ander verhaal: 2,7 miljoen auto's van 15 tot 30 jaar,
 * en de tien populairste hebben allemaal al een modelpagina. Die markt wordt
 * dus al bediend — alleen niet met dít verhaal.
 *
 * Vandaar één categoriepagina met het argument dat je nergens anders kunt
 * maken: een klassiekerbezitter wil géén modern scherm in zijn dashboard.
 * Dat is precies waarom hij bij een gewone autoshop wegloopt, en precies wat
 * Audio Upgrade Emmen verkoopt.
 *
 * DE GRENS: VANAF DE JAREN TACHTIG
 * Door Justus zo bepaald. Auto's van daarvoor hebben soms zes volt of een
 * omgekeerde massa, en dan gaat moderne apparatuur niet zomaar mee. Die grens
 * staat er met opzet in: liever vooraf eerlijk dan achteraf teleurstellen.
 *
 * GEEN VASTE PRIJS
 * Bij deze auto's is elke auto anders — soms zit er niets in, soms een radio
 * uit 1985, soms een dashboard waar je nauwelijks achter kunt. Een vaste prijs
 * zou een slag in de lucht zijn. Daarom: altijd eerst kijken.
 */

/** Vanaf welk bouwjaar wij een klassieker aannemen. */
export const VANAF_JAAR = 1980;

export const OLDTIMER = {
  slug: 'oldtimer-audio',
  titel: 'Oldtimer audio upgrade — geluid zonder je dashboard aan te tasten | Audio Upgrade Emmen',
  beschrijving:
    'Beter geluid in je klassieker of youngtimer, zonder modern scherm in je dashboard. De originele radio blijft bewaard en alles is terug te bouwen. Vanaf bouwjaar 1980.',
  eyebrow: 'Klassiekers en youngtimers',
  kop: 'Je dashboard blijft zoals het was',

  intro:
    'Bij een klassieker gaat het niet om het nieuwste scherm. Het gaat erom dat je auto blijft zoals hij bedoeld is, en dat je onderweg gewoon je muziek kunt luisteren. Dat zijn twee dingen die elkaar niet hoeven bijten — als je het goed doet.',

  waarom: {
    kop: 'Waarom een oude auto bijna altijd slecht klinkt',
    punten: [
      {
        kop: 'De speakers zijn op, gegarandeerd',
        tekst:
          'De schuimrand rond een speakerconus vergaat in vijftien tot twintig jaar. Bij een auto van dertig jaar is dat geen risico maar een zekerheid. Je hoort een dunne, rammelende bas terwijl er niets kapot lijkt — de speaker is het gewoon uit zichzelf.',
      },
      {
        kop: 'Er zit niets tegen geluid',
        tekst:
          'Demping was in de jaren tachtig en negentig geen thema. Dun plaatwerk, kale deuren, nauwelijks isolatie. Op de snelweg draai je de radio harder om de weg te overstemmen, en dan hoor je pas echt hoe weinig het systeem kan.',
      },
      {
        kop: 'Wat er zit is niet ontworpen om te vervangen',
        tekst:
          'Een dashboard uit die tijd heeft een gat voor één radio en verder niets. De bekabeling is dun, vaak bros, en soms al eens door iemand anders aangepast. Daar zomaar iets in schroeven is hoe een mooie auto lelijk wordt.',
      },
    ],
  },

  aanpak: {
    kop: 'Hoe wij het doen',
    punten: [
      {
        kop: 'Je originele radio blijft',
        tekst:
          'Wij bewaren hem, of hij blijft gewoon zitten en doet zijn werk. Wil je de auto ooit verkopen of terugbrengen naar origineel, dan is er niets onomkeerbaars gebeurd.',
      },
      {
        kop: 'Geen scherm in je dashboard',
        tekst:
          'Wat er van buiten te zien is, blijft van die tijd. De moderne techniek gaat erachter of eronder — uit het zicht, niet uit het geluid.',
      },
      {
        kop: 'Speakers op de plek waar ze horen',
        tekst:
          'Wij zagen geen nieuwe gaten. Past een moderne speaker niet in de originele opening, dan frezen we er een adapterring voor op maat. Massief kunststof of aluminium, geen hout.',
      },
      {
        kop: 'Demping doet hier het meeste',
        tekst:
          'Bij een klassieker levert een gedempte deur vaak meer op dan een dure speaker. Het wordt stiller, de bas wordt strakker, en het plaatwerk houdt op met meetrillen. Wij kijken het plaatwerk eerst na — demping plakken op blik met roest eronder is vragen om problemen.',
      },
    ],
  },

  grens: {
    kop: 'Vanaf bouwjaar 1980',
    tekst:
      'Auto\'s van daarvoor hebben soms een elektrisch systeem van zes volt of een omgekeerde massa. Moderne apparatuur gaat daar niet zomaar mee samen, en dan zou je een oplossing krijgen die niet betrouwbaar is. Rijd je iets ouders? Vraag het gerust — dan kijken we of het kan, en zeggen we eerlijk als het niet verstandig is.',
  },

  prijs: {
    kop: 'Wat het kost: dat kijken we eerst',
    tekst:
      'Bij deze auto\'s is er geen pakket dat past. In de ene zit niets, in de andere een radio uit 1985, en de derde heeft een dashboard waar je nauwelijks achter kunt. Een vaste prijs zou een slag in de lucht zijn. Stuur een foto van je dashboard en van je deurpaneel, dan hoor je binnen 24 uur wat er kan en wat het ongeveer wordt.',
  },

  faq: [
    {
      q: 'Blijft mijn auto origineel?',
      a: 'Dat is het uitgangspunt. Wij knippen geen originele bedrading door, zagen geen nieuwe gaten en gooien niets weg. Alles wat we eruit halen krijg je mee of bewaren we, zodat de auto altijd terug kan naar hoe hij was. Voor een klassieker is dat geen extraatje maar de voorwaarde.',
    },
    {
      q: 'Kan ik dan wel gewoon mijn telefoon gebruiken?',
      a: 'Ja, en dat hoeft niet zichtbaar te zijn. Er zijn manieren om draadloos muziek en handsfree bellen toe te voegen zonder dat er aan de buitenkant iets verandert. Wat er precies past hangt af van wat er in je auto zit — dat bekijken we samen.',
    },
    {
      q: 'Mijn auto is uit 1972. Kan dat ook?',
      a: 'Misschien, maar dat kijken we eerst. Auto\'s van vóór ongeveer 1980 hebben soms zes volt of een omgekeerde massa, en dan werkt moderne apparatuur niet zonder meer. Wij zeggen liever vooraf dat het niet verstandig is dan dat je achteraf met een half werkend systeem zit.',
    },
  ],
};

export default OLDTIMER;
