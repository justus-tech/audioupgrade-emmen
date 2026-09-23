/**
 * DE WERKINSTRUCTIE — standaardblokken per soort werk.
 *
 * WAAROM DIT BESTAAT
 * Elke inbouw volgt dezelfde volgorde. Wat er misgaat, gaat mis omdat er een
 * stap wordt overgeslagen die je al honderd keer hebt gedaan: de foto vooraf,
 * de speakermaat nameten, de deurfolie terugplakken. Deze blokken zetten die
 * volgorde vast, zodat de werkbon altijd compleet is.
 *
 * WAT HIER WEL EN NIET IN STAAT — LEES DIT
 * Hier staat de WERKWIJZE: wat je doet en in welke volgorde. Hier staat NIET
 * wat er specifiek voor één auto geldt: welke speakermaat erin gaat, welke
 * stekker achter de radio zit, welke interface past, welke draad waar loopt.
 *
 * Dat is met opzet, en het is de belangrijkste afspraak van deze hele app.
 * Die gegevens verschillen per model én per uitvoering, ze staan niet in de
 * open gegevens van de RDW, en ze zijn niet te raden. Een gokje op een
 * stekker of een draadkleur is precies de fout die een fabrieksgarantie kost.
 *
 * Daarom komen die gegevens uit het autodossier (autos.js): wat Justus bij
 * die auto zélf heeft nagemeten en vastgelegd. Staat er niets, dan zegt de
 * werkbon dat met zoveel woorden in plaats van iets te verzinnen.
 *
 * DEZE BLOKKEN ZIJN EEN BEGIN, GEEN WET
 * Justus is de vakman. Hij kan ze in de app aanpassen aan zijn eigen manier
 * van werken; wat hij aanpast blijft op zijn telefoon staan.
 */

/**
 * Elk blok hoort bij een of meer soorten werk (zie SOORTEN in rekenen.js).
 * '*' betekent: altijd, ongeacht wat er op de offerte staat.
 *
 *   tekst   wat je doet
 *   let     een waarschuwing die dikgedrukt onder de stap komt
 *   meet    verwijst naar een veld uit het autodossier; staat dat leeg, dan
 *           zet de werkbon er een opvallende lege regel neer om in te vullen
 *   invul   een meting die bij DEZE auto hoort en niet bij het model: een
 *           accuspanning geldt voor deze accu op deze dag. Zo'n stap krijgt
 *           altijd een lege regel op de werkbon, met dit woord ervoor. Nooit
 *           uit het dossier, want dan zou de vorige Golf je waarde bepalen.
 */
