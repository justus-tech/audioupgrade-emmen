/**
 * ALLE TEKST DIE PER TAAL VERSCHILT.
 *
 * ==========================================================================
 * DIT IS GEEN WOORD-VOOR-WOORDVERTALING
 * ==========================================================================
 * Een Duitse bezoeker komt van over de grens — Lingen, Nordhorn, Meppen — en
 * heeft andere vragen dan een Nederlander uit Emmen:
 *
 *   - Mag ik daar wel heen? (ja, twintig minuten rijden, en er wordt Duits
 *     gesproken)
 *   - Blijft mijn Werksgarantie geldig? (ja, en dat is voor een Duitse
 *     autobezitter een zwaarder punt dan hier)
 *   - Wat kost het echt? (Duitse inbouwers werken vaker met uurtarieven; een
 *     all-in prijs vooraf is daar een groter verschil dan in Nederland)
 *
 * De kenteken-check staat NIET op de Duitse en Engelse pagina. Die werkt op de
 * open data van de RDW en kent alleen Nederlandse kentekens. Een veld dat voor
 * de helft van je bezoekers niet werkt is erger dan geen veld.
 *
 * ==========================================================================
 * PRIJZEN
 * ==========================================================================
 * De bedragen komen uit site.js — één bron voor alle talen. Wat hier staat is
 * alleen de omschrijving eromheen. Wijzigt er een prijs, dan wijzigt hij
 * overal mee.
 */

import { tijdenKort } from '../data/site.js';

