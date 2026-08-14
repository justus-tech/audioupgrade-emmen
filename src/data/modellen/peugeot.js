/**
 * Peugeot — 8 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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

  // --------------------------------------------------------- PEUGEOT 307
  {
    slug: 'peugeot-307',
    brand: 'Peugeot',
    model: '307',
    generaties: '307 en 307 SW',
    matchers: { merk: 'PEUGEOT', model: /\b307\b/ },
    title: 'Peugeot 307 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Peugeot 307. Speakers vervangen, deuren dempen en minder rolgeluid.',
    intro:
      'De 307 was jarenlang een van de meest verkochte gezinsauto\'s van Nederland. De exemplaren die nu nog rijden zijn ruim op leeftijd, en dat hoor je aan het geluid.',
    problems: [
      'De schuimranden rond de originele speakerconussen zijn vergaan: dunne, rammelende bas terwijl er niets kapot lijkt.',
      'De deuren zijn niet gedempt, dus wat er aan bas is komt vooral als geklapper terug.',
      'Bij de SW slikt de grote laadruimte lage tonen weg en resoneert de klep mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 307 vervangen we de vergane speakers en dempen we de deuren, na controle van het plaatwerk — bij deze leeftijd geen overbodige stap. Rijd je SW, dan pakken we ook de laadruimte aan. Daarna komt er een componentenset in met een losse tweeter, zodat het geluid vóór je komt te zitten.',
    },
    carplay: {
      possible: false,
      text: 'Een 307 heeft geen scherm waar CarPlay in past, dus dat pakket is voor deze auto niet van toepassing. Draadloos streamen en handsfree bellen kan wel met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie'],
    faq: [
      {
        q: 'Mijn geluid is dun geworden, maar er is niets stuk. Hoe kan dat?',
        a: 'Dat is bijna altijd de schuimrand rond de speakerconus. Die vergaat langzaam waardoor de speaker zijn bas verliest zonder op te houden met werken.',
      },
      {
        q: 'Is demping verstandig bij een auto van deze leeftijd?',
        a: 'Mits je eerst kijkt. Wij controleren het plaatwerk voordat we plakken en melden het als we roest tegenkomen.',
      },
      {
        q: 'Is mijn 307 het nog waard?',
        a: 'Blijf je er nog jaren in rijden, dan zeker. Wij zeggen eerlijk wanneer wij vinden dat de investering niet in verhouding staat.',
      },
    ],
  },

  // -------------------------------------------------------- PEUGEOT 5008
  {
    slug: 'peugeot-5008',
    brand: 'Peugeot',
    model: '5008',
    generaties: '5008 eerste en tweede generatie',
    matchers: { merk: 'PEUGEOT', model: /\b5008\b/ },
    title: 'Peugeot 5008 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Peugeot 5008. Echt vermogen voor het grote cabinevolume, demping en afstemming voor alle zitrijen.',
    intro:
      'De 5008 is de grote gezinsauto van Peugeot, vaak met zeven zitplaatsen. Al die ruimte moet gevuld worden, en dat lukt de fabrieksinstallatie niet.',
    problems: [
      'Het cabinevolume is groot en lage tonen vragen daar veel meer vermogen dan de basisaansturing geeft.',
      'Met de derde zitrij in gebruik zitten passagiers ver van elke speaker.',
      'De grote achterklep en de uitgestrekte zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een 5008 telt vermogen echt. Wij zetten er een DSP-versterker in die het cabinevolume aankan en voegen een subwoofer toe die in de zijwand verdwijnt. De deuren en de klep dempen we grondig. Rijd je vaak met zeven mensen, dan leggen we een tweede afstemming vast die de hele auto bedient.',
    },
    carplay: {
      possible: true,
      text: 'De meeste 5008-uitvoeringen met touchscreen hebben CarPlay al af fabriek, met behoud van het i-Cockpit.',
    },
    packages: ['carplay-upgrade', 'oem-plus-executive', 'reference-edition'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie ver achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming komen we een heel eind.',
      },
      {
        q: 'Ik heb het Focal-systeem. Wat kunnen jullie toevoegen?',
        a: 'Demping en een eigen afstemming. De componenten zijn dan goed; de winst zit in het temmen van deuren en klep.',
      },
      {
        q: 'Verlies ik laadruimte?',
        a: 'Nauwelijks. Wij bouwen de subwoofer in de zijwand, afgewerkt in dezelfde stoffering.',
      },
    ],
  },
];
