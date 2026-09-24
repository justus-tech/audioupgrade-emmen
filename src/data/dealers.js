/**
 * DE PAGINA VOOR AUTOBEDRIJVEN.
 *
 * Een ander soort bezoeker dan de rest van de site. Hier komt geen klant die
 * zijn eigen auto beter wil laten klinken, maar een verkoper die zich afvraagt
 * of hij hier geld aan verdient en of het hem gedoe oplevert. Dat zijn de twee
 * vragen die deze pagina beantwoordt, in die volgorde.
 *
 * ==========================================================================
 * WAT HIER MET OPZET NIET STAAT
 * ==========================================================================
 * Namen van autobedrijven, logo's, of "wij werken samen met". Er is nog geen
 * enkele dealer. Dit is een aanbod, geen overzicht van partners, en het moet
 * ook zo lezen — anders staat er binnen een week iets op de site wat niet
 * waar is.
 *
 * Ook geen inkoopprijzen en geen marges. Die spreekt Justus per bedrijf af
 * en die horen niet op een openbare pagina waar zijn particuliere klanten
 * bij kunnen.
 *
 * Het idee komt uit een appje van zijn broer: de klant kiest bij de dealer
 * tussen de standaarduitvoering, het pakket van de fabriek en een upgrade van
 * Audio Upgrade Emmen — ingebouwd in de week dat de auto toch nog bij de
 * dealer staat te wachten op poetsen en papieren.
 */
export const DEALERS = {
  slug: 'voor-autobedrijven',

  /**
   * STAAT DE PAGINA IN BEELD VOOR PARTICULIEREN?
   *
   * Justus richt zich nu op particulieren en pas later op autobedrijven
   * (besloten 24 september 2026). Daarom staat dit op false:
   *
   *   - de link in de voettekst en onder "Nog geen auto?" is weg, zodat een
   *     particuliere bezoeker hem niet tegenkomt;
   *   - de pagina zelf blijft gewoon bestaan en blijft in Google en in de
   *     sitemap staan. Justus kan het adres dus zelf naar een dealer sturen,
   *     en de pagina bouwt intussen alvast vindbaarheid op.
   *
   * Is het tijd voor de bedrijven? Zet dit op true en alle links zijn terug.
   */
  zichtbaar: false,

  titel: 'Audio-inbouw voor autobedrijven in Drenthe | Audio Upgrade Emmen',
  beschrijving:
    'Bied je klant een derde optie naast de standaarduitvoering en het fabriekspakket. Wij bouwen in vóór de aflevering, jij levert een auto af die een ander niet heeft.',

  eyebrow: 'Voor autobedrijven in Drenthe en omstreken',
  kop: 'Een derde optie bij elke auto die je verkoopt',
  intro:
    'Je klant kiest nu tussen de standaarduitvoering en het audiopakket van de fabriek. Daar kan een derde optie bij. Wij bouwen de upgrade in tussen jouw verkoop en de aflevering — in dezelfde week dat de auto bij jou staat te wachten op poetsen, papieren en sleutels. De klant hoort het verschil op de eerste rit en heeft er geen dag zijn auto voor hoeven missen.',

  /* Wat het de dealer oplevert. Eerst het geld, want dat is de eerste vraag. */
  waarom: {
    kop: 'Wat het je oplevert',
    punten: [
      {
        kop: 'Marge op een optie die je nu niet hebt',
        tekst:
          'Je koopt in tegen handelsprijs en bepaalt zelf wat je de klant rekent. Bestellen doen we pas als de auto verkocht is en de klant heeft getekend, dus je legt er geen euro voorraad voor neer.',
      },
      {
        kop: 'Een auto die een ander niet heeft staan',
        tekst:
          'Twee dezelfde occasions, één met een systeem erin dat je kunt laten horen. Dat is een verschil dat je niet hoeft uit te leggen — je zet de klant erin en draait zijn eigen muziek.',
      },
      {
        kop: 'Geen gedoe achteraf',
        tekst:
          'Levenslange garantie op ons inbouwwerk, zolang de auto van je klant blijft. Komt er ooit iets terug, dan pakken wij het op. Jij blijft gewoon de verkoper; wij komen nergens tussen.',
      },
    ],
  },

  /* Hoe het praktisch loopt. Een dealer wil weten hoeveel dagen het kost en
     wie wat doet, niet hoe een DSP werkt. */
  hoe: {
    kop: 'Hoe het loopt',
    stappen: [
      {
        kop: 'De klant kiest bij jou',
        tekst:
          'Op je offerte komt een derde regel. Wij leveren de omschrijvingen, de prijzen en een blad dat je op tafel kunt leggen.',
      },
      {
        kop: 'Jij appt ons zodra hij getekend heeft',
        tekst:
          'Merk, model en bouwjaar zijn genoeg. Dezelfde dag hoor je wat er in dat model past, wat het kost en wanneer het kan.',
      },
      {
        kop: 'Wij bouwen in',
        tekst:
          'De auto komt naar de Charles Darwinstraat in Emmen, of wij halen hem op binnen vijftien kilometer. Een halve dag voor het instappakket, twee tot drie dagen voor het grootste.',
      },
      {
        kop: 'De auto staat op tijd terug',
        tekst:
          'Schoon, met de originele onderdelen erbij in een doos. De factuur gaat naar jou, op rekening — je klant hoeft bij ons niets af te rekenen.',
      },
    ],
  },

  /* De bezwaren. Dit is waar een dealer op afhaakt als je het niet noemt. */
  zorgen: {
    kop: 'De drie dingen die je je afvraagt',
    punten: [
      {
        kop: 'Gaat de fabrieksgarantie eraan?',
        tekst:
          'Nee. Wij werken uitsluitend met Plug & Play-kabelbomen op de bestaande stekkers. Er wordt niets doorgeknipt en niets aan de originele bedrading veranderd. De originele onderdelen gaan mee terug, dus alles is volledig terug te bouwen naar fabrieksstaat.',
      },
      {
        kop: 'Wie is aansprakelijk als er iets misgaat?',
        tekst:
          'Wij, voor ons eigen werk. Dat staat zo in onze algemene voorwaarden en daar kun je ons aan houden. Wat wij monteren en aansluiten heeft levenslange garantie; op de apparatuur zelf geldt de garantie van de fabrikant.',
      },
      {
        kop: 'Hoeveel werk is het voor mij?',
        tekst:
          'Eén appje met merk, model en bouwjaar, en de auto een paar dagen eerder vrijmaken dan je gewend bent. De rest doen wij, inclusief het uitleggen aan de klant als hij daar behoefte aan heeft.',
      },
    ],
  },

  /* De vervolgstap, maar pas nadat de eerste auto's goed gegaan zijn. Zo
     staat het er ook: als een idee voor later en niet als eis vooraf. */
  voorraad: {
    kop: 'En als het bevalt: zet er een in de showroom',
    tekst:
      'Zijn de eerste klanten tevreden, dan is de logische volgende stap een auto uit je eigen voorraad met een upgrade erin. Eentje die je kunt laten horen verkoopt de volgende drie, en je hebt meteen een auto die sneller wegloopt dan dezelfde zonder. Maar dat is voor later — begin gewoon met de eerste klant die erom vraagt.',
  },

  faq: [
    {
      q: 'Wat kost het mij als autobedrijf?',
      a: 'Je koopt in tegen handelsprijs, exclusief btw, en bepaalt zelf wat je de klant rekent. De prijslijst krijg je bij het eerste gesprek — die staat niet op de site, want daar kijken je klanten ook.',
    },
    {
      q: 'Hoe lang staat de auto bij jullie?',
      a: 'Van een halve dag voor het instappakket tot twee à drie dagen voor de grootste. Draadloze CarPlay is in ongeveer twee uur klaar. We plannen het zo dat de auto terug is vóór je afleverdatum, en die datum spreken we van tevoren af.',
    },
    {
      q: 'Werken jullie met elk merk?',
      a: 'Met vrijwel elk model. Wat er precies past verschilt per auto — bij het ene model zit de versterker achter het dashboard en bij het andere onder de stoel. App het merk, model en bouwjaar en je hoort dezelfde dag wat erin kan.',
    },
    {
      q: 'En als de klant later klaagt over het geluid?',
      a: 'Dan stuur je hem naar ons door. Wij stemmen na zonder dat daar kosten aan vastzitten en houden jou op de hoogte. Je hoeft er zelf niets mee.',
    },
  ],

  cta: {
    kop: 'Even kennismaken?',
    tekst:
      'Bel of app Justus. Dan lopen we langs de auto\'s die bij je staan en hoor je wat er in dat soort modellen mogelijk is — zonder dat je ergens aan vastzit.',
    knop: 'App Justus',
    /* Het bericht dat al in WhatsApp staat als een dealer op de knop tikt. */
    /* Zonder aanhef: whatsappLink() zet er zelf "Hoi Justus," voor. Stond
       die hier ook, dan begon het bericht met een dubbele begroeting. */
    bericht: 'ik heb een autobedrijf en las de pagina voor autobedrijven op je site. Kunnen we even bellen?',
  },
};

