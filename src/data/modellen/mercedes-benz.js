/**
 * Mercedes-Benz — 11 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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
      'Een C-klasse is stil, comfortabel en goed geïsoleerd. Dat is een uitstekend uitgangspunt voor geluid. Juist daarom is het zonde dat het standaardsysteem er zo weinig mee doet.',
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
      'De E-klasse is de auto waarin veel mensen hun kilometers maken. Op die afstanden gaat het niet om hoe hard het kan, maar om hoe lang je het volhoudt. Daar wringt de basisinstallatie.',
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
      'In een S-klasse is stilte het uitgangspunt. Dubbel glas, dikke afdichtingen en veel isolatie. Juist in die stilte hoor je precies waar het systeem tekortschiet.',
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
];
