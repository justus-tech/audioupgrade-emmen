/**
 * Tesla — 2 modellen.
 *
 * DE VOLGORDE IN DIT BESTAND TELT. De kenteken-check pakt de eerste
 * treffer, dus een specifiek model hoort bóven een algemener model te
 * staan: "Range Rover Sport" vóór "Range Rover".
 *
 * Gebruik geen \b direct achter een cijfer: tussen de 0 en de I van
 * "320I" ligt geen woordgrens. Gebruik daar (?!\d).
 */

export default [

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
];