export const WERKBLOKKEN = [
  {
    id: 'voorbereiding',
    naam: 'Voorbereiding',
    soorten: ['*'],
    stappen: [
      { tekst: 'Kenteken en kilometerstand noteren op deze bon.' },
      {
        tekst: 'Foto\'s maken van de uitgangssituatie: dashboard, deurpanelen, bagageruimte.',
        let: 'Doe dit altijd. Bij twijfel achteraf over een kras of een bestaand defect is dit je bewijs.',
      },
      { tekst: 'Stoelhoes, stuurhoes en mattenbescherming aanbrengen.' },
      { tekst: 'Radiozender, geluidsinstellingen en eventuele codes noteren voordat je stroom afhaalt.' },
      {
        tekst: 'Accu afkoppelen als het werk aan de bedrading zit.',
        let: 'Controleer eerst of de auto een codebeveiliging of startonderbreker heeft die daarna opnieuw aangeleerd moet worden.',
      },
    ],
  },
  {
    /**
     * ACCU METEN — VOORAF.
     *
     * De site belooft dit bij de Executive, de Reference en bij Accu & Voeding:
     * "Accu en laadspanning gemeten, met de waarden op je werkbon." Deze stap
     * zorgt dat die belofte ook echt wordt waargemaakt, en levert meteen de
     * getallen voor het meetrapport dat de klant meekrijgt.
     *
     * Het meten is er niet om een accu te verkopen. Blijkt de accu gewoon
     * goed, dan zet je dat er zo in.
     */
    id: 'accu-voor',
    naam: 'Accu meten (vooraf)',
    soorten: ['versterker', 'subwoofer', 'dsp'],
    stappen: [
      {
        tekst: 'Rustspanning meten met het contact af.',
        invul: 'Rustspanning voor:',
        let: 'Doe dit voordat je de accu afkoppelt. Daarna is de waarde weg en kun je achteraf niet meer laten zien wat je hebt aangetroffen.',
      },
      {
        tekst: 'Laadspanning meten met de motor draaiend.',
        invul: 'Laadspanning voor:',
      },
      {
        tekst: 'Type accu en de datum op de accu overnemen.',
        invul: 'Type en datum:',
        let: 'Een AGM-accu wil een andere laadspanning dan een natte accu. Staat er geen datum op, noteer dan de kilometerstand.',
      },
      {
        tekst: 'Massaverbinding nakijken: vast, schoon en zonder aanslag.',
      },
    ],
  },
  {
    id: 'deur-open',
    naam: 'Deurpaneel eruit',
    soorten: ['speakers-voor', 'speakers-achter', 'demping'],
    stappen: [
      { tekst: 'Schroeven zoeken achter de afdekdopjes, in de handgreep en onder de armsteun.' },
      {
        tekst: 'Paneel losklikken met een kunststof demontagewig, van onder naar boven.',
        let: 'Nooit met een schroevendraaier: dat drukt een deuk in het paneel die je niet meer weg krijgt.',
      },
      { tekst: 'Stekkers van raamschakelaar, spiegelbediening en deurlicht losnemen.' },
      { tekst: 'Bowdenkabel van de deurgreep loshaken en het paneel apart, op een doek, wegleggen.' },
      {
        tekst: 'Dampfolie voorzichtig losmaken, in één stuk houden.',
        let: 'Die folie houdt het water tegen. Scheur je hem, dan vervang je hem — anders krijgt de klant later een natte deur.',
      },
    ],
  },
  {
    id: 'meten',
    naam: 'Nameten en vastleggen',
    soorten: ['speakers-voor', 'speakers-achter'],
    stappen: [
      {
        tekst: 'Speakermaat en boutgatpatroon nameten voordat je de nieuwe speaker erbij pakt.',
        meet: 'speakerVoor',
        let: 'Ook als het model bekend is: uitvoeringen verschillen. Meten is twee minuten, een verkeerde ring is een dag.',
      },
      { tekst: 'Inbouwdiepte controleren: past de magneet vrij achter het paneel en het raam?' },
      { tekst: 'Fabrieksstekker bekijken en vastleggen welke adapterkabel erop past.', meet: 'stekker' },
      {
        tekst: 'Wat je nameet in het autodossier zetten, zodat de volgende van dit model meteen klopt.',
        let: 'Dit is het verschil tussen elke keer opnieuw uitzoeken en één keer goed.',
      },
    ],
  },
  {
    id: 'demping',
    naam: 'Deurdemping aanbrengen',
    soorten: ['demping'],
    stappen: [
      { tekst: 'Buitenplaat ontvetten met reiniger; de mat hecht niet op stof of vet.' },
      { tekst: 'Eerste laag butyl op de buitenplaat, door de openingen heen, goed aandrukken met de roller.' },
      {
        tekst: 'Openingen in de binnenplaat dichtmaken zodat de deur een gesloten kast wordt.',
        let: 'Waterafvoer aan de onderkant openhouden. Dicht je die, dan blijft het water in de deur staan.',
      },
      { tekst: 'Tweede laag rond de speakeropening aanbrengen tegen resonantie.' },
      { tekst: 'Deur dichtdoen en met de vlakke hand aftikken: het moet dof klinken, niet blikkerig.' },
    ],
  },
  {
    id: 'speakers',
    naam: 'Speakers monteren',
    soorten: ['speakers-voor', 'speakers-achter'],
    stappen: [
      { tekst: 'Montagering passen en vastzetten; ring moet vlak liggen zonder spanning.' },
      { tekst: 'Adapterkabel aansluiten, geen knip in de fabrieksbedrading.', let: 'De fabrieksgarantie blijft alleen heel als de originele bedrading heel blijft.' },
      { tekst: 'Speaker monteren en de fasering controleren: plus op plus, min op min.' },
      { tekst: 'Tweeter op de vastgelegde plek zetten en de kabel netjes wegwerken.' },
      { tekst: 'Kort testen vóór het paneel terug gaat: beide kanten geluid, geen gerammel.' },
    ],
  },
  {
    id: 'carplay',
    naam: 'CarPlay-interface inbouwen',
    soorten: ['carplay'],
    stappen: [
      { tekst: 'Vastleggen welk fabrieksscherm en welke interface het is.', meet: 'radio' },
      { tekst: 'Sierlijst en scherm demonteren met kunststof gereedschap.' },
      { tekst: 'Interface tussen het scherm en de fabrieksstekker plaatsen.', meet: 'interface', let: 'Plug & play: er wordt niets doorgeknipt.' },
      { tekst: 'Interface op een trillingsvrije plek bevestigen, niet los achter het dashboard laten liggen.' },
      { tekst: 'Firmware controleren en instellen op het juiste schermtype en de juiste bediening.' },
      { tekst: 'Testen: draadloos koppelen met iPhone én Android, stuurwielbediening, microfoon, achteruitrijcamera.' },
    ],
  },
  {
    id: 'versterker',
    naam: 'Versterker plaatsen',
    soorten: ['versterker', 'subwoofer'],
    stappen: [
      { tekst: 'Montageplek bepalen: droog, geventileerd, bereikbaar voor onderhoud.' },
      { tekst: 'Stroomkabel vanaf de accu leggen via de vastgelegde doorvoer.', meet: 'stroom' },
      {
        tekst: 'Zekering binnen 30 cm van de accupool plaatsen.',
        let: 'Niet onderhandelbaar. Zonder die zekering is de kabel bij kortsluiting een lont.',
      },
      { tekst: 'Massa op kaal, geschuurd plaatstaal; kabel zo kort mogelijk houden.' },
      { tekst: 'Signaalkabels langs de andere kant van de auto leggen dan de stroomkabel.', let: 'Naast elkaar leggen geeft brom die je er achteraf niet meer uit krijgt.' },
      { tekst: 'Versterking instellen met de gevoeligheidsregeling, niet op het gehoor opendraaien.' },
    ],
  },
  {
    /**
     * DE VOORMETING — DE STAP DIE JE NIET KUNT INHALEN.
     *
     * Een meetrapport laat zien wat er veranderd is. Dat kan alleen als je
     * weet hoe het was. Sla je de voormeting over, dan staat de auto straks
     * goed en is er niets meer om mee te vergelijken; je kunt hem niet alsnog
     * maken door de instellingen even terug te zetten.
     *
     * Daarom staat dit blok apart voor 'DSP afstemmen' en niet erin: het moet
     * op de werkbon een eigen genummerde stap zijn die je afvinkt.
     */
    id: 'voormeting',
    naam: 'Voormeting',
    soorten: ['dsp'],
    stappen: [
      {
        tekst: 'Staat er al een DSP in, exporteer dan eerst de bestaande instelling.',
        let: 'Dat is je weg terug als de klant de oude afstemming toch fijner vond.',
      },
      {
        tekst: 'Meetkop op de meetpositie zetten: oorhoogte bestuurder, deuren dicht, motor uit.',
        invul: 'Meetpositie:',
        let: 'Leg vast waar de kop stond. Staat hij bij de nameting ergens anders, dan vergelijk je twee verschillende auto\'s met elkaar.',
      },
      {
        tekst: 'Voormeting draaien en opslaan voordat je ook maar een instelling aanraakt.',
        let: 'Zonder voormeting is er geen meetrapport. Headroom weigert het rapport te maken als deze meting ontbreekt.',
      },
      {
        tekst: 'Schermafbeelding van de frequentierespons opslaan als kenteken-voor.',
      },
    ],
  },
  {
    id: 'dsp',
    naam: 'DSP afstemmen',
    soorten: ['dsp'],
    stappen: [
      { tekst: 'Looptijdcorrectie instellen per speaker.' },
      { tekst: 'Scheidingsfilters en helling zetten passend bij de gemonteerde speakers.' },
      { tekst: 'Meten, corrigeren, opnieuw meten.' },
      { tekst: 'Instelling opslaan én exporteren; het bestand bij de klantgegevens bewaren.', let: 'Komt de klant over een jaar terug, dan begin je niet opnieuw.' },
    ],
  },
  {
    /**
     * DE NAMETING EN HET RAPPORT DAT DE KLANT MEEKRIJGT.
     *
     * WAT ER BEWUST NIET IN HET RAPPORT KOMT: de instellingen per kanaal —
     * vertraging, niveau, fase, filters. Dat is het werk waar de klant voor
     * betaald heeft. Zet je het op papier dat de auto uit gaat, dan geef je
     * je afstemming weg aan de volgende inbouwer. Die waarden horen in de app
     * bij de auto, niet in het rapport.
     */
    id: 'nameting',
    naam: 'Nameting en meetrapport',
    soorten: ['dsp'],
    stappen: [
      {
        tekst: 'Nameting draaien met de meetkop op precies dezelfde plek als bij de voormeting.',
      },
      {
        tekst: 'Schermafbeelding van de frequentierespons opslaan als kenteken-na.',
      },
      {
        tekst: 'Looptijd en fase voor en na opslaan als je die hebt. Mag, hoeft niet.',
      },
      {
        tekst: 'Meetrapport invullen onder Meting in Headroom: de twee schermafbeeldingen erin en in gewone taal wat er veranderd is.',
        let: 'Geen instellingen per kanaal in het rapport. Die zet je in de app bij de auto.',
      },
      {
        tekst: 'Rapport op wit A4 printen en in de AUE-map aan de klant meegeven.',
      },
    ],
  },
  {
    id: 'accu-na',
    naam: 'Accu meten (na afloop)',
    soorten: ['versterker', 'subwoofer', 'dsp'],
    stappen: [
      {
        tekst: 'Rustspanning opnieuw meten, contact af, minstens tien minuten nadat de motor uit is.',
        invul: 'Rustspanning na:',
      },
      {
        tekst: 'Spanning meten met het systeem aan op luistervolume.',
        invul: 'Onder belasting:',
        let: 'Dit is het getal waar het om draait. Zakt de spanning hier in, dan hoor je dat als slappe bas en zie je het als dimmende lichten.',
      },
      {
        tekst: 'Laadspanning meten met de motor draaiend.',
        invul: 'Laadspanning na:',
      },
      {
        tekst: 'De waarden overnemen in het meetrapport onder Meting in Headroom.',
        let: 'Is de accu gewoon goed, dan zet je dat er ook zo in. We verkopen niets wat er niet in hoeft.',
      },
    ],
  },
  {
    id: 'afronden',
    naam: 'Afronden en controleren',
    soorten: ['*'],
    stappen: [
      { tekst: 'Alle panelen terug, alle clips vast, dampfolie waterdicht terug.' },
      { tekst: 'Accu aansluiten, klok en radiozenders terugzetten, foutgeheugen uitlezen en wissen.' },
      { tekst: 'Rammeltest: alle deuren dicht, volume op, luisteren naar bijgeluiden.' },
      { tekst: 'Proefrit van een paar minuten met muziek aan.' },
      { tekst: 'Auto schoon opleveren: hoezen eruit, vingerafdrukken van het scherm.' },
      { tekst: 'Foto\'s maken van het eindresultaat.', let: 'Eigen werkfoto\'s zijn het beste materiaal voor de site en voor Google.' },
      { tekst: 'Klant laten zien wat er veranderd is en hoe het bediend wordt.' },
    ],
  },
];

