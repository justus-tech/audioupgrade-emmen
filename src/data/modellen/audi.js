/**
 * Audi — 12 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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
        a: 'Nee. Alles wat wij doen zit achter het dashboard en in de deuren. Het scherm, de menu\'s, de navigatie en de stuurbediening blijven volledig origineel. Dat is precies waarom dit een OEM+ aanpak heet.',
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
      'In een A8 is stilte het uitgangspunt. Akoestisch glas, dikke afdichtingen en veel isolatie. Juist in die stilte hoor je precies waar het systeem tekortschiet.',
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
      'De Q3 is de Audi waarin veel gezinnen rondrijden. Groot genoeg om ruim te zitten, klein genoeg om mee te parkeren, en precies groot genoeg om het fabriekssysteem tekort te laten schieten.',
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
];
