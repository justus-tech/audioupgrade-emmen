// Eén record per automodel → wordt automatisch een landingspagina op /audio-upgrade/[slug]
// matchers: gebruikt door de kenteken-check om RDW-data (merk + handelsbenaming) te koppelen.
//
// Aanspreekvorm: "je" (afgesproken 12 aug 2026). Houd dat consequent aan.
//
// LET OP bij de matchers: de RDW schrijft modelnamen niet zoals mensen praten.
// BMW 3-serie staat er als "3ER REIHE", "320I", "318I", "330E"; Mercedes C-klasse
// als "C 180"; Tesla soms als "Model 3" met kleine letters. Wijzig deze regexes
// niet zonder `npm run test:kenteken` te draaien — die toetst ze tegen echte data.
//
// Titels bevatten bewust " | Audio Upgrade Emmen". Squarespace plakte de bedrijfsnaam
// er automatisch achter, Astro doet dat NIET.

export const MODELS = [
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
      'De Golf is de meest verkochte auto van Nederland — en precies daarom bezuinigt Volkswagen op het geluid. Wat er af fabriek in zit is niet kapot, het is bewust goedkoop.',
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
      'In een Polo zit je dicht op je speakers. Dat is een voordeel dat Volkswagen volledig laat liggen — en het is precies waarom een Polo met de juiste ingrepen boven zijn klasse uit kan spelen.',
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
      'In een Transporter breng je uren door. Dat maakt het verschil tussen matig en goed geluid hier groter dan in welke personenauto dan ook — en het begint niet bij de speakers, maar bij de herrie.',
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
      'Een Tiguan heeft een groter interieur dan een Golf, maar krijgt in de basis vrijwel dezelfde audiocomponenten mee. Datzelfde geluid moet dus een veel grotere ruimte vullen — en dat hoor je.',
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

  // -------------------------------------------------------------- AUDI A3
  {
    slug: 'audi-a3',
    brand: 'Audi',
    model: 'A3',
    matchers: { merk: 'AUDI', model: /\bA3\b/ },
    title: 'Audi A3 audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Haal het maximum uit de audio van je Audi A3. Premium speakers, DSP-afstemming en draadloos CarPlay in het originele MMI-scherm.',
    intro:
      'Een A3 voelt overal duur aan — tot je de muziek aanzet. Audi levert een net, maar bewust terughoudend afgestemd systeem, omdat het echte geluid in de optielijst staat.',
    problems: [
      'Een vlakke, defensieve fabrieksafstemming zonder echte diepgang onderin: het klinkt beschaafd, maar het pakt je nooit.',
      'Beperkte instelmogelijkheden in het MMI. Een bass- en treble-schuif compenseert geen akoestisch probleem.',
      'Op veel uitvoeringen loopt de audio over een digitale bus in plaats van gewone speakerdraden, dus je kunt er niet zomaar een versterker tussen hangen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A3 draait het om de juiste aansluiting. Wij koppelen een DSP-versterker aan met een interface die het digitale signaal correct uitleest, zodat we een schoon en volledig signaal binnenkrijgen in plaats van een al bewerkt restsignaal. Vanaf dat punt hebben we volledige controle: filters, tijdcorrectie en een afstemming per auto. Het MMI en de originele bediening blijven intact, terwijl het geluid een compleet andere auto lijkt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm is mogelijk op de meeste A3-uitvoeringen met MMI-scherm. Bediening blijft via de originele draaiknop en de stuurtoetsen.',
    },
    packages: ['oem-plus-executive', 'akoestische-basis', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb het Bang & Olufsen-systeem. Valt daar nog winst te halen?',
        a: 'Ja, al is het vertrekpunt hoger. B&O levert een goede speakerset, maar de afstemming is een compromis dat voor elke A3 gelijk is, en de deuren zijn ook daar niet gedempt. Met demping en een eigen DSP-afstemming op jouw auto en jouw luisterpositie halen we er hoorbaar meer focus en diepgang uit.',
      },
      {
        q: 'Moet het MMI-scherm eruit voor een upgrade?',
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Het scherm, de menu\'s, de navigatie en de stuurbediening blijven volledig origineel — dat is precies waarom dit een OEM+ aanpak heet.',
      },
      {
        q: 'Waarom is een DSP bij een Audi belangrijker dan bij sommige andere auto\'s?',
        a: 'Omdat het fabriekssysteem het signaal al bewerkt heeft voordat het bij de speakers komt, en die bewerking is afgestemd op de originele speakers. Zet je daar zonder correctie betere speakers achter, dan hoor je die fabrieksbewerking juist duidelijker. Een DSP draait dat terug en bouwt de afstemming opnieuw op.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI A4
  {
    slug: 'audi-a4',
    brand: 'Audi',
    model: 'A4',
    matchers: { merk: 'AUDI', model: /\bA4\b/ },
    title: 'Audi A4 audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Van vlak naar volwassen geluid in je Audi A4 of A4 Avant. DSP-afstemming, high-end speakers en draadloos CarPlay in het MMI.',
    intro:
      'De A4 is de zakelijke kilometervreter bij uitstek. Juist als je er veel uren in maakt, ga je horen wat er in de basisaudio ontbreekt: het is nooit vervelend, maar het pakt je ook nooit.',
    problems: [
      'De onderkant houdt te vroeg op. Er is geen echte subwoofer, alleen een klein woofertje dat de naam niet verdient.',
      'Het stereobeeld ligt laag en asymmetrisch, omdat je veel dichter bij de linkerdeur zit dan bij de rechter.',
      'Bij de Avant resoneren de laadruimtepanelen en de achterklep hoorbaar mee, en slikt de grote laadruimte lage tonen weg.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De A4 is een van de auto\'s waar tijdcorrectie het grootste verschil maakt. Door het signaal per speaker te vertragen laten we het geluid samenvallen op de bestuurdersstoel, waardoor de zangeres ineens midden op het dashboard staat in plaats van in je linkerdeur. Daar voegen we een compacte subwoofer aan toe voor het fundament dat de fabriek weglaat, en dempen we de deuren — bij een Avant ook de laadruimte, want daar zit de resonantie.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm is op de meeste A4-uitvoeringen mogelijk, inclusief bediening via de originele draaiknop en het stuur.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Wat merk ik in de praktijk van tijdcorrectie?',
        a: 'Dat het geluid loskomt van de speakers. In een standaardauto hoor je links iets en rechts iets. Met correcte tijdcorrectie ontstaat er één beeld vóór je, op ooghoogte, met de zang in het midden en de instrumenten er links en rechts omheen. Het is het verschil dat mensen tijdens een proefrit het eerst opvalt.',
      },
      {
        q: 'Is de Avant lastiger dan de sedan?',
        a: 'Anders, niet lastiger. De grotere laadruimte vraagt meer demping en een andere plaatsing van de subwoofer, maar biedt ook meer mogelijkheden om die netjes weg te werken. Wij stemmen af op de carrosserievorm die jij hebt.',
      },
      {
        q: 'Kan ik later nog uitbreiden?',
        a: 'Ja, en daar houden we bij het inbouwen rekening mee. Begin je met The OEM+ Executive, dan leggen we de bekabeling zo aan dat uitbreiden naar meer kanalen of een zwaardere subwoofer later zonder sloopwerk kan. Je betaalt dan alleen voor de nieuwe componenten, niet opnieuw voor de infrastructuur.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 3-SERIE
  {
    slug: 'bmw-3-serie',
    brand: 'BMW',
    model: '3-serie',
    matchers: { merk: 'BMW', model: /^3|\b3\d{2}\b|3 SERIE|318|320|325|330|335|340/ },
    title: 'BMW 3-serie audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Meer uit je BMW 3-serie halen: DSP-afstemming, high-end speakers en draadloos CarPlay in het originele iDrive-scherm.',
    intro:
      'BMW bouwt de 3-serie rond de bestuurder. De audio-installatie helaas niet: het basissysteem is duidelijk ontworpen om je richting de Harman Kardon-optie te duwen.',
    problems: [
      'De onderstoelwoofers krijgen veel te weinig vermogen. Wel formaat, geen slagkracht — de bas blijft traag en zacht.',
      'De middenspeaker in het dashboard is een klein breedbandertje dat het stereobeeld eerder versmalt dan verbreedt, en stemmen nasaal maakt.',
      'De fabrieksafstemming verandert mee met het volume, waardoor het geluid op hoge niveaus onnatuurlijk wordt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De 3-serie vraagt om een interface die het originele signaal digitaal en onbewerkt binnenhaalt, vóór alle fabriekscorrecties. Vanaf daar bouwen we de afstemming opnieuw op met een DSP-versterker: de onderstoelwoofers krijgen eindelijk het vermogen waarvoor ze bedoeld zijn, de deurspeakers worden vervangen door een echte componentenset en de middenspeaker zetten we in dienst van het beeld in plaats van ertegenin. Het resultaat ziet er origineel uit, maar klinkt als een compleet ander systeem.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, bediend met de originele iDrive-draaiknop. Op de meeste E90-, F30- en G20-uitvoeringen mogelijk; welke oplossing past hangt af van je iDrive-versie.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb al Harman Kardon. Is een upgrade dan nog zinvol?',
        a: 'Ja, maar met een ander vertrekpunt. Harman Kardon geeft je meer vermogen en meer speakers; wat het niet geeft is een afstemming op jouw luisterpositie en gedempte deuren. Wij vervangen dan meestal niet alles, maar voegen DSP-controle en demping toe. Dat is een gerichtere en vaak voordeligere ingreep.',
      },
      {
        q: 'Moet de middenspeaker in het dashboard eruit?',
        a: 'Meestal niet. Wij laten hem zitten en geven hem via de DSP een beperkte, gecontroleerde taak. Volledig uitschakelen kan ook — sommige klanten horen liever een breder beeld zonder middenspeaker. Dat luisteren we samen af tijdens het afstemmen.',
      },
      {
        q: 'Krijg ik problemen met de boordcomputer of foutmeldingen?',
        a: 'Nee. Wij gebruiken interfaces die specifiek voor BMW gemaakt zijn en die zich netjes op de databus gedragen. Er wordt niets doorgeknipt en er verschijnen geen foutmeldingen in het iDrive. Alles is volledig terug te bouwen naar origineel.',
      },
    ],
  },

  // ----------------------------------------------------- MERCEDES C-KLASSE
  {
    slug: 'mercedes-c-klasse',
    brand: 'Mercedes-Benz',
    model: 'C-klasse',
    matchers: { merk: 'MERCEDES', model: /\bC \d|C-KLASSE|C KLASSE|C180|C200|C220|C250|C300/ },
    title: 'Mercedes C-klasse audio upgrade | Audio Upgrade Emmen',
    description:
      'Warmer, voller en dieper geluid in je Mercedes C-klasse. DSP-afstemming, premium speakers en draadloos CarPlay in het originele scherm.',
    intro:
      'Een C-klasse is stil, comfortabel en goed geïsoleerd. Dat is een uitstekend uitgangspunt voor geluid — en juist daarom is het zonde dat het standaardsysteem er zo weinig mee doet.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'Geen echte subwoofer in de basis. Het fundament onder de muziek ontbreekt volledig.',
      'De goede isolatie werkt tegen je: er is weinig rolgeluid dat de tekortkomingen maskeert, dus je hoort ze des te duidelijker.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De C-klasse is een dankbare auto omdat het zware isolatiewerk al door Mercedes gedaan is. Wij kunnen daardoor direct naar de kern: een DSP-versterker die het signaal schoon binnenhaalt, een goede componentenset in de deuren en een compacte subwoofer voor het fundament dat ontbreekt. Vervolgens stemmen we af op jouw stoel. In zo\'n stille cabine levert dat een resultaat op dat verrassend dicht bij een echt high-end systeem komt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele bediening. Welke oplossing past hangt af van je NTG-systeemversie; dat bepalen we aan de hand van een foto van je dashboard.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Wat is het verschil met het Burmester-systeem uit de fabriek?',
        a: 'Burmester geeft je meer speakers en meer vermogen, maar ook een afstemming die voor elke C-klasse identiek is en op alle stoelen tegelijk moet werken. Wij stemmen af op jouw luisterpositie en dempen de deuren, wat Mercedes niet doet. In de praktijk halen wij daarmee meer focus en diepgang, vaak voor minder dan de fabrieksoptie kostte.',
      },
      {
        q: 'Ik heb Burmester al. Wat kunnen jullie dan nog doen?',
        a: 'Demping en DSP-controle toevoegen. De speakerset mag dan blijven zitten; de winst zit in het temmen van de deuren en het opnieuw opbouwen van de afstemming. Dat is een gerichte ingreep waar we vooraf eerlijk over zijn wat je ervan mag verwachten.',
      },
      {
        q: 'Blijven alle rijassistentie- en telefoonfuncties werken?',
        a: 'Ja. Waarschuwingssignalen, parkeersensoren, handsfree bellen en spraakbediening lopen via het fabriekssysteem en blijven ongewijzigd. Onze interface laat die signalen netjes doorlopen, zodat je nooit een waarschuwing mist doordat de muziek aanstaat.',
      },
    ],
  },

  // ------------------------------------------------------------- VOLVO V60
  {
    slug: 'volvo-v60',
    brand: 'Volvo',
    model: 'V60',
    matchers: { merk: 'VOLVO', model: /V60/ },
    title: 'Volvo V60 audio upgrade & CarPlay | Audio Upgrade Emmen',
    description:
      'Meer diepgang en focus in je Volvo V60. Premium speakers, DSP-afstemming, demping van de laadruimte en draadloos CarPlay.',
    intro:
      'Volvo-rijders zijn vaak bewuste luisteraars — het merk adverteert zelf met Bowers & Wilkins. Wie zonder die optie rijdt, hoort direct dat de basisinstallatie een ander verhaal vertelt.',
    problems: [
      'Breed opgezet maar onderbemeten: veel speakers, weinig vermogen per speaker. Je hoort alles, maar niets heeft gewicht.',
      'Geen echte subwoofer in de basisuitvoering, dus het onderste octaaf ontbreekt gewoon.',
      'De open laadruimte van de stationwagen slikt lage tonen en resoneert tegelijk mee — precies in het gebied waar het fundament zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij de V60 pakken we de laadruimte net zo serieus aan als de deuren — daar zit bij een stationwagen de helft van het probleem. Met demping van de zijpanelen en de klep verdwijnt de resonantie, en pas dan heeft extra vermogen zin. Een DSP-versterker brengt de speakers op niveau en corrigeert de afstemming, en een compacte subwoofer in de zijkant van de laadruimte geeft het fundament terug zonder dat je ruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste V60-uitvoeringen kunnen we draadloos CarPlay en Android Auto toevoegen aan het originele Sensus-scherm. Welke oplossing past verschilt per bouwjaar en schermtype.',
    },
    packages: ['oem-plus-executive', 'akoestische-basis', 'carplay-upgrade'],
    faq: [
      {
        q: 'Is een upgrade te vergelijken met het Bowers & Wilkins-systeem?',
        a: 'Het vertrekpunt verschilt. B&W is een uitstekende fabrieksoptie met mooie componenten, maar met een afstemming die voor iedere V60 gelijk is en zonder gedempte deuren of laadruimte. Wij bouwen op maat voor jouw auto en jouw stoel. Veel klanten vinden ons resultaat directer en dieper; dat kun je bij ons gewoon komen beluisteren.',
      },
      {
        q: 'Waar komt de subwoofer in een V60?',
        a: 'Meestal in de zijwand van de laadruimte of in de reservewielbak, afgewerkt in dezelfde stoffering als het interieur. Je vloer blijft vlak en de bagageruimte volledig bruikbaar — bij een stationwagen is dat wat ons betreft een harde eis.',
      },
      {
        q: 'Ik gebruik de auto voor lange ritten. Wat merk ik daarvan?',
        a: 'Vooral minder luistervermoeidheid. Een systeem dat moet knijpen om volume te maken klinkt hard en vermoeit je na een uur. Met voldoende vermogen en een correcte afstemming kun je zachter luisteren en tóch alles horen. Dat is wat veelrijders na de eerste lange rit terugmelden.',
      },
    ],
  },

  // -------------------------------------------------------- TESLA MODEL 3
  {
    slug: 'tesla-model-3',
    brand: 'Tesla',
    model: 'Model 3',
    matchers: { merk: 'TESLA', model: /MODEL 3|MODEL3/ },
    title: 'Tesla Model 3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Upgrade de audio van je Tesla Model 3. Vooral bij de instapversie zonder premium audio is de winst groot. All-in prijs, fabrieksgarantie behouden.',
    intro:
      'De Model 3 is een bijzonder geval. Er is geen radio om te vervangen en geen dashboard om open te maken — alles loopt via het scherm. Maar juist daaronder zit bij de instapversie de grootste onbenutte winst van alle auto\'s die wij doen.',
    problems: [
      'De instapuitvoeringen missen versterker en subwoofer volledig, terwijl de bekabeling er in veel auto\'s al wél ligt.',
      'Geen echte bas, waardoor het geluid dun blijft in een cabine die verder juist heel stil is. Die stilte maakt het gemis extra hoorbaar.',
      'De grote glazen oppervlakken maken hoge tonen scherp en reflecterend, wat op langere ritten vermoeiend werkt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Model 3 zonder premium audio voegen we toe wat Tesla heeft weggelaten: een DSP-versterker, een betere speakerset en een subwoofer. Omdat de voorbereiding in de auto vaak al aanwezig is, kan dat opvallend netjes en zonder ingrijpende demontage. De DSP gebruiken we bovendien om de scherpte van de glazen cabine te temperen. Heb je al premium audio, dan zit de winst in demping en een eigen afstemming — dan zijn we eerlijk dat het om verfijning gaat, niet om een transformatie.',
    },
    carplay: {
      possible: false,
      text: 'Tesla staat CarPlay en Android Auto niet toe op zijn voertuigen. Dat is een keuze van Tesla en daar kan geen enkele inbouwspecialist omheen. Alles wat wij voor je Model 3 doen zit dus in het geluid zelf, niet in de bediening.',
    },
    packages: ['oem-plus-executive', 'akoestische-basis', 'reference-edition'],
    faq: [
      {
        q: 'Hoe weet ik of ik premium audio heb?',
        a: 'De snelste controle: kijk of er speakers in de achterste zijpanelen en een middenspeaker in het dashboard zitten, en of er in de kofferbak een subwoofer zit. Twijfel je, stuur dan via WhatsApp een foto van je interieur en je bouwjaar, dan zeggen wij het je binnen 24 uur.',
      },
      {
        q: 'Vervalt mijn Tesla-garantie hierdoor?',
        a: 'Nee. Wij sluiten aan op bestaande stekkers en connectoren en knippen geen originele bedrading door. De aanpassing is volledig terug te bouwen, en dat is precies wat je nodig hebt om je garantie ongemoeid te laten.',
      },
      {
        q: 'Kost het extra stroom en dus rijbereik?',
        a: 'Verwaarloosbaar. Een audiosysteem verbruikt bij normaal luisteren een fractie van wat de aandrijving vraagt; het effect op je actieradius valt weg tegen zaken als buitentemperatuur en rijstijl. Wij dimensioneren de installatie bovendien zo dat hij in ruststand vrijwel niets trekt.',
      },
    ],
  },
];

export default MODELS;
