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
    matchers: { merk: 'BMW', model: /^3ER\b|^3 SERIE\b|\b3(16|18|20|25|28|30|35|40)[A-Z]*\b/ },
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
      text: 'Bij een Up! is demping geen bijzaak maar het halve resultaat. Het lichte deurblik stilleggen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je voeten. Omdat de cabine zo klein is, heb je verrassend weinig vermogen nodig — dit is een van de goedkoopste auto\'s om echt goed te krijgen.',
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

  // -------------------------------------------------------- KIA PICANTO
  {
    slug: 'kia-picanto',
    brand: 'Kia',
    model: 'Picanto',
    generaties: 'Picanto tweede en derde generatie',
    matchers: { merk: 'KIA', model: /PICANTO/ },
    title: 'Kia Picanto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Kia Picanto. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, fabrieksgarantie behouden.',
    intro:
      'De Picanto is een van de meest verkochte auto\'s van Nederland en een van de meest onderschatte om aan te pakken. Klein, dus je hebt weinig nodig — en er valt veel te winnen.',
    problems: [
      'De instapuitvoeringen komen met een handvol basisspeakers zonder aparte tweeter, waardoor stemmen dof klinken en het beeld laag blijft.',
      'Het plaatwerk is licht uitgevoerd om gewicht te sparen. Dat hoor je terug als meetrillende deuren zodra er bas bij komt.',
      'Weinig isolatie betekent veel rolgeluid, en dat maskeert precies het gebied waar zang en spraak zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Picanto halen we de winst uit de combinatie van demping en een componentenset. Eerst leggen we het lichte deurblik stil, waardoor de bas ophoudt met rammelen en gaat dragen. Daarna komt er een set in met een losse tweeter, die we in het bovenste deel van de deur of in de spiegeldriehoek plaatsen zodat het geluid voor je komt te zitten. In deze cabine is dat genoeg voor een verschil dat mensen niet verwachten van een auto in deze klasse.',
    },
    carplay: {
      possible: true,
      text: 'Veel Picanto\'s vanaf 2017 hebben CarPlay al af fabriek. Zit het er niet in en heb je wel een scherm, dan kunnen we het meestal toevoegen. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur — en als je het al hebt, zeggen we dat gewoon eerlijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Kia levert het op veel uitvoeringen vanaf 2017 standaard mee. Wij verkopen je niets wat er al in zit: stuur een foto van je dashboard en je hoort het binnen 24 uur.',
      },
      {
        q: 'Passen er grotere speakers in de deuren?',
        a: 'Wij werken met CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, dus er hoeft niet geboord of gezaagd te worden. Het originele deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost dit ongeveer voor een Picanto?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in, inclusief montage en btw. Wil je alleen minder rijgeluid, dan maken we een prijs op maat voor alleen isolatie.',
      },
    ],
  },

  // --------------------------------------------------------- FORD FIESTA
  {
    slug: 'ford-fiesta',
    brand: 'Ford',
    model: 'Fiesta',
    generaties: 'Fiesta MK7 en MK8',
    matchers: { merk: 'FORD', model: /FIESTA/ },
    title: 'Ford Fiesta audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Fiesta. Premium speakers, deurdemping en DSP-afstemming, met behoud van SYNC en je fabrieksgarantie.',
    intro:
      'De Fiesta rijdt strak en voelt levendig, en dat maakt het des te vreemder dat het geluid er zo braaf bij ligt. Ford bewaart het betere systeem voor de optielijst.',
    problems: [
      'De basisinstallatie levert weinig vermogen, waardoor het geheel dichtknijpt zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus de achterkant van de speaker straalt de deur in en heft daar een deel van de bas op.',
      'Er is geen echte subwoofer, waardoor het fundament onder de muziek ontbreekt en alles wat mager blijft.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Fiesta laten we het SYNC-systeem met rust — dat werkt goed en je bent eraan gewend. Wij pakken aan wat erachter zit: gedempte deuren, een fatsoenlijke componentenset en waar gewenst een DSP-versterker die het signaal van SYNC oppikt en er een afstemming op jouw stoel van maakt. Je bediening, je scherm en je telefoonfuncties blijven precies zoals ze waren.',
    },
    carplay: {
      possible: true,
      text: 'Veel Fiesta\'s met SYNC 3 hebben CarPlay al af fabriek. Heb je een oudere uitvoering met een klein scherm, dan bekijken we per auto of het toe te voegen is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon, spraakbediening en de stuurknoppen blijven ongewijzigd — alleen wat je hoort verandert.',
      },
      {
        q: 'Ik heb het B&O-systeem. Valt daar nog winst te halen?',
        a: 'Ja, al is het vertrekpunt hoger. Je hebt dan een betere speakerset en meer vermogen, maar nog steeds ongedempte deuren en een afstemming die voor elke Fiesta gelijk is. Wij voegen dan gericht demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Fiesta-opdrachten één werkdag. Je brengt hem \'s ochtends en rijdt aan het eind van de dag weg met een afgestemd systeem.',
      },
    ],
  },

  // --------------------------------------------------------- TOYOTA AYGO
  {
    slug: 'toyota-aygo',
    brand: 'Toyota',
    model: 'Aygo',
    generaties: 'Aygo eerste en tweede generatie',
    matchers: { merk: 'TOYOTA', model: /AYGO/ },
    title: 'Toyota Aygo audio upgrade | Audio Upgrade Emmen',
    description:
      'Van dun naar vol geluid in je Toyota Aygo. Speakers, deurdemping en minder rolgeluid, met all-in prijs en behoud van fabrieksgarantie.',
    intro:
      'De Aygo is gebouwd op de scherpst mogelijke kostprijs, samen met de Peugeot 107 en de Citroën C1. Aan audio is daarbij vrijwel niets uitgegeven — en dat maakt de sprong hier juist zo groot.',
    problems: [
      'Er zitten vaak maar twee of vier eenvoudige speakers in, zonder aparte tweeter. Het geluid komt daardoor volledig uit je knieën.',
      'De isolatie is tot het minimum beperkt om gewicht en kosten te sparen. Op de snelweg is het rolgeluid dan ook het luidste in de auto.',
      'De dunne deurpanelen resoneren mee, waardoor wat er aan bas is vooral als geklapper terugkomt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De Aygo is een van de duidelijkste voorbeelden van waarom wij bij demping beginnen. Het rolgeluid omlaag brengen verandert de auto meteen: gesprekken gaan zonder stemverheffing en je hoeft de muziek niet meer boven de weg uit te draaien. Daarna zetten we er een componentenset in met een losse tweeter. Voor het bedrag van een setje winterbanden klinkt de auto compleet anders.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Aygo het multimediascherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk; stuur een foto van je dashboard, dan weet je het zeker.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom raden jullie bij deze auto isolatie als eerste aan?',
        a: 'Omdat het rolgeluid hier het grootste probleem is, niet de speakers. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft. Stiller maken levert dus meer op dan harder maken.',
      },
      {
        q: 'Ik heb een Peugeot 107 of Citroën C1. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen het grootste deel van de carrosserie en het interieur. Wat wij voor een Aygo doen, doen we op dezelfde manier voor een 107 of een C1.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door. Alles is volledig terug te bouwen naar origineel.',
      },
    ],
  },

  // -------------------------------------------------------- RENAULT CLIO
  {
    slug: 'renault-clio',
    brand: 'Renault',
    model: 'Clio',
    generaties: 'Clio IV en Clio V',
    matchers: { merk: 'RENAULT', model: /CLIO/ },
    title: 'Renault Clio audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Renault Clio. Premium speakers, deurdemping en DSP-afstemming, met behoud van je originele scherm en garantie.',
    intro:
      'De Clio heeft een verzorgd interieur en een net scherm, en dat wekt verwachtingen die het geluid niet waarmaakt. Renault bewaart de goede installatie voor de duurdere uitvoering.',
    problems: [
      'De basisinstallatie klinkt netjes op laag volume maar loopt snel vast: draai je door, dan wordt de stem scherp en verdwijnt de onderkant.',
      'De deuren zijn niet gedempt, waardoor de bas grotendeels in het paneel verdwijnt in plaats van de cabine in.',
      'Zonder het optionele systeem ontbreekt het onderste octaaf volledig, en dat hoor je juist bij moderne muziek meteen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Clio houden we het originele scherm en de bediening intact en werken we erachter. De deuren gaan open, worden gedempt en krijgen een componentenset met een losse tweeter zodat het beeld voor je komt te staan. Wil je het onderste octaaf erbij, dan voegen we een compacte subwoofer toe die onder de stoel verdwijnt. De auto blijft er van binnen precies hetzelfde uitzien.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Clio\'s met R-Link of EASY LINK is CarPlay al aanwezig of eenvoudig toe te voegen. Stuur een foto van je dashboard, dan zeggen we welke van de twee bij jou geldt.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, maar gerichter. Bose geeft je meer speakers en meer vermogen, maar de deuren blijven ongedempt en de afstemming is voor elke Clio dezelfde. Wij voegen dan demping en DSP-controle toe en laten de speakerset vaak gewoon zitten.',
      },
      {
        q: 'Moet mijn scherm eruit?',
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm, je navigatie en je stuurbediening blijven volledig origineel.',
      },
      {
        q: 'Wat is de eerste stap die het meest oplevert?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Dat is bij een Clio de grootste sprong per euro. Wil je daarna meer diepgang, dan bouwen we door naar een DSP met subwoofer.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL CORSA
  {
    slug: 'opel-corsa',
    brand: 'Opel',
    model: 'Corsa',
    generaties: 'Corsa D, E en F',
    matchers: { merk: 'OPEL', model: /CORSA/ },
    title: 'Opel Corsa audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Corsa. Premium speakers, akoestische deurdemping en DSP-afstemming. All-in prijs, fabrieksgarantie behouden.',
    intro:
      'De Corsa is al decennia een van de gewoonste auto\'s op de Nederlandse weg. Zo gewoon is het geluid ook gebleven — terwijl er onder die deurpanelen meer ruimte zit dan je zou denken.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant grotendeels tegenwerkt.',
      'Bij de oudere uitvoeringen ontbreekt een aparte tweeter, waardoor stemmen dof blijven en het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Corsa is een dankbare auto omdat de deur meer ruimte biedt dan de fabrieksspeaker gebruikt. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken van die holle deur een fatsoenlijke behuizing. Daarna heeft een betere speakerset pas echt zin: dezelfde speaker klinkt in een gedempte deur hoorbaar voller. Een losse tweeter tilt het geluidsbeeld vervolgens naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'De Corsa F vanaf 2019 heeft CarPlay meestal al af fabriek. Bij de Corsa D en E hangt het van het schermtype af; dat bepalen we aan de hand van een foto van je dashboard.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn Corsa is al wat ouder. Is het dat nog waard?',
        a: 'Dat hangt van jou af, niet van de auto. Blijf je er nog een paar jaar in rijden, dan is het geld goed besteed — een gedempte deur en een goede speakerset gaan langer mee dan de auto. Wij zeggen het eerlijk als we vinden dat de investering niet in verhouding staat.',
      },
      {
        q: 'Zit er bij een oudere Corsa geen roest in de deuren?',
        a: 'Soms wel. Wij controleren het plaatwerk voordat we iets plakken, want demping op blik met beginnende roest eronder is vragen om problemen. Komen we iets tegen, dan melden we dat en overleggen we voordat we verdergaan.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Corsa-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer, en dat zeggen we vooraf.',
      },
    ],
  },

  // -------------------------------------------------------- PEUGEOT 208
  {
    slug: 'peugeot-208',
    brand: 'Peugeot',
    model: '208',
    generaties: '208 eerste en tweede generatie',
    matchers: { merk: 'PEUGEOT', model: /\b208\b/ },
    title: 'Peugeot 208 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Peugeot 208. Premium speakers, deurdemping en DSP-afstemming, met behoud van het i-Cockpit en je fabrieksgarantie.',
    intro:
      'Het i-Cockpit van de 208 voelt bijzonder, en daar hoort geluid bij dat meekomt. In de basisuitvoering doet het dat niet: het klinkt vlak, en dat contrast valt op.',
    problems: [
      'De basisinstallatie mist zowel de onderkant als de openheid bovenin, waardoor het geheel plat blijft.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel voordat het bij je oor is.',
      'Peugeot bewaart het echte geluid voor het optionele systeem, waardoor het verschil tussen de uitvoeringen groot is.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De 208 vraagt om een aanpak die het karakter van het interieur volgt: onzichtbaar. Wij dempen de deuren en zetten er een componentenset in waarvan de tweeter in de spiegeldriehoek verdwijnt, zodat het geluidsbeeld boven het kleine stuur uit komt in plaats van eronder. Met een DSP-versterker erachter krijgt de auto de body die het interieur belooft, zonder dat er van buitenaf iets te zien is.',
    },
    carplay: {
      possible: true,
      text: 'De meeste 208-uitvoeringen met touchscreen hebben CarPlay al af fabriek. Zit het er niet in, dan kijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb het Focal-systeem uit de fabriek. Wat kunnen jullie dan nog doen?',
        a: 'Dan heb je al goede componenten. De winst zit bij jou in demping en in een eigen DSP-afstemming op jouw stoel, in plaats van het compromis dat voor elke 208 gelijk is. Wij vervangen dan meestal niets, we voegen toe.',
      },
      {
        q: 'Blijft het i-Cockpit-scherm werken?',
        a: 'Ja, volledig. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm, je menu\'s en je stuurbediening blijven origineel.',
      },
      {
        q: 'Kan ik later uitbreiden?',
        a: 'Ja, en daar houden we bij het inbouwen rekening mee. Begin je met de Akoestische Basis, dan leggen we de bekabeling zo aan dat een versterker of subwoofer er later bij kan zonder sloopwerk.',
      },
    ],
  },

  // ------------------------------------------------------------ FIAT 500
  {
    slug: 'fiat-500',
    brand: 'Fiat',
    model: '500',
    generaties: '500 en 500C',
    matchers: { merk: 'FIAT', model: /\b500\b/ },
    title: 'Fiat 500 audio upgrade | Audio Upgrade Emmen',
    description:
      'Voller en warmer geluid in je Fiat 500. Premium speakers, deurdemping en een afstemming die de harde binnenkant temt.',
    intro:
      'De 500 is gekocht om hoe hij eruitziet, en dat mooie interieur is precies het probleem voor het geluid: veel gelakt plaatwerk en harde oppervlakken binnen handbereik.',
    problems: [
      'Het gelakte dashboard en de harde panelen kaatsen hoge tonen terug. Daardoor klinkt de 500 scherper en vermoeiender dan je van dit volume zou verwachten.',
      'De cabine is klein maar akoestisch lastig: weinig zachte materialen om reflecties te dempen.',
      'De basisinstallatie heeft weinig vermogen en geen echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 500 gaat het minder om harder en meer om beschaafder. Wij dempen de deuren, wat het rammelen wegneemt en de bas laat dragen, en kiezen een speakerset met een zachtere hoge kant die niet met dat gelakte dashboard gaat vechten. Met een DSP-afstemming halen we de reflecties eruit die de auto scherp maken. Het resultaat is een 500 waar je een uur in kunt zitten zonder dat je oren moe worden.',
    },
    carplay: {
      possible: true,
      text: 'Op uitvoeringen met het Uconnect-scherm is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen zonder scherm kijken we per auto wat de nette oplossing is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Waarom klinkt mijn 500 zo scherp?',
        a: 'Door het gelakte dashboard en de harde panelen. Hoge tonen kaatsen daar meerdere keren op terug voordat ze bij je oor zijn, en dat stapelt op. Met de juiste speakerkeuze en afstemming is dat goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Ik heb een 500C met vouwdak. Maakt dat verschil?',
        a: 'Ja. Met het dak open verdwijnt de akoestiek van de cabine en concurreert de muziek met rijwind. Wij stemmen dan af op een compromis dat open én dicht werkt, en kiezen de speakerposities daarop.',
      },
      {
        q: 'Ik heb het BeatsAudio-systeem. Valt daar nog winst te halen?',
        a: 'Ja, vooral in beheersing. Dat systeem geeft je meer bas, maar de deuren blijven ongedempt en de scherpte bovenin blijft. Demping en een eigen afstemming maken het geheel rustiger in plaats van luider.',
      },
    ],
  },

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
      'Een 9-3 die nog rijdt, rijdt vaak bij iemand die er bewust voor kiest. Het geluid is meestal het enige onderdeel dat níét is bijgehouden — en daar valt bij deze auto meer te winnen dan bij welke nieuwe auto ook.',
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
  // ---------------------------------------------------------- BMW 1-SERIE
  {
    slug: 'bmw-1-serie',
    brand: 'BMW',
    model: '1-serie',
    generaties: 'E87, F20 en F40',
    matchers: { merk: 'BMW', model: /^1ER\b|^1 SERIE\b|\b1(16|18|20|23|25|28|30|35|40)[A-Z]*\b/ },
    title: 'BMW 1-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer uit de audio van je BMW 1-serie halen: DSP-afstemming, betere speakers en draadloos CarPlay in het originele iDrive-scherm.',
    intro:
      'De 1-serie is de instap in BMW, en dat merk je precies op één plek: het geluid. De opzet is dezelfde als in de grotere modellen, maar er is stevig bezuinigd op wat eruit komt.',
    problems: [
      'De onderstoelwoofers krijgen veel te weinig vermogen. Wel formaat, geen slagkracht — de bas blijft traag en zacht.',
      'De cabine is compact en hard aangekleed, waardoor hoge tonen meerdere keren terugkaatsen en het geheel scherp wordt.',
      'De middenspeaker in het dashboard trekt het stereobeeld naar het midden en maakt stemmen nasaal.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De 1-serie is een van de auto\'s waar je het snelst resultaat hoort, juist omdat de cabine klein is. Wij halen het signaal digitaal en onbewerkt binnen met een BMW-specifieke interface, vóór alle fabriekscorrecties. Daarna krijgen de onderstoelwoofers eindelijk het vermogen waarvoor ze bedoeld zijn en vervangen we de deurspeakers door een echte componentenset. Met de DSP temmen we de scherpte die het harde interieur veroorzaakt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, bediend met de iDrive-draaiknop. Welke oplossing past hangt af van je iDrive-versie; dat bepalen we aan de hand van een foto van je dashboard.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt mijn 1-serie zo scherp?',
        a: 'Een kleine cabine met veel hard kunststof en glas laat hoge tonen vaker terugkaatsen voordat ze bij je oor zijn. Dat stapelt op tot scherpte. Met de juiste speakerkeuze en een DSP-afstemming haal je dat eruit zonder dat het dof wordt.',
      },
      {
        q: 'Krijg ik foutmeldingen in het iDrive?',
        a: 'Nee. Wij gebruiken interfaces die specifiek voor BMW gemaakt zijn en zich netjes op de databus gedragen. Er wordt niets doorgeknipt en alles is volledig terug te bouwen naar origineel.',
      },
      {
        q: 'Heb ik een subwoofer nodig?',
        a: 'Niet per se. De onderstoelwoofers zijn op zich prima formaat; ze krijgen alleen te weinig vermogen. Geef je ze dat wel, dan gaat een 1-serie verrassend laag. Wil je meer, dan past er een compacte subwoofer in de reservewielbak.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 2-SERIE
  {
    slug: 'bmw-2-serie',
    brand: 'BMW',
    model: '2-serie',
    generaties: 'F22 Coupé, F45 Active Tourer en Gran Coupé',
    matchers: { merk: 'BMW', model: /^2ER\b|^2 SERIE\b|\b2(18|20|25|28|30|35|40)[A-Z]*\b/ },
    title: 'BMW 2-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW 2-serie Coupé, Active Tourer of Gran Coupé. DSP-afstemming, high-end speakers en draadloos CarPlay.',
    intro:
      'Onder de naam 2-serie verkoopt BMW twee heel verschillende auto\'s: een strakke coupé en een hoge gezinsauto. Voor het geluid vragen ze een andere aanpak, ook al staat er hetzelfde op de achterklep.',
    problems: [
      'In de Coupé zorgen de raamloze portieren voor een minder goede afdichting, waardoor er meer buitengeluid binnenkomt dan je van BMW verwacht.',
      'In de Active Tourer is het cabinevolume veel groter, terwijl er in de basis dezelfde bescheiden aansturing in zit.',
      'De onderstoelwoofers krijgen in beide uitvoeringen te weinig vermogen om echt te dragen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij de Coupé ligt de nadruk op afdichten en dempen: de raamloze deuren vragen extra aandacht bij het afwerken, en dat betaalt zich terug in rust. Bij de Active Tourer draait het juist om vermogen en om een subwoofer die het grotere volume vult. In beide gevallen halen we het signaal onbewerkt binnen met een BMW-interface en bouwen we de afstemming opnieuw op, zodat het geluidsbeeld voor je op het dashboard komt te staan.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van de draaiknopbediening en de stuurtoetsen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb de Active Tourer. Is dat een andere klus dan de Coupé?',
        a: 'Ja. De Active Tourer heeft een fors groter cabinevolume en een grote achterklep die meeresoneert. Daar zit de winst in vermogen, demping van de klep en een subwoofer. Bij de Coupé zit die juist in afdichten en in een strakke afstemming.',
      },
      {
        q: 'Mijn Coupé heeft raamloze deuren. Kunnen jullie die wel dempen?',
        a: 'Ja, en het is er juist extra zinvol. Het vraagt wel meer zorg bij het demonteren en afwerken, omdat de ruitgeleiding nauw luistert. Wij plannen daar tijd voor in en zeggen dat vooraf.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en tasten de fabrieksbedrading niet aan. Alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 4-SERIE
  {
    slug: 'bmw-4-serie',
    brand: 'BMW',
    model: '4-serie',
    generaties: 'F32, F33 Cabrio, G22 en Gran Coupé',
    matchers: { merk: 'BMW', model: /^4ER\b|^4 SERIE\b|\b4(18|20|25|28|30|35|40)[A-Z]*\b/ },
    title: 'BMW 4-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW 4-serie Coupé, Cabrio of Gran Coupé. DSP-afstemming, high-end speakers en draadloos CarPlay in het iDrive.',
    intro:
      'De 4-serie is de 3-serie met een lagere daklijn en meer aanzien. Dat lagere dak is precies wat het geluid moeilijker maakt dan bij zijn vierdeurs broer.',
    problems: [
      'De raamloze portieren dichten minder goed af dan een deur met raamlijst, waardoor er meer wegluid binnenkomt en de bas eerder weglekt.',
      'De lage daklijn geeft minder cabinevolume boven je hoofd, waardoor het geluidsbeeld eerder benauwd dan ruim wordt.',
      'Bij de Cabrio verdwijnt met het dak open de hele akoestiek van de auto en concurreert de muziek met rijwind.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 4-serie is afdichten en dempen geen bijzaak maar de basis: raamloze deuren goed behandelen levert direct hoorbaar rust op. Daarna bouwen we met een BMW-interface en een DSP-versterker de afstemming opnieuw op, waarbij we de lage daklijn compenseren door het geluidsbeeld bewust hoger te leggen. Rijd je Cabrio, dan stemmen we af op een compromis dat met dak open én dicht werkt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, bediend via de draaiknop en het stuur.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb de Cabrio. Heeft goede audio daar wel zin?',
        a: 'Zeker, maar met andere verwachtingen. Met het dak dicht is een Cabrio een gewone coupé en haal je hetzelfde resultaat. Met het dak open verlies je altijd een deel; wij kiezen dan speakerposities en een afstemming die in beide situaties werken in plaats van alleen dicht.',
      },
      {
        q: 'Ik heb al Harman Kardon. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. Harman Kardon geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder. Wij vervangen dan meestal niets en voegen gericht toe.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste 4-serie-opdrachten één werkdag. Bij raamloze deuren plannen we wat extra tijd in voor het zorgvuldig afwerken.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 5-SERIE
  {
    slug: 'bmw-5-serie',
    brand: 'BMW',
    model: '5-serie',
    generaties: 'E60, F10 en G30, sedan en Touring',
    matchers: { merk: 'BMW', model: /^5ER\b|^5 SERIE\b|\b5(18|20|23|25|28|30|35|40|45|50)[A-Z]*\b/ },
    title: 'BMW 5-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je BMW 5-serie of Touring. DSP-afstemming, high-end speakers, demping en draadloos CarPlay in het originele iDrive.',
    intro:
      'De 5-serie is de auto waarin veel mensen hun werkweek doorbrengen. Op die kilometers gaat het niet om hoe hard het kan, maar om hoe lang je het volhoudt — en daar wringt de fabrieksinstallatie.',
    problems: [
      'Op snelwegtempo moet je opendraaien om boven het rolgeluid uit te komen, en juist dan gaat de fabrieksversterking knijpen.',
      'De onderstoelwoofers zijn onderbemeten aangestuurd, waardoor het fundament traag en zacht blijft.',
      'Bij de Touring slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 5-serie draait het om luistervermoeidheid. Een systeem dat moet knijpen om volume te maken klinkt hard en put je uit na een uur. Wij dempen de deuren en bij een Touring ook de laadruimte, zodat de bodem stiller wordt en je zachter kunt luisteren. Daarna geeft een DSP-versterker de speakers ruimte en zetten we met tijdcorrectie het geluidsbeeld voor je op het dashboard in plaats van in je linkerdeur.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm. Op de meeste F10- en G30-uitvoeringen mogelijk, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik rij vooral lange afstanden. Wat merk ik daarvan?',
        a: 'Minder luistervermoeidheid. Met voldoende vermogen en een correcte afstemming kun je zachter luisteren en tóch alles horen. Dat is wat veelrijders na de eerste lange rit als eerste terugmelden.',
      },
      {
        q: 'Ik heb de Touring. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Bij een Touring zit daar wel de meeste winst, dus we bespreken vooraf wat het oplevert en wat het kost.',
      },
      {
        q: 'Ik heb Bowers & Wilkins. Is een upgrade dan nog zinvol?',
        a: 'Dan heb je een uitstekend vertrekpunt en is vervangen zelden verstandig. De winst zit bij jou in demping en in een afstemming op jouw stoel in plaats van het compromis dat voor elke 5-serie gelijk is. Wij zijn eerlijk als we vinden dat de winst het werk niet waard is.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 6-SERIE
  {
    slug: 'bmw-6-serie',
    brand: 'BMW',
    model: '6-serie',
    generaties: 'E63, F12, F13 en G32 Gran Turismo',
    matchers: { merk: 'BMW', model: /^6ER\b|^6 SERIE\b|\b6(30|35|40|45|50)[A-Z]*\b/ },
    title: 'BMW 6-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW 6-serie Coupé, Cabrio of Gran Turismo. DSP-afstemming, high-end componenten en draadloos CarPlay.',
    intro:
      'De 6-serie is gebouwd voor de lange rit met stijl. Grote deuren, lage daklijn en veel leer — akoestisch een auto met evenveel kansen als eigenaardigheden.',
    problems: [
      'De grote raamloze portieren zijn holle vlakken die meetrillen en minder goed afdichten dan een deur met raamlijst.',
      'De lage daklijn beperkt het cabinevolume, waardoor het geluidsbeeld snel benauwd wordt als de afstemming niet klopt.',
      'De fabrieksafstemming verandert mee met het volume, wat op hogere niveaus onnatuurlijk klinkt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Die grote deuren zijn bij een 6-serie het grootste cadeau: er is ruimte voor een serieuze componentenset, en gedempt worden ze een uitstekende behuizing. Wij halen het signaal onbewerkt binnen vóór de fabriekscorrecties, zodat het volumeafhankelijke gedrag verdwijnt, en bouwen de afstemming opnieuw op. Bij de Gran Turismo pakken we ook de laadruimte aan, want daar zit bij die carrosserie de resonantie.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm. Welke oplossing past hangt af van je iDrive-generatie.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Waarom klinkt harder niet beter in mijn 6-serie?',
        a: 'Omdat de fabrieksafstemming meebeweegt met het volume: bij zacht luisteren wordt er bas bijgezet, bij hard juist teruggenomen. Dat voelt onnatuurlijk zodra je doordraait. Met een eigen afstemming blijft de balans over het hele bereik gelijk.',
      },
      {
        q: 'Passen er grotere speakers in die deuren?',
        a: 'Ja, de 6-serie heeft ongewoon veel ruimte in de portieren. Wij gebruiken CNC-gefreesde adapterringen op de originele bevestigingspunten, zodat er niet geboord of gezaagd hoeft te worden.',
      },
      {
        q: 'Is dit een auto voor de Reference Edition?',
        a: 'Vaak wel. Het formaat van de deuren en de kwaliteit van de rest van de auto rechtvaardigen een 8-kanaals opbouw. Wij zeggen eerlijk wanneer The OEM+ Executive genoeg is voor wat jij ervan verwacht.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 7-SERIE
  {
    slug: 'bmw-7-serie',
    brand: 'BMW',
    model: '7-serie',
    generaties: 'E65, F01 en G11',
    matchers: { merk: 'BMW', model: /^7ER\b|^7 SERIE\b|\b7(30|35|40|45|50|60)[A-Z]*\b/ },
    title: 'BMW 7-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW 7-serie. Verfijning met DSP-afstemming en demping, met respect voor wat er al in zit.',
    intro:
      'In een 7-serie is stilte het uitgangspunt. Dubbel glas, dikke afdichtingen en veel isolatie — en juist in die stilte hoor je precies waar het systeem tekortschiet.',
    problems: [
      'De cabine is fors, en achterin zitten passagiers ver van de voorste speakers. Zonder afstemming klinkt het achterin heel anders dan voorin.',
      'De goede isolatie werkt tegen je: er is weinig rolgeluid dat tekortkomingen maskeert, dus je hoort ze des te duidelijker.',
      'Zonder het topsysteem ontbreekt het onderste octaaf, en dat valt in zo\'n stille auto extra op.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een 7-serie is een auto waar je terughoudend te werk gaat. Het zware isolatiewerk is al door BMW gedaan, dus wij gaan direct naar de kern: een DSP-versterker die het signaal schoon binnenhaalt, gerichte demping in de deuren en waar nodig een compacte subwoofer voor het fundament. De afstemming maken we op jouw stoel, en als je vaak achterin zit maken we daar een tweede afstemming voor.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja. Met een DSP kunnen we meerdere afstemmingen opslaan: één voor de bestuurdersstoel en één die op de achterbank klopt. Je kiest ze via het systeem. Vertel het vooraf, dan richten we het zo in.',
      },
      {
        q: 'Ik heb Bowers & Wilkins Diamond. Moet ik hier wel iets aan doen?',
        a: 'Waarschijnlijk weinig, en dat zeggen we dan ook. Bij dat systeem zit de winst hooguit in demping en een afstemming op jouw luisterpositie. Wij verkopen je geen vervanging van componenten die al beter zijn dan wat wij eraan zouden toevoegen.',
      },
      {
        q: 'Blijven alle assistentiesystemen werken?',
        a: 'Ja. Waarschuwingssignalen, parkeersensoren, telefoon en spraakbediening lopen via het fabriekssysteem en blijven ongewijzigd. Onze interface laat die signalen netjes doorlopen.',
      },
    ],
  },

  // ---------------------------------------------------------- BMW 8-SERIE
  {
    slug: 'bmw-8-serie',
    brand: 'BMW',
    model: '8-serie',
    generaties: 'G14 Cabrio, G15 Coupé en G16 Gran Coupé',
    matchers: { merk: 'BMW', model: /^8ER\b|^8 SERIE\b|\b8(40|45|50)[A-Z]*\b/ },
    title: 'BMW 8-serie audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW 8-serie Coupé, Cabrio of Gran Coupé. Verfijning met DSP-afstemming en zorgvuldige demping.',
    intro:
      'De 8-serie is BMW\'s statement: laag, breed en compromisloos afgewerkt. Aan het geluid is duidelijk gedacht, en dat verandert wat er nog te winnen valt.',
    problems: [
      'De zeer lage daklijn geeft weinig cabinevolume boven je hoofd, waardoor het geluidsbeeld snel plat aanvoelt.',
      'De raamloze portieren dichten minder goed af dan een deur met raamlijst, wat je bij hogere snelheid hoort.',
      'Bij de Cabrio verdwijnt met het dak open de akoestiek van de auto volledig.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 8-serie is grof ingrijpen zelden het antwoord. Wij dempen gericht, met extra aandacht voor de raamloze deuren, en werken vooral aan de afstemming: het geluidsbeeld bewust hoger leggen zodat de lage daklijn niet drukkend werkt. Rijd je Cabrio, dan maken we een afstemming die met dak open én dicht klopt. Alles wat wij doen is volledig terug te bouwen naar origineel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de volledige iDrive-bediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb Bowers & Wilkins Diamond. Wat valt er nog te winnen?',
        a: 'Vooral demping en een afstemming op jouw stoel. De componenten zijn uitstekend; wat ontbreekt is een deur die niet meetrilt en een afstemming die niet voor elke 8-serie hetzelfde is. Wij zeggen eerlijk wanneer de winst het werk niet waard is.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan aan zo\'n auto?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten, zonder te knippen of te boren. Bij auto\'s in dit segment is dat geen extra service maar een voorwaarde.',
      },
      {
        q: 'Kan ik eerst komen luisteren?',
        a: 'Graag zelfs. Bij een auto als deze plannen we liever eerst een gesprek en een demo dan dat we een pakket verkopen. Stuur een bericht via WhatsApp, dan maken we een afspraak.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X1
  {
    slug: 'bmw-x1',
    brand: 'BMW',
    model: 'X1',
    generaties: 'E84, F48 en U11',
    matchers: { merk: 'BMW', model: /\bX1\b/ },
    title: 'BMW X1 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body en echte bas in je BMW X1. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay in het iDrive.',
    intro:
      'De X1 combineert een compacte buitenmaat met een hoge zit. Dat laatste is precies wat het fabrieksgeluid parten speelt: je zit verder van je speakers af dan je denkt.',
    problems: [
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag bij je knieën blijft hangen.',
      'Het cabinevolume is groter dan bij een 1-serie terwijl de aansturing in de basis vergelijkbaar bescheiden is.',
      'De achterklep en de bagageruimtepanelen resoneren hoorbaar mee zodra er bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een X1 doet tijdcorrectie het meeste werk: door het signaal per speaker te vertragen tillen we het geluidsbeeld naar ooghoogte, zodat het niet meer onder je vandaan komt. Daarna geeft een DSP-versterker de speakers het vermogen dat het cabinevolume vraagt, en dempen we de deuren én de achterklep zodat dat vermogen in muziek gaat zitten en niet in rammelend plaatwerk.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van de achteruitrijcamera en de parkeersensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid bij mij van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Zonder correctie bereikt het geluid je oor van beneden. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel, waardoor het beeld voor je op ooghoogte komt te staan.',
      },
      {
        q: 'Verlies ik bagageruimte door een subwoofer?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste X1-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X2
  {
    slug: 'bmw-x2',
    brand: 'BMW',
    model: 'X2',
    generaties: 'F39 en U10',
    matchers: { merk: 'BMW', model: /\bX2\b/ },
    title: 'BMW X2 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW X2. DSP-afstemming, premium speakers en draadloos CarPlay, onzichtbaar ingebouwd met behoud van garantie.',
    intro:
      'De X2 is de X1 met een aflopende daklijn en een sportiever karakter. Dat scheelt hoofdruimte achterin, en akoestisch scheelt het meer dan je zou denken.',
    problems: [
      'De aflopende daklijn geeft minder cabinevolume achterin, waardoor lage tonen minder ruimte hebben om zich op te bouwen.',
      'Je zit hoog ten opzichte van de deurspeakers, dus het geluidsbeeld blijft laag zonder correctie.',
      'Het interieur heeft veel harde oppervlakken die hoge tonen terugkaatsen en het geheel scherp maken.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een X2 kiezen we bewust voor een subwoofer die dicht bij de bestuurder zit, bijvoorbeeld onder de stoel, omdat de kleinere ruimte achterin minder meewerkt. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte en met de DSP-afstemming halen we de scherpte uit het harde interieur. De deuren dempen we, zodat de bas gaat dragen in plaats van rammelen.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Klinkt een X2 anders dan een X1?',
        a: 'Ja. De aflopende daklijn geeft minder volume achterin, waardoor lage tonen zich minder makkelijk opbouwen. Wij plaatsen de subwoofer daarom liever vooraan, dichter bij de bestuurder.',
      },
      {
        q: 'Blijft de achteruitrijcamera werken?',
        a: 'Ja. Camera, parkeersensoren en alle waarschuwingssignalen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
      {
        q: 'Wat is de verstandigste eerste stap?',
        a: 'De deuren dempen en een goede componentenset plaatsen. Dat is de grootste sprong per euro. Wil je daarna meer diepgang, dan bouwen we door naar The OEM+ Executive met DSP en subwoofer.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X3
  {
    slug: 'bmw-x3',
    brand: 'BMW',
    model: 'X3',
    generaties: 'E83, F25 en G01',
    matchers: { merk: 'BMW', model: /\bX3\b/ },
    title: 'BMW X3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je BMW X3. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De X3 is de gezinsauto onder de X-modellen: groot genoeg voor alles, klein genoeg om mee te parkeren. Dat formaat vraagt meer van de audio dan er af fabriek in zit.',
    problems: [
      'Het cabinevolume is fors, en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen. Dat levert de fabrieksaansturing niet.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee op elke basnoot.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een X3 is de achterklep het onderdeel dat de meeste mensen verrast. Die dempen levert direct rust op en haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt te liggen. Een compacte subwoofer in de reservewielbak vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van camera, sensoren en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is mijn speaker kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep of een bagageruimtepaneel dat meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Ik heb Harman Kardon. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt meer speakers en meer vermogen, maar nog steeds ongedempte deuren en klep en een afstemming die voor elke X3 gelijk is. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Blijft mijn laadruimte bruikbaar?',
        a: 'Ja. Wij werken met compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen. De vloer blijft vlak.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X4
  {
    slug: 'bmw-x4',
    brand: 'BMW',
    model: 'X4',
    generaties: 'F26 en G02',
    matchers: { merk: 'BMW', model: /\bX4\b/ },
    title: 'BMW X4 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW X4. DSP-afstemming, high-end speakers en demping van deuren en achterklep. Draadloos CarPlay mogelijk.',
    intro:
      'De X4 is de X3 met een coupédak. Je levert er ruimte achterin voor in, en dat is precies waar lage tonen normaal hun werk doen.',
    problems: [
      'De aflopende daklijn kost cabinevolume achterin, waardoor lage tonen minder ruimte hebben dan in een X3.',
      'De schuine achterklep is een groot vlak dat meetrilt en het dreunen versterkt.',
      'De hoge zitpositie legt het geluidsbeeld laag, terwijl het lagere dak het juist benauwd maakt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De X4 vraagt om een andere plaatsing dan zijn hoge broer: wij zetten de subwoofer bij voorkeur vooraan, onder een stoel, omdat de ruimte achterin minder meewerkt. De schuine achterklep dempen we grondig, want daar zit het dreunen. Met tijdcorrectie leggen we het beeld op ooghoogte, wat het lagere dak juist compenseert in plaats van benadrukt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van alle fabrieksfuncties.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet gewoon achterin?',
        a: 'Bij een coupé-SUV werkt de ruimte achterin minder mee: er is minder volume en de schuine klep kaatst anders. Een compacte subwoofer onder de stoel zit dichter bij je en geeft in deze carrosserie een strakker resultaat.',
      },
      {
        q: 'Is de X4 lastiger dan de X3?',
        a: 'Anders, niet lastiger. Er is minder ruimte om mee te werken en het dempen van de klep telt zwaarder. Wij stemmen de aanpak af op de carrosserie die jij hebt.',
      },
      {
        q: 'Blijft de fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers, knippen niets door en alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X5
  {
    slug: 'bmw-x5',
    brand: 'BMW',
    model: 'X5',
    generaties: 'E70, F15 en G05',
    matchers: { merk: 'BMW', model: /\bX5\b/ },
    title: 'BMW X5 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body en echte bas in je BMW X5. High-end speakers, demping, DSP-afstemming en draadloos CarPlay in het originele iDrive.',
    intro:
      'De X5 is groot, zwaar en stil. Dat is een uitstekend uitgangspunt voor geluid — mits er genoeg vermogen tegenover staat, en dat is precies wat de basisinstallatie niet levert.',
    problems: [
      'Het cabinevolume is groot. Lage tonen vragen daar veel meer vermogen dan de fabrieksaansturing kan geven, dus het blijft dun.',
      'Zit er een derde zitrij in, dan zitten passagiers achterin ver van elke speaker en horen zij iets heel anders dan de bestuurder.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een X5 is een auto waar vermogen echt telt. Wij zetten er een DSP-versterker in die de speakers ruimte geeft en het cabinevolume aankan, en voegen een subwoofer toe die in de zijwand van de bagageruimte verdwijnt. De deuren en de klep dempen we, want zonder dat gaat het extra vermogen zitten in rammelend plaatwerk. Rijd je vaak met een volle auto, dan stemmen we af op meer dan alleen de bestuurdersstoel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van camera, sensoren en alle assistentiefuncties.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik rij vaak met het gezin. Kan het achterin ook goed klinken?',
        a: 'Ja, maar het is een keuze. Een afstemming op alleen de bestuurdersstoel geeft de scherpste focus; een afstemming voor de hele auto klinkt overal goed maar iets minder precies vooraan. Met een DSP kunnen we allebei opslaan en wissel je zelf.',
      },
      {
        q: 'Ik heb Bowers & Wilkins. Wat kunnen jullie toevoegen?',
        a: 'Demping en een afstemming op jouw stoel. De componenten zijn dan uitstekend en die laten we zitten. De winst zit in het temmen van de deuren en de klep, en in een afstemming die niet voor elke X5 hetzelfde is.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer bij voorkeur in de zijwand van de bagageruimte, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X6
  {
    slug: 'bmw-x6',
    brand: 'BMW',
    model: 'X6',
    generaties: 'E71, F16 en G06',
    matchers: { merk: 'BMW', model: /\bX6\b/ },
    title: 'BMW X6 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW X6. High-end speakers, DSP-afstemming en grondige demping van de grote schuine achterklep.',
    intro:
      'De X6 heeft het formaat van een X5 en de daklijn van een coupé. Die combinatie maakt hem akoestisch een van de eigenzinnigste auto\'s die wij onder handen krijgen.',
    problems: [
      'Groot cabinevolume met minder ruimte achterin: je hebt het vermogen van een X5 nodig zonder de plek waar de bas zich normaal opbouwt.',
      'De grote schuine achterklep is een fors vlak dat sterk meetrilt en het dreunen versterkt.',
      'De hoge zitpositie legt het geluidsbeeld laag, terwijl de lage daklijn de ruimte erboven beperkt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een X6 is de achterklep de eerste prioriteit — zonder demping daar hoor je vooral resonantie in plaats van bas. De subwoofer zetten we bij voorkeur vooraan of in de zijwand, dichter bij de bestuurder, omdat de schuine ruimte achterin minder meewerkt. Daarna doet de DSP het fijne werk: tijdcorrectie voor het beeld op ooghoogte en een afstemming die de lage daklijn compenseert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van de volledige fabrieksbediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Waarom is de achterklep bij een X6 zo belangrijk?',
        a: 'Het is een groot, schuin, licht vlak dat direct de bagageruimte afsluit. Zonder demping gaat hij op elke basnoot mee en hoor je resonantie in plaats van muziek. Bij deze auto merken klanten dat verschil het eerst.',
      },
      {
        q: 'Klinkt een X6 slechter dan een X5?',
        a: 'Niet slechter, wel anders. Er is minder ruimte achterin waar lage tonen zich kunnen opbouwen, dus we plaatsen de subwoofer anders en stemmen anders af. Het eindresultaat hoeft niet onder te doen voor een X5.',
      },
      {
        q: 'Is alles terug te bouwen naar origineel?',
        a: 'Ja. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten. Er wordt niets doorgeknipt en niets geboord.',
      },
    ],
  },

  // -------------------------------------------------------------- BMW X7
  {
    slug: 'bmw-x7',
    brand: 'BMW',
    model: 'X7',
    generaties: 'G07',
    matchers: { merk: 'BMW', model: /\bX7\b/ },
    title: 'BMW X7 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je BMW X7. Afstemming voor alle drie de zitrijen, high-end speakers en grondige demping.',
    intro:
      'De X7 is de grootste auto die BMW maakt, met drie zitrijen en een cabine ter grootte van een kleine kamer. Precies dat formaat is waar de meeste audiosystemen op stuklopen.',
    problems: [
      'Het cabinevolume is enorm. Lage tonen vragen hier meer vermogen dan in welke andere BMW dan ook, en dat is er af fabriek niet.',
      'Passagiers op de derde rij zitten meters van de voorste speakers. Zonder afstemming horen zij een compleet andere auto dan de bestuurder.',
      'De grote klep en de uitgestrekte zijpanelen van de bagageruimte resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een X7 is dit geen speakerklus maar een systeemklus. Er is echt vermogen nodig, en er moet nagedacht worden over wie er waar zit. Wij werken met meerdere afstemmingen in de DSP: één die de bestuurdersstoel scherp neerzet en één die de hele auto bedient als je met zeven mensen rijdt. De klep en de zijpanelen dempen we grondig, want over dit oppervlak telt resonantie dubbel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele iDrive-scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: iemand die meters achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming en waar nodig extra speakers achterin komen we een heel eind. Wij beloven geen gelijk resultaat op elke stoel.',
      },
      {
        q: 'Ik heb Bowers & Wilkins Diamond. Is dit dan zinvol?',
        a: 'Alleen gericht. Bij dat systeem zit de winst in demping en in een afstemming per zitrij. Componenten vervangen raden wij af; dat levert bij dit vertrekpunt te weinig op voor wat het kost.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Langer dan een dag. Bij een X7 met volledige demping en een meerkanaals opbouw plannen we meerdere dagen. Wij zeggen vooraf precies hoeveel, zodat je vervoer kunt regelen.',
      },
    ],
  },
  // ------------------------------------------------------- MERCEDES CLA
  // LET OP: CLA, CLS en de GL-modellen staan bewust vóór de losse
  // letterklassen. De eerste match wint, en zo kan een CLA nooit als
  // A-klasse eindigen.
  {
    slug: 'mercedes-cla',
    brand: 'Mercedes-Benz',
    model: 'CLA',
    generaties: 'C117 en C118, Coupé en Shooting Brake',
    matchers: { merk: 'MERCEDES', model: /\bCLA\b/ },
    title: 'Mercedes CLA audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Mercedes CLA. DSP-afstemming, premium speakers en demping van de raamloze deuren, met behoud van je MBUX.',
    intro:
      'De CLA verkoopt zich op zijn lijn: laag, strak en met raamloze deuren. Precies die twee kenmerken maken hem akoestisch lastiger dan de A-klasse waarop hij gebouwd is.',
    problems: [
      'De raamloze portieren dichten minder goed af dan een deur met raamlijst. Je hoort meer wegluid, en de bas lekt eerder weg.',
      'De lage daklijn geeft weinig cabinevolume boven je hoofd, waardoor het geluidsbeeld snel benauwd wordt.',
      'De basisinstallatie heeft weinig vermogen en geen echte subwoofer, dus onder de muziek zit niets.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een CLA begint het bij die deuren. Goed dempen en zorgvuldig afwerken levert direct rust op en houdt de bas binnen. Daarna leggen we met tijdcorrectie het geluidsbeeld bewust wat hoger, zodat de lage daklijn niet drukkend werkt, en vullen we het ontbrekende fundament aan met een compacte subwoofer onder de stoel. Je MBUX en de originele bediening blijven volledig intact.',
    },
    carplay: {
      possible: true,
      text: 'Op veel CLA-uitvoeringen met MBUX zit CarPlay al af fabriek. Zit het er niet in, dan kijken we per auto wat er mogelijk is met behoud van het originele scherm.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn deuren hebben geen raamlijst. Kunnen jullie die wel dempen?',
        a: 'Ja, en het is er juist extra zinvol. Het vraagt meer zorg bij het demonteren omdat de ruitgeleiding nauw luistert, dus we plannen er wat extra tijd voor in. Dat zeggen we vooraf.',
      },
      {
        q: 'Ik heb het Burmester-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, maar gerichter. Burmester geeft je meer speakers en meer vermogen; wat het niet geeft is gedempte deuren en een afstemming op jouw stoel. Wij voegen dan toe in plaats van te vervangen.',
      },
      {
        q: 'Blijft mijn MBUX werken zoals het was?',
        a: 'Volledig. Alles wat wij doen zit achter het dashboard en in de deuren. Scherm, spraakbediening, navigatie en de stuurknoppen blijven origineel.',
      },
    ],
  },

  // ------------------------------------------------------- MERCEDES CLS
  {
    slug: 'mercedes-cls',
    brand: 'Mercedes-Benz',
    model: 'CLS-klasse',
    generaties: 'W219, W218 en C257',
    matchers: { merk: 'MERCEDES', model: /\bCLS\b/ },
    title: 'Mercedes CLS audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Mercedes CLS. High-end speakers in de grote portieren, DSP-afstemming en zorgvuldige demping.',
    intro:
      'De CLS was de auto die het vierdeurs coupé-idee begon. Grote deuren, lage daklijn en een luxe afwerking — akoestisch een auto met veel mogelijkheden en één duidelijke uitdaging.',
    problems: [
      'De grote raamloze portieren zijn forse holle vlakken die meetrillen en minder goed afdichten dan een gewone deur.',
      'De lage daklijn beperkt het volume boven je hoofd, waardoor de afstemming nauw luistert.',
      'Zonder het optionele systeem ontbreekt het onderste octaaf, en in zo\'n stille auto valt dat extra op.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De grote deuren van een CLS zijn een cadeau: er is ruimte voor een serieuze componentenset, en gedempt worden ze een uitstekende behuizing. Wij pakken die als eerste aan, met extra aandacht voor de afdichting rond de raamloze ruit. Daarna doet een DSP-versterker het fijne werk: tijdcorrectie voor een beeld op ooghoogte en een afstemming die de lage daklijn compenseert in plaats van benadrukt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele bediening. Welke oplossing past hangt af van je systeemversie.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Passen er grotere speakers in die deuren?',
        a: 'Ja, de CLS heeft ongewoon veel ruimte in de portieren. Wij gebruiken CNC-gefreesde adapterringen op de originele bevestigingspunten, dus er hoeft niet geboord of gezaagd te worden.',
      },
      {
        q: 'Is dit een auto voor de Reference Edition?',
        a: 'Vaak wel. Het formaat van de deuren en de kwaliteit van de rest van de auto rechtvaardigen een 8-kanaals opbouw. Wij zeggen eerlijk wanneer The OEM+ Executive genoeg is voor wat jij zoekt.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten, zonder te knippen of te boren. Alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // ------------------------------------------------------- MERCEDES GLA
  {
    slug: 'mercedes-gla',
    brand: 'Mercedes-Benz',
    model: 'GLA',
    generaties: 'X156 en H247',
    matchers: { merk: 'MERCEDES', model: /\bGLA\b/ },
    title: 'Mercedes GLA audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Mercedes GLA. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay met behoud van MBUX.',
    intro:
      'De GLA is de A-klasse op hoge poten. Die extra hoogte lijkt klein, maar voor het geluid verandert er meer dan je zou denken: je zit verder van je speakers af.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag bij je knieën blijft hangen.',
      'Het cabinevolume is groter dan bij de A-klasse terwijl de aansturing in de basis dezelfde bescheiden is.',
      'De achterklep en de bagageruimtepanelen resoneren hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een GLA doet tijdcorrectie het meeste werk: door het signaal per speaker te vertragen tillen we het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt. Daarna geeft een DSP-versterker de speakers het vermogen dat het grotere volume vraagt, en dempen we de deuren én de achterklep zodat dat vermogen in muziek gaat zitten en niet in rammelend plaatwerk.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste GLA-uitvoeringen met MBUX zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid bij mij van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Zonder correctie bereikt het geluid je oor van beneden. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel, waardoor het beeld voor je op ooghoogte komt.',
      },
      {
        q: 'Verlies ik bagageruimte door een subwoofer?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste GLA-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // ------------------------------------------------------- MERCEDES GLC
  {
    slug: 'mercedes-glc',
    brand: 'Mercedes-Benz',
    model: 'GLC-klasse',
    generaties: 'X253 en X254, ook Coupé',
    matchers: { merk: 'MERCEDES', model: /\bGLC\b/ },
    title: 'Mercedes GLC audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Mercedes GLC. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De GLC is de meest verkochte Mercedes-SUV, en dat is te merken: hij is voor iedereen gemaakt en dus nergens scherp afgestemd. Het geluid is daar het duidelijkste voorbeeld van.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen. Dat levert de fabrieksaansturing niet.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee op elke basnoot.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een GLC verrast de achterklep de meeste mensen. Die dempen haalt het dreunen weg dat je aanzag voor bas, en levert direct rust op. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt te liggen. Een compacte subwoofer in de reservewielbak vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep of een bagageruimtepaneel dat meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Ik heb Burmester. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De speakerset laten we dan meestal zitten; de winst zit in het temmen van de deuren en de klep, en in een afstemming die niet voor elke GLC gelijk is.',
      },
      {
        q: 'Ik heb de Coupé-uitvoering. Maakt dat verschil?',
        a: 'Ja. De schuine achterklep geeft minder ruimte waar lage tonen zich kunnen opbouwen, dus plaatsen wij de subwoofer daar liever vooraan, onder een stoel. Meld het vooraf, dan houden we er rekening mee.',
      },
    ],
  },

  // ------------------------------------------------------- MERCEDES GLE
  {
    slug: 'mercedes-gle',
    brand: 'Mercedes-Benz',
    model: 'GLE-klasse',
    generaties: 'W166, W167 en Coupé',
    matchers: { merk: 'MERCEDES', model: /\bGLE\b/ },
    title: 'Mercedes GLE audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Mercedes GLE. High-end speakers, echt vermogen voor het grote cabinevolume en grondige demping.',
    intro:
      'De GLE is groot, zwaar en goed geïsoleerd. Dat is een uitstekend uitgangspunt — mits er genoeg vermogen tegenover staat, en dat is precies wat de basisinstallatie niet levert.',
    problems: [
      'Het cabinevolume is groot. Lage tonen vragen daar veel meer vermogen dan de fabrieksaansturing kan geven, dus het blijft dun.',
      'Zit er een derde zitrij in, dan horen passagiers achterin iets heel anders dan de bestuurder.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een GLE is een auto waar vermogen echt telt. Wij zetten er een DSP-versterker in die het cabinevolume aankan en voegen een subwoofer toe die in de zijwand van de bagageruimte verdwijnt. De deuren en de klep dempen we grondig, want zonder dat gaat het extra vermogen zitten in rammelend plaatwerk. Rijd je vaak met een volle auto, dan leggen we een tweede afstemming vast die de hele auto bedient.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik rij vaak met het gezin. Kan het achterin ook goed klinken?',
        a: 'Ja, maar het is een keuze. Een afstemming op alleen de bestuurdersstoel geeft de scherpste focus; een afstemming voor de hele auto klinkt overal goed maar iets minder precies vooraan. Met een DSP kunnen we allebei opslaan.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer bij voorkeur in de zijwand van de bagageruimte, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Vaak langer dan een dag. Bij een GLE met volledige demping en een meerkanaals opbouw plannen we meerdere dagen. Wij zeggen vooraf precies hoeveel.',
      },
    ],
  },

  // ------------------------------------------------------- MERCEDES GLS
  {
    slug: 'mercedes-gls',
    brand: 'Mercedes-Benz',
    model: 'GLS-klasse',
    generaties: 'X166 en X167',
    matchers: { merk: 'MERCEDES', model: /\bGLS\b/ },
    title: 'Mercedes GLS audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Mercedes GLS. Afstemming voor alle drie de zitrijen, echt vermogen en grondige demping.',
    intro:
      'De GLS is de grootste Mercedes die er is: drie zitrijen en een cabine ter grootte van een kleine kamer. Precies dat formaat is waar de meeste audiosystemen op stuklopen.',
    problems: [
      'Het cabinevolume is enorm. Lage tonen vragen hier meer vermogen dan in welke andere Mercedes dan ook.',
      'Passagiers op de derde rij zitten meters van de voorste speakers en horen een compleet andere auto dan de bestuurder.',
      'De grote klep en de uitgestrekte zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een GLS is dit geen speakerklus maar een systeemklus. Er is echt vermogen nodig, en er moet nagedacht worden over wie er waar zit. Wij werken met meerdere afstemmingen in de DSP: één die de bestuurdersstoel scherp neerzet en één die de hele auto bedient als je met zeven mensen rijdt. De klep en de zijpanelen dempen we grondig, want over dit oppervlak telt resonantie dubbel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie meters achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming en waar nodig extra speakers achterin komen we een heel eind. Wij beloven geen gelijk resultaat op elke stoel.',
      },
      {
        q: 'Ik heb Burmester High-End. Is dit dan zinvol?',
        a: 'Alleen gericht. Bij dat systeem zit de winst in demping en in een afstemming per zitrij. Componenten vervangen raden wij af; dat levert bij dit vertrekpunt te weinig op voor wat het kost.',
      },
      {
        q: 'Blijven alle assistentiesystemen werken?',
        a: 'Ja. Waarschuwingen, parkeersensoren, telefoon en spraakbediening lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // --------------------------------------------------- MERCEDES A-KLASSE
  {
    slug: 'mercedes-a-klasse',
    brand: 'Mercedes-Benz',
    model: 'A-klasse',
    generaties: 'W176 en W177',
    matchers: { merk: 'MERCEDES', model: /\bA ?\d{3}(?!\d)|A-KLASSE|A KLASSE/ },
    title: 'Mercedes A-klasse audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Mercedes A-klasse. Premium speakers, deurdemping en DSP-afstemming met behoud van je MBUX-scherm.',
    intro:
      'De A-klasse is de instap in Mercedes en dat merk je vooral aan het geluid. Het interieur oogt duur, maar wat eruit komt hoort bij een heel andere prijsklasse.',
    problems: [
      'De basisinstallatie heeft weinig vermogen en geen echte subwoofer, waardoor er onder de muziek niets zit.',
      'De cabine is compact en hard aangekleed, waardoor hoge tonen terugkaatsen en het geheel scherp wordt.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel voordat het je oor bereikt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A-klasse zit de grootste winst in de deur. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken er een fatsoenlijke behuizing van. Daarna heeft een betere componentenset pas echt zin. Met een DSP-afstemming temmen we de scherpte die het harde interieur veroorzaakt en zetten we het geluidsbeeld voor je op het dashboard. Je MBUX blijft volledig ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste A-klasses met MBUX zit CarPlay al af fabriek. Bij oudere uitvoeringen met het kleinere scherm kijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt mijn A-klasse zo scherp?',
        a: 'Een compacte cabine met veel hard kunststof laat hoge tonen vaker terugkaatsen voordat ze bij je oor zijn. Dat stapelt op tot scherpte. Met de juiste speakerkeuze en een DSP-afstemming haal je dat eruit zonder dat het dof wordt.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Dat is bij een A-klasse de grootste sprong per euro.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers, knippen niets door en alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // --------------------------------------------------- MERCEDES B-KLASSE
  {
    slug: 'mercedes-b-klasse',
    brand: 'Mercedes-Benz',
    model: 'B-klasse',
    generaties: 'W245, W246 en W247',
    matchers: { merk: 'MERCEDES', model: /\bB ?\d{3}(?!\d)|B-KLASSE|B KLASSE/ },
    title: 'Mercedes B-klasse audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Mercedes B-klasse. Premium speakers, deurdemping, DSP en draadloos CarPlay. All-in prijs, garantie behouden.',
    intro:
      'De B-klasse is gekocht om zijn ruimte en zijn hoge instap. Datzelfde extra volume is precies wat de fabrieksinstallatie niet gevuld krijgt.',
    problems: [
      'Meer cabinevolume dan een A-klasse, met dezelfde bescheiden aansturing. Lage tonen komen daardoor nooit op niveau.',
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een B-klasse is een DSP-versterker geen luxe maar de kern: die geeft de speakers het vermogen dat het volume vraagt en corrigeert met tijdcorrectie het feit dat je hoog en dicht bij de linkerdeur zit. De deuren en de achterklep dempen we, zodat dat extra vermogen in muziek gaat zitten. Een compacte subwoofer onder de stoel maakt het fundament af zonder dat je bagageruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele bediening en de achteruitrijcamera.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik gebruik de auto vooral voor het gezin. Kan het achterin ook goed?',
        a: 'Ja. Bij een B-klasse zitten de achterste passagiers dicht genoeg bij de voorste speakers om er goed van mee te profiteren. Wil je het echt overal gelijk, dan leggen we een tweede afstemming vast die de hele auto bedient.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je vloer blijft vlak.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste B-klasse-opdrachten één werkdag. Je brengt de auto \'s ochtends en rijdt aan het eind van de dag weg met een afgestemd systeem.',
      },
    ],
  },

  // --------------------------------------------------- MERCEDES E-KLASSE
  {
    slug: 'mercedes-e-klasse',
    brand: 'Mercedes-Benz',
    model: 'E-klasse',
    generaties: 'W211, W212 en W213, sedan en Estate',
    matchers: { merk: 'MERCEDES', model: /\bE ?\d{3}(?!\d)|E-KLASSE|E KLASSE/ },
    title: 'Mercedes E-klasse audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Mercedes E-klasse of Estate. DSP-afstemming, high-end speakers, demping en draadloos CarPlay.',
    intro:
      'De E-klasse is de auto waarin veel mensen hun kilometers maken. Op die afstanden gaat het niet om hoe hard het kan, maar om hoe lang je het volhoudt — en daar wringt de basisinstallatie.',
    problems: [
      'De cabine is goed geïsoleerd, dus er is weinig rolgeluid dat de tekortkomingen maskeert. Je hoort ze des te duidelijker.',
      'Er is geen echte subwoofer in de basis, waardoor het fundament onder de muziek ontbreekt.',
      'Bij de Estate slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De E-klasse is een dankbare auto omdat het zware isolatiewerk al door Mercedes gedaan is. Wij gaan direct naar de kern: een DSP-versterker die het signaal schoon binnenhaalt, een goede componentenset in de deuren en een compacte subwoofer voor het fundament dat ontbreekt. Rijd je Estate, dan pakken we ook de laadruimte aan — daar zit bij die carrosserie de resonantie. Daarna stemmen we af op jouw stoel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele bediening. Welke oplossing past hangt af van je systeemversie.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik rij vooral lange afstanden. Wat merk ik daarvan?',
        a: 'Minder luistervermoeidheid. Een systeem dat moet knijpen om volume te maken klinkt hard en put je uit. Met voldoende vermogen en een correcte afstemming kun je zachter luisteren en tóch alles horen.',
      },
      {
        q: 'Ik heb de Estate. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Bij een Estate zit daar wel de meeste winst, dus we bespreken vooraf wat het oplevert en wat het kost.',
      },
      {
        q: 'Ik heb Burmester. Is een upgrade dan nog zinvol?',
        a: 'Ja, gerichter. Burmester geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
    ],
  },

  // --------------------------------------------------- MERCEDES S-KLASSE
  {
    slug: 'mercedes-s-klasse',
    brand: 'Mercedes-Benz',
    model: 'S-klasse',
    generaties: 'W221, W222 en W223',
    matchers: { merk: 'MERCEDES', model: /\bS ?\d{3}(?!\d)|S-KLASSE|S KLASSE/ },
    title: 'Mercedes S-klasse audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Mercedes S-klasse. Verfijning met DSP-afstemming en demping, met respect voor wat er al in zit.',
    intro:
      'In een S-klasse is stilte het uitgangspunt. Dubbel glas, dikke afdichtingen en veel isolatie — en juist in die stilte hoor je precies waar het systeem tekortschiet.',
    problems: [
      'De cabine is fors, en achterin zitten passagiers ver van de voorste speakers. Zonder afstemming klinkt het achterin heel anders dan voorin.',
      'De uitstekende isolatie werkt tegen je: er is weinig rolgeluid dat tekortkomingen maskeert.',
      'Zonder het topsysteem ontbreekt het onderste octaaf, en dat valt in zo\'n stille auto extra op.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een S-klasse is een auto waar je terughoudend te werk gaat. Het zware isolatiewerk is al gedaan, dus wij gaan direct naar de kern: een DSP-versterker die het signaal schoon binnenhaalt, gerichte demping in de deuren en waar nodig een compacte subwoofer. De afstemming maken we op jouw stoel, en zit je vaak achterin, dan leggen we daar een tweede afstemming voor vast die je zelf kunt kiezen.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja. Met een DSP kunnen we meerdere afstemmingen opslaan: één voor de bestuurdersstoel en één die op de achterbank klopt. Vertel het vooraf, dan richten we het zo in.',
      },
      {
        q: 'Ik heb Burmester High-End 3D. Moet ik hier wel iets aan doen?',
        a: 'Waarschijnlijk weinig, en dat zeggen we dan ook. Bij dat systeem zit de winst hooguit in demping en een afstemming op jouw luisterpositie. Wij verkopen je geen vervanging van componenten die al beter zijn dan wat wij eraan zouden toevoegen.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan aan zo\'n auto?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten, zonder te knippen of te boren. Bij auto\'s in dit segment is dat geen extra service maar een voorwaarde.',
      },
    ],
  },
  // -------------------------------------------------------------- AUDI A1
  {
    slug: 'audi-a1',
    brand: 'Audi',
    model: 'A1',
    generaties: '8X en GB, Sportback',
    matchers: { merk: 'AUDI', model: /\bA1\b|\bS1\b/ },
    title: 'Audi A1 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Audi A1. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je MMI.',
    intro:
      'De A1 is de kleinste Audi en voelt van binnen een klasse duurder dan hij is. Tot je de muziek aanzet — daar is het verschil met de rest van het merk het duidelijkst hoorbaar.',
    problems: [
      'Weinig vermogen en geen echte onderkant: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De kleine cabine zit vol harde oppervlakken, waardoor hoge tonen terugkaatsen en het geheel scherp wordt.',
      'De deuren zijn compact en niet gedempt, dus de bas verdwijnt grotendeels in het paneel.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A1 werkt het in je voordeel dat de cabine klein is: je hebt weinig vermogen nodig voor een groot verschil. Wij dempen de deuren en zetten er een componentenset in met een losse tweeter in de spiegeldriehoek, zodat het geluidsbeeld vóór je komt te zitten in plaats van bij je knieën. Met een DSP-afstemming halen we de scherpte uit het harde interieur. Het MMI blijft volledig origineel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, bediend met de originele knoppen en het stuur.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Is het niet zonde om in zo\'n kleine auto te investeren?',
        a: 'Juist niet. Een kleine cabine vraagt weinig vermogen voor hetzelfde niveau en je zit dicht bij de speakers. Een goed opgezette A1 klinkt met gemak beter dan een grote auto met standaard fabrieksaudio.',
      },
      {
        q: 'Waarom klinkt mijn A1 zo scherp?',
        a: 'Veel hard kunststof en glas per kubieke meter cabine. Hoge tonen kaatsen daardoor vaker terug voordat ze bij je oor zijn. Met de juiste speakerkeuze en afstemming is dat goed te temmen.',
      },
      {
        q: 'Blijft mijn MMI werken zoals het was?',
        a: 'Volledig. Alles wat wij doen zit achter het dashboard en in de deuren. Scherm, navigatie en stuurbediening blijven origineel.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI A5
  {
    slug: 'audi-a5',
    brand: 'Audi',
    model: 'A5',
    generaties: '8T en F5, Coupé, Sportback en Cabriolet',
    matchers: { merk: 'AUDI', model: /\bA5\b|\bS5\b|\bRS5\b/ },
    title: 'Audi A5 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Audi A5 Coupé, Sportback of Cabriolet. DSP-afstemming, high-end speakers en draadloos CarPlay.',
    intro:
      'De A5 is de A4 met een mooiere lijn, en die lijn kost akoestisch iets. De lagere daklijn en de raamloze deuren vragen een andere aanpak dan zijn vierdeurs broer.',
    problems: [
      'De raamloze portieren dichten minder goed af dan een deur met raamlijst, waardoor er meer wegluid binnenkomt en de bas eerder weglekt.',
      'De lage daklijn geeft minder cabinevolume boven je hoofd, waardoor het geluidsbeeld snel benauwd wordt.',
      'Bij de Cabriolet verdwijnt met het dak open de hele akoestiek van de auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A5 is afdichten en dempen de basis: raamloze deuren goed behandelen levert direct rust op. Daarna koppelen we een DSP-versterker aan via een interface die het digitale MMI-signaal correct uitleest, en bouwen we de afstemming opnieuw op — met het geluidsbeeld bewust wat hoger, zodat de lage daklijn niet drukkend werkt. Rijd je Cabriolet, dan maken we een afstemming die open én dicht klopt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van de draaiknop en de stuurbediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb de Cabriolet. Heeft goede audio daar wel zin?',
        a: 'Zeker, maar met andere verwachtingen. Met het dak dicht haal je hetzelfde resultaat als in een Coupé. Met het dak open verlies je altijd een deel; wij kiezen speakerposities en een afstemming die in beide situaties werken.',
      },
      {
        q: 'Ik heb Bang & Olufsen. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. B&O geeft je goede componenten, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder. Wij vervangen dan meestal niets en voegen gericht toe.',
      },
      {
        q: 'Kunnen jullie raamloze deuren wel dempen?',
        a: 'Ja, en het is er juist extra zinvol. Het vraagt meer zorg bij het demonteren omdat de ruitgeleiding nauw luistert, dus we plannen er extra tijd voor in.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI A6
  {
    slug: 'audi-a6',
    brand: 'Audi',
    model: 'A6',
    generaties: 'C6, C7 en C8, sedan en Avant',
    matchers: { merk: 'AUDI', model: /\bA6\b|\bS6\b|\bRS6\b/ },
    title: 'Audi A6 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Audi A6 of Avant. DSP-afstemming, high-end speakers, demping en draadloos CarPlay in het MMI.',
    intro:
      'De A6 is de zakelijke kilometervreter van Audi. Juist op die afstanden ga je horen wat er ontbreekt: het is nooit vervelend, maar het pakt je ook nooit.',
    problems: [
      'Op snelwegtempo verdrinkt het middengebied in rolgeluid. Je draait open, en precies dan loopt de fabrieksversterking tegen zijn grens.',
      'Er is geen echte subwoofer, alleen een klein woofertje dat de naam niet verdient.',
      'Bij de Avant slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A6 begint het bij rust. Wij dempen de deuren en bij een Avant ook de laadruimte, waardoor de bodem stiller wordt en je zachter kunt luisteren zonder iets te missen. Daarna koppelen we een DSP-versterker aan met een interface die het digitale signaal onbewerkt uitleest, en zetten we met tijdcorrectie het geluidsbeeld voor je op het dashboard in plaats van in je linkerdeur.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, inclusief bediening via de draaiknop of het touchscreen en het stuur.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik rij veel snelweg. Wat merk ik daarvan?',
        a: 'Vooral minder luistervermoeidheid. De meeste winst zit niet in meer volume maar in minder rolgeluid: is de bodem stiller, dan hoef je er niet meer overheen te draaien.',
      },
      {
        q: 'Ik heb de Avant. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Bij een Avant zit daar wel de meeste winst, dus we bespreken vooraf wat het oplevert en wat het kost.',
      },
      {
        q: 'Waarom is een DSP bij een Audi zo belangrijk?',
        a: 'Omdat het fabriekssysteem het signaal al bewerkt heeft voordat het bij de speakers komt, afgestemd op de originele speakers. Zet je daar zonder correctie betere speakers achter, dan hoor je die fabrieksbewerking juist duidelijker.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI A7
  {
    slug: 'audi-a7',
    brand: 'Audi',
    model: 'A7',
    generaties: '4G en 4K Sportback',
    matchers: { merk: 'AUDI', model: /\bA7\b|\bS7\b|\bRS7\b/ },
    title: 'Audi A7 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Audi A7 Sportback. High-end speakers, DSP-afstemming en grondige demping van de grote achterklep.',
    intro:
      'De A7 is een A6 met een aflopend dak en een grote hatchback-klep. Die klep is precies wat hem akoestisch anders maakt dan de sedan waarop hij gebaseerd is.',
    problems: [
      'De grote schuine achterklep is een fors vlak dat meetrilt en het dreunen versterkt.',
      'De aflopende daklijn kost cabinevolume achterin, waardoor lage tonen minder ruimte hebben om zich op te bouwen.',
      'De bagageruimte staat via de hatchback in open verbinding met de cabine, wat de akoestiek onvoorspelbaarder maakt dan bij een gesloten kofferbak.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een A7 is de achterklep de eerste prioriteit — zonder demping daar hoor je vooral resonantie in plaats van bas. De subwoofer zetten we bij voorkeur vooraan of in de zijwand, dichter bij de bestuurder, omdat de open ruimte achterin minder voorspelbaar meewerkt. Daarna doet de DSP het fijne werk: tijdcorrectie voor een beeld op ooghoogte en een afstemming die de lage daklijn compenseert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van de volledige originele bediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Waarom is die achterklep zo belangrijk?',
        a: 'Het is een groot, schuin, licht vlak dat direct de bagageruimte afsluit. Zonder demping gaat hij op elke basnoot mee en hoor je resonantie in plaats van muziek. Bij deze auto merken klanten dat verschil het eerst.',
      },
      {
        q: 'Ik heb Bang & Olufsen Advanced. Is dit dan zinvol?',
        a: 'Gericht wel. Bij dat systeem zit de winst in demping en in een afstemming op jouw stoel. Componenten vervangen raden wij af; dat levert bij dit vertrekpunt te weinig op voor wat het kost.',
      },
      {
        q: 'Blijft mijn laadruimte bruikbaar?',
        a: 'Ja. Wij werken met compacte subwoofers die in de zijwand of onder een stoel verdwijnen. De vloer blijft vlak.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI A8
  {
    slug: 'audi-a8',
    brand: 'Audi',
    model: 'A8',
    generaties: 'D3, D4 en D5',
    matchers: { merk: 'AUDI', model: /\bA8\b|\bS8\b/ },
    title: 'Audi A8 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Audi A8. Verfijning met DSP-afstemming en gerichte demping, met respect voor wat er al in zit.',
    intro:
      'In een A8 is stilte het uitgangspunt. Akoestisch glas, dikke afdichtingen en veel isolatie — en juist in die stilte hoor je precies waar het systeem tekortschiet.',
    problems: [
      'De cabine is fors, en achterin zitten passagiers ver van de voorste speakers. Zonder afstemming klinkt het achterin heel anders dan voorin.',
      'De goede isolatie werkt tegen je: er is weinig rolgeluid dat tekortkomingen maskeert.',
      'Zonder het topsysteem ontbreekt het onderste octaaf, en dat valt in zo\'n stille auto extra op.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een A8 is een auto waar je terughoudend te werk gaat. Het zware isolatiewerk is al door Audi gedaan, dus wij gaan direct naar de kern: een DSP-versterker die het signaal schoon binnenhaalt vóór alle fabriekscorrecties, gerichte demping in de deuren en waar nodig een compacte subwoofer. Zit je vaak achterin, dan leggen we daar een tweede afstemming voor vast die je zelf kunt kiezen.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja. Met een DSP kunnen we meerdere afstemmingen opslaan: één voor de bestuurdersstoel en één die op de achterbank klopt. Vertel het vooraf, dan richten we het zo in.',
      },
      {
        q: 'Ik heb Bang & Olufsen Advanced. Moet ik hier wel iets aan doen?',
        a: 'Waarschijnlijk weinig, en dat zeggen we dan ook. Bij dat systeem zit de winst hooguit in demping en een afstemming op jouw luisterpositie. Wij verkopen je geen vervanging van componenten die al beter zijn dan wat wij eraan zouden toevoegen.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten, zonder te knippen of te boren. Bij auto\'s in dit segment is dat een voorwaarde, geen extra service.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI Q2
  {
    slug: 'audi-q2',
    brand: 'Audi',
    model: 'Q2',
    generaties: 'GA',
    matchers: { merk: 'AUDI', model: /\bS?Q2\b/ },
    title: 'Audi Q2 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Audi Q2. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay in het MMI.',
    intro:
      'De Q2 is de kleinste SUV van Audi: strak, hoekig en compact. Die hoekige vormen en harde oppervlakken maken hem akoestisch levendiger dan je zou willen.',
    problems: [
      'Het interieur heeft veel hard kunststof en rechte vlakken, waardoor hoge tonen scherp terugkaatsen.',
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De achterklep resoneert hoorbaar mee zodra er bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Q2 doen demping en afstemming samen het werk. De deuren en de achterklep dempen we, wat het rammelen wegneemt en de bas laat dragen. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte, en met de DSP-afstemming halen we de scherpte uit dat hoekige interieur. Omdat de cabine klein is, heb je daar verrassend weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom klinkt mijn Q2 scherper dan een A3?',
        a: 'Meer rechte, harde vlakken per kubieke meter cabine. Hoge tonen kaatsen daardoor vaker terug voordat ze bij je oor zijn. Dat is met de juiste afstemming goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Bij een compacte auto als deze is dat de grootste sprong per euro.',
      },
      {
        q: 'Blijft de achteruitrijcamera werken?',
        a: 'Ja. Camera, parkeersensoren en alle waarschuwingssignalen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI Q3
  {
    slug: 'audi-q3',
    brand: 'Audi',
    model: 'Q3',
    generaties: '8U en F3, ook Sportback',
    matchers: { merk: 'AUDI', model: /\bS?Q3\b|\bRS ?Q3\b/ },
    title: 'Audi Q3 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body en echte bas in je Audi Q3. Premium speakers, demping van deuren en achterklep, DSP en draadloos CarPlay.',
    intro:
      'De Q3 is de Audi waarin veel gezinnen rondrijden. Groot genoeg om ruim te zitten, klein genoeg om mee te parkeren — en precies groot genoeg om het fabriekssysteem tekort te laten schieten.',
    problems: [
      'Het cabinevolume is groter dan bij een A3, terwijl de aansturing in de basis vergelijkbaar bescheiden is.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Q3 is de achterklep het onderdeel dat de meeste mensen verrast: die dempen haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt te liggen. Een compacte subwoofer in de reservewielbak vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van camera, sensoren en stuurbediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep of een bagageruimtepaneel dat meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Ik heb de Sportback. Maakt dat verschil?',
        a: 'Ja. De aflopende daklijn geeft minder volume achterin, dus plaatsen wij de subwoofer daar liever vooraan, onder een stoel. Meld het vooraf, dan houden we er rekening mee.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI Q5
  {
    slug: 'audi-q5',
    brand: 'Audi',
    model: 'Q5',
    generaties: '8R, FY en Sportback',
    matchers: { merk: 'AUDI', model: /\bS?Q5\b/ },
    title: 'Audi Q5 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Audi Q5. High-end speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Q5 is een van de best verkochte Audi\'s en dat is te merken aan de afstemming: hij is voor iedereen gemaakt en dus nergens scherp. Het geluid is daar het duidelijkste voorbeeld van.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen. Dat levert de fabrieksaansturing niet.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Q5 pakken we eerst de klep en de deuren aan, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Daarna koppelen we een DSP-versterker aan via een interface die het digitale MMI-signaal onbewerkt uitleest, en zetten we met tijdcorrectie het geluidsbeeld op ooghoogte. Een compacte subwoofer in de reservewielbak maakt het fundament af.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van camera, sensoren en de volledige bediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb Bang & Olufsen. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. B&O geeft je meer speakers en meer vermogen, maar laat de deuren en de klep ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Blijft mijn laadruimte bruikbaar?',
        a: 'Ja. Wij werken met compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen. De vloer blijft vlak.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Q5-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI Q7
  {
    slug: 'audi-q7',
    brand: 'Audi',
    model: 'Q7',
    generaties: '4L en 4M',
    matchers: { merk: 'AUDI', model: /\bS?Q7\b/ },
    title: 'Audi Q7 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Audi Q7. Echt vermogen voor het grote cabinevolume, afstemming per zitrij en grondige demping.',
    intro:
      'De Q7 is groot, zwaar en stil, met zeven zitplaatsen. Dat formaat is een uitstekend uitgangspunt voor geluid — mits er genoeg vermogen tegenover staat, en dat is precies wat ontbreekt.',
    problems: [
      'Het cabinevolume is groot. Lage tonen vragen daar veel meer vermogen dan de fabrieksaansturing kan geven, dus het blijft dun.',
      'Passagiers op de derde rij zitten ver van elke speaker en horen iets heel anders dan de bestuurder.',
      'De grote achterklep en de uitgestrekte zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Q7 is een auto waar vermogen echt telt. Wij zetten er een DSP-versterker in die het cabinevolume aankan en voegen een subwoofer toe die in de zijwand van de bagageruimte verdwijnt. De deuren en de klep dempen we grondig. Rijd je vaak met een volle auto, dan leggen we een tweede afstemming vast die de hele auto bedient in plaats van alleen de bestuurdersstoel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele MMI-scherm, met behoud van alle comfort- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie ver achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming en waar nodig extra speakers achterin komen we een heel eind.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer bij voorkeur in de zijwand van de bagageruimte, afgewerkt in dezelfde stoffering. De vloer blijft vlak.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Vaak langer dan een dag. Bij een Q7 met volledige demping en een meerkanaals opbouw plannen we meerdere dagen, en dat zeggen we vooraf.',
      },
    ],
  },

  // -------------------------------------------------------------- AUDI TT
  {
    slug: 'audi-tt',
    brand: 'Audi',
    model: 'TT',
    generaties: '8J en 8S, Coupé en Roadster',
    matchers: { merk: 'AUDI', model: /\bTTS?\b/ },
    title: 'Audi TT audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Audi TT Coupé of Roadster. Speakers en afstemming op maat voor een kleine, harde sportwagencabine.',
    intro:
      'De TT heeft de kleinste cabine van alle Audi\'s, en dat verandert alles. Je zit vlak bij je speakers, er is nauwelijks ruimte, en het interieur is hard afgewerkt. Een auto die om maatwerk vraagt.',
    problems: [
      'Je zit extreem dicht op de speakers, waardoor kleine verschillen in afstand tussen links en rechts meteen hoorbaar zijn.',
      'Er is weinig inbouwruimte: een subwoofer moet echt compact zijn om er netjes in te passen.',
      'Het harde, kleine interieur met veel glas laat hoge tonen scherp terugkaatsen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een TT is tijdcorrectie geen luxe maar een noodzaak: doordat je zo dicht bij de speakers zit, is het verschil in afstand tussen je linker- en rechteroor relatief groot. Zonder correctie trekt het beeld volledig naar één kant. Wij stemmen daar precies op af, kiezen een speakerset met een zachtere hoge kant en werken met een compacte subwoofer die achter de bekleding verdwijnt.',
    },
    carplay: {
      possible: true,
      text: 'Bij het Virtual Cockpit zit alles in het instrumentenpaneel en is er geen los middenscherm. Wat er mogelijk is verschilt daardoor sterk per bouwjaar; stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Waarom trekt het geluid in mijn TT naar één kant?',
        a: 'Omdat je zo dicht bij de speakers zit dat het verschil in afstand tussen je linker- en rechteroor relatief groot is. In een grote auto valt dat weg; in een TT niet. Tijdcorrectie lost precies dat op.',
      },
      {
        q: 'Past er wel een subwoofer in?',
        a: 'Ja, maar hij moet compact zijn en zorgvuldig geplaatst. Wij werken met kleine behuizingen die achter de bekleding of achter de stoelen verdwijnen, zodat er van buitenaf niets te zien is.',
      },
      {
        q: 'Ik heb de Roadster. Maakt dat verschil?',
        a: 'Ja. Met het dak open verdwijnt de akoestiek van de cabine en concurreert de muziek met rijwind. Wij stemmen dan af op een compromis dat open én dicht werkt, en kiezen de speakerposities daarop.',
      },
    ],
  },
  // ---------------------------------------------------------- PORSCHE 911
  {
    slug: 'porsche-911',
    brand: 'Porsche',
    model: '911',
    generaties: '996, 997, 991 en 992',
    matchers: { merk: 'PORSCHE', model: /\b911\b/ },
    title: 'Porsche 911 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Porsche 911. Speakers en afstemming op maat voor een kleine cabine waarin de motor het hoofdgerecht is.',
    intro:
      'In een 911 is de motor achter je het instrument waar je voor betaalt. De audio speelt een bijrol, en dat is precies hoe Porsche hem heeft uitgevoerd.',
    problems: [
      'De cabine is klein en hard afgewerkt, met veel glas. Hoge tonen kaatsen daardoor scherp terug.',
      'Er is nauwelijks inbouwruimte: een subwoofer moet echt compact zijn om er netjes in te passen.',
      'Het standaardsysteem heeft weinig vermogen en geen fundament, wat je vooral hoort zodra de motor zwijgt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 911 is terughoudendheid het uitgangspunt. Wij vervangen de speakers door een set met een zachtere hoge kant die niet met het glas gaat vechten, en werken met een compacte subwoofer die achter de bekleding verdwijnt. Tijdcorrectie is hier belangrijker dan vermogen: je zit zo dicht bij de speakers dat het beeld zonder correctie volledig naar één kant trekt. Alles blijft terug te bouwen naar origineel.',
    },
    carplay: {
      possible: true,
      text: 'Op uitvoeringen met PCM-scherm is CarPlay vaak al aanwezig of toe te voegen. Bij oudere generaties verschilt het sterk per bouwjaar; stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Heeft audio in een 911 eigenlijk wel zin?',
        a: 'Dat bepaal jij. Rijd je hem vooral voor het geluid van de motor, dan is een bescheiden verbetering genoeg. Maak je er ook lange ritten mee, dan merk je dat het standaardsysteem daar te kort schiet. Wij zeggen eerlijk wanneer de winst het werk niet waard is.',
      },
      {
        q: 'Past er wel een subwoofer in?',
        a: 'Ja, maar hij moet compact zijn en zorgvuldig geplaatst. Wij werken met kleine behuizingen die achter de bekleding verdwijnen, zodat er van buitenaf niets te zien is.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten, zonder te knippen of te boren. Bij een auto als deze is dat een voorwaarde.',
      },
    ],
  },

  // ------------------------------------------------------- PORSCHE CAYENNE
  {
    slug: 'porsche-cayenne',
    brand: 'Porsche',
    model: 'Cayenne',
    generaties: '955, 958, 9Y0 en Coupé',
    matchers: { merk: 'PORSCHE', model: /CAYENNE/ },
    title: 'Porsche Cayenne audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Porsche Cayenne. Echt vermogen voor het grote cabinevolume, demping van de achterklep en DSP-afstemming.',
    intro:
      'De Cayenne is de Porsche waarmee je boodschappen doet én lange ritten maakt. Dat formaat vraagt meer van de audio dan de compacte modellen, en dat is precies waar het standaardsysteem tekortschiet.',
    problems: [
      'Het cabinevolume is groot. Lage tonen vragen daar veel meer vermogen dan het Sound Package Plus kan geven.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren hoorbaar mee.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Cayenne telt vermogen echt. Wij zetten er een DSP-versterker in die het cabinevolume aankan en voegen een subwoofer toe die in de zijwand van de bagageruimte verdwijnt. De deuren en de klep dempen we, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Cayennes met PCM-scherm is CarPlay al aanwezig of toe te voegen, met behoud van camera en sensoren.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb het BOSE-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. BOSE geeft je meer speakers en meer vermogen, maar laat de deuren en de klep ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer bij voorkeur in de zijwand, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Ik heb de Coupé-uitvoering. Maakt dat verschil?',
        a: 'Ja. De schuine achterklep geeft minder ruimte waar lage tonen zich kunnen opbouwen, dus plaatsen wij de subwoofer daar liever vooraan. Meld het vooraf, dan houden we er rekening mee.',
      },
    ],
  },

  // --------------------------------------------------------- PORSCHE MACAN
  {
    slug: 'porsche-macan',
    brand: 'Porsche',
    model: 'Macan',
    generaties: '95B en de elektrische Macan',
    matchers: { merk: 'PORSCHE', model: /MACAN/ },
    title: 'Porsche Macan audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Porsche Macan. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Macan is de compacte Porsche-SUV en rijdt scherper dan zijn formaat doet vermoeden. Het geluid houdt daar niet helemaal gelijke tred mee.',
    problems: [
      'Het interieur is hard afgewerkt met veel kunststof en leer op harde ondergrond, wat hoge tonen scherp terug laat kaatsen.',
      'De hoge zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Macan doen demping en afstemming samen het werk. De deuren en de achterklep dempen we, wat het rammelen wegneemt en de bas laat dragen. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte, en met de DSP-afstemming halen we de scherpte uit het harde interieur. Een compacte subwoofer maakt het fundament af zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele PCM-scherm, met behoud van camera, sensoren en de originele bediening.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Waarom klinkt mijn Macan scherp?',
        a: 'Veel harde oppervlakken per kubieke meter cabine. Hoge tonen kaatsen daardoor vaker terug voordat ze bij je oor zijn. Met de juiste speakerkeuze en een DSP-afstemming is dat goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Ik heb Burmester. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan uitstekend en die laten we zitten. De winst zit in het temmen van de deuren en de klep.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Macan-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // ------------------------------------------------------ PORSCHE PANAMERA
  {
    slug: 'porsche-panamera',
    brand: 'Porsche',
    model: 'Panamera',
    generaties: '970, 971 en Sport Turismo',
    matchers: { merk: 'PORSCHE', model: /PANAMERA/ },
    title: 'Porsche Panamera audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Porsche Panamera. High-end speakers, DSP-afstemming en grondige demping van de grote achterklep.',
    intro:
      'De Panamera is de Porsche waarin je met vier mensen comfortabel lange afstanden rijdt. Die opzet vraagt iets anders van de audio dan een 911: hier gaat het om alle vier de stoelen.',
    problems: [
      'De grote hatchback-klep is een fors vlak dat meetrilt, en via die klep staat de bagageruimte in open verbinding met de cabine.',
      'Passagiers achterin zitten ver van de voorste speakers en horen zonder afstemming iets heel anders dan de bestuurder.',
      'Zonder het topsysteem ontbreekt het onderste octaaf, en in zo\'n stille auto valt dat extra op.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Panamera is de achterklep de eerste prioriteit — zonder demping daar hoor je vooral resonantie in plaats van bas. Daarna bouwen we met een DSP-versterker de afstemming opnieuw op, en leggen we waar gewenst een tweede afstemming vast die ook achterin klopt. De subwoofer plaatsen we bij voorkeur in de zijwand, zodat je bagageruimte volledig bruikbaar blijft.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Panamera-uitvoeringen met PCM is CarPlay al aanwezig of toe te voegen, met behoud van de volledige bediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik rij vaak met vier personen. Kan het achterin ook goed klinken?',
        a: 'Ja. In een Panamera zitten de achterste passagiers dicht genoeg bij om er goed van mee te profiteren. Met een tweede afstemming die de hele auto bedient, kun je zelf wisselen tussen scherpe focus vooraan en een balans voor iedereen.',
      },
      {
        q: 'Ik heb Burmester High-End. Is dit dan zinvol?',
        a: 'Alleen gericht. Bij dat systeem zit de winst in demping en in een afstemming op jouw luisterpositie. Componenten vervangen raden wij af; dat levert bij dit vertrekpunt te weinig op.',
      },
      {
        q: 'Blijft mijn laadruimte bruikbaar?',
        a: 'Ja. Wij bouwen de subwoofer in de zijwand of onder een stoel, afgewerkt in dezelfde stoffering. De vloer blijft vlak.',
      },
    ],
  },

  // ------------------------------------------------------- PORSCHE BOXSTER
  {
    slug: 'porsche-boxster',
    brand: 'Porsche',
    model: 'Boxster',
    generaties: '986, 987, 981 en 718',
    matchers: { merk: 'PORSCHE', model: /BOXSTER/ },
    title: 'Porsche Boxster audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Porsche Boxster. Speakers en afstemming die werken met het dak open én dicht.',
    intro:
      'De Boxster is een open tweezitter met de motor in het midden. Dat betekent een piepkleine cabine, weinig inbouwruimte en een dak dat het halve jaar openstaat — akoestisch de lastigste combinatie die er is.',
    problems: [
      'Met het dak open verdwijnt de akoestiek van de cabine volledig en concurreert de muziek met rijwind.',
      'Er is nauwelijks inbouwruimte: geen achterbank, geen deurvolume om in te werken en geen kofferbak achterin.',
      'Je zit extreem dicht op de speakers, waardoor het beeld zonder correctie volledig naar één kant trekt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Boxster stemmen we af op een compromis dat met dak open én dicht werkt — een afstemming die alleen dicht klopt, is bij deze auto het halve jaar nutteloos. Wij kiezen speakerposities die met rijwind kunnen omgaan, gebruiken een zeer compacte subwoofer en zetten tijdcorrectie in om het beeld te centreren. Wij zijn vooraf eerlijk over wat er in deze auto wel en niet haalbaar is.',
    },
    carplay: {
      possible: true,
      text: 'Op uitvoeringen met PCM-scherm is CarPlay vaak al aanwezig of toe te voegen. Bij oudere generaties verschilt het per bouwjaar; een foto van je dashboard geeft binnen 24 uur uitsluitsel.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heeft goede audio zin in een cabriolet?',
        a: 'Met het dak dicht zeker. Met het dak open verlies je altijd een deel, want er is geen cabine meer om het geluid in vast te houden. Wij stemmen daarom af op beide situaties in plaats van alleen op dicht.',
      },
      {
        q: 'Past er wel een subwoofer in?',
        a: 'Alleen een zeer compacte, en de plaatsing luistert nauw. Bij deze auto bespreken we vooraf precies wat er past en wat het oplevert, zodat je niet betaalt voor iets wat de ruimte niet toelaat.',
      },
      {
        q: 'Wordt er iets onomkeerbaars gedaan?',
        a: 'Nee. Wij werken uitsluitend op bestaande stekkers en bevestigingspunten. Alles is terug te bouwen naar origineel.',
      },
    ],
  },

  // -------------------------------------------------------- PORSCHE CAYMAN
  {
    slug: 'porsche-cayman',
    brand: 'Porsche',
    model: 'Cayman',
    generaties: '987, 981 en 718',
    matchers: { merk: 'PORSCHE', model: /CAYMAN/ },
    title: 'Porsche Cayman audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Porsche Cayman. Compacte high-end opbouw en afstemming op maat voor een kleine, gesloten sportcabine.',
    intro:
      'De Cayman is de Boxster met een vast dak, en dat maakt akoestisch meer verschil dan je zou denken. Er is eindelijk een cabine om het geluid in vast te houden.',
    problems: [
      'De cabine is klein en hard afgewerkt, met veel glas dat hoge tonen scherp terugkaatst.',
      'Er is weinig inbouwruimte: geen achterbank en beperkt deurvolume om in te werken.',
      'Het standaardsysteem heeft weinig vermogen en geen fundament onder de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'De Cayman is van de compacte Porsches de dankbaarste: het vaste dak geeft ons een echte cabine om mee te werken. Wij dempen de deuren, kiezen een speakerset met een zachtere hoge kant die niet met het glas gaat vechten, en plaatsen een compacte subwoofer achter de bekleding. Tijdcorrectie centreert het beeld, wat bij deze zitafstand het grootste verschil maakt.',
    },
    carplay: {
      possible: true,
      text: 'Op uitvoeringen met PCM-scherm is CarPlay vaak al aanwezig of toe te voegen. Wat er kan verschilt per bouwjaar.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Klinkt een Cayman beter dan een Boxster?',
        a: 'Met dak dicht zijn ze vergelijkbaar, maar de Cayman heeft altijd een gesloten cabine. Daardoor is het resultaat voorspelbaarder en kunnen wij verder gaan met de afstemming.',
      },
      {
        q: 'Past er wel een subwoofer in?',
        a: 'Ja, mits compact en zorgvuldig geplaatst. Wij werken met kleine behuizingen die achter de bekleding verdwijnen, zodat er van buitenaf niets te zien is.',
      },
      {
        q: 'Kan ik eerst komen luisteren?',
        a: 'Graag. Bij een auto als deze plannen we liever eerst een gesprek en een demo dan dat we een pakket verkopen. Stuur een bericht via WhatsApp.',
      },
    ],
  },

  // ------------------------------------------------- RANGE ROVER SPORT
  // LET OP de volgorde: Sport, Velar en Evoque staan vóór de gewone Range
  // Rover, en Discovery Sport vóór Discovery. De eerste match wint.
  {
    slug: 'range-rover-sport',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    generaties: 'L320, L494 en L461',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER SPORT/ },
    title: 'Range Rover Sport audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover Sport. Echt vermogen voor het grote cabinevolume, demping en DSP-afstemming.',
    intro:
      'De Range Rover Sport combineert het formaat van een grote SUV met een sportievere inslag. Die grote, stille cabine is precies wat goede audio nodig heeft — en precies wat het basissysteem niet benut.',
    problems: [
      'Het cabinevolume is groot en vraagt vermogen dat de basisinstallatie niet levert. Lage tonen komen daardoor nooit op niveau.',
      'De hoge zitpositie zet je ver van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Range Rover Sport telt vermogen. Wij zetten er een DSP-versterker in die het cabinevolume aankan, dempen de deuren en de klep, en plaatsen een subwoofer in de zijwand van de bagageruimte. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en de terreininstellingen.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik heb het Meridian-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Meridian geeft je goede componenten en meer vermogen, maar laat de deuren en de klep ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer in de zijwand, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Blijven de terreinsystemen werken?',
        a: 'Ja. Alle waarschuwingen, camerabeelden en instellingen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // ------------------------------------------------- RANGE ROVER VELAR
  {
    slug: 'range-rover-velar',
    brand: 'Land Rover',
    model: 'Range Rover Velar',
    generaties: 'L560',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER VELAR/ },
    title: 'Range Rover Velar audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover Velar. DSP-afstemming, high-end speakers en demping, met behoud van het strakke interieur.',
    intro:
      'De Velar is de Range Rover die het van zijn vormgeving moet hebben: strak, minimalistisch en vol schermen. Dat minimalisme heeft een akoestische keerzijde.',
    problems: [
      'Het interieur is strak en hard afgewerkt met veel glas en gladde panelen, waardoor hoge tonen scherp terugkaatsen.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie levert.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Velar past een ingreep die net zo onzichtbaar is als het interieur. Wij dempen de deuren en de klep, kiezen een speakerset met een zachtere hoge kant die niet met de gladde panelen gaat vechten, en zetten er een DSP-versterker achter. Aan het interieur verandert niets zichtbaars — alleen wat je hoort.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele schermsysteem, met behoud van de volledige bediening.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Waarom klinkt mijn Velar scherp?',
        a: 'Veel glas en gladde, harde panelen laten hoge tonen vaker terugkaatsen voordat ze bij je oor zijn. Dat is met de juiste speakerkeuze en afstemming goed te temmen zonder dat het dof wordt.',
      },
      {
        q: 'Blijft het interieur er origineel uitzien?',
        a: 'Ja. Alles wat wij doen zit achter panelen en in de deuren. Bij een auto die het van zijn vormgeving moet hebben, is dat wat ons betreft een harde eis.',
      },
      {
        q: 'Ik heb Meridian Signature. Wat kunnen jullie toevoegen?',
        a: 'Demping en een afstemming op jouw stoel. De componenten zijn dan uitstekend en die laten we zitten. Wij zeggen eerlijk wanneer de winst het werk niet waard is.',
      },
    ],
  },

  // ------------------------------------------------ RANGE ROVER EVOQUE
  {
    slug: 'range-rover-evoque',
    brand: 'Land Rover',
    model: 'Range Rover Evoque',
    generaties: 'L538 en L551',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER EVOQUE/ },
    title: 'Range Rover Evoque audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Range Rover Evoque. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Evoque is de compacte Range Rover met de lage daklijn. Die vorm verkoopt uitstekend, maar kost akoestisch precies de ruimte waar lage tonen hun werk doen.',
    problems: [
      'De lage daklijn en de kleine ruiten geven weinig cabinevolume, waardoor het geluidsbeeld snel benauwd wordt.',
      'De hoge zitpositie in een lage cabine legt het geluidsbeeld laag terwijl er boven je weinig ruimte is.',
      'De achterklep resoneert hoorbaar mee en de bagageruimte is te klein om lage tonen goed op te bouwen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Evoque plaatsen we de subwoofer bij voorkeur vooraan, onder een stoel, omdat de kleine ruimte achterin niet meewerkt. De deuren en de klep dempen we, en met tijdcorrectie leggen we het geluidsbeeld bewust wat hoger zodat de lage daklijn niet drukkend werkt. In deze cabine heb je minder vermogen nodig dan in een grote Range Rover.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera en sensoren.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet achterin?',
        a: 'De bagageruimte van een Evoque is klein en de daklijn loopt af, waardoor lage tonen zich daar minder goed opbouwen. Een compacte subwoofer onder de stoel zit dichter bij je en geeft in deze carrosserie een strakker resultaat.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen. De laadvloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste Evoque-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // ------------------------------------------------------- RANGE ROVER
  {
    slug: 'range-rover',
    brand: 'Land Rover',
    model: 'Range Rover',
    generaties: 'L322, L405 en L460',
    matchers: { merk: 'LAND ROVER', model: /RANGE ROVER/ },
    title: 'Range Rover audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Range Rover. Afstemming voor voor- en achterbank, echt vermogen en grondige demping.',
    intro:
      'Een Range Rover verkoopt zichzelf op rust en ruimte. Die grote, stille cabine is een uitstekend uitgangspunt voor geluid — en juist in die stilte hoor je waar het systeem tekortschiet.',
    problems: [
      'Het cabinevolume is groot en vraagt vermogen dat de basisinstallatie niet levert.',
      'Achterin zitten passagiers ver van de voorste speakers, en in deze auto zit daar vaak juist iemand.',
      'De uitstekende isolatie werkt tegen je: er is weinig rolgeluid dat tekortkomingen maskeert.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Range Rover is het zware isolatiewerk al gedaan, dus wij gaan direct naar de kern: een DSP-versterker die het cabinevolume aankan, gerichte demping in de deuren en de klep, en een subwoofer in de zijwand van de bagageruimte. Omdat er in deze auto vaak achterin gezeten wordt, leggen we standaard een tweede afstemming vast die daar klopt.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle comfort-, terrein- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Ik word vaak gereden en zit achterin. Kan daarop afgestemd worden?',
        a: 'Ja, en bij deze auto doen we dat standaard. Met een DSP slaan we twee afstemmingen op: één voor de bestuurdersstoel en één die op de achterbank klopt. Je kiest ze zelf.',
      },
      {
        q: 'Ik heb Meridian Signature. Moet ik hier wel iets aan doen?',
        a: 'Waarschijnlijk weinig, en dat zeggen we dan ook. Bij dat systeem zit de winst hooguit in demping en een afstemming op jouw luisterpositie. Wij verkopen je geen vervanging van componenten die al beter zijn.',
      },
      {
        q: 'Blijven de terrein- en comfortsystemen werken?',
        a: 'Ja. Alle waarschuwingen, camerabeelden, hoogteverstelling en instellingen lopen via het fabriekssysteem en blijven ongewijzigd.',
      },
    ],
  },

  // ------------------------------------------------ DISCOVERY SPORT
  {
    slug: 'land-rover-discovery-sport',
    brand: 'Land Rover',
    model: 'Discovery Sport',
    generaties: 'L550',
    matchers: { merk: 'LAND ROVER', model: /DISCOVERY SPORT/ },
    title: 'Discovery Sport audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Land Rover Discovery Sport. Premium speakers, demping van deuren en achterklep, DSP en draadloos CarPlay.',
    intro:
      'De Discovery Sport is de praktische Land Rover: hoog, recht en met plek voor zeven. Die rechte, hoge vormen maken hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'Met de derde zitrij in gebruik zitten passagiers ver van elke speaker.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Discovery Sport is demping het halve werk: de rechte panelen en de grote klep stilleggen haalt de holle nagalm weg die je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Gebruik je de derde rij vaak, dan leggen we daar een tweede afstemming voor vast.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van camera, sensoren en terreininstellingen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een holle dreun bij bas. Wat is dat?',
        a: 'Meestal de achterklep of een zijpaneel dat meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Ik gebruik de derde zitrij regelmatig. Kan het daar ook goed?',
        a: 'Beter dan nu, maar wees realistisch: wie ver achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming komen we een heel eind.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de zijwand verdwijnen. De vloer blijft vlak.',
      },
    ],
  },

  // ------------------------------------------------------- DISCOVERY
  {
    slug: 'land-rover-discovery',
    brand: 'Land Rover',
    model: 'Discovery',
    generaties: 'Discovery 3, 4 en 5',
    matchers: { merk: 'LAND ROVER', model: /DISCOVERY/ },
    title: 'Land Rover Discovery audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Land Rover Discovery. Echt vermogen voor het grote cabinevolume, afstemming per zitrij en grondige demping.',
    intro:
      'De Discovery is een grote, rechte auto met zeven volwaardige zitplaatsen. Dat is veel ruimte om te vullen, en precies daar loopt het fabriekssysteem op vast.',
    problems: [
      'Het cabinevolume is groot en recht van vorm. Lage tonen vragen hier veel vermogen dat de basisinstallatie niet geeft.',
      'De uitgestrekte, vlakke panelen en de grote klep resoneren over een fors oppervlak mee.',
      'Passagiers op de derde rij zitten meters van de voorste speakers en horen een compleet andere auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Discovery is dit een systeemklus. Er is echt vermogen nodig, en er moet nagedacht worden over wie er waar zit. Wij werken met meerdere afstemmingen in de DSP: één die de bestuurdersstoel scherp neerzet en één die de hele auto bedient. De klep en de vlakke zijpanelen dempen we grondig, want over dit oppervlak telt resonantie dubbel.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van alle terrein- en assistentiefuncties.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie meters achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming en waar nodig extra speakers achterin komen we een heel eind.',
      },
      {
        q: 'Mijn Discovery is wat ouder. Is het dat nog waard?',
        a: 'Dat hangt van jou af, niet van de auto. Blijf je er nog jaren in rijden, dan is het goed besteed: gedempte deuren en een goede speakerset gaan langer mee dan de auto. Wij controleren wel eerst het plaatwerk voordat we iets plakken.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Vaak langer dan een dag. Bij een Discovery met volledige demping en een meerkanaals opbouw plannen we meerdere dagen, en dat zeggen we vooraf.',
      },
    ],
  },
  // ---------------------------------------------------------- FORD FOCUS
  {
    slug: 'ford-focus',
    brand: 'Ford',
    model: 'Focus',
    generaties: 'MK2, MK3 en MK4, ook Wagon',
    matchers: { merk: 'FORD', model: /FOCUS/ },
    title: 'Ford Focus audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Focus of Wagon. Premium speakers, deurdemping en DSP-afstemming met behoud van SYNC en je garantie.',
    intro:
      'De Focus rijdt beter dan hij kost, en dat is jarenlang zijn kracht geweest. Het geluid heeft die reputatie nooit gehaald: het is netjes, en verder niets.',
    problems: [
      'De basisinstallatie levert weinig vermogen en knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus de achterkant van de speaker heft een deel van de bas op.',
      'Bij de Wagon slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Focus laten we SYNC met rust — dat werkt goed en je bent eraan gewend. Wij pakken aan wat erachter zit: gedempte deuren, een fatsoenlijke componentenset en waar gewenst een DSP-versterker die het signaal van SYNC oppikt. Rijd je Wagon, dan dempen we ook de laadruimte, want daar zit bij die carrosserie de resonantie.',
    },
    carplay: {
      possible: true,
      text: 'Veel Focussen met SYNC 3 hebben CarPlay al af fabriek. Bij oudere uitvoeringen met een klein scherm bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'oem-plus-executive', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon, spraakbediening en de stuurknoppen blijven ongewijzigd.',
      },
      {
        q: 'Ik heb de Wagon. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Daar zit bij een Wagon wel de meeste winst.',
      },
      {
        q: 'Mijn Focus is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Gedempte deuren en een goede speakerset gaan langer mee dan de auto. Wij controleren wel eerst het plaatwerk voordat we iets plakken.',
      },
    ],
  },

  // -------------------------------------------------------- TOYOTA YARIS
  {
    slug: 'toyota-yaris',
    brand: 'Toyota',
    model: 'Yaris',
    generaties: 'XP90, XP130 en XP210',
    matchers: { merk: 'TOYOTA', model: /YARIS/ },
    title: 'Toyota Yaris audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Toyota Yaris. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, garantie behouden.',
    intro:
      'De Yaris is gekocht om te doen wat hij moet doen, en dat doet hij twintig jaar lang. Het geluid is het onderdeel waar Toyota het meest heeft bezuinigd.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter op veel uitvoeringen, waardoor stemmen dof blijven en het beeld laag hangt.',
      'Weinig isolatie: op de snelweg is het rolgeluid het luidste geluid in de auto.',
      'Bij de hybride valt dat rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Yaris beginnen we bij de deur. Demping legt het lichte blik stil en haalt rolgeluid weg, waardoor je zachter kunt luisteren en toch alles hoort. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je knieën. In deze kleine cabine heb je daar weinig vermogen voor nodig.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Yaris het multimediascherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de hybride. Merk ik meer of minder verschil?',
        a: 'Meer. Zonder motorgeluid valt het rolgeluid extra op, dus demping levert bij een hybride nog meer op dan bij de benzineversie.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Een kleine cabine vraagt weinig vermogen voor hetzelfde niveau en je zit dicht bij de speakers. Een goed opgezette Yaris klinkt met gemak beter dan een grote auto met standaard fabrieksaudio.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

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

  // ------------------------------------------------------ RENAULT TWINGO
  {
    slug: 'renault-twingo',
    brand: 'Renault',
    model: 'Twingo',
    generaties: 'Twingo II en III',
    matchers: { merk: 'RENAULT', model: /TWINGO/ },
    title: 'Renault Twingo audio upgrade | Audio Upgrade Emmen',
    description:
      'Van blikkerig naar vol geluid in je Renault Twingo. Speakers, deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Twingo is klein, vrolijk en goedkoop gehouden. Aan audio is daarbij vrijwel niets uitgegeven — wat de sprong hier juist zo groot maakt.',
    problems: [
      'Vaak maar twee of vier eenvoudige speakers zonder aparte tweeter, dus alles komt uit je knieën.',
      'Het deurblik is dun en licht en gaat op elke basnoot hoorbaar meetrillen.',
      'Bij de derde generatie zit de motor achterin, wat een eigen soort geluid in de cabine brengt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Twingo levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt: het lichte blik stilleggen is hier het halve werk. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Door de kleine cabine heb je verrassend weinig vermogen nodig voor een groot resultaat.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Twingo een scherm in het dashboard, dan kunnen we CarPlay en Android Auto meestal toevoegen. Bij de kale uitvoeringen is dat niet mogelijk; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen. Daarna pas heeft een betere speaker echt zin.',
      },
      {
        q: 'Mijn motor zit achterin. Verandert dat iets?',
        a: 'Voor de speakers niet, maar je hoort de motor wel dichter bij je dan in een gewone hatchback. Demping van het achterschot helpt daar tegen; dat bespreken we vooraf.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in. Wil je alleen minder rijgeluid, dan maken we een prijs op maat voor alleen isolatie.',
      },
    ],
  },

  // ------------------------------------------------------- PEUGEOT 107
  {
    slug: 'peugeot-107',
    brand: 'Peugeot',
    model: '107',
    generaties: '107 en 108',
    matchers: { merk: 'PEUGEOT', model: /\b10[78]\b/ },
    title: 'Peugeot 107 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Peugeot 107 of 108. Speakers, deurdemping en minder rolgeluid, met all-in prijs en behoud van garantie.',
    intro:
      'De 107 is samen met de Toyota Aygo en de Citroën C1 ontwikkeld op de scherpst mogelijke kostprijs. Aan audio is daarbij vrijwel niets uitgegeven.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter: het geluid komt volledig uit je knieën.',
      'De isolatie is tot het minimum beperkt, dus op de snelweg is het rolgeluid het luidste in de auto.',
      'De dunne deurpanelen resoneren mee, waardoor wat er aan bas is vooral als geklapper terugkomt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij deze auto begint alles met stiller maken. Het rolgeluid omlaag brengen verandert de auto meteen: gesprekken gaan zonder stemverheffing en je hoeft de muziek niet meer boven de weg uit te draaien. Daarna zetten we er een componentenset in met een losse tweeter. Voor het bedrag van een setje winterbanden klinkt de auto compleet anders.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw 107 of 108 het multimediascherm in het dashboard, dan kunnen we CarPlay meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik heb een Toyota Aygo of Citroën C1. Geldt dit ook?',
        a: 'Ja. Die drie auto\'s zijn samen ontwikkeld en delen het grootste deel van de carrosserie en het interieur. Wat wij voor een 107 doen, doen we op dezelfde manier voor een Aygo of een C1.',
      },
      {
        q: 'Waarom raden jullie isolatie als eerste aan?',
        a: 'Omdat het rolgeluid hier het grootste probleem is. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // ------------------------------------------------------ RENAULT CAPTUR
  {
    slug: 'renault-captur',
    brand: 'Renault',
    model: 'Captur',
    generaties: 'Captur I en II',
    matchers: { merk: 'RENAULT', model: /CAPTUR/ },
    title: 'Renault Captur audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Renault Captur. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay met behoud van je scherm.',
    intro:
      'De Captur is de Clio op hoge poten en is daarmee een van de best verkochte compacte SUV\'s van Nederland. Die extra hoogte kost je geluid.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'Het cabinevolume is groter dan bij de Clio terwijl de aansturing dezelfde bescheiden is.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Captur tillen we met tijdcorrectie het geluidsbeeld naar ooghoogte, zodat het niet meer van onderen komt. De deuren en de achterklep dempen we, wat het rammelen wegneemt en de bas laat dragen. Een DSP-versterker geeft de speakers het vermogen dat het grotere volume vraagt. Je originele scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Capturs met EASY LINK of R-Link zit CarPlay al af fabriek of is het eenvoudig toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom komt het geluid van onderen?',
        a: 'Omdat je hoog zit en je speakers laag in de deur. Met tijdcorrectie laten we de signalen samenvallen op jouw stoel, waardoor het beeld voor je op ooghoogte komt.',
      },
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Bose geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // -------------------------------------------------------- SUZUKI SWIFT
  {
    slug: 'suzuki-swift',
    brand: 'Suzuki',
    model: 'Swift',
    generaties: 'Swift III, IV en V',
    matchers: { merk: 'SUZUKI', model: /SWIFT/ },
    title: 'Suzuki Swift audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Suzuki Swift. Premium speakers, akoestische deurdemping en minder rolgeluid. All-in prijs, garantie behouden.',
    intro:
      'De Swift is licht, wendbaar en zuinig, en dat gewicht is er overal uit gehaald. Dat merk je aan het geluid: er is weinig massa om trillingen tegen te houden.',
    problems: [
      'Het lichte plaatwerk trilt makkelijk mee, waardoor bas eerder rammelt dan draagt.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
      'De basisinstallatie mist een aparte tweeter, waardoor het geluidsbeeld laag blijft.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Swift is demping het halve werk, juist omdát de auto zo licht is gebouwd. Het deurblik stilleggen levert direct hoorbaar meer bas op zonder extra vermogen. Daarna zetten we er een componentenset in met een losse tweeter in het bovenste deel van de deur, zodat het geluid vóór je komt te zitten in plaats van bij je voeten.',
    },
    carplay: {
      possible: true,
      text: 'Op Swifts met het multimediascherm is CarPlay vaak al aanwezig of toe te voegen. Bij de kale uitvoeringen kijken we per auto wat er kan.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom rammelt mijn deur bij bas?',
        a: 'Omdat er weinig massa in het plaatwerk zit. Dat is goed voor het verbruik maar slecht voor geluid. Demping voegt die massa toe op precies de plekken waar het meetrilt.',
      },
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in. Bij een lichte auto als deze is dat de grootste sprong per euro.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Swift-opdrachten één werkdag. Je brengt de auto \'s ochtends en rijdt er aan het eind van de dag mee weg.',
      },
    ],
  },

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

  // ------------------------------------------------------------ KIA NIRO
  {
    slug: 'kia-niro',
    brand: 'Kia',
    model: 'Niro',
    generaties: 'Niro I en II, hybride en volledig elektrisch',
    matchers: { merk: 'KIA', model: /NIRO/ },
    title: 'Kia Niro audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Kia Niro. Premium speakers, deurdemping en DSP-afstemming — extra effectief in een stille elektrische auto.',
    intro:
      'De Niro is een van de meest verkochte hybrides en elektrische auto\'s van Nederland. Juist doordat hij zo stil is, valt op wat het audiosysteem niet doet.',
    problems: [
      'Zonder motorgeluid valt het rolgeluid van de banden extra op, en dat maskeert precies het gebied waar stemmen zitten.',
      'De hogere zitpositie legt het geluidsbeeld laag, onder je oorhoogte.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een elektrische of hybride auto is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte. Een compacte subwoofer maakt het fundament af.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Niro-uitvoeringen zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik in een elektrische auto meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto — en het maakt de auto ook comfortabeler zonder dat je de muziek aanzet.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Een audiosysteem verbruikt bij normaal luisteren een fractie van wat de aandrijving vraagt. Het effect valt weg tegen buitentemperatuur en rijstijl.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ------------------------------------------------------- PEUGEOT 2008
  {
    slug: 'peugeot-2008',
    brand: 'Peugeot',
    model: '2008',
    generaties: '2008 eerste en tweede generatie',
    matchers: { merk: 'PEUGEOT', model: /\b2008\b/ },
    title: 'Peugeot 2008 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Peugeot 2008. Premium speakers, deurdemping, DSP-afstemming en behoud van het i-Cockpit.',
    intro:
      'De 2008 is de 208 op hoge poten en een van de best verkochte compacte SUV\'s van het land. Het i-Cockpit voelt bijzonder; het geluid komt daar niet achteraan.',
    problems: [
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De basisinstallatie mist zowel de onderkant als de openheid bovenin.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 2008 werken we onzichtbaar, net als het interieur zelf. Wij dempen de deuren en de achterklep en zetten er een componentenset in waarvan de tweeter in de spiegeldriehoek verdwijnt, zodat het geluidsbeeld boven het kleine stuur uit komt in plaats van eronder. Met een DSP-versterker erachter krijgt de auto de body die het interieur belooft.',
    },
    carplay: {
      possible: true,
      text: 'De meeste 2008-uitvoeringen met touchscreen hebben CarPlay al af fabriek. Zit het er niet in, dan kijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb het Focal-systeem. Wat kunnen jullie dan nog doen?',
        a: 'Dan heb je al goede componenten. De winst zit bij jou in demping en in een eigen DSP-afstemming op jouw stoel. Wij vervangen dan meestal niets, we voegen toe.',
      },
      {
        q: 'Blijft het i-Cockpit-scherm werken?',
        a: 'Ja, volledig. Alles wat wij doen zit achter het dashboard en in de deuren.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
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

  // ---------------------------------------------------------- SEAT IBIZA
  {
    slug: 'seat-ibiza',
    brand: 'Seat',
    model: 'Ibiza',
    generaties: '6J, 6P en KJ',
    matchers: { merk: 'SEAT', model: /IBIZA/ },
    title: 'Seat Ibiza audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Seat Ibiza. Premium speakers, deurdemping en DSP-afstemming, met behoud van je scherm en fabrieksgarantie.',
    intro:
      'De Ibiza deelt zijn techniek met de VW Polo, maar wordt sportiever aangekleed en jonger verkocht. De audio is precies hetzelfde bezuinigde verhaal.',
    problems: [
      'Geen aparte tweeter op veel uitvoeringen: het stereobeeld zit laag bij je voeten in plaats van voor je.',
      'De deuren van het platform zijn holle bakken met open gaten, waardoor de achterkant van de speaker de bas grotendeels opheft.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar stemmen zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ibiza dempen we het buitenblik, sluiten we de gaten in het binnenblik af en maken we van die holle deur een fatsoenlijke behuizing. Daarna heeft een componentenset met losse tweeter pas echt zin: die tweeter komt in de spiegeldriehoek, waardoor het geluidsbeeld ineens vóór je zit. Omdat de cabine klein is, haal je met bescheiden vermogen al veel resultaat.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Ibiza-uitvoeringen met scherm is CarPlay al aanwezig of eenvoudig toe te voegen, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb een VW Polo gehad. Is dit dezelfde klus?',
        a: 'Grotendeels wel. Ibiza en Polo delen het platform en de deuropbouw, dus de aanpak is vergelijkbaar. De afwerking van het interieur verschilt, en daar stemmen wij de plaatsing op af.',
      },
      {
        q: 'Passen er grotere speakers in de deur?',
        a: 'Wij gebruiken CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, zonder boren of zagen. Het deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost een upgrade ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in, inclusief montage en btw. Wil je er een DSP en subwoofer bij, dan kom je op The OEM+ Executive van € 2.195.',
      },
    ],
  },

  // ------------------------------------------------------- SKODA OCTAVIA
  {
    slug: 'skoda-octavia',
    brand: 'Škoda',
    model: 'Octavia',
    generaties: '1Z, 5E en NX, ook Combi',
    matchers: { merk: 'SKODA', model: /OCTAVIA/ },
    title: 'Škoda Octavia audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Škoda Octavia of Combi. Premium speakers, demping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Octavia is de verstandige keuze: veel auto voor je geld. Dat verstandige zit ook in de audio, en daar is het minder leuk — het is precies genoeg en niets meer.',
    problems: [
      'Geen aparte versterker: het vermogen komt uit het kleine eindtrapje in de radio, en dat is weinig voor deze cabine.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de bas grotendeels opheft.',
      'Bij de Combi slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Octavia zit de grootste winst in de deur: dempen, de gaten afsluiten en er een fatsoenlijke behuizing van maken. Daarna klinkt dezelfde speaker al hoorbaar voller. Wil je meer, dan zetten we er een DSP-versterker achter die de fabrieksafstemming corrigeert en het geluidsbeeld met tijdcorrectie voor je op het dashboard zet. Rijd je Combi, dan pakken we ook de laadruimte aan.',
    },
    carplay: {
      possible: true,
      text: 'Draadloos CarPlay en Android Auto in het originele scherm, met behoud van de originele knoppen en de stuurbediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb de Combi. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Bij een Combi zit daar wel de meeste winst, dus we bespreken vooraf wat het oplevert.',
      },
      {
        q: 'Ik heb het Canton-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Canton geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt en stemt af op een gemiddelde bestuurder. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Kan ik de originele radio houden?',
        a: 'Ja, en dat is ook het advies. Je scherm, je stuurknoppen en je parkeersensoren blijven ongewijzigd. Alleen wat je hoort verandert.',
      },
    ],
  },

  // ---------------------------------------------------------- VOLVO XC40
  {
    slug: 'volvo-xc40',
    brand: 'Volvo',
    model: 'XC40',
    generaties: 'XC40 en de elektrische EX40',
    matchers: { merk: 'VOLVO', model: /XC40|\bEX40\b/ },
    title: 'Volvo XC40 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Volvo XC40. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De XC40 is de best verkochte Volvo van Nederland. Volvo adverteert zelf met Harman Kardon en Bowers & Wilkins — wie zonder die optie rijdt, hoort precies waarom.',
    problems: [
      'De basisinstallatie is breed opgezet maar onderbemeten: veel speakers, weinig vermogen per speaker.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een XC40 dempen we eerst de deuren en de achterklep, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Daarna brengt een DSP-versterker de speakers op niveau en corrigeert hij de afstemming, met tijdcorrectie zodat het beeld op ooghoogte komt te liggen. Een compacte subwoofer geeft het fundament terug zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste XC40-uitvoeringen is CarPlay al aanwezig of toe te voegen aan het originele scherm. Bij de nieuwere systemen met Google ingebouwd verschilt het per bouwjaar.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb Harman Kardon. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt dan betere componenten en meer vermogen, maar nog steeds ongedempte deuren en een afstemming die voor elke XC40 gelijk is. Wij voegen demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Ik heb de elektrische versie. Maakt dat verschil?',
        a: 'Ja, in je voordeel. Zonder motorgeluid hoor je elke verbetering duidelijker, maar valt het rolgeluid ook meer op. Demping levert bij een elektrische XC40 dus extra veel op.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen. Je laadvloer blijft vlak.',
      },
    ],
  },
  // --------------------------------------------------------- SKODA FABIA
  {
    slug: 'skoda-fabia',
    brand: 'Škoda',
    model: 'Fabia',
    generaties: '5J, NJ en PJ, ook Combi',
    matchers: { merk: 'SKODA', model: /FABIA/ },
    title: 'Škoda Fabia audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Škoda Fabia. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Fabia deelt zijn platform met de VW Polo en de Seat Ibiza, en deelt daarmee ook hun grootste tekortkoming: holle deuren waar de bas in verdwijnt.',
    problems: [
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant grotendeels tegenwerkt.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor stemmen dof blijven en het geluid uit je knieën komt.',
      'Weinig isolatie betekent veel rolgeluid, precies in het gebied waar zang en spraak zitten.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Fabia zit de winst in de deur. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken van die holle deur een fatsoenlijke behuizing — dezelfde speaker klinkt daarin hoorbaar voller. Daarna komt er een componentenset in met een losse tweeter in de spiegeldriehoek, waardoor het geluidsbeeld ineens vóór je zit.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Fabia-uitvoeringen met scherm is CarPlay al aanwezig of eenvoudig toe te voegen, met behoud van de originele bediening.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb eerder een Polo gehad. Is dit dezelfde klus?',
        a: 'Grotendeels wel. Fabia, Polo en Ibiza delen het platform en de deuropbouw, dus de aanpak is vergelijkbaar. De afwerking verschilt, en daar stemmen wij de plaatsing op af.',
      },
      {
        q: 'Passen er grotere speakers in?',
        a: 'Wij gebruiken CNC-gefreesde adapterringen die op de originele bevestigingspunten passen, zonder boren of zagen. Het deurpaneel gaat er daarna weer strak op.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis met premium speakers en deurdemping ligt op € 995 all-in, inclusief montage en btw.',
      },
    ],
  },

  // -------------------------------------------------------- PEUGEOT 308
  {
    slug: 'peugeot-308',
    brand: 'Peugeot',
    model: '308',
    generaties: 'T7, T9 en P5, ook SW',
    matchers: { merk: 'PEUGEOT', model: /\b308\b/ },
    title: 'Peugeot 308 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Peugeot 308 of SW. Premium speakers, deurdemping en DSP-afstemming, met behoud van het i-Cockpit.',
    intro:
      'De 308 is de auto waarmee Peugeot liet zien dat het weer meetelt. Het interieur voelt duur; de basisaudio doet daar niet aan mee.',
    problems: [
      'De basisinstallatie mist zowel de onderkant als de openheid bovenin, waardoor het geheel plat blijft.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel voordat het je oor bereikt.',
      'Bij de SW slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 308 werken we onzichtbaar, net als het interieur zelf. De deuren dempen we en er komt een componentenset in waarvan de tweeter in de spiegeldriehoek verdwijnt, zodat het geluidsbeeld boven het kleine stuur uit komt in plaats van eronder. Rijd je SW, dan pakken we ook de laadruimte aan — daar zit bij die carrosserie de resonantie.',
    },
    carplay: {
      possible: true,
      text: 'De meeste 308-uitvoeringen met touchscreen hebben CarPlay al af fabriek. Zit het er niet in, dan kijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb het Focal-systeem. Wat kunnen jullie dan nog doen?',
        a: 'Dan heb je al goede componenten. De winst zit bij jou in demping en in een eigen DSP-afstemming op jouw stoel, in plaats van het compromis dat voor elke 308 gelijk is.',
      },
      {
        q: 'Blijft het i-Cockpit werken?',
        a: 'Ja, volledig. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm en stuurbediening blijven origineel.',
      },
      {
        q: 'Ik heb de SW. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel, want dat is extra oppervlak en extra demontage. Daar zit bij een SW wel de meeste winst.',
      },
    ],
  },

  // ------------------------------------------------------ TOYOTA COROLLA
  {
    slug: 'toyota-corolla',
    brand: 'Toyota',
    model: 'Corolla',
    generaties: 'E120 tot en met E210, ook Touring Sports',
    matchers: { merk: 'TOYOTA', model: /COROLLA/ },
    title: 'Toyota Corolla audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota Corolla. Premium speakers, demping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De Corolla is de meest verkochte auto ter wereld en tegenwoordig vrijwel altijd hybride. Die stille aandrijving legt precies bloot wat het audiosysteem niet doet.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt om het te maskeren.',
      'De basisinstallatie mist een echte onderkant, waardoor er onder de muziek niets zit.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een hybride is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en waar gewenst de vloer, zetten er een componentenset in en voegen een compacte subwoofer toe voor het fundament. Het resultaat is een auto die stiller én muzikaler is.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Corolla-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen kijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik bij een hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto, en het maakt de auto ook comfortabeler zonder muziek.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft je meer speakers en meer vermogen, maar laat de deuren ongedempt. Wij voegen dan demping en DSP-controle toe in plaats van alles te vervangen.',
      },
      {
        q: 'Kost een audiosysteem verbruik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt; het valt weg tegen buitentemperatuur en rijstijl.',
      },
    ],
  },

  // ------------------------------------------------------ RENAULT MEGANE
  {
    slug: 'renault-megane',
    brand: 'Renault',
    model: 'Mégane',
    generaties: 'Mégane III, IV en E-Tech, ook Estate',
    matchers: { merk: 'RENAULT', model: /MEGANE/ },
    title: 'Renault Mégane audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Renault Mégane of Estate. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Mégane heeft een van de fraaiste interieurs in zijn klasse, met dat staande scherm in het midden. Het geluid haalt dat niveau in de basisuitvoering niet.',
    problems: [
      'De basisinstallatie klinkt netjes op laag volume maar knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, waardoor de bas grotendeels in het paneel verdwijnt.',
      'Bij de Estate slikt de grote laadruimte lage tonen weg en resoneert de achterklep hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Mégane houden we het originele scherm en de bediening intact en werken we erachter. De deuren gaan open, worden gedempt en krijgen een componentenset met een losse tweeter zodat het beeld voor je komt te staan. Rijd je Estate, dan dempen we ook de laadruimte. Een DSP-versterker maakt het geheel af met een afstemming op jouw stoel.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Méganes met R-Link of EASY LINK is CarPlay al aanwezig of eenvoudig toe te voegen.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb het Bose-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Bose geeft je meer speakers en meer vermogen, maar de deuren blijven ongedempt en de afstemming is voor elke Mégane dezelfde. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Moet mijn scherm eruit?',
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Je scherm, navigatie en stuurbediening blijven origineel.',
      },
      {
        q: 'Ik heb de Estate. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een Estate wel de meeste winst, dus we bespreken vooraf wat het oplevert en wat het kost.',
      },
    ],
  },

  // -------------------------------------------------------- HYUNDAI I10
  {
    slug: 'hyundai-i10',
    brand: 'Hyundai',
    model: 'i10',
    generaties: 'i10 eerste, tweede en derde generatie',
    // De RDW schrijft dit zowel als "I10" als met een spatie: "I 10".
    matchers: { merk: 'HYUNDAI', model: /\bI ?10\b/ },
    title: 'Hyundai i10 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Hyundai i10. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs en garantie behouden.',
    intro:
      'De i10 is een van de best verkochte stadsauto\'s van Nederland: compact, betrouwbaar en scherp geprijsd. Dat scherpe prijskaartje hoor je terug in het geluid.',
    problems: [
      'Eenvoudige speakers zonder aparte tweeter op veel uitvoeringen, waardoor alles uit je knieën komt.',
      'Het lichte deurblik gaat op elke basnoot hoorbaar meetrillen.',
      'Weinig isolatie: op de snelweg is het rolgeluid het luidste geluid in de auto.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een i10 levert demping direct hoorbaar meer bas op zonder dat er één watt bij komt: het lichte blik stilleggen is het halve werk. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten in plaats van bij je voeten. In deze kleine cabine heb je verrassend weinig vermogen nodig.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste i10-uitvoeringen met scherm zit CarPlay al af fabriek. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Hyundai levert het op veel uitvoeringen standaard mee. Wij verkopen je niets wat er al in zit: stuur een foto van je dashboard en je hoort het binnen 24 uur.',
      },
      {
        q: 'Is het niet zonde om in zo\'n kleine auto te investeren?',
        a: 'Juist niet. Een kleine cabine vraagt weinig vermogen voor hetzelfde niveau en je zit dicht bij de speakers. Een goed opgezette i10 klinkt met gemak beter dan een grote auto met fabrieksaudio.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
    ],
  },

  // ----------------------------------------------------------- FIAT PANDA
  {
    slug: 'fiat-panda',
    brand: 'Fiat',
    model: 'Panda',
    generaties: 'Panda II en III',
    matchers: { merk: 'FIAT', model: /PANDA/ },
    title: 'Fiat Panda audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Fiat Panda. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Panda is eerlijk gebouwd: recht, hoog en zonder opsmuk. Die rechte, hoge panelen maken hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt volledig uit je knieën.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Panda is demping het halve werk. De rechte panelen stilleggen haalt de holle nagalm weg die je aanzag voor bas, en maakt de auto meteen rustiger op de snelweg. Daarna zetten we er een componentenset in met een losse tweeter zodat het geluid vóór je komt te zitten. Voor een bescheiden bedrag klinkt de auto compleet anders.',
    },
    carplay: {
      possible: true,
      text: 'Heeft jouw Panda het Uconnect-scherm, dan kunnen we CarPlay meestal toevoegen. Bij de kale uitvoeringen zonder scherm is dat niet mogelijk.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De rechte, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen. Dempen lost dat op.',
      },
      {
        q: 'Waarom raden jullie isolatie als eerste aan?',
        a: 'Omdat rolgeluid en resonantie hier het grootste probleem zijn. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Alleen isolatie maken we op maat, afhankelijk van hoeveel oppervlak je wilt aanpakken.',
      },
    ],
  },

  // -------------------------------------------------------- TOYOTA AURIS
  {
    slug: 'toyota-auris',
    brand: 'Toyota',
    model: 'Auris',
    generaties: 'E150 en E180, ook Touring Sports',
    matchers: { merk: 'TOYOTA', model: /AURIS/ },
    title: 'Toyota Auris audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota Auris. Premium speakers, demping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De Auris was jarenlang de hybride waar Nederland op reed voordat de Corolla die naam terugkreeg. Veel exemplaren rijden nog, en het geluid is er zelden aan bijgewerkt.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'De basisinstallatie mist een echte onderkant en knijpt dicht zodra je verder opendraait.',
      'Bij oudere exemplaren zijn de originele speakerconussen na jaren verhard, waardoor de bas dun wordt zonder dat er iets kapot is.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Auris pakken we twee dingen tegelijk aan: het rolgeluid en de verouderde speakers. Demping van de deuren maakt de auto stiller, wat bij een hybride extra opvalt, en een nieuwe componentenset haalt de dunheid eruit. Bij oudere exemplaren controleren we eerst het plaatwerk — bij een auto van deze leeftijd wil je geen demping plakken op blik met beginnende roest.',
    },
    carplay: {
      possible: true,
      text: 'Bij de latere Auris met multimediascherm is CarPlay vaak toe te voegen. Bij oudere uitvoeringen verschilt het per bouwjaar; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn geluid is dun geworden, maar er is niets stuk. Hoe kan dat?',
        a: 'Bij oudere auto\'s verharden of scheuren de speakerconussen langzaam. De speaker houdt niet op met werken maar verliest zijn bas. Het is de meest voorkomende klacht bij auto\'s van deze leeftijd en makkelijk op te lossen.',
      },
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid duidelijker, dus demping levert extra veel op.',
      },
      {
        q: 'Mijn Auris is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Gedempte deuren en een goede speakerset gaan langer mee dan de auto zelf.',
      },
    ],
  },

  // ------------------------------------------------------- TESLA MODEL Y
  {
    slug: 'tesla-model-y',
    brand: 'Tesla',
    model: 'Model Y',
    generaties: 'Model Y Standard, Long Range en Performance',
    matchers: { merk: 'TESLA', model: /MODEL ?Y/ },
    title: 'Tesla Model Y audio upgrade | Audio Upgrade Emmen',
    description:
      'Upgrade de audio van je Tesla Model Y. Vooral bij de instapversie zonder premium audio is de winst groot.',
    intro:
      'De Model Y is de best verkochte auto van Europa geworden. Het is in de kern een hogere Model 3, en dat extra volume vraagt meer van het geluid dan de sedan.',
    problems: [
      'De instapuitvoeringen missen versterker en subwoofer, terwijl de bekabeling er in veel auto\'s al wél ligt.',
      'Het cabinevolume is groter dan bij de Model 3, dus lage tonen hebben meer vermogen nodig om te vullen.',
      'Het grote glazen dak en de glazen achterruit maken hoge tonen scherp en reflecterend, en het is een stille auto waarin dat opvalt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Model Y zonder premium audio voegen we toe wat Tesla heeft weggelaten: een DSP-versterker, een betere speakerset en een subwoofer. Omdat de voorbereiding vaak al aanwezig is, kan dat opvallend netjes en zonder ingrijpende demontage. De DSP gebruiken we bovendien om de scherpte van al dat glas te temperen, en met tijdcorrectie halen we het geluidsbeeld omhoog — je zit hier hoger dan in een Model 3.',
    },
    carplay: {
      possible: false,
      text: 'Tesla staat CarPlay en Android Auto niet toe op zijn voertuigen. Dat is een keuze van Tesla en daar kan geen enkele inbouwspecialist omheen. Alles wat wij voor je Model Y doen zit dus in het geluid zelf, niet in de bediening.',
    },
    packages: ['oem-plus-executive', 'akoestische-basis', 'reference-edition'],
    faq: [
      {
        q: 'Hoe weet ik of ik premium audio heb?',
        a: 'Kijk of er speakers in de achterste zijpanelen en een middenspeaker in het dashboard zitten, en of er in de kofferbak een subwoofer zit. Twijfel je, stuur dan via WhatsApp een foto van je interieur en je bouwjaar.',
      },
      {
        q: 'Vervalt mijn Tesla-garantie?',
        a: 'Nee. Wij sluiten aan op bestaande stekkers en connectoren en knippen geen originele bedrading door. De aanpassing is volledig terug te bouwen.',
      },
      {
        q: 'Waarom klinkt het scherp in mijn Model Y?',
        a: 'Het glazen dak en de glazen achterruit kaatsen hoge tonen terug, en omdat de auto verder heel stil is valt dat extra op. Met de juiste speakerkeuze en DSP-afstemming is dat goed te temmen.',
      },
    ],
  },

  // ---------------------------------------------------------- VOLVO XC60
  {
    slug: 'volvo-xc60',
    brand: 'Volvo',
    model: 'XC60',
    generaties: 'XC60 eerste en tweede generatie',
    matchers: { merk: 'VOLVO', model: /XC60/ },
    title: 'Volvo XC60 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Volvo XC60. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De XC60 is de meest verkochte Volvo-SUV en een auto waarin veel mensen bewust voor comfort kiezen. Het basissysteem doet daar minder aan mee dan je zou verwachten.',
    problems: [
      'Breed opgezet maar onderbemeten: veel speakers, weinig vermogen per speaker. Je hoort alles, maar niets heeft gewicht.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'De grote achterklep en de zijpanelen van de bagageruimte resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een XC60 dempen we eerst de deuren en de achterklep, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Daarna brengt een DSP-versterker de speakers op niveau en corrigeert hij de afstemming, met tijdcorrectie zodat het beeld op ooghoogte komt te liggen. Een compacte subwoofer in de zijwand geeft het fundament terug zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste XC60-uitvoeringen is CarPlay al aanwezig of toe te voegen aan het originele Sensus-scherm. Bij de nieuwere systemen met Google ingebouwd verschilt het per bouwjaar.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Ik heb Bowers & Wilkins. Heeft een upgrade dan nog zin?',
        a: 'Dan heb je een uitstekend vertrekpunt en is vervangen zelden verstandig. De winst zit bij jou in demping en in een afstemming op jouw stoel. Wij zijn eerlijk als we vinden dat de winst het werk niet waard is.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer bij voorkeur in de zijwand, afgewerkt in dezelfde stoffering. De vloer blijft vlak en volledig bruikbaar.',
      },
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: 'Voor de meeste XC60-opdrachten één werkdag. Bij uitgebreide isolatie plannen we langer en zeggen we dat vooraf.',
      },
    ],
  },

  // ------------------------------------------------------------- FORD KA
  {
    slug: 'ford-ka',
    brand: 'Ford',
    model: 'Ka',
    generaties: 'Ka II en Ka+',
    matchers: { merk: 'FORD', model: /\bKA\b|\bKA\+/ },
    title: 'Ford Ka audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Ford Ka. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs en garantie behouden.',
    intro:
      'De Ka is een stadsauto zonder pretenties, en zo is hij ook uitgerust. Precies daarom valt er met bescheiden middelen veel te winnen.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt volledig uit je knieën.',
      'Het lichte deurblik trilt hoorbaar mee op elke basnoot.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Ka is demping het halve resultaat. Het lichte blik stilleggen levert direct hoorbaar meer bas op, zonder dat er één watt bij komt. Daarna zetten we er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten. Door de kleine cabine haal je met weinig vermogen al een groot verschil.',
    },
    carplay: {
      possible: true,
      text: 'Bij de Ka+ met SYNC-scherm is CarPlay vaak toe te voegen. Bij de oudere Ka zonder scherm is dat niet mogelijk; een foto van je dashboard geeft uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Blijf je er nog jaren in rijden, dan niet. Een kleine cabine vraagt weinig vermogen en je zit dicht bij de speakers, dus je krijgt veel terug voor een bescheiden bedrag.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // -------------------------------------------------------- KIA SPORTAGE
  {
    slug: 'kia-sportage',
    brand: 'Kia',
    model: 'Sportage',
    generaties: 'SL, QL en NQ5',
    matchers: { merk: 'KIA', model: /SPORTAGE/ },
    title: 'Kia Sportage audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Kia Sportage. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Sportage is een van de best verkochte SUV\'s van Nederland en biedt veel auto voor je geld. Het geluid is het onderdeel waar dat het duidelijkst te merken is.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Sportage verrast de achterklep de meeste mensen: die dempen haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Een compacte subwoofer in de reservewielbak vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Sportages vanaf 2016 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft je meer speakers en meer vermogen, maar laat de deuren en de klep ongedempt. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

  // ------------------------------------------------------------ FORD KUGA
  {
    slug: 'ford-kuga',
    brand: 'Ford',
    model: 'Kuga',
    generaties: 'Kuga I, II en III',
    matchers: { merk: 'FORD', model: /KUGA/ },
    title: 'Ford Kuga audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Ford Kuga. Premium speakers, demping van deuren en achterklep, DSP-afstemming met behoud van SYNC.',
    intro:
      'De Kuga is de gezinsauto van Ford: hoog, ruim en met veel kilometers per jaar. Dat formaat vraagt meer van de audio dan er af fabriek in zit.',
    problems: [
      'Het cabinevolume is fors terwijl de basisaansturing weinig vermogen levert, dus lage tonen komen nooit op niveau.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Kuga laten we SYNC met rust en werken we erachter. De deuren en de achterklep dempen we, wat het dreunen wegneemt, en een DSP-versterker geeft de speakers het vermogen dat het volume vraagt. Met tijdcorrectie tillen we het geluidsbeeld naar ooghoogte. Je scherm, telefoonfuncties en stuurbediening blijven ongewijzigd.',
    },
    carplay: {
      possible: true,
      text: 'Veel Kuga\'s met SYNC 3 hebben CarPlay al af fabriek. Bij oudere uitvoeringen bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Blijft SYNC gewoon werken?',
        a: 'Ja. Wij vervangen het systeem niet maar sluiten erachter aan. Navigatie, telefoon en de stuurknoppen blijven ongewijzigd.',
      },
      {
        q: 'Ik heb het B&O-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt dan een betere speakerset, maar nog steeds ongedempte deuren en klep. Wij voegen demping en DSP-controle toe in plaats van te vervangen.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
      },
    ],
  },

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

  // -------------------------------------------------------- HYUNDAI KONA
  {
    slug: 'hyundai-kona',
    brand: 'Hyundai',
    model: 'Kona',
    generaties: 'OS en SX2, ook volledig elektrisch',
    matchers: { merk: 'HYUNDAI', model: /KONA/ },
    title: 'Hyundai Kona audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Hyundai Kona. Premium speakers, deurdemping en DSP-afstemming — extra effectief bij de elektrische versie.',
    intro:
      'De Kona is een van de populairste compacte SUV\'s van Nederland, en de elektrische versie is er een die je vaak in Drenthe ziet. Juist die stilte legt bloot wat het geluid mist.',
    problems: [
      'Bij de elektrische versie valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'De hogere zitpositie zet je verder van de deurspeakers, waardoor het geluidsbeeld laag blijft hangen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Kona, en zeker de elektrische, levert demping dubbel op: de auto wordt stiller én muzikaler. Wij dempen de deuren en de achterklep, tillen met tijdcorrectie het geluidsbeeld naar ooghoogte en voegen waar gewenst een compacte subwoofer toe. In deze cabine heb je daar minder vermogen voor nodig dan in een grote SUV.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Kona-uitvoeringen zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb de elektrische Kona. Merk ik meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker. Demping levert daardoor meer op dan bij een benzineauto, en maakt de auto ook comfortabeler zonder muziek.',
      },
      {
        q: 'Kost een audiosysteem rijbereik?',
        a: 'Verwaarloosbaar. Bij normaal luisteren verbruikt het een fractie van wat de aandrijving vraagt; het valt weg tegen buitentemperatuur en rijstijl.',
      },
      {
        q: 'Ik heb het Krell-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan bovengemiddeld; de winst zit in het temmen van de deuren en de klep en in een afstemming op jouw stoel.',
      },
    ],
  },
  // ----------------------------------------------------------- VOLVO V70
  {
    slug: 'volvo-v70',
    brand: 'Volvo',
    model: 'V70',
    generaties: 'V70 tweede en derde generatie',
    matchers: { merk: 'VOLVO', model: /V70/ },
    title: 'Volvo V70 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Volvo V70. Premium speakers, demping van laadruimte en deuren, en een afstemming op jouw stoel.',
    intro:
      'De V70 is de stationwagen waar Nederland decennia op reed en waar er nog duizenden van rijden. Bij een auto van deze leeftijd zit de winst ergens anders dan bij een nieuwe.',
    problems: [
      'De schuimranden rond de originele speakerconussen vergaan na jaren. Je hoort dunne, rammelende bas terwijl er niets kapot lijkt.',
      'De grote open laadruimte slikt lage tonen weg en resoneert tegelijk mee.',
      'De basisinstallatie had al weinig vermogen, en dat merk je nu extra.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een V70 vervangen we de vergane speakers en dempen we de deuren én de laadruimte — bij een stationwagen zit daar de helft van het probleem. Omdat de auto ouder is, controleren we eerst het plaatwerk: demping hoort niet op blik met beginnende roest. Wil je meer, dan zetten we er een compacte DSP-versterker achter die het signaal van de originele radio oppikt.',
    },
    carplay: {
      possible: true,
      text: 'Bij de latere V70 met Sensus-scherm is CarPlay soms toe te voegen. Bij oudere uitvoeringen is er geen scherm waar het in past; een foto van je dashboard geeft binnen 24 uur uitsluitsel.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn geluid is dun geworden, maar er is niets stuk. Hoe kan dat?',
        a: 'Dat is bijna altijd de schuimrand rond de speakerconus. Die vergaat langzaam waardoor de speaker zijn bas verliest zonder op te houden met werken. Meest voorkomende klacht bij auto\'s van deze leeftijd, en de makkelijkste om op te lossen.',
      },
      {
        q: 'Is demping verstandig bij een auto van deze leeftijd?',
        a: 'Mits je eerst kijkt. Wij controleren het plaatwerk voordat we plakken. Zit het goed, dan is een V70 juist dankbaar om te dempen omdat er af fabriek weinig in zat.',
      },
      {
        q: 'Mijn V70 is oud. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Gedempte deuren en een goede speakerset gaan langer mee dan de auto. Wij zeggen eerlijk wanneer wij vinden dat de investering niet in verhouding staat.',
      },
    ],
  },

  // --------------------------------------------------------- SUZUKI ALTO
  {
    slug: 'suzuki-alto',
    brand: 'Suzuki',
    model: 'Alto',
    generaties: 'Alto zesde en zevende generatie',
    matchers: { merk: 'SUZUKI', model: /ALTO/ },
    title: 'Suzuki Alto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Suzuki Alto. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Alto is zo licht en zo eenvoudig mogelijk gebouwd. Dat maakt hem zuinig, en het maakt het geluid het eerste onderdeel waar je iets aan wilt doen.',
    problems: [
      'Twee of vier eenvoudige speakers zonder aparte tweeter: alles komt uit je knieën.',
      'Zeer licht plaatwerk dat op elke basnoot hoorbaar meetrilt.',
      'Vrijwel geen isolatie, waardoor rolgeluid op de snelweg alles overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Alto is demping veruit het belangrijkste. Het lichte blik stilleggen levert direct hoorbaar meer bas op zonder extra vermogen, en maakt de auto merkbaar rustiger op de snelweg. Daarna zetten we er een componentenset in met een losse tweeter zodat het geluid vóór je komt te zitten. Voor een bescheiden bedrag is dat een compleet andere auto.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Alto\'s hebben geen scherm in het dashboard waar CarPlay in past. Wil je toch draadloos muziek streamen, dan kan dat met een discrete oplossing achter het dashboard; vraag ernaar via WhatsApp.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Wat levert het meest op als ik één ding kies?',
        a: 'De deuren dempen. Bij deze auto is het lichte blik de grootste boosdoener, en dat stilleggen kost geen extra vermogen.',
      },
      {
        q: 'Is het niet zonde om in zo\'n auto te investeren?',
        a: 'Een kleine cabine vraagt weinig vermogen en je zit dicht bij de speakers, dus je krijgt veel terug voor een bescheiden bedrag. Blijf je er nog jaren in rijden, dan is het goed besteed.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Wij werken met Plug & Play-kabelbomen op de bestaande stekkers en knippen geen originele bedrading door.',
      },
    ],
  },

  // -------------------------------------------------------- PEUGEOT 3008
  {
    slug: 'peugeot-3008',
    brand: 'Peugeot',
    model: '3008',
    generaties: '3008 eerste en tweede generatie',
    matchers: { merk: 'PEUGEOT', model: /\b3008\b/ },
    title: 'Peugeot 3008 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Peugeot 3008. Premium speakers, demping van deuren en achterklep, DSP-afstemming en behoud van het i-Cockpit.',
    intro:
      'De 3008 is de auto waarmee Peugeot bewees dat het weer meetelt: een interieur dat aanvoelt als een klasse hoger. Het geluid loopt daar in de basisuitvoering op achter.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep dreunt hoorbaar mee op elke basnoot.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 3008 dempen we eerst de klep en de deuren, want zonder dat gaat elk extra watt zitten in rammelend plaatwerk. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld boven het kleine stuur uit komt in plaats van eronder. Alles blijft onzichtbaar, net als het interieur zelf.',
    },
    carplay: {
      possible: true,
      text: 'De meeste 3008-uitvoeringen met touchscreen hebben CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik heb het Focal-systeem. Wat kunnen jullie dan nog doen?',
        a: 'Dan heb je al goede componenten. De winst zit bij jou in demping van deuren en klep, en in een DSP-afstemming op jouw stoel in plaats van het compromis dat voor elke 3008 gelijk is.',
      },
      {
        q: 'Blijft het i-Cockpit werken?',
        a: 'Ja, volledig. Alles wat wij doen zit achter het dashboard en in de deuren.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die onder de stoel of in de reservewielbak verdwijnen.',
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

  // --------------------------------------------------------- TOYOTA RAV4
  {
    slug: 'toyota-rav4',
    brand: 'Toyota',
    model: 'RAV4',
    generaties: 'XA30, XA40 en XA50',
    matchers: { merk: 'TOYOTA', model: /RAV\s?4/ },
    title: 'Toyota RAV4 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Toyota RAV4. Premium speakers, demping van deuren en achterklep, DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De RAV4 is de best verkochte SUV ter wereld en vrijwel altijd hybride. Die stille aandrijving legt precies bloot waar het audiosysteem tekortschiet.',
    problems: [
      'Bij de hybride valt het rolgeluid extra op, omdat er geen motorgeluid overheen komt.',
      'Het cabinevolume is fors en vraagt meer vermogen dan de basisinstallatie geeft.',
      'De grote achterklep en de bagageruimtepanelen resoneren hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een hybride SUV is een dankbare klant voor demping: er is geen motor die het rolgeluid maskeert, dus alles wat je stiller maakt hoor je meteen terug. Wij dempen de deuren en de klep, zetten er een DSP-versterker achter voor het vermogen dat het volume vraagt, en tillen met tijdcorrectie het geluidsbeeld naar ooghoogte.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste RAV4-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Ik heb het JBL-systeem. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. JBL geeft meer speakers en vermogen, maar laat de deuren en klep ongedempt. Wij voegen dan demping en DSP-controle toe.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij gebruiken compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen.',
      },
    ],
  },

  // --------------------------------------------------------- TOYOTA C-HR
  {
    slug: 'toyota-c-hr',
    brand: 'Toyota',
    model: 'C-HR',
    generaties: 'C-HR eerste en tweede generatie',
    matchers: { merk: 'TOYOTA', model: /C-?HR/ },
    title: 'Toyota C-HR audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Toyota C-HR. Premium speakers, deurdemping en DSP-afstemming — extra effectief bij de hybride.',
    intro:
      'De C-HR valt op door zijn vorm: aflopend dak, kleine ruiten en een gesloten achterkant. Dat ontwerp kost precies de ruimte waar lage tonen hun werk doen.',
    problems: [
      'De aflopende daklijn en kleine ruiten geven weinig cabinevolume, waardoor het geluidsbeeld snel benauwd wordt.',
      'Bij de hybride valt het rolgeluid extra op, want er is geen motorgeluid dat het maskeert.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een C-HR plaatsen we de subwoofer bij voorkeur vooraan, onder een stoel, omdat de kleine ruimte achterin niet meewerkt. De deuren en de klep dempen we — bij een hybride hoor je dat meteen terug in rust. Met tijdcorrectie leggen we het geluidsbeeld bewust wat hoger, zodat de lage daklijn niet drukkend werkt.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste C-HR-uitvoeringen vanaf 2019 zit CarPlay al af fabriek. Bij oudere modellen bekijken we per auto wat er kan.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Waarom zetten jullie de subwoofer niet achterin?',
        a: 'De bagageruimte is klein en de daklijn loopt af, waardoor lage tonen zich daar minder goed opbouwen. Een compacte subwoofer onder de stoel zit dichter bij je en geeft een strakker resultaat.',
      },
      {
        q: 'Merk ik bij de hybride meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid duidelijker, dus demping levert extra veel op.',
      },
      {
        q: 'Verlies ik bagageruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die onder de stoel verdwijnen.',
      },
    ],
  },

  // -------------------------------------------------------- HYUNDAI I20
  {
    slug: 'hyundai-i20',
    brand: 'Hyundai',
    model: 'i20',
    generaties: 'i20 eerste, tweede en derde generatie',
    matchers: { merk: 'HYUNDAI', model: /\bI ?20\b/ },
    title: 'Hyundai i20 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Hyundai i20. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De i20 biedt veel auto voor weinig geld, en dat is precies waar het geluid het onderspit delft. Het is niet slecht, het is zuinig gekozen.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een i20 dempen we de deuren en zetten we er een componentenset in met een losse tweeter in de spiegeldriehoek, zodat het geluidsbeeld vóór je komt te zitten. In deze compacte cabine haal je met bescheiden vermogen al een groot resultaat. Je scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste i20-uitvoeringen met scherm zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Hyundai levert het op veel uitvoeringen standaard mee. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur — en als je het al hebt, zeggen we dat gewoon.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja. Plug & Play-kabelbomen op de bestaande stekkers, niets doorgeknipt, alles terug te bouwen.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL AGILA
  {
    slug: 'opel-agila',
    brand: 'Opel',
    model: 'Agila',
    generaties: 'Agila A en B',
    matchers: { merk: 'OPEL', model: /AGILA/ },
    title: 'Opel Agila audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Agila. Speakers, akoestische deurdemping en minder rolgeluid, met all-in prijs.',
    intro:
      'De Agila is klein, hoog en praktisch, en juist die hoge rechte vorm maakt hem akoestisch levendiger dan comfortabel is.',
    problems: [
      'De rechte, hoge panelen resoneren makkelijk mee en geven een holle nagalm bij lage tonen.',
      'Twee of vier eenvoudige speakers zonder aparte tweeter, dus het geluid komt uit je knieën.',
      'Minimale isolatie: op snelwegsnelheid overstemt het rolgeluid de muziek.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Agila is demping het halve werk. De rechte panelen stilleggen haalt de holle nagalm weg die je aanzag voor bas en maakt de auto meteen rustiger. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Agila\'s hebben geen scherm in het dashboard waar CarPlay in past. Wil je toch draadloos streamen en handsfree bellen, dan kan dat met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis'],
    faq: [
      {
        q: 'Ik hoor een holle dreun. Wat is dat?',
        a: 'De rechte, vlakke panelen die meetrillen. Het klinkt als bas maar het is resonantie, en het maskeert de echte lage tonen.',
      },
      {
        q: 'Waarom eerst isolatie?',
        a: 'Omdat rolgeluid en resonantie hier het grootste probleem zijn. Zolang de weg luider is dan de muziek, hoor je van betere speakers maar de helft.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Alleen isolatie maken we op maat.',
      },
    ],
  },

  // ------------------------------------------------------- HYUNDAI TUCSON
  {
    slug: 'hyundai-tucson',
    brand: 'Hyundai',
    model: 'Tucson',
    generaties: 'TL en NX4',
    matchers: { merk: 'HYUNDAI', model: /TUCSON/ },
    title: 'Hyundai Tucson audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Hyundai Tucson. Premium speakers, demping van deuren en achterklep, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De Tucson is een van de best verkochte SUV\'s van Nederland en biedt veel voor zijn geld. Het geluid is het onderdeel waar dat het duidelijkst te merken is.',
    problems: [
      'Het cabinevolume is fors en lage tonen hebben vermogen nodig om zo\'n ruimte te vullen.',
      'De hoge zitpositie legt het geluidsbeeld laag, ver onder je oorhoogte.',
      'De grote achterklep werkt als een trommelvel en dreunt hoorbaar mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Tucson verrast de achterklep de meeste mensen: die dempen haalt het dreunen weg dat je aanzag voor bas. Daarna geeft een DSP-versterker de speakers het vermogen dat het volume vraagt, met tijdcorrectie zodat het beeld op ooghoogte komt. Een compacte subwoofer vult het fundament aan zonder dat je laadruimte inlevert.',
    },
    carplay: {
      possible: true,
      text: 'Op vrijwel alle Tucsons vanaf 2016 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik hoor een doffe dreun bij bas. Is er iets kapot?',
        a: 'Waarschijnlijk niet. Dat is meestal de achterklep die meetrilt. Het klinkt als bas maar het is resonantie.',
      },
      {
        q: 'Ik heb het Krell-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan bovengemiddeld; de winst zit in het temmen van de deuren en de klep.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nee. Wij werken met compacte subwoofers die in de reservewielbak of onder een stoel verdwijnen.',
      },
    ],
  },

  // ---------------------------------------------------------- OPEL ASTRA
  {
    slug: 'opel-astra',
    brand: 'Opel',
    model: 'Astra',
    generaties: 'Astra H, J, K en L, ook Sports Tourer',
    matchers: { merk: 'OPEL', model: /ASTRA/ },
    title: 'Opel Astra audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Opel Astra of Sports Tourer. Premium speakers, deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Astra is decennialang een van de gewoonste auto\'s op de Nederlandse weg geweest. Zo gewoon is het geluid ook gebleven, terwijl er onder die deurpanelen ruimte genoeg zit.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem blijft altijd beheerst, ook als je dat niet wilt.',
      'De deuren zijn holle bakken met open gaten, waardoor de achterkant van de speaker de voorkant tegenwerkt.',
      'Bij de Sports Tourer slikt de grote laadruimte lage tonen weg en resoneert de klep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Een Astra is dankbaar omdat de deur meer ruimte biedt dan de fabrieksspeaker gebruikt. Wij dempen het buitenblik, sluiten de gaten in het binnenblik af en maken er een fatsoenlijke behuizing van. Daarna heeft een betere speakerset pas echt zin. Rijd je Sports Tourer, dan pakken we ook de laadruimte aan.',
    },
    carplay: {
      possible: true,
      text: 'Op de Astra K en L met IntelliLink zit CarPlay meestal al af fabriek. Bij de oudere generaties hangt het van het schermtype af.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Mijn Astra is wat ouder. Is het dat nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Wij controleren wel eerst het plaatwerk voordat we iets plakken, want op blik met beginnende roest hoort geen demping.',
      },
      {
        q: 'Ik heb de Sports Tourer. Kost dat extra?',
        a: 'Als je de laadruimte mee wilt dempen wel. Daar zit bij een stationwagen wel de meeste winst.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Astra-opdrachten één werkdag.',
      },
    ],
  },

  // --------------------------------------------------------- PEUGEOT 207
  {
    slug: 'peugeot-207',
    brand: 'Peugeot',
    model: '207',
    generaties: '206 en 207',
    matchers: { merk: 'PEUGEOT', model: /\b20[67]\b/ },
    title: 'Peugeot 207 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Peugeot 206 of 207. Speakers vervangen, deuren dempen en minder rolgeluid, met all-in prijs.',
    intro:
      'De 206 en 207 zijn met honderdduizenden verkocht en veel ervan rijden nog. Bij een auto van deze leeftijd zit de eerste winst niet in meer vermogen maar in herstel.',
    problems: [
      'De schuimranden rond de originele speakerconussen zijn na jaren vergaan: dunne bas terwijl er niets kapot lijkt.',
      'De deuren zijn niet gedempt en het blik is licht, dus wat er aan bas is komt vooral als geklapper terug.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg alles overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 206 of 207 vervangen we de vergane speakers en dempen we de deuren. Omdat deze auto\'s inmiddels op leeftijd zijn, controleren we eerst het plaatwerk — op blik met beginnende roest hoort geen demping. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten.',
    },
    carplay: {
      possible: false,
      text: 'Een 206 of 207 heeft geen scherm waar CarPlay in past, dus dat pakket is voor deze auto niet van toepassing. Draadloos streamen en handsfree bellen kan wel met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn geluid is dun geworden, maar er is niets stuk. Hoe kan dat?',
        a: 'Dat is bijna altijd de schuimrand rond de speakerconus. Die vergaat langzaam waardoor de speaker zijn bas verliest zonder op te houden met werken.',
      },
      {
        q: 'Is demping verstandig bij een auto van deze leeftijd?',
        a: 'Mits je eerst kijkt. Wij controleren het plaatwerk voordat we plakken en melden het als we iets tegenkomen.',
      },
      {
        q: 'Wat kost dit ongeveer?',
        a: 'De Akoestische Basis ligt op € 995 all-in. Voor alleen speakers vervangen maken we een prijs op maat.',
      },
    ],
  },

  // ----------------------------------------------------------- VOLVO V40
  {
    slug: 'volvo-v40',
    brand: 'Volvo',
    model: 'V40',
    generaties: 'V40 tweede generatie en Cross Country',
    matchers: { merk: 'VOLVO', model: /V40/ },
    title: 'Volvo V40 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer diepgang in je Volvo V40. Premium speakers, deurdemping, DSP-afstemming en draadloos CarPlay.',
    intro:
      'De V40 is de compacte Volvo met het karakteristieke zwevende middenpaneel. Volvo adverteert zelf met goede audio; wie zonder die optie rijdt hoort precies waarom.',
    problems: [
      'Breed opgezet maar onderbemeten: veel speakers, weinig vermogen per speaker.',
      'De deuren zijn niet gedempt, waardoor de bas grotendeels in het paneel verdwijnt.',
      'De aflopende daklijn geeft minder ruimte achterin waar lage tonen zich kunnen opbouwen.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een V40 dempen we de deuren en plaatsen we de subwoofer bij voorkeur vooraan, omdat de ruimte achterin beperkt is. Een DSP-versterker brengt de speakers op niveau en corrigeert de afstemming, met tijdcorrectie zodat het geluidsbeeld voor je komt te staan in plaats van in je linkerdeur.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste V40-uitvoeringen met Sensus-scherm is CarPlay toe te voegen. Wat er kan verschilt per bouwjaar.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Ik heb Harman Kardon. Heeft een upgrade dan nog zin?',
        a: 'Ja, gerichter. Je hebt betere componenten, maar nog steeds ongedempte deuren en een afstemming die voor elke V40 gelijk is.',
      },
      {
        q: 'Waar komt de subwoofer?',
        a: 'Bij deze auto liefst onder de stoel, omdat de ruimte achterin door de aflopende daklijn minder meewerkt.',
      },
      {
        q: 'Blijft mijn scherm werken?',
        a: 'Ja. Alles wat wij doen zit achter het dashboard en in de deuren.',
      },
    ],
  },

  // ----------------------------------------------------------- FIAT PUNTO
  {
    slug: 'fiat-punto',
    brand: 'Fiat',
    model: 'Punto',
    generaties: 'Punto, Grande Punto en Punto Evo',
    matchers: { merk: 'FIAT', model: /PUNTO/ },
    title: 'Fiat Punto audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Fiat Punto. Speakers vervangen, deuren dempen en minder rolgeluid, met all-in prijs.',
    intro:
      'De Punto is jarenlang een van de meest verkochte kleine auto\'s van Europa geweest. De exemplaren die nu rijden zijn op leeftijd, en dat hoor je aan het geluid.',
    problems: [
      'De originele speakerconussen zijn na jaren verhard of vergaan: dunne, rammelende bas zonder dat er iets kapot is.',
      'De deuren zijn niet gedempt en het blik is licht, dus bas komt vooral als geklapper terug.',
      'Weinig isolatie, waardoor rolgeluid op de snelweg de muziek overstemt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Punto vervangen we de vergane speakers en dempen we de deuren, na controle van het plaatwerk. Dat laatste is bij deze leeftijd geen overbodige stap. Daarna komt er een componentenset in met een losse tweeter, zodat het geluidsbeeld vóór je komt te zitten. Voor een bescheiden bedrag klinkt de auto compleet anders.',
    },
    carplay: {
      possible: false,
      text: 'De meeste Punto\'s hebben geen scherm waar CarPlay in past. Draadloos streamen en handsfree bellen kan wel met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn bas is verdwenen maar de speakers werken nog. Hoe kan dat?',
        a: 'De conus of de schuimrand is verhard of gescheurd. De speaker maakt nog geluid maar verliest zijn lage tonen. Zeer gebruikelijk bij auto\'s van deze leeftijd.',
      },
      {
        q: 'Is mijn Punto het nog waard?',
        a: 'Dat bepaal jij. Blijf je er nog jaren in rijden, dan is het goed besteed. Wij zeggen eerlijk wanneer wij vinden dat de investering niet in verhouding staat.',
      },
      {
        q: 'Blijft mijn fabrieksgarantie geldig?',
        a: 'Ja, voor zover die er nog is. Wij werken met Plug & Play-kabelbomen en knippen geen originele bedrading door.',
      },
    ],
  },

  // -------------------------------------------------------------- KIA RIO
  {
    slug: 'kia-rio',
    brand: 'Kia',
    model: 'Rio',
    generaties: 'Rio derde en vierde generatie',
    matchers: { merk: 'KIA', model: /\bRIO\b/ },
    title: 'Kia Rio audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Kia Rio. Premium speakers, akoestische deurdemping en DSP-afstemming met behoud van je scherm.',
    intro:
      'De Rio is de praktische keuze in de compacte klasse: veel uitrusting voor een scherpe prijs. Op audio is daarbij zichtbaar bezuinigd.',
    problems: [
      'Weinig vermogen op de deurspeakers: het systeem knijpt dicht zodra je verder opendraait.',
      'De deuren zijn niet gedempt, dus een deel van de bas verdwijnt in het paneel.',
      'Op veel uitvoeringen ontbreekt een aparte tweeter, waardoor het beeld laag hangt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een Rio dempen we de deuren en zetten we er een componentenset in met een losse tweeter in het bovenste deel van de deur, zodat het geluidsbeeld vóór je komt te zitten. In deze compacte cabine haal je met bescheiden vermogen al een groot resultaat. Je scherm en bediening blijven ongemoeid.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste Rio-uitvoeringen vanaf 2017 zit CarPlay al af fabriek. Zit het er niet in, dan bekijken we per auto wat er mogelijk is.',
    },
    packages: ['carplay-upgrade', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Heb ik CarPlay eigenlijk al?',
        a: 'Goede kans van wel. Kia levert het op veel uitvoeringen standaard mee. Stuur een foto van je dashboard, dan zeggen we het je binnen 24 uur.',
      },
      {
        q: 'Wat levert het meest op?',
        a: 'De Akoestische Basis: premium speakers voorin plus deurdemping, € 995 all-in.',
      },
      {
        q: 'Hoe lang duurt de inbouw?',
        a: 'Voor de meeste Rio-opdrachten één werkdag.',
      },
    ],
  },
];

/**
 * Zet een merknaam om naar de slug van de merkpagina:
 * 'Mercedes-Benz' -> 'mercedes-benz', 'Land Rover' -> 'land-rover'.
 * Zo hoeft het merk niet twee keer in de data te staan.
 */
export const merkSlug = (brand) =>
  String(brand || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Alle modellen van één merk, in de volgorde waarin ze hierboven staan. */
export const modellenVanMerk = (slug) =>
  MODELS.filter((m) => merkSlug(m.brand) === slug);

export const modelPerSlug = Object.fromEntries(MODELS.map((m) => [m.slug, m]));

export default MODELS;