/**
 * Het blok voor de klant die nog geen auto heeft.
 *
 * Dit is waar het appje van zijn broer letterlijk om vroeg: iemand die nog
 * aan het zoeken is naar een auto en er goed geluid in wil. Die kan het vooraf
 * regelen in plaats van er later nog een keer voor terug te komen.
 *
 * De laatste zin is het belangrijkst. "Vraag je dealer naar ons" werkt alleen
 * als die dealer ons kent, en dat doet er nog geen een. Vraag je in plaats
 * daarvan om de naam van het bedrijf, dan levert dezelfde vraag aan de klant
 * een adres op waar Justus naartoe kan bellen.
 */
export const NOG_GEEN_AUTO = {
  eyebrow: 'Nog aan het zoeken',
  kop: 'Nog geen auto, wel al goed geluid in gedachten?',
  tekst:
    'Regel het voordat je de sleutels krijgt. Vraag bij je autobedrijf naar Audio Upgrade Emmen: wij bouwen de upgrade in terwijl de auto daar toch nog staat te wachten op poetsen en papieren. Dan rijd je weg met geluid dat er af fabriek niet in zat, en heb je er geen dag je auto voor hoeven missen.',
  slot: 'Kent je verkoper ons nog niet? Stuur ons de naam van het bedrijf, dan bellen wij.',
  knop: 'Stuur ons je dealer',
  /* Ook hier geen aanhef — die komt uit whatsappLink(). */
  bericht: 'ik ben een auto aan het uitzoeken en wil er goed geluid in. Mijn dealer is:',
  link: 'Ben je zelf autobedrijf? Zo werkt het',
};

export default { DEALERS, NOG_GEEN_AUTO };
