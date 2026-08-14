/**
 * Volvo — 8 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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

  // ---------------------------------------------------------- VOLVO XC90
  {
    slug: 'volvo-xc90',
    brand: 'Volvo',
    model: 'XC90',
    generaties: 'XC90 eerste en tweede generatie',
    matchers: { merk: 'VOLVO', model: /XC90/ },
    title: 'Volvo XC90 audio upgrade | Audio Upgrade Emmen',
    description:
      'Audio upgrade voor je Volvo XC90. Echt vermogen voor het grote cabinevolume, afstemming per zitrij en grondige demping.',
    intro:
      'De XC90 is de grootste Volvo: zeven zitplaatsen en een cabine ter grootte van een kleine kamer. Precies dat formaat is waar de meeste audiosystemen op stuklopen.',
    problems: [
      'Het cabinevolume is enorm. Lage tonen vragen hier meer vermogen dan in welke andere Volvo dan ook.',
      'Passagiers op de derde rij zitten meters van de voorste speakers en horen een compleet andere auto.',
      'De grote klep en de uitgestrekte zijpanelen resoneren over een fors oppervlak mee.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een XC90 is dit geen speakerklus maar een systeemklus. Er is echt vermogen nodig, en er moet nagedacht worden over wie er waar zit. Wij werken met meerdere afstemmingen in de DSP: één die de bestuurdersstoel scherp neerzet en één die de hele auto bedient. De klep en de zijpanelen dempen we grondig.',
    },
    carplay: {
      possible: true,
      text: 'Op de meeste XC90-uitvoeringen is CarPlay al aanwezig of toe te voegen aan het originele Sensus-scherm.',
    },
    packages: ['oem-plus-executive', 'reference-edition', 'carplay-upgrade'],
    faq: [
      {
        q: 'Kan het ook goed klinken op de derde rij?',
        a: 'Beter dan nu, maar wees realistisch: wie meters achter de voorste speakers zit hoort nooit hetzelfde als de bestuurder. Met een aparte afstemming komen we een heel eind.',
      },
      {
        q: 'Ik heb Bowers & Wilkins. Is dit dan zinvol?',
        a: 'Alleen gericht. Bij dat systeem zit de winst in demping en in een afstemming per zitrij. Componenten vervangen raden wij af.',
      },
      {
        q: 'Hoe lang staat zo\'n auto bij jullie?',
        a: 'Vaak langer dan een dag. Bij volledige demping en een meerkanaals opbouw plannen we meerdere dagen, en dat zeggen we vooraf.',
      },
    ],
  },

  // ----------------------------------------------------------- VOLVO V50
  {
    slug: 'volvo-v50',
    brand: 'Volvo',
    model: 'V50',
    generaties: 'V50 en S40',
    matchers: { merk: 'VOLVO', model: /V50|\bS40\b/ },
    title: 'Volvo V50 audio upgrade | Audio Upgrade Emmen',
    description:
      'Beter geluid in je Volvo V50. Vergane speakers vervangen, deuren en laadruimte dempen en een afstemming op jouw stoel.',
    intro:
      'De V50 met zijn zwevende middenconsole is een klassieker aan het worden. Bij een auto van deze leeftijd zit de eerste winst niet in meer vermogen maar in herstel.',
    problems: [
      'De schuimranden rond de originele speakerconussen zijn vergaan: dunne bas terwijl er niets kapot lijkt.',
      'De open laadruimte van de stationwagen slikt lage tonen weg en resoneert tegelijk mee.',
      'De basisinstallatie had al weinig vermogen, en dat merk je nu extra.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een V50 vervangen we de vergane speakers en dempen we de deuren en de laadruimte, na controle van het plaatwerk. Bij een auto van deze leeftijd is dat laatste geen overbodige stap. Daarna kan er een compacte DSP-versterker achter die het signaal van de originele radio oppikt, zodat je bediening ongewijzigd blijft.',
    },
    carplay: {
      possible: false,
      text: 'De V50 heeft geen scherm waar CarPlay in past, dus dat pakket is voor deze auto niet van toepassing. Draadloos streamen en handsfree bellen kan wel met een discrete oplossing achter het dashboard.',
    },
    packages: ['akoestische-basis', 'akoestische-isolatie', 'oem-plus-executive'],
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
        q: 'Kan ik mijn originele radio houden?',
        a: 'Ja, en bij deze auto is dat ook het advies. De bediening en het display blijven dan precies zoals je gewend bent.',
      },
    ],
  },

  // ----------------------------------------------------------- VOLVO EX30
  {
    slug: 'volvo-ex30',
    brand: 'Volvo',
    model: 'EX30',
    generaties: 'EX30 vanaf 2024',
    matchers: { merk: 'VOLVO', model: /EX30/ },
    title: 'Volvo EX30 audio upgrade | Audio Upgrade Emmen',
    description:
      'Meer body in je Volvo EX30. Demping tegen rolgeluid en een afstemming die past bij een auto zonder motorgeluid.',
    intro:
      'De EX30 is de compacte elektrische Volvo die in korte tijd overal opdook. Hij is opvallend stil, en dat maakt hem zowel dankbaar als kritisch voor geluid.',
    problems: [
      'Zonder motorgeluid wordt het rolgeluid van de banden het luidste geluid in de auto.',
      'Het interieur is strak en minimalistisch afgewerkt met veel harde oppervlakken die hoge tonen terugkaatsen.',
      'De achterklep resoneert hoorbaar mee zodra er echte bas bij komt.',
    ],
    solution: {
      title: 'Wat wij eraan doen',
      text: 'Bij een EX30 levert demping dubbel op: de auto wordt stiller én muzikaler, en zonder motorgeluid hoor je dat direct. Wij dempen de deuren en de klep en temmen met de DSP-afstemming de scherpte van het minimalistische interieur. Aan de strakke binnenkant verandert niets zichtbaars.',
    },
    carplay: {
      possible: true,
      text: 'De EX30 werkt met een ingebouwd Google-systeem op één centraal scherm. Wat er met CarPlay mogelijk is verschilt per softwareversie; stuur een foto van je scherm, dan zeggen we het je binnen 24 uur.',
    },
    packages: ['akoestische-isolatie', 'akoestische-basis', 'oem-plus-executive'],
    faq: [
      {
        q: 'Merk ik in een elektrische auto meer verschil?',
        a: 'Ja. Zonder motorgeluid hoor je het rolgeluid en elke resonantie veel duidelijker, dus demping levert extra veel op — ook als je de muziek uit laat.',
      },
      {
        q: 'Ik heb het Harman Kardon-systeem in de soundbar. Wat dan?',
        a: 'Dat is een ongebruikelijke opzet met de speakers in een balk onder de voorruit. Wij gaan daar zorgvuldig mee om en richten ons dan vooral op demping en afstemming. Meld het vooraf, dan bespreken we wat realistisch is.',
      },
      {
        q: 'Blijft het scherm en de bediening werken?',
        a: 'Ja. Alles wat wij doen zit achter panelen en in de deuren.',
      },
    ],
  },
];
