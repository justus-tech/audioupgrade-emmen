/**
 * Volkswagen — 10 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

  // ------------------------------------------------------------------ GOLF
  {
    slug: 'volkswagen-golf',
    brand: 'Volkswagen',
    model: 'Golf',
    matchers: { merk: 'VOLKSWAGEN', model: /GOLF/ },
    title: 'VW Golf audio upgrade & CarPlay v.a. €695 | Audio Upgrade Emmen',
    description:
      'Betere speakers, echte bas en draadloos CarPlay in je VW Golf. All-in prijzen, inbouw in één dag, fabrieksgarantie blijft behouden.',
    intro:
      'De Golf is de meest verkochte auto van Nederland. Precies daarom bezuinigt Volkswagen op het geluid. Wat er af fabriek in zit is niet kapot, het is bewust goedkoop.',
    problems: [
      'Er zit geen aparte versterker in: het vermogen komt uit het kleine eindtrapje in de radio zelf. Draai je verder open, dan wordt de stem scherp en verdwijnt de bas.',
      'De deuren van het MQB-platform zijn grote holle bakken met open gaten. De achterkant van de speaker straalt zo de deur in en heft de bas grotendeels op.',
      'Bij hogere snelheid verdrinkt het middengebied in rolgeluid. Je zet harder, en juist dan neemt de vervorming toe.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Golf zit de grootste winst niet in dure speakers, maar in de deur. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken zo van die holle deur een fatsoenlijke behuizing. Daarna pas heeft een betere speakerset zin: dezelfde speaker klinkt in een gedempte deur hoorbaar voller. Wil je het echt goed, dan zetten we er een DSP-versterker achter die de fabrieksafstemming corrigeert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm kan op vrijwel elke Golf 7 en 8, en op Golf 6 met Composition- of Discover-scherm. Bediening blijft via de originele knoppen en het stuur.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Blijft mijn fabrieksgarantie geldig als ik de audio laat aanpassen?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen die op de bestaande stekkers achter het dashboard en in de deur worden aangesloten. Er wordt niets doorgeknipt en niets aan de originele bedrading veranderd. Alles is later volledig terug te bouwen naar origineel.',
      },
      {
        q: 'Kan ik de originele radio en schermbediening houden?',
        a: 'Ja, en bij de Golf is dat ook het advies. Het scherm blijft van Volkswagen, de stuurknoppen blijven werken en de parkeersensoren en telefoonfuncties blijven ongewijzigd. Alleen wat je hoort verandert.',
      },
      {
        q: 'Heb ik een subwoofer nodig in een Golf?',
        a: 'Niet per se. Met een goede set in gedempte deuren gaat een Golf verrassend laag. Luister je basrijke muziek of wil je op snelwegtempo hetzelfde fundament houden, dan voegt een compacte subwoofer onder de stoel of in de reservewielbak dat laatste stuk toe zonder dat je bagageruimte inlevert.',
      },
    ],
  },

  // ------------------------------------------------------------------ POLO
  {
    slug: 'volkswagen-polo',
    brand: 'Volkswagen',
    model: 'Polo',
    matchers: { merk: 'VOLKSWAGEN', model: /POLO/ },
    title: 'VW Polo audio upgrade & CarPlay v.a. €695 | Audio Upgrade Emmen',
    description:
      'Van blikkerig naar vol geluid in je VW Polo. Speakers, deurdemping en draadloos CarPlay met all-in prijs en behoud van fabrieksgarantie.',
    intro:
      'In een Polo zit je dicht op je speakers. Dat is een voordeel dat Volkswagen volledig laat liggen. Het is precies waarom een Polo met de juiste ingrepen boven zijn klasse uit kan spelen.',
    problems: [
      'Veel uitvoeringen hebben geen aparte tweeter. Eén breedbandspeakertje in de deur moet dan zowel de bas als de stemmen doen, en dat lukt geen enkele speaker.',
      'Het deurblik van de Polo is dun en licht. Het gaat hoorbaar meetrillen op elke basnoot, waardoor de bas eerder rammelt dan draagt.',
      'Weinig isolatie betekent veel rolgeluid, en dat maskeert juist het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Polo werkt een componentenset met een losse tweeter het beste. Die tweeter komt in de spiegeldriehoek, waardoor het geluidsbeeld ineens vóór je zit in plaats van onder je. De woofer gaat in een gedempte deur, zodat het lichte blik niet meer meeklappert. Omdat de cabine klein is, haal je met bescheiden vermogen al een groot resultaat — een Polo is daarom een van de dankbaarste auto\'s om aan te pakken.',
    },
    carplay: {
      possible: true,
      text: 'Heeft je Polo een Composition- of Discover-scherm, dan kunnen we draadloos CarPlay en Android Auto toevoegen zonder het dashboard te vervangen. Bij uitvoeringen zonder scherm bekijken we per auto wat de nette oplossing is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Is een Polo niet te klein voor serieus geluid?',
        a: 'Integendeel. Een kleine cabine heeft minder luchtvolume, dus er is minder vermogen nodig voor hetzelfde niveau. Je zit bovendien dichter bij de speakers. Een goed opgezette Polo klinkt met gemak beter dan een grote auto met de standaard fabrieksinstallatie.',
      },
      {
        q: 'Passen er grotere speakers in de deur van mijn Polo?',
        a: 'De Polo heeft standaard een 6,5-inch opening voor. Wij gebruiken daarvoor CNC-gefreesde ringen zodat de nieuwe speaker precies op de originele bevestigingspunten past, zonder boren of zagen. Het originele deurpaneel gaat er daarna gewoon weer strak op.',
      },
      {
        q: 'Wat kost een upgrade voor mijn Polo ongeveer?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in, inclusief montage en btw. Wil je alleen draadloos CarPlay, dan begint dat bij € 695. Stuur een foto van je dashboard via WhatsApp, dan krijg je binnen 24 uur een prijs die klopt voor jouw uitvoering.',
      },
    ],
  },

  // ----------------------------------------------------------- TRANSPORTER
  {
    slug: 'volkswagen-transporter',
    brand: 'Volkswagen',
    model: 'Transporter',
    matchers: { merk: 'VOLKSWAGEN', model: /TRANSPORTER|MULTIVAN|CARAVELLE|T5|T6/ },
    title: 'VW Transporter audio & geluidsisolatie | Audio Upgrade Emmen',
    description:
      'Rust en geluid in je VW Transporter T5, T6 of T6.1. Akoestische demping tegen rolgeluid, betere speakers en draadloos CarPlay.',
    intro:
      'In een Transporter breng je uren door. Dat maakt het verschil tussen matig en goed geluid hier groter dan in welke personenauto dan ook. Het begint niet bij de speakers, maar bij de herrie.',
    problems: [
      'Rolgeluid en resonantie van de laadruimte maskeren het hele middengebied. Je verstaat podcasts en telefoongesprekken slechter, en zet daarom harder.',
      'Grote, vlakke plaatstalen panelen werken als een trommelvel en dreunen mee met elke basnoot.',
      'Meestal zitten er alleen twee speakers vóór en geen rear fill, dus het geluid zit volledig links en rechts naast je in plaats van vóór je.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Transporter beginnen we bijna altijd met demping, niet met speakers. Het dempen van de deuren, de vloer en waar gewenst de zijwanden en het dak haalt hoorbaar rolgeluid en resonantie weg. Klanten merken dat vaak het eerst aan iets anders dan muziek: je hoeft niet meer te schreeuwen in de auto en je stapt minder moe uit. Pas daarna bouwen we het geluid op — in een stille cabine hoef je veel minder hard te zetten voor hetzelfde effect.',
    },
    carplay: {
      possible: true,
      text: 'Op de T6 en T6.1 met Composition- of Discover-scherm bouwen we draadloos CarPlay en Android Auto in het originele scherm in. Voor de T5 kijken we per auto — daar verschilt de schermbediening per bouwjaar.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik wil vooral minder herrie, niet per se harde muziek. Kan dat los?',
        a: 'Ja, dat is ons pakket Akoestische Isolatie: alleen demping en isolatie, zonder nieuwe speakers. Voor bestelbussen en campers is dat vaak de verstandigste eerste stap. De prijs hangt af van hoeveel oppervlak je wilt aanpakken, dus die maken we op aanvraag.',
      },
      {
        q: 'Kan ik dit combineren met een camperombouw?',
        a: 'Zeker, en het is dan ook het juiste moment. Als het interieur er toch uit is, kunnen wij vloer, wanden en dak in één keer dempen zonder extra demontage-uren. Plan het in overleg met je ombouwer, dan hoeft alles maar één keer los.',
      },
      {
        q: 'Hoeveel stiller wordt het echt?',
        a: 'Dat verschilt per uitvoering en per hoeveelheid oppervlak, dus wij beloven geen cijfer dat we niet kunnen waarmaken. Wat vrijwel iedereen wel merkt: het dreunen van de laadruimte verdwijnt, de deuren klinken bij het dichtslaan massief in plaats van blikkerig, en gesprekken op snelwegsnelheid gaan zonder stemverheffing.',
      },
    ],
  },

  // ---------------------------------------------------------------- TIGUAN
  {
    slug: 'volkswagen-tiguan',
    brand: 'Volkswagen',
    model: 'Tiguan',
    matchers: { merk: 'VOLKSWAGEN', model: /TIGUAN/ },
    title: 'VW Tiguan audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Meer body en echte bas in je VW Tiguan. Premium speakers, deurdemping, DSP en draadloos CarPlay. All-in prijs, inbouw in één dag.',
    intro:
      'Een Tiguan heeft een groter interieur dan een Golf, maar krijgt in de basis vrijwel dezelfde audiocomponenten mee. Datzelfde geluid moet dus een veel grotere ruimte vullen. Dat hoor je.',
    problems: [
      'Groot cabinevolume met klein fabrieksvermogen: lage tonen hebben vermogen nodig om zo\'n ruimte te vullen, en dat is er niet.',
      'De hoge zitpositie zet je verder van de deurspeakers af, waardoor het geluidsbeeld nog lager komt te liggen dan in een gewone hatchback.',
      'De grote achterklep, de bagageruimtepanelen en de kentekenplaathouder resoneren hoorbaar mee op lage tonen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Tiguan is een DSP-versterker geen luxe maar de kern van de oplossing. Die geeft de speakers het vermogen dat het cabinevolume vraagt, en corrigeert met tijdcorrectie het feit dat je veel dichter bij de linkerspeaker zit dan bij de rechter. Daardoor komt het geluidsbeeld op ooghoogte vóór je te liggen in plaats van bij je knieën. De deuren en de achterklep dempen we, zodat het extra vermogen in muziek gaat zitten en niet in rammelend plaatwerk.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm is op vrijwel elke Tiguan met Composition- of Discover-systeem mogelijk. De achteruitrijcamera en parkeersensoren blijven gewoon werken.',
    },
    packages: ['oem-plus-executive', 'akoestische-basis', 'carplay-upgrade', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb al een fabrieks-soundsysteem. Heeft een upgrade dan nog zin?',
        a: 'Ja. De fabrieksupgrade is vooral een iets betere speakerset met lichte versterking; de beperkingen in de deuren en het gebrek aan echte diepgang blijven. Wij bouwen daarop verder met demping en een DSP die de afstemming op jouw auto corrigeert. Vertel ons welk systeem erin zit, dan zeggen we eerlijk wat de winst zal zijn.',
      },
      {
        q: 'Verlies ik bagageruimte door een subwoofer?',
        a: 'Bij ons niet zichtbaar. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je vloer blijft vlak en je laadruimte volledig bruikbaar — precies wat je van een gezinsauto verwacht.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Tiguan-opdrachten één werkdag. Je brengt de auto \'s ochtends en rijdt aan het eind van de dag weg met een afgestemd systeem. Bij uitgebreide isolatie of een Reference-opbouw plannen we langer, en dat zeggen we vooraf.',
      },
    ],
  },

  // ----------------------------------------------------------- VW PASSAT
  {
    slug: 'volkswagen-passat',
    brand: 'Volkswagen',
    model: 'Passat',
    generaties: 'B6, B7 en B8, sedan en Variant',
    matchers: { merk: 'VOLKSWAGEN', model: /PASSAT/ },
    title: 'VW Passat audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Meer diepgang en rust in je VW Passat. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay in het originele scherm.',
    intro:
      'De Passat is de auto waarin Nederland zijn kilometers maakt. Juist daarom valt het op wat er ontbreekt: op snelwegtempo moet je harder zetten om nog iets te horen, en dan gaat het systeem knijpen.',
    problems: [
      'Op snelwegsnelheid verdrinkt het middengebied in rolgeluid. Je draait open om het te compenseren, en precies daar loopt de fabrieksversterking tegen zijn grens.',
      'Bij de Variant slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
      'Het formaat van de cabine vraagt meer vermogen dan een Golf, terwijl er in de basis vrijwel dezelfde aansturing in zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Passat begint het bij rust. Wij dempen de deuren en bij een Variant ook de laadruimte, waardoor het rolgeluid zakt en je bij een lager volume alsnog alles hoort. Dat scheelt op lange ritten enorm: een systeem dat niet hoeft te knijpen, vermoeit je niet. Daarna geeft een DSP-versterker de speakers het vermogen dat deze cabine vraagt, met tijdcorrectie zodat het geluidsbeeld voor je op het dashboard komt te staan in plaats van in je linkerdeur.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele Composition- of Discover-scherm. Bediening blijft via de originele knoppen en het stuur.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik rij veel snelweg. Wat merk ik daar het meest van?',
        a: 'Dat je zachter kunt luisteren en tóch alles verstaat. De meeste winst zit niet in meer volume maar in minder rolgeluid: als de bodem stiller is, hoef je er niet meer overheen te schreeuwen. Veelrijders melden vooral terug dat ze minder moe uitstappen.',
      },
      {
        q: 'Ik heb de Variant. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Het is bij een Variant wel de plek waar de meeste winst zit, dus we bespreken vooraf wat je ervoor terugkrijgt en wat het kost.',
      },
      {
        q: 'Ik heb het Dynaudio-systeem al. Heeft een upgrade dan nog zin?',
        a: 'Ja, maar gerichter. Dynaudio geeft je een betere speakerset; wat het niet geeft is gedempte deuren en een afstemming op jouw stoel. Bij zo\'n auto vervangen we meestal niet alles, maar voegen we demping en DSP-controle toe.',
      },
    ],
  },

  // ------------------------------------------------------------ VW T-ROC
  {
    slug: 'volkswagen-t-roc',
    brand: 'Volkswagen',
    model: 'T-Roc',
    generaties: 'T-Roc en T-Roc Cabrio',
    matchers: { merk: 'VOLKSWAGEN', model: /T-ROC/ },
    title: 'VW T-Roc audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Meer body en echte bas in je VW T-Roc. Premium speakers, deurdemping, DSP en draadloos CarPlay. All-in prijs, inbouw in één dag.',
    intro:
      'De T-Roc is populair om zijn hoge zit en zijn formaat. Precies die twee dingen werken tegen het geluid dat er af fabriek in zit.',
    problems: [
      'Je zit hoog, en dus verder van de deurspeakers af. Het geluidsbeeld blijft daardoor laag bij je knieën hangen in plaats van voor je op het dashboard.',
      'Het interieur heeft veel harde kunststof oppervlakken. Die kaatsen hoge tonen terug en maken het geheel scherper dan nodig.',
      'Achterklep en bagageruimtepanelen rammelen hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een T-Roc is tijdcorrectie het halve werk: door het signaal per speaker te vertragen tillen we het geluidsbeeld naar ooghoogte, zodat het niet meer onder je vandaan komt. De harde kunststof binnenkant temmen we met de DSP-afstemming, waardoor de scherpte eruit gaat zonder dat het dof wordt. En we dempen de deuren en de achterklep, zodat het extra vermogen in muziek gaat zitten en niet in rammelend plaatwerk.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de achteruitrijcamera en de parkeersensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt het in mijn T-Roc scherper dan in de Golf van mijn buurman?',
        a: 'Meer hard kunststof en meer glasoppervlak per kubieke meter cabine. Hoge tonen kaatsen daardoor vaker terug voordat ze bij je oor zijn. Dat is met de juiste afstemming goed te temmen, en het is precies wat een DSP doet.',
      },
      {
        q: 'Verlies ik bagageruimte door een subwoofer?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Ik heb een T-Roc Cabrio. Maakt dat verschil?',
        a: 'Ja, en een flink verschil. Met het dak open verlies je alle akoestiek van de cabine en concurreert de muziek met rijwind. Bij een cabrio kiezen we daarom andere speakerposities en een afstemming die met dak open én dicht werkt. Meld het vooraf, dan houden we er rekening mee.',
      },
    ],
  },

  // -------------------------------------------------------------- VW UP!
  {
    slug: 'volkswagen-up',
    brand: 'Volkswagen',
    model: 'Up!',
    generaties: 'Up!, Move Up!, High Up! en e-Up!',
    matchers: { merk: 'VOLKSWAGEN', model: /^UP/ },
    title: 'VW Up! audio upgrade | Audio Upgrade Emmen',
    description:
      'Van blikkerig naar vol geluid in je VW Up!. Speakers, deurdemping en minder rolgeluid — met all-in prijs en behoud van fabrieksgarantie.',
    intro:
      'De Up! is gebouwd om goedkoop te zijn, en het geluid is de plek waar dat het duidelijkst te horen is. Het goede nieuws: in zo\'n kleine cabine hoef je weinig te doen voor een groot verschil.',
    problems: [
      'Veel uitvoeringen hebben maar twee of vier speakers, zonder aparte tweeter. Eén speakertje in de deur moet dan zowel de bas als de stemmen doen.',
      'Het deurblik is dun en licht en gaat op elke basnoot hoorbaar meetrillen.',
      'Er zit nauwelijks isolatie in. Op de snelweg overstemt het rolgeluid precies het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Up! is demping geen bijzaak maar het halve resultaat. Het lichte deurblik stilleggen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je voeten. Omdat de cabine zo klein is, heb je verrassend weinig vermogen nodig. Dit is een van de goedkoopste auto\'s om echt goed te krijgen.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Up!-uitvoeringen hebben geen ingebouwd scherm maar een houder voor je telefoon, dus daar past ons CarPlay-pakket niet in. Heeft jouw Up! wél een scherm in het dashboard, stuur er dan een foto van via WhatsApp — dan zeggen we binnen 24 uur wat er kan.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Is het niet zonde om in zo\'n kleine auto te investeren?',
        a: 'Juist niet. Een kleine cabine heeft weinig luchtvolume, dus je hebt weinig vermogen nodig voor hetzelfde niveau, en je zit dichter bij de speakers. Een goed opgezette Up! klinkt met gemak beter dan een grote auto met standaard fabrieksaudio.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen. Daarna pas heeft een betere speaker echt zin.',
      },
      {
        q: 'Ik heb een e-Up!. Verandert dat iets?',
        a: 'Voor het geluid werkt het in je voordeel: geen motorgeluid betekent dat je muziek minder concurrentie heeft. Wel valt het rolgeluid daardoor extra op, dus demping levert bij een e-Up! nog meer op dan bij de benzineversie.',
      },
    ],
  },

  // -------------------------------------------------------- VW TOURAN
  {
    slug: 'volkswagen-touran',
    brand: 'Volkswagen',
    model: 'Touran',
    generaties: '1T en 5T',
    matchers: { merk: 'VOLKSWAGEN', model: /TOURAN/ },
    title: 'VW Touran audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je VW Touran. Premium speakers, demping, DSP-afstemming en afstemming voor de hele auto.',
    intro:
      'De Touran is de gezinsauto bij uitstek: hoog, ruim en vaak met zeven stoelen. Al die ruimte moet gevuld worden, en dat lukt de fabrieksinstallatie niet.',
    problems: [
      'Groot, hoog cabinevolume met dezelfde bescheiden aansturing als in een Golf.',
      'Met de derde zitrij in gebruik zitten passagiers ver van de voorste speakers.',
      'De grote achterklep en de vlakke zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Touran is een DSP-versterker de kern: die geeft de speakers het vermogen dat het volume vraagt en corrigeert de afstand tot je stoel. De deuren en de klep dempen we, zodat dat vermogen in muziek gaat zitten. Rijd je vaak met een volle auto, dan leggen we een tweede afstemming vast die iedereen bedient in plaats van alleen de bestuurder.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele Composition- of Discover-scherm, met behoud van camera en sensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik rij vaak met kinderen achterin. Kan het daar ook goed klinken?',
        a: 'Ja. Met een tweede afstemming die de hele auto bedient klinkt het overal netjes, iets minder scherp vooraan. Je kunt zelf wisselen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Touran-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer.',
      },
    ],
  },

  // -------------------------------------------------------- VW T-CROSS
  {
    slug: 'volkswagen-t-cross',
    brand: 'Volkswagen',
    model: 'T-Cross',
    generaties: 'T-Cross vanaf 2019',
    matchers: { merk: 'VOLKSWAGEN', model: /T-CROSS/ },
    title: 'VW T-Cross audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je VW T-Cross. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De T-Cross is de Polo op hoge poten: compact van buiten, verrassend ruim van binnen. Die extra hoogte kost je precies wat het geluid nodig heeft.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Het interieur heeft veel hard kunststof, wat hoge tonen scherp terug laat kaatsen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een T-Cross tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte, dempen we de deuren en de klep, en temmen we met de DSP-afstemming de scherpte van het harde interieur. Omdat de cabine compact is, heb je daar minder vermogen voor nodig dan in een grote SUV.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera en parkeersensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel.',
      },
      {
        q: 'Waarom klinkt het scherp?',
        a: 'Veel hard kunststof per kubieke meter cabine. Met de juiste speakerkeuze en DSP-afstemming haal je dat eruit zonder dat het dof wordt.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ------------------------------------------------------------ VW ID.3
  {
    slug: 'volkswagen-id3',
    brand: 'Volkswagen',
    model: 'ID.3',
    generaties: 'ID.3 vanaf 2020',
    matchers: { merk: 'VOLKSWAGEN', model: /ID\.?3\b/ },
    title: 'VW ID.3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je VW ID.3. Premium speakers, deurdemping en DSP-afstemming — extra effectief in een stille elektrische auto.',
    intro:
      'De ID.3 is de elektrische opvolger van de Golf-gedachte. Zonder motorgeluid is hij opvallend stil, en juist die stilte legt bloot wat het audiosysteem laat liggen.',
    problems: [
      'Zonder motorgeluid wordt het rolgeluid van de banden het luidste geluid in de auto, precies waar stemmen zitten.',
      'Het interieur heeft veel hard kunststof, wat hoge tonen scherp terug laat kaatsen.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een elektrische auto is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en temmen met de DSP de scherpte van het harde interieur. Een compacte subwoofer maakt het fundament af.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de volledige bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik in een elektrische auto meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto. Het maakt de auto ook comfortabeler zonder muziek.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt; het valt weg tegen buitentemperatuur en rijstijl.',
      },
      {
        q: 'Waarom klinkt het scherp in mijn ID.3?',
        a: 'Veel hard kunststof en weinig zachte materialen om reflecties te dempen, in een auto die verder heel stil is. Met de juiste speakerkeuze en DSP-afstemming is dat goed te temmen.',
      },
    ],
  },
];
