/**
 * Porsche — 6 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [
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
];