export const TEKSTEN = {
  /* ---------------------------------------------------------------- NL --- */
  nl: {
    ui: {
      overslaan: 'Naar de inhoud',
      themaKnop: 'Wissel tussen licht en donker',
      menu: {
        home: 'Home',
        upgrades: 'Upgrades',
        auto: 'Jouw auto',
        werkwijze: 'Werkwijze',
        over: 'Over ons',
        contact: 'Contact',
      },
      voettekst: {
        /* 'Uitsluitend op afspraak' stond hier, en dat sprak de openingstijden
           ernaast tegen. Nu zeggen de twee samen het juiste: we zijn deze uren
           open, maar meld je even aan. */
        opAfspraak: 'Bezoek op afspraak',
        appDashboard: 'Stuur foto dashboard',
        upgrades: 'Upgrades',
        vragen: 'Veelgestelde vragen',
        over: 'Wie zijn wij',
        modellen: 'Upgrade per automodel',
        klassiekers: 'Klassiekers en youngtimers',
        autobedrijven: 'Voor autobedrijven',
        voorwaarden: 'Algemene voorwaarden',
        privacy: 'Privacybeleid',
        cookies: 'Cookiebeleid',
      },
      alg: {
        meerLezen: 'Lees meer',
        allePrijzen: 'Bekijk alle prijzen',
        naarContact: 'Contact en route',
        vragenLink: 'Of lees eerst de veelgestelde vragen',
        adres: 'Werkplaats en bezoekadres',
      },
    },
  },

  /* ---------------------------------------------------------------- DE --- */
  de: {
    ui: {
      overslaan: 'Zum Inhalt',
      themaKnop: 'Zwischen hell und dunkel wechseln',
      menu: {
        home: 'Start',
        upgrades: 'Preise',
        auto: 'Ihr Auto',
        werkwijze: 'Ablauf',
        over: 'Über uns',
        contact: 'Kontakt',
      },
      /* Losse woordjes die op meerdere pagina's terugkomen. */
      alg: {
        meerLezen: 'Mehr erfahren',
        allePrijzen: 'Alle Preise ansehen',
        naarContact: 'Kontakt und Anfahrt',
        vragenLink: 'Oder lesen Sie zuerst die häufigen Fragen',
        adres: 'Werkstatt und Besucheradresse',
      },
      voettekst: {
        opAfspraak: 'Besuch nach Vereinbarung',
        appDashboard: 'Foto per WhatsApp',
        upgrades: 'Preise',
        vragen: 'Häufige Fragen',
        over: 'Über uns',
        modellen: 'Nach Fahrzeugmodell',
        klassiekers: 'Oldtimer und Youngtimer',
        voorwaarden: 'Allgemeine Geschäftsbedingungen',
        privacy: 'Datenschutz',
        cookies: 'Cookies',
      },
    },

    meta: {
      titel: 'Car-Hifi und CarPlay nachrüsten in Emmen — 20 Minuten hinter der Grenze',
      omschrijving:
        'Kabelloses Apple CarPlay, Lautsprecher und Dämmung — unsichtbar hinter den Originalverkleidungen eingebaut. Festpreise inklusive Einbau. Werksgarantie bleibt bestehen. Emmen, Niederlande.',
    },

    hero: {
      eyebrow: 'Emmen, Niederlande · nur nach Vereinbarung',
      kop: 'Großer Klang.',
      kopAccent: 'Unsichtbar eingebaut.',
      lead:
        'Schluss mit blechernem Klang. Wir bauen hochwertiges Car-Hifi hinter Ihre Originalverkleidungen — ohne eine einzige Leitung zu durchtrennen, und ohne dass Ihre Werksgarantie darunter leidet.',
      knopWa: 'Foto vom Armaturenbrett senden',
      knopPrijzen: 'Preise ansehen',
      /* "Werksgarantie bleibt" stond hier eerst en dat is een halve zin — in
         het Nederlands kan "fabrieksgarantie blijft", in het Duits niet. */
      bewijs: 'Festpreise · Lebenslange Garantie auf unsere Arbeit · Werksgarantie bleibt erhalten',
    },

    grens: {
      eyebrow: 'Für Kunden aus Deutschland',
      kop: 'Zwanzig Minuten hinter der Grenze',
      alineas: [
        'Von Lingen, Nordhorn oder Meppen sind Sie in einer knappen halben Stunde bei uns. Viele deutsche Kunden kommen genau deshalb: Festpreise inklusive Einbau statt Stundensätze, und jemand, der Ihnen vorher ehrlich sagt, was in Ihrem Auto möglich ist.',
        'Sie können auf Deutsch schreiben. Wir antworten auf Deutsch — schriftlich über WhatsApp geht das am einfachsten und Sie haben alles schwarz auf weiß.',
        'Der Ehrlichkeit halber: Die Kennzeichenabfrage auf unseren niederländischen Seiten funktioniert nur mit niederländischen Kennzeichen. Schicken Sie stattdessen einfach ein Foto Ihres Armaturenbretts, dann sagen wir Ihnen innerhalb von 24 Stunden, was geht und was es kostet.',
      ],
    },

    pakketten: {
      eyebrow: 'Festpreise, inklusive Einbau und Mehrwertsteuer',
      kop: 'Vier Stufen im Klang',
      lead:
        'Sie bauen aufeinander auf: jedes Paket enthält, was links davon steht. Der Preis, den Sie hier sehen, ist der Preis, den Sie zahlen — Einbau und Material inbegriffen, keine Anfahrtskosten, nichts Zusätzliches bei der Abholung.',
      /* CarPlay en isolatie staan apart, net als op de Nederlandse homepage.
         Zie de uitleg bij AUDIOPAKKETTEN in site.js. */
      losKop: 'Einzeln bestellbar',
      losLead: 'Suchen Sie nur ein Display, das funktioniert, Strom der nicht einbricht — oder einfach Ruhe?',
      duurLabel: 'Dauer',
      garantieKop: 'Lebenslange Garantie auf unsere Arbeit',
      garantieStrip: 'Lebenslange Garantie auf unsere Einbauarbeit und die von uns verlegten Kabel.',
      garantieKlein: 'Solange das Fahrzeug Ihnen gehört. Für die Geräte selbst gilt die Herstellergarantie.',
    },

    /**
     * De losse woordjes óp een pakketkaart. Die kaart is voor alle drie de
     * talen dezelfde (PackageCard.astro) — alleen deze woorden wisselen.
     * De namen van de balkjes staan in site.js in het Nederlands; hier
     * staat per taal wat er in plaats daarvan komt te staan.
     */
    kaart: {
      badge: 'Unsere Empfehlung',
      meer: 'Mehr über dieses Paket',
      vanDe5: (n) => `${n} von 5`,
      scores: {
        Integratie: 'Integration',
        Snelheid: 'Tempo',
        Audio: 'Klang',
        Volume: 'Pegel',
        Bass: 'Bass',
        Zuiverheid: 'Klarheit',
      },
    },

    vakwerk: {
      eyebrow: 'Handwerk ohne Abkürzungen',
      kop: 'Kein Holz. Keine Feuchtigkeit. Keine halben Sachen.',
      punten: [
        {
          kop: 'Massive Montage',
          tekst:
            'MDF nimmt Feuchtigkeit auf, quillt und fault. Wir verwenden ausschließlich CNC-gefräste Adapterringe aus massivem Kunststoff oder Aluminium. Wasserfest und akustisch tot.',
        },
        {
          kop: '100% gelötet',
          tekst:
            'Wir hassen Quetschverbinder. Jede Verbindung wird fachgerecht gelötet, mit Schrumpfschlauch versehen und mit originalem Gewebeband abgeklebt. Störungsfrei, dauerhaft.',
        },
        {
          kop: 'Akustische DSP-Abstimmung',
          tekst:
            'Ein teurer Lautsprecher klingt nach nichts ohne die richtige Abstimmung. Wir messen ein und passen Laufzeiten und Frequenzen exakt an die Akustik Ihres Fahrzeugs an.',
        },
      ],
    },

    garantie: {
      kop: 'Ihre Werksgarantie bleibt vollständig erhalten',
      tekst:
        'Wir arbeiten ausschließlich mit fahrzeugspezifischen Adapterkabeln, die an die vorhandenen Stecker angeschlossen werden. Es wird nichts durchtrennt und nichts an der Originalverkabelung verändert. Alles lässt sich vollständig in den Originalzustand zurückbauen — genau das, was Sie brauchen, damit Ihnen kein Händler etwas anhaben kann.',
    },

    over: {
      eyebrow: 'Inhaber und Audio Engineer',
      kop: 'Wer an Ihrem Auto arbeitet',
      /**
       * "Autointerieurs" stond hier eerst — dat is Nederlands met een Duits
       * jasje aan. Een Duitser zegt "Fahrzeuginnenraum". Zulke leenwoorden
       * zijn precies wat een lezer van over de grens er meteen uit pikt.
       */
      alineas: [
        'Ich habe Fahrzeuginnenräume zerlegt, bevor ich einen Führerschein hatte, und danach das Handwerk am Konservatorium gelernt — als Audio Engineer. Beides kommt in Ihrem Auto zusammen.',
        'Was in Ihr Auto kommt, entscheide ich mit den Ohren.',
      ],
      feiten: ['Ausgebildeter Audio Engineer', 'Seit 2018 im Audiobereich', 'Baut eigene Lautsprecher'],
    },

    slot: {
      kop: 'Bereit für den Klang, den Ihr Auto verdient?',
      tekst:
        'Ein Foto Ihres Armaturenbretts genügt. Innerhalb von 24 Stunden wissen Sie, was in Ihrem Auto möglich ist und was es kostet — unverbindlich, auf Deutsch.',
      knop: 'Foto vom Armaturenbrett senden',
      adresLabel: 'Werkstatt und Besucheradresse',
    },

    wa: {
      /* Het bericht dat al klaarstaat als een Duitse bezoeker op de knop tikt. */
      aanhef: 'Hallo Justus,',
      algemeen:
        'ich interessiere mich für eine Audio-Aufrüstung. Ich schicke gleich ein Foto von meinem Armaturenbrett.',
      pakket: (naam) => `ich interessiere mich für ${naam}. Können Sie mir dazu mehr sagen?`,
    },
  },

  /* ---------------------------------------------------------------- EN --- */
  en: {
    ui: {
      overslaan: 'Skip to content',
      themaKnop: 'Switch between light and dark',
      menu: {
        home: 'Home',
        upgrades: 'Pricing',
        auto: 'Your car',
        werkwijze: 'How it works',
        over: 'About',
        contact: 'Contact',
      },
      alg: {
        meerLezen: 'Read more',
        allePrijzen: 'See all pricing',
        naarContact: 'Contact and directions',
        vragenLink: 'Or read the frequently asked questions first',
        adres: 'Workshop and visiting address',
      },
      voettekst: {
        opAfspraak: 'Visits by appointment',
        appDashboard: 'Send dashboard photo',
        upgrades: 'Pricing',
        vragen: 'Frequently asked questions',
        over: 'About us',
        modellen: 'By car model',
        klassiekers: 'Classics and youngtimers',
        voorwaarden: 'Terms and conditions',
        privacy: 'Privacy policy',
        cookies: 'Cookie policy',
      },
    },

    meta: {
      titel: 'Car audio and CarPlay installation in Emmen, Netherlands',
      omschrijving:
        'Wireless Apple CarPlay, speakers and sound deadening — built in behind your original panels. All-in prices including fitting. Your factory warranty stays intact. Emmen, Drenthe.',
    },

    hero: {
      eyebrow: 'Emmen, Netherlands · by appointment only',
      kop: 'Big sound.',
      kopAccent: 'Invisibly installed.',
      lead:
        'Done with tinny sound? We build premium car audio behind your original panels — without cutting a single factory wire, and without touching your warranty.',
      knopWa: 'Send a photo of your dashboard',
      knopPrijzen: 'See the pricing',
      bewijs: 'All-in prices · Lifetime guarantee on our work · Factory warranty intact',
    },

    grens: {
      eyebrow: 'For visitors from abroad',
      kop: 'Yes, we speak your language',
      alineas: [
        'We are in Emmen, in the north-east of the Netherlands, twenty minutes from the German border. Plenty of our customers drive an hour to get here, and a good few cross the border to do it.',
        'Write to us in English and you will get an answer in English. WhatsApp is easiest — you keep everything in writing, and you can send photos straight from your phone.',
        'One honest note: the licence plate check on our Dutch pages only works with Dutch plates. Send a photo of your dashboard instead and we will tell you within 24 hours what is possible and what it costs.',
      ],
    },

    pakketten: {
      eyebrow: 'All-in prices, fitting and VAT included',
      kop: 'Four steps in sound',
      lead:
        'They build on one another: every package includes what sits to the left of it. The price you see is the price you pay — parts and fitting included, no call-out charge, nothing extra when you come to collect it.',
      losKop: 'Available on its own',
      losLead: 'After a screen that simply works, power that does not sag — or just quiet?',
      duurLabel: 'Time needed',
      garantieKop: 'Lifetime guarantee on our work',
      garantieStrip: 'Lifetime guarantee on our installation work and the wiring we lay.',
      garantieKlein: 'For as long as the car is yours. The equipment itself carries its manufacturer warranty.',
    },

    kaart: {
      badge: 'Our recommendation',
      meer: 'More about this package',
      vanDe5: (n) => `${n} out of 5`,
      scores: {
        Integratie: 'Integration',
        Snelheid: 'Speed',
        Audio: 'Sound',
        Volume: 'Volume',
        Bass: 'Bass',
        Zuiverheid: 'Clarity',
      },
    },

    vakwerk: {
      eyebrow: 'Craft without shortcuts',
      kop: 'No wood. No moisture. No half measures.',
      punten: [
        {
          kop: 'Solid mounting',
          tekst:
            'MDF absorbs moisture, swells and rots. We use nothing but CNC-machined adapter rings in solid plastic or aluminium. Waterproof and acoustically dead.',
        },
        {
          kop: 'Soldered, every joint',
          tekst:
            'We hate scotch locks. Every connection we make is properly soldered, heat-shrunk and finished with original fabric tape. Nothing works loose three years later.',
        },
        {
          kop: 'Acoustic DSP tuning',
          tekst:
            'An expensive speaker sounds like nothing without the right tuning. We measure your car and set time alignment and frequencies to its actual acoustics.',
        },
      ],
    },

    garantie: {
      kop: 'Your factory warranty stays fully intact',
      tekst:
        'We work exclusively with vehicle-specific plug-and-play looms that connect to the existing connectors. Nothing is cut and nothing about the original wiring changes. Everything can be returned to factory condition — which is exactly what you need for your warranty to stay untouched.',
    },

    over: {
      eyebrow: 'Owner and audio engineer',
      kop: 'Who works on your car',
      /**
       * "Conservatory" stond hier eerst. Dat is in het Engels een serre — de
       * muziekopleiding heet "conservatoire". Precies het soort woord dat een
       * vertaalmachine erdoorheen laat en dat een Engelse lezer meteen ziet.
       *
       * De tweede regel liep ook in Nederlandse woordvolgorde ("What goes
       * into your car, I choose by ear"). Nu staat het onderwerp voorop,
       * zoals het hoort, en blijft het even kort als het Nederlands.
       */
      alineas: [
        'I was pulling car interiors apart before I had a driving licence, and learned the trade properly afterwards — at a music conservatoire, as an audio engineer. Those two things meet in your car.',
        'What ends up in your car, I choose with my ears.',
      ],
      feiten: ['Trained audio engineer', 'In audio since 2018', 'Builds his own speakers'],
    },

    slot: {
      kop: 'Ready to hear what your car can do?',
      tekst:
        'One photo of your dashboard is enough. Within 24 hours you will know what is possible and what it costs — no obligation.',
      knop: 'Send a photo of your dashboard',
      adresLabel: 'Workshop and visiting address',
    },

    wa: {
      aanhef: 'Hi Justus,',
      algemeen:
        'I am interested in an audio upgrade. I will send a photo of my dashboard shortly.',
      pakket: (naam) => `I am interested in ${naam}. Could you tell me more about it?`,
    },
  },
};

/** De teksten van één taal, met Nederlands als vangnet. */
export const tekstenVan = (taal) => TEKSTEN[taal] ?? TEKSTEN.nl;

/**
 * De openingstijden op één regel, in de taal van de bezoeker.
 *
 * De tijden zelf staan in site.js en zijn overal gelijk; alleen de
 * dagafkortingen en de twee verbindingswoorden verschillen. Zonder dit stond
 * er "ma t/m vr" onderaan de Duitse pagina.
 */
const DAGWOORDEN = {
  nl: { Monday: 'ma', Tuesday: 'di', Wednesday: 'wo', Thursday: 'do',
        Friday: 'vr', Saturday: 'za', Sunday: 'zo', totEnMet: 't/m', tot: 'tot' },
  de: { Monday: 'Mo', Tuesday: 'Di', Wednesday: 'Mi', Thursday: 'Do',
        Friday: 'Fr', Saturday: 'Sa', Sunday: 'So', totEnMet: 'bis', tot: 'bis' },
  en: { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
        Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun', totEnMet: 'to', tot: 'until' },
};

export const tijdenKortVan = (taal) => tijdenKort(DAGWOORDEN[taal] ?? DAGWOORDEN.nl);

export default TEKSTEN;
