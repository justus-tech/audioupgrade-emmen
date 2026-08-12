/**
 * DE AUTOMERKEN — elk merk krijgt een eigen overzichtspagina op /merk/[slug].
 *
 * Die merkpagina is de verzamelplek: hij legt uit wat er bij dít merk af
 * fabriek misgaat en linkt door naar de losse modelpagina's. De modelpagina's
 * zijn wat er in Google rankt; de merkpagina helpt bezoekers kiezen.
 *
 * `fabriekssystemen` is per merk anders en is de kern van het verhaal: elk
 * merk verkoopt zijn eigen "premium" audio-optie, en daar zetten wij ons
 * tegen af.
 *
 * Let op: wij tonen GEEN officiële automerklogo's. Die zijn merkrechtelijk
 * beschermd en fabrikanten treden daar actief tegen op. In plaats daarvan
 * zetten we de merknaam in onze eigen typografie neer.
 */

export const MERKEN = [
  {
    slug: 'volkswagen',
    naam: 'Volkswagen',
    kort: 'VW',
    titel: 'Volkswagen audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Volkswagen. Premium speakers, deurdemping, DSP-tuning en draadloos CarPlay voor Golf, Polo, Tiguan, Passat en meer.',
    fabriekssystemen: 'Composition, Discover Media/Pro, optioneel Dynaudio',
    intro:
      'Volkswagen bouwt degelijke auto\'s met bewust goedkope audio. De componenten zijn niet slecht, ze zijn zuinig gekozen — en dat hoor je zodra je het volume opendraait.',
    probleem:
      'Vrijwel elke Volkswagen rijdt weg zonder aparte versterker: het vermogen komt uit het kleine eindtrapje in de radio. Daar komt bij dat de deuren van het MQB-platform grote holle bakken zijn met open gaten, waardoor de achterkant van de speaker de bas grotendeels opheft. De optionele Dynaudio-upgrade klinkt voller, maar verandert niets aan die twee grondoorzaken.',
  },
  {
    slug: 'audi',
    naam: 'Audi',
    kort: 'Audi',
    titel: 'Audi audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Haal het maximum uit de audio van je Audi. DSP-afstemming, high-end speakers en draadloos CarPlay in het originele MMI-scherm.',
    fabriekssystemen: 'Audi Sound System, optioneel Bang & Olufsen',
    intro:
      'Een Audi voelt overal duur aan — tot je de muziek aanzet. Het basissysteem is bewust terughoudend afgestemd, omdat het echte geluid in de optielijst staat.',
    probleem:
      'Audi stemt de basis defensief af zodat er ruimte overblijft voor het optionele Bang & Olufsen-systeem. Zonder die optie mis je zowel het onderste octaaf als de openheid bovenin. Lastiger nog: op veel uitvoeringen loopt de audio digitaal via het MMI in plaats van over gewone speakerdraden, dus je kunt er niet zomaar een versterker tussen hangen zonder de juiste interface.',
  },
  {
    slug: 'bmw',
    naam: 'BMW',
    kort: 'BMW',
    titel: 'BMW audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit je BMW halen: DSP-afstemming, high-end speakers en draadloos CarPlay in het originele iDrive-scherm. Voor 1-serie tot X7.',
    fabriekssystemen: 'HiFi (S676A), optioneel Harman Kardon (S688A) of Bowers & Wilkins',
    intro:
      'BMW bouwt zijn auto\'s rond de bestuurder. De audio-installatie helaas niet: het basissysteem is duidelijk ontworpen om je richting de Harman Kardon-optie te duwen.',
    probleem:
      'Het instapsysteem heeft op papier een aardige opzet, met woofers onder de voorstoelen en een middenspeaker in het dashboard. In de praktijk krijgen die onderstoelwoofers veel te weinig vermogen: wel formaat, geen slagkracht. De middenspeaker versmalt het stereobeeld eerder dan dat hij het verbreedt, en de fabrieksafstemming verandert mee met het volume — waardoor het geheel op hogere niveaus onnatuurlijk klinkt.',
  },
  {
    slug: 'mercedes-benz',
    naam: 'Mercedes-Benz',
    kort: 'Mercedes',
    titel: 'Mercedes-Benz audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Warmer, voller en dieper geluid in je Mercedes. DSP-afstemming, premium speakers en draadloos CarPlay. Van A-klasse tot S-klasse.',
    fabriekssystemen: 'Audio 20 / MBUX basis, optioneel Burmester',
    intro:
      'Een Mercedes is stil, comfortabel en goed geïsoleerd. Dat is een uitstekend uitgangspunt voor geluid — en juist daarom is het zonde dat het standaardsysteem er zo weinig mee doet.',
    probleem:
      'De basisinstallatie is correct maar tam: weinig vermogen op de deurspeakers en geen echte subwoofer, waardoor het fundament onder de muziek ontbreekt. De goede isolatie werkt daarbij tegen je — er is weinig rolgeluid dat de tekortkomingen maskeert, dus je hoort ze des te duidelijker. Het optionele Burmester-systeem laat horen wat er wél in deze carrosserieën zit.',
  },
  {
    slug: 'porsche',
    naam: 'Porsche',
    kort: 'Porsche',
    titel: 'Porsche audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Audio upgrade voor je Porsche 911, Cayenne, Macan, Panamera, Boxster of Cayman. DSP-afstemming en high-end speakers, onzichtbaar ingebouwd.',
    fabriekssystemen: 'Sound Package Plus, optioneel BOSE of Burmester High-End',
    intro:
      'In een Porsche is het geluid van de auto zelf het hoofdgerecht. Precies daarom valt het op als de installatie daar niet tegenop kan: zodra de motor zwijgt, hoor je hoe mager de basis is.',
    probleem:
      'Het standaard Sound Package Plus is weinig meer dan een handvol speakers met minimale versterking. In een compacte, hard aangeklede sportwagencabine met veel glas en weinig demping levert dat een scherp en dun geluid op. Daar komt bij dat de ruimte voor inbouw beperkt is, wat plaatsing en keuze van componenten kritisch maakt — dit is geen auto voor standaardoplossingen.',
  },
  {
    slug: 'tesla',
    naam: 'Tesla',
    kort: 'Tesla',
    titel: 'Tesla audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Upgrade de audio van je Tesla Model 3, Model S, Model Y of Model X. Vooral bij uitvoeringen zonder premium audio is de winst groot.',
    fabriekssystemen: 'Standaard audio of Premium audio (met versterker en subwoofer)',
    intro:
      'Een Tesla is een bijzonder geval. Er is geen radio om te vervangen en geen dashboard om open te maken — alles loopt via het scherm. Juist daaronder zit bij de instapversies veel onbenutte winst.',
    probleem:
      'Tesla levert twee smaken. Uitvoeringen met premium audio hebben een uitgebreide speakerset met versterker en subwoofer en klinken van huis uit behoorlijk. De instapversies missen die versterker en subwoofer volledig, terwijl de bekabeling er vaak al wél ligt. In een cabine die verder heel stil is, valt dat dunne geluid extra op. Let op: Tesla staat geen CarPlay of Android Auto toe — dat is een keuze van Tesla waar geen inbouwspecialist omheen kan.',
  },
  {
    slug: 'land-rover',
    naam: 'Land Rover',
    kort: 'Range Rover',
    titel: 'Range Rover audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Audio upgrade voor je Range Rover, Sport, Velar, Evoque of Discovery. Meer diepgang, betere afstemming en akoestische demping.',
    fabriekssystemen: 'Basis Meridian, optioneel Meridian Surround of Signature',
    intro:
      'Een Range Rover verkoopt zichzelf op rust en ruimte. Die grote, stille cabine is precies wat goede audio nodig heeft — en precies wat het basissysteem niet benut.',
    probleem:
      'Het grote cabinevolume vraagt vermogen dat de basisinstallatie niet levert, waardoor lage tonen nooit op niveau komen. De hoge zitpositie zet je bovendien ver van de deurspeakers af, zodat het geluidsbeeld laag blijft hangen. De Meridian-opties helpen, maar blijven een afstemming die voor elke auto identiek is en de deuren ongedempt laat.',
  },
  {
    slug: 'bentley',
    naam: 'Bentley',
    kort: 'Bentley',
    titel: 'Bentley audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Audio upgrade voor je Bentley Continental GT of Bentayga. Compromisloze afstemming en high-end componenten, onzichtbaar ingebouwd.',
    fabriekssystemen: 'Bentley Signature Audio, optioneel Naim for Bentley',
    intro:
      'Bij een Bentley is de lat per definitie hoog. Wie hier iets aan verandert, doet dat niet omdat het slecht is, maar omdat het beter kan — en omdat de afstemming op maat gemaakt hoort te zijn.',
    probleem:
      'Bentley levert al goede componenten, ook zonder de Naim-optie. Wat ontbreekt is een afstemming op jouw stoel in plaats van een compromis dat op elke zitplaats tegelijk moet werken. Bij dit soort auto\'s werken wij dan ook zelden met vervanging van alles, maar met gerichte ingrepen: demping, DSP-controle en waar nodig een enkele component. Dat vraagt overleg vooraf, geen standaardpakket.',
  },
  {
    slug: 'ferrari',
    naam: 'Ferrari',
    kort: 'Ferrari',
    titel: 'Ferrari audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Audio upgrade voor je Ferrari 488, 812 Superfast, Portofino of GTC4Lusso. Zorgvuldig, terughoudend en volledig terug te bouwen.',
    fabriekssystemen: 'Basis audio, optioneel JBL Professional High Power',
    intro:
      'In een Ferrari is de motor het instrument. Audio speelt hier een bijrol — en dat is precies waarom de fabrieksinstallatie zo mager is uitgevoerd.',
    probleem:
      'Ferrari besteedt zijn gewichtsbudget niet aan speakers, en dat is te horen: weinig vermogen, geen fundament en veel reflectie in een cabine vol hard materiaal. Ingrijpen vraagt hier uiterste terughoudendheid. Wij werken bij dit soort auto\'s uitsluitend volledig omkeerbaar en in overleg — waarbij we ook eerlijk zeggen wanneer de winst het werk niet waard is.',
  },
  {
    slug: 'volvo',
    naam: 'Volvo',
    kort: 'Volvo',
    titel: 'Volvo audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Meer diepgang en focus in je Volvo. Premium speakers, DSP-afstemming, demping van de laadruimte en draadloos CarPlay.',
    fabriekssystemen: 'Sensus basis, optioneel Harman Kardon of Bowers & Wilkins',
    intro:
      'Volvo-rijders zijn vaak bewuste luisteraars — het merk adverteert zelf met Bowers & Wilkins. Wie zonder die optie rijdt, hoort direct dat de basisinstallatie een ander verhaal vertelt.',
    probleem:
      'De basis is breed opgezet maar onderbemeten: veel speakers, weinig vermogen per speaker, en geen echte subwoofer. Je hoort alles, maar niets heeft gewicht. Bij de stationwagens komt daar een grote open laadruimte bij die lage tonen wegslikt en tegelijk meeresoneert.',
  },
];

export const merkenPerSlug = Object.fromEntries(MERKEN.map((m) => [m.slug, m]));

export default MERKEN;
