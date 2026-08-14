/**
 * BMW — 15 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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
      'De 5-serie is de auto waarin veel mensen hun werkweek doorbrengen. Op die kilometers gaat het niet om hoe hard het kan, maar om hoe lang je het volhoudt. Daar wringt de fabrieksinstallatie.',
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
      'In een 7-serie is stilte het uitgangspunt. Dubbel glas, dikke afdichtingen en veel isolatie. Juist in die stilte hoor je precies waar het systeem tekortschiet.',
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
];
