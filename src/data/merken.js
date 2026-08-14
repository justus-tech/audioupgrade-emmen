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

import { MODELS, merkSlug } from './models.js';

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
    // Niet "Range Rover audio upgrade": die titel heeft de modelpagina al, en
    // twee pagina's met dezelfde titel laten Google denken dat het dezelfde
    // pagina is. Ze concurreren dan met elkaar in plaats van samen te werken.
    titel: 'Land Rover audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Audio upgrade voor je Land Rover: Range Rover, Sport, Velar, Evoque of Discovery. Meer diepgang, betere afstemming en akoestische demping.',
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
    slug: 'saab',
    naam: 'Saab',
    kort: 'Saab',
    titel: 'Saab audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Saab 9-3, 9-5 of 900. Speakers vervangen, deuren dempen en het originele dashboard intact laten.',
    fabriekssystemen: 'Saab standaard audio, optioneel Saab Prestige of Harman Kardon',
    intro:
      'Saab bouwde auto\'s voor mensen die zelf nadenken, en Saab-rijders zijn dat gebleven. Het zijn inmiddels wel auto\'s van twintig jaar en ouder — en dat is precies waar de winst zit.',
    probleem:
      'Bij een Saab is het grootste probleem meestal niet het ontwerp maar de leeftijd. De schuimrand rond de originele speakerconussen vergaat na twintig jaar; dat hoor je als een dunne, rammelende bas terwijl er niets kapot lijkt. Daar komt bij dat de radio in veel Saabs samenwerkt met het informatiescherm in het dashboard, dus zomaar een andere radio inbouwen kost je functies die je liever houdt.',
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

  // ============================================================
  // DE VOLUMEMERKEN — hier rijdt Drenthe in rond.
  //
  // Bij deze merken is het verhaal anders dan bij de premiummerken
  // hierboven. Daar zet je je af tegen een duur fabriekssysteem; hier
  // is er meestal helemaal geen fabriekssysteem om je tegen af te
  // zetten, en gaat het om papieren speakers in een holle deur.
  // ============================================================
  {
    slug: 'toyota',
    naam: 'Toyota',
    kort: 'Toyota',
    titel: 'Toyota audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Toyota. Premium speakers, deurdemping, DSP-tuning en draadloos CarPlay voor Aygo, Yaris, Corolla, C-HR en RAV4.',
    fabriekssystemen: 'Toyota Touch 2 / Smart Connect, optioneel JBL',
    intro:
      'Toyota bouwt auto\'s die het eeuwig volhouden. De audio is daar de uitzondering op: dat is het onderdeel waar het budget als eerste vanaf ging.',
    probleem:
      'De speakers zijn licht en van papier, en zitten in deuren die af fabriek nauwelijks zijn afgedicht. Bij de hybrides komt daar iets bij wat je bij andere merken niet hebt: op elektrische snelheid is de auto zó stil dat je precies hoort wat het systeem niet kan. Het optionele JBL-systeem klinkt luider, maar zit in dezelfde ongedempte deur.',
  },
  {
    slug: 'ford',
    naam: 'Ford',
    kort: 'Ford',
    titel: 'Ford audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit de audio van je Ford halen. Speakers, deurdemping en DSP-tuning voor Fiesta, Focus, Puma, Kuga en Transit — met behoud van SYNC.',
    fabriekssystemen: 'SYNC 3 of SYNC 4, optioneel Bang & Olufsen (eerder Sony)',
    intro:
      'Ford heeft met SYNC een van de prettigste schermsystemen van allemaal. Wat eronder hangt is een ander verhaal.',
    probleem:
      'De basisinstallatie draait op het eindtrapje in de radio, en dat loopt bij een beetje volume tegen zijn grens aan — je hoort het geluid dan eerder harder dan beter worden. De deuren van de Fiesta en Focus zijn bovendien grote holle klankkasten met open gaten, waar de achterkant van de speaker de bas grotendeels opheft. Het Bang & Olufsen-systeem is een echte verbetering, maar verandert niets aan die deur.',
  },
  {
    slug: 'opel',
    naam: 'Opel',
    kort: 'Opel',
    titel: 'Opel audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Opel. Premium speakers, akoestische deurdemping en draadloos CarPlay voor Corsa, Astra, Mokka en Grandland.',
    fabriekssystemen: 'Multimedia / Multimedia Navi, optioneel Bose (Insignia)',
    intro:
      'Opel levert al jaren keurige auto\'s waar je verder weinig aan hoeft te doen. De audio is het onderdeel waar dat niet voor geldt.',
    probleem:
      'Sinds Opel op de platformen van Stellantis bouwt, deelt hij zijn audio-opzet met Peugeot en Citroën: weinig vermogen, geen aparte versterker en speakers die vooral goedkoop moesten zijn. Bij de kleinere modellen zitten de voorspeakers laag in de deur, waardoor het geluid bij je knieën blijft hangen in plaats van voor je op het dashboard te staan.',
  },
  {
    slug: 'peugeot',
    naam: 'Peugeot',
    kort: 'Peugeot',
    titel: 'Peugeot audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Haal meer uit de audio van je Peugeot. Speakers, deurdemping en DSP-afstemming voor 108, 208, 2008, 308, 3008 en 5008.',
    fabriekssystemen: 'i-Connect / i-Cockpit, optioneel FOCAL Premium Hi-Fi',
    intro:
      'Peugeot doet met het i-Cockpit iets eigenzinnigs, en met FOCAL heeft het merk een van de betere fabrieksopties in dit segment. Alleen zit die er bijna nooit in.',
    probleem:
      'Zonder de FOCAL-optie rijd je met lichte papieren speakers en een radio die zijn eigen vermogen levert. De hoge tonen komen bij de meeste modellen uit een speakertje laag in het portier, waardoor het geluidsbeeld onder het dashboard blijft zitten. Het scherm zelf is modern; wat eruit komt hoort daar niet bij.',
  },
  {
    slug: 'renault',
    naam: 'Renault',
    kort: 'Renault',
    titel: 'Renault audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Renault. Premium speakers, akoestische deurdemping en draadloos CarPlay voor Twingo, Clio, Captur en Mégane.',
    fabriekssystemen: 'EASY LINK / openR link, optioneel Bose Sound System',
    intro:
      'Renault is een van de weinige merken die in de kleinste modellen een echt premiumsysteem aanbiedt. Bij de meeste auto\'s die wij binnenkrijgen zit dat er niet in.',
    probleem:
      'De standaardinstallatie is een radio met vier speakers en verder niets: geen versterker, geen subwoofer, geen afstemming op het interieur. De deuren zijn licht gebouwd — goed voor het gewicht, slecht voor de bas, want het paneel gaat meetrillen zodra er iets van niveau uit de speaker komt. Het Bose-systeem lost dat deels op met meer vermogen, maar de deur blijft dezelfde.',
  },
  {
    slug: 'citroen',
    naam: 'Citroën',
    kort: 'Citroën',
    titel: 'Citroën audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit de audio van je Citroën halen. Speakers, deurdemping en DSP-tuning voor C1, C3, C4 en C5 Aircross — met behoud van je scherm.',
    fabriekssystemen: 'Citroën Connect Nav met Arkamys-geluidsbewerking',
    intro:
      'Citroën richt zich op comfort, en dat is precies het uitgangspunt waar goed geluid bij hoort. Het systeem dat erin zit maakt die belofte alleen niet waar.',
    probleem:
      'Citroën gebruikt Arkamys-geluidsbewerking om met eenvoudige speakers toch een breed geluidsbeeld te maken. Dat werkt verrassend aardig op zacht volume, maar het is een softwaretruc: de speakers zelf zijn licht en de deuren zijn niet gedempt. Draai je open, dan valt de truc uit elkaar en hoor je wat er werkelijk hangt.',
  },
  {
    slug: 'skoda',
    naam: 'Škoda',
    kort: 'Škoda',
    titel: 'Škoda audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Škoda. Premium speakers, akoestische deurdemping en DSP-tuning voor Fabia, Octavia, Superb, Karoq en Kodiaq.',
    fabriekssystemen: 'Swing / Bolero / Amundsen / Columbus, optioneel Canton',
    intro:
      'Škoda geeft je de techniek van Volkswagen voor minder geld. Bij de audio zie je waar dat verschil vandaan komt.',
    probleem:
      'Dezelfde MQB-deuren als bij Volkswagen: grote holle bakken met open gaten, waar de achterkant van de speaker de bas van de voorkant grotendeels opheft. Het vermogen komt uit de radio zelf. Het optionele Canton-systeem voegt een versterker en een subwoofer toe en is een duidelijke stap, maar zit in dezelfde ongedempte deur — en zit in de meeste tweedehands Octavia\'s niet.',
  },
  {
    slug: 'seat',
    naam: 'Seat',
    kort: 'Seat',
    titel: 'Seat audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Haal meer uit de audio van je Seat. Speakers, deurdemping en DSP-afstemming voor Ibiza, Leon en Arona — met behoud van fabrieksgarantie.',
    fabriekssystemen: 'Media System Plus, optioneel BeatsAudio',
    intro:
      'Seat verkoopt zichzelf als het sportieve merk binnen de VW-groep, en met BeatsAudio als optie kiest het bewust voor een jonger publiek.',
    probleem:
      'BeatsAudio klinkt indrukwekkend in de showroom omdat het laag flink is opgetild, maar dat is een afstemming en geen fundament: de bas is dik in plaats van diep, en op hoger volume wordt het rommelig. Zonder die optie heb je de kale MQB-opzet — vier lichte speakers in een ongedempte deur, gevoed door de radio.',
  },
  {
    slug: 'kia',
    naam: 'Kia',
    kort: 'Kia',
    titel: 'Kia audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Kia. Premium speakers, akoestische demping en DSP-tuning voor Picanto, Rio, Ceed, Sportage en Niro.',
    fabriekssystemen: 'Kia Connect, optioneel Harman Kardon of Meridian (EV6)',
    intro:
      'Kia is in tien jaar van goedkoop naar goed gegaan. De audio-opzet is dat pad nog niet helemaal gevolgd.',
    probleem:
      'De basisinstallatie heeft genoeg speakers maar te weinig vermogen per speaker: veel gaatjes in het paneel, weinig geluid dat eruit komt. Bij de elektrische modellen wordt dat extra hoorbaar, omdat er geen motorgeluid meer is dat de tekortkomingen maskeert. Het Harman Kardon-systeem laat horen wat er in deze carrosserieën zit, maar zit alleen in de duurdere uitvoeringen.',
  },
  {
    slug: 'hyundai',
    naam: 'Hyundai',
    kort: 'Hyundai',
    titel: 'Hyundai audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit de audio van je Hyundai halen. Speakers, deurdemping en DSP-tuning voor i10, i20, i30, Tucson en Kona.',
    fabriekssystemen: 'Bluelink-scherm, optioneel Bose of KRELL (oudere modellen)',
    intro:
      'Hyundai levert veel auto voor je geld en heeft de laatste jaren enorme stappen gezet in afwerking. De audio is het onderdeel dat is achtergebleven.',
    probleem:
      'Bij de kleinere modellen zit er letterlijk niets tussen de radio en de speakers: geen versterker, geen afstemming. De deurpanelen zijn dun en gaan al bij matig volume meeklapperen, wat je als "slechte bas" hoort terwijl het eigenlijk het paneel is dat je hoort. Bij de elektrische modellen valt dat extra op, omdat de cabine zelf muisstil is.',
  },
  {
    slug: 'mazda',
    naam: 'Mazda',
    kort: 'Mazda',
    titel: 'Mazda audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Mazda. Premium speakers, akoestische deurdemping en DSP-afstemming voor Mazda 2, 3, 6, CX-5 en MX-5.',
    fabriekssystemen: 'Mazda Connect, optioneel Bose Premium',
    intro:
      'Mazda bouwt interieurs waar duurdere merken jaloers op mogen zijn, en denkt echt na over waar dingen zitten. Ook over de speakers — maar niet ver genoeg.',
    probleem:
      'Mazda plaatst de woofers bewust laag bij de deurscharnieren en de tweeters in de spiegeldriehoek. Dat is akoestisch precies goed gedacht. Alleen zijn de speakers zelf licht uitgevoerd en is er geen versterking, waardoor het slimme ontwerp niet tot zijn recht komt. Dit is een van de merken waar een speakerset alleen al een groter verschil maakt dan gemiddeld — het huiswerk van de plaatsing is namelijk al gedaan.',
  },
  {
    slug: 'nissan',
    naam: 'Nissan',
    kort: 'Nissan',
    titel: 'Nissan audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Haal meer uit de audio van je Nissan. Speakers, deurdemping en DSP-tuning voor Micra, Juke, Qashqai en X-Trail.',
    fabriekssystemen: 'NissanConnect, optioneel Bose Personal Plus',
    intro:
      'Nissan maakte met de Qashqai de cross-over populair in Nederland. Wat er in de deuren zit is in al die jaren nauwelijks veranderd.',
    probleem:
      'De standaardspeakers zijn licht en zitten in een deur die niet is afgedicht, waardoor de bas letterlijk wegloopt in het portier. De hogere zitpositie werkt daarbij tegen je: je oren zitten verder van de speakers vandaan, waardoor het geluid dunner overkomt dan in een lage auto. Het Bose-systeem in de Juke en Qashqai voegt vermogen toe maar laat de deur ongemoeid.',
  },
  {
    slug: 'suzuki',
    naam: 'Suzuki',
    kort: 'Suzuki',
    titel: 'Suzuki audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Suzuki. Premium speakers, akoestische demping en draadloos CarPlay voor Swift, Vitara, S-Cross en Ignis.',
    fabriekssystemen: 'SLDA-scherm, geen premium fabrieksoptie',
    intro:
      'Suzuki maakt lichte, eerlijke auto\'s zonder franje. Bij de audio betekent "zonder franje" helaas ook zonder fundament.',
    probleem:
      'Er is geen premiumoptie: wat erin zit, is wat je krijgt. Vier lichte speakers, gevoed door de radio, in een carrosserie die bewust licht is gebouwd. Dat laatste is het echte punt — een lichte auto laat meer rolgeluid door, en dat rolgeluid zit precies in het gebied waar je stem en muziek ook zitten. Bij Suzuki doet demping daarom vaak meer dan een nieuwe speaker.',
  },
  {
    slug: 'fiat',
    naam: 'Fiat',
    kort: 'Fiat',
    titel: 'Fiat audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit de audio van je Fiat halen. Speakers, deurdemping en draadloos CarPlay voor 500, Panda en Tipo.',
    fabriekssystemen: 'Uconnect, optioneel BeatsAudio (500)',
    intro:
      'Een Fiat 500 koop je om hoe hij eruitziet en hoe hij rijdt. Het geluid staat op geen enkel verlanglijstje — tot je er dagelijks in zit.',
    probleem:
      'De cabine is klein, en dat is akoestisch juist gunstig: je hebt weinig vermogen nodig om hem te vullen. Alleen staat daar een kleine, harde ruimte tegenover waarin alles terugkaatst, met speakers die te licht zijn om daar iets tegenover te zetten. Het resultaat is scherp en vermoeiend op de lange rit. Dit is een van de auto\'s waar goede afstemming meer doet dan meer vermogen.',
  },
  {
    slug: 'mitsubishi',
    naam: 'Mitsubishi',
    kort: 'Mitsubishi',
    titel: 'Mitsubishi audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Mitsubishi. Premium speakers, akoestische deurdemping en DSP-tuning voor Space Star, ASX en Outlander.',
    fabriekssystemen: 'SDA-scherm, optioneel Rockford Fosgate (Outlander)',
    intro:
      'Mitsubishi heeft met de Outlander PHEV jarenlang de Nederlandse zakelijke markt bediend. Die auto\'s rijden nu tweedehands rond, en het geluid is er niet beter op geworden.',
    probleem:
      'De plug-in hybrides schakelen voortdurend tussen elektrisch en benzine, en juist in die stille elektrische momenten hoor je hoe weinig het systeem eigenlijk kan. Daar komt bij dat de accu onder de vloer zit, waardoor de fabriek de demping onder de bodem heeft weggelaten om gewicht te sparen — precies waar het rolgeluid binnenkomt.',
  },
  {
    slug: 'dacia',
    naam: 'Dacia',
    kort: 'Dacia',
    titel: 'Dacia audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Dacia. Premium speakers, akoestische demping en draadloos CarPlay voor Sandero en Duster.',
    fabriekssystemen: 'Media Display / Media Nav, geen premium fabrieksoptie',
    intro:
      'Dacia is eerlijk over wat je krijgt: een auto zonder overbodige dingen, voor een prijs die klopt. De audio hoort bij de dingen die eraf zijn gelaten.',
    probleem:
      'Er is geen premiumoptie en er zijn af fabriek vaak maar twee speakers voorin. Het echte punt zit elders: om de prijs te halen is er nauwelijks isolatiemateriaal gebruikt, waardoor het op de snelweg zó luid is in de cabine dat je de radio harder zet om de weg te overstemmen. Bij een Dacia beginnen wij daarom bijna altijd bij demping en niet bij speakers — het rendement per euro is daar het hoogst.',
  },
  {
    slug: 'honda',
    naam: 'Honda',
    kort: 'Honda',
    titel: 'Honda audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Haal meer uit de audio van je Honda. Speakers, akoestische deurdemping en DSP-afstemming voor Jazz, Civic, HR-V en CR-V.',
    fabriekssystemen: 'Honda Connect, premium alleen op de hoogste uitvoeringen',
    intro:
      'Honda bouwt techniek die het langer volhoudt dan de auto eromheen. De speakers vormen daarop de uitzondering.',
    probleem:
      'De speakers zijn licht en werken zonder aparte versterker. Bij de Jazz komt daar de vorm van de auto bij: veel glas en een rechtopstaande voorruit, waardoor het geluid hard terugkaatst en de hoge tonen scherp worden. Bij de hybrides valt het systeem extra door de mand, omdat de auto op elektrische snelheid vrijwel geen eigen geluid maakt.',
  },
  {
    slug: 'mini',
    naam: 'Mini',
    kort: 'Mini',
    titel: 'Mini audio upgrade — alle modellen | Audio Upgrade Emmen',
    beschrijving:
      'Beter geluid in je Mini. Premium speakers, akoestische deurdemping en DSP-tuning met behoud van je originele scherm.',
    fabriekssystemen: 'MINI Connected, optioneel Harman Kardon',
    intro:
      'Een Mini is klein vanbinnen en hard afgeveerd. Dat maakt hem leuk om te rijden en lastig om goed te laten klinken.',
    probleem:
      'De cabine is kort, dus je zit dicht op de speakers en hoort elk gebrek. De strakke ophanging brengt daarbij veel wegcontact de auto in — dat hoor je als een constante ondergrond die precies over je muziek heen valt. Het optionele Harman Kardon-systeem geeft vermogen, maar tegen dat rolgeluid helpt alleen demping. Bij een Mini is de volgorde daarom omgekeerd: eerst stil maken, dan pas beter maken.',
  },
  {
    slug: 'lynk-co',
    naam: 'Lynk & Co',
    kort: 'Lynk & Co',
    titel: 'Lynk & Co audio upgrade | Audio Upgrade Emmen',
    beschrijving:
      'Meer uit de audio van je Lynk & Co 01 halen. Speakers, akoestische deurdemping en DSP-afstemming, met behoud van fabrieksgarantie.',
    fabriekssystemen: 'Harman Kardon af fabriek, op elke uitvoering',
    intro:
      'Lynk & Co doet iets wat bijna geen enkel merk doet: het premiumsysteem zit er standaard in, op elke auto. Dat is een prettig vertrekpunt — en meteen de reden dat de vraag hier anders ligt.',
    probleem:
      'Het Harman Kardon-systeem in de 01 heeft genoeg vermogen en een fatsoenlijke opzet. Wat het niet heeft, is een deur die daar tegen bestand is: bij hogere niveaus tikt en klappert het paneel mee, wat je hoort als een bas die wel hard is maar niet strak. Bij deze auto beginnen wij daarom bij demping en afstemming, niet bij vervanging. Vaak zit het verschil niet in nieuwe speakers maar in wat eromheen zit.',
  },
];

export const merkenPerSlug = Object.fromEntries(MERKEN.map((m) => [m.slug, m]));

/**
 * De merken die ook echt modelpagina's hebben.
 *
 * Alleen hiervoor maken we een merkpagina. Bentley en Ferrari staan hierboven
 * wel beschreven, maar er zijn nog geen modellen voor geschreven — dan krijg
 * je een merkpagina met een kop en een leeg lijstje eronder, en dat oogt als
 * een half afgemaakte site. Zodra er een model bijkomt, verschijnt de
 * merkpagina vanzelf.
 */
export const MERKEN_MET_MODELLEN = MERKEN.filter((m) =>
  MODELS.some((model) => merkSlug(model.brand) === m.slug)
);

export default MERKEN;