/**
 * Welke blokken horen bij dit werk?
 *
 * `soortenInHetWerk` is de verzameling soorten die op de offerte staan. De
 * blokken komen terug in de volgorde waarin ze hierboven staan, en dat is de
 * volgorde van de inbouw — niet die van de offerte.
 */
export function blokkenVoor(soortenInHetWerk = []) {
  const aanwezig = new Set(soortenInHetWerk.filter(Boolean));
  return WERKBLOKKEN.filter(
    (blok) => blok.soorten.includes('*') || blok.soorten.some((s) => aanwezig.has(s))
  );
}

/**
 * De blokken omgezet naar één doorlopende, genummerde lijst stappen.
 *
 * `dossier` is wat er over deze auto is vastgelegd. Een stap met een `meet`
 * die daar ingevuld staat, krijgt die waarde erbij. Staat hij leeg, dan komt
 * er een regel om ter plekke in te vullen — nooit een verzonnen waarde.
 */
export function stappenlijst(soortenInHetWerk, dossier = {}, eigenBlokken = []) {
  const blokken = [...blokkenVoor(soortenInHetWerk), ...eigenBlokken];
  let nummer = 0;
  return blokken.map((blok) => ({
    naam: blok.naam,
    stappen: blok.stappen.map((stap) => {
      nummer += 1;
      const vastgelegd = stap.meet ? String(dossier[stap.meet] || '').trim() : '';
      return {
        nummer,
        tekst: stap.tekst,
        let: stap.let || '',
        veld: stap.meet || '',
        waarde: vastgelegd,
        /* Een stap die om een gegeven vraagt dat nog niet vastligt, krijgt op
           de werkbon een invulregel. Zo groeit het dossier vanzelf. Een stap
           met `invul` krijgt hem altijd: die meting hoort bij deze auto op
           deze dag en kan nooit uit het dossier komen. */
        invullen: (!!stap.meet && !vastgelegd) || !!stap.invul,
        invulLabel: stap.invul || 'Meet na en noteer:',
      };
    }),
  }));
}
