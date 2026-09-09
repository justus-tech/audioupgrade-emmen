/**
 * DE INHOUD VAN DE DUITSE EN ENGELSE PAGINA'S.
 *
 * Staat los van teksten.js omdat dat bestand over de schil gaat — menu,
 * voettekst, knoppen — en dit over de inhoud. Samen zou het één onleesbaar
 * bestand van duizend regels worden.
 *
 * ==========================================================================
 * WAT HIER NIET IN STAAT
 * ==========================================================================
 * De prijzen. Die komen uit site.js, want daar staan ze al en één bedrag op
 * twee plekken gaat vroeg of laat uit elkaar lopen. Hier staat alleen de
 * tekst eromheen.
 *
 * De algemene voorwaarden, het privacybeleid en het cookiebeleid. Met opzet:
 * dat is het enige stuk waar Justus juridisch aan vastzit. Twee versies die
 * net iets anders zeggen is erger dan één versie die niet iedereen leest.
 * Die pagina's blijven Nederlands en de links ernaartoe dragen lang="nl".
 *
 * ==========================================================================
 * DIT IS GEEN VERTAALMACHINE
 * ==========================================================================
 * "Werksgarantie" weegt in Duitsland zwaarder dan "fabrieksgarantie" hier,
 * dus staat dat er prominenter. Een Duitser is gewend aan uurtarieven bij de
 * inbouwer, dus wordt de vaste prijs vaker genoemd. En overal waar de
 * Nederlandse tekst "je" zegt, staat in het Duits "Sie": tussen vreemden is
 * dat daar de norm, en te vroeg tutoyeren kost je vertrouwen in plaats van
 * dat het het wint.
 */

/* Wat er per pakket verandert. De naam en de prijs blijven staan: een
   pakketnaam is een merknaam en staat straks ook zo op de factuur. */
const PAKKETTEN_DE = {
  'carplay-upgrade': {
    naam: "Kabelloses CarPlay Upgrade",
    prijs: "ab 695 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "574 € zzgl. MwSt.",
    tagline: 'Apple CarPlay & Android Auto',
    short: 'Kabelloses Apple CarPlay und Android Auto, nahtlos in Ihrem Originaldisplay.',
    body:
      'Das Paket, mit dem Sie veraltete Navigation und Handyhalterungen los sind. Wir integrieren Apple CarPlay und Android Auto vollständig in Ihr vorhandenes System. Karten, Musik und Telefonie bedienen Sie über das Originaldisplay und die Lenkradtasten.',
    features: [
      'Kabelloses Apple CarPlay und Android Auto.',
      'In Ihrem Werksdisplay — oder einem neuen High-End-Display.',
      'Bedienung über die originalen Lenkradtasten oder das Touchpad.',
      'Werkssystem und Bordcomputer bleiben vollständig erhalten.',
      'Inklusive Freisprecheinrichtung in glasklarer Qualität.',
    ],
    cta: 'CarPlay anfragen',
    duur: 'Fertig in etwa 2 Stunden',
  },
  'akoestische-basis': {
    naam: "Akustik-Basis",
    prijs: "995 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "822 € zzgl. MwSt.",
    tagline: 'Ruhe im Innenraum, klar am Telefon.',
    short: 'Die Grundlage: Ruhe im Innenraum und Details, die Sie vorher nicht gehört haben.',
    body:
      'Weg mit den dünnen Papierlautsprechern ab Werk. Wir ersetzen die vorderen Lautsprecher durch ein kräftiges 2-Wege-Kompo-Set. Und wir tun mehr: die Türen bekommen eine zweilagige Dämmung in Premiumqualität.',
    features: [
      '2-Wege-Kompo-Lautsprecher der Premiumklasse.',
      'Hochwertige zweilagige akustische Türdämmung.',
      'Massive, verschleißfreie Montageringe.',
      '100% unsichtbare Integration ins Werkssystem.',
    ],
    cta: 'Basis anfragen',
    duur: 'Fertig in einem halben Tag',
  },
  'oem-plus-executive': {
    naam: "The OEM+ Executive",
    prijs: "2.195 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "1.814 € zzgl. MwSt.",
    tagline: '0% Kofferraumverlust. 100% Dynamik.',
    short: 'Für Vielfahrer und echte Autoliebhaber, die das Maximum wollen — ohne Kofferraum zu verlieren.',
    body:
      'Für Vielfahrer und Unternehmer. Das ist keine Lautsprecher-Aufrüstung, sondern eine komplette Überarbeitung Ihrer Fahrzeugakustik. Herzstück ist ein digitaler Signalprozessor (DSP): damit steuern wir jeden Lautsprecher einzeln an und korrigieren die Laufzeiten, sodass Sie mitten in der Musik sitzen. Ergänzt durch einen unsichtbaren, spürbaren Subwoofer.',
    features: [
      'Fortschrittlicher DSP-Verstärker (digitaler Signalprozessor).',
      'Fahrzeugspezifisches High-End-Lautsprecherset.',
      'Unsichtbarer, ultrakompakter Aktivsubwoofer.',
      'Dreilagige Dämmung der Türen.',
      'Vollständig akustisch eingemessen.',
    ],
    cta: 'Executive anfragen',
    duur: 'Ihr Auto bleibt einen Werktag bei uns',
  },
  'reference-edition': {
    naam: "The Reference Edition",
    prijs: "ab 3.695 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "ab 3.053 € zzgl. MwSt.",
    tagline: 'Kompromisslose audiophile Perfektion.',
    short: 'Audiophile Perfektion für alle, die sich weigern, Kompromisse zu machen.',
    body:
      'Die höchste Stufe. Vollaktive Ansteuerung, ein mehrkanaliger DSP-Verstärker, Lautsprecher der Referenzklasse und eine Abstimmung, für die wir uns die Zeit nehmen, die sie braucht. Was hier eingebaut wird, entscheiden wir gemeinsam mit Ihnen und Ihrer Musik.',
    features: [
      'Vollaktives System, jeder Lautsprecher einzeln angesteuert.',
      'Lautsprecher der Referenzklasse, nach Ihrer Musik ausgewählt.',
      'Mehrlagige Dämmung von Türen, Boden und Radkästen.',
      'Messtechnische Abstimmung über mehrere Sitzungen.',
    ],
    cta: 'Maßarbeit besprechen',
    duur: 'Zwei bis drei Tage, inklusive Abstimmung',
  },
  'akoestische-isolatie': {
    naam: "Akustik-Dämmung",
    prijs: "Preis auf Anfrage",
    prijsNoot: "",
    prijsExcl: "",
    tagline: 'Suchen Sie nur Ruhe?',
    short: 'Reine Dämmpakete für Türen, Böden und Dächer — ohne neue Lautsprecher.',
    body:
      'Manchmal geht es gar nicht um Musik, sondern um Ruhe. Abrollgeräusche, Windgeräusche, ein Dröhnen aus dem Kofferraum. Das lässt sich getrennt angehen: Dämmung dort, wo sie wirkt, ohne dass ein einziger Lautsprecher getauscht wird.',
    features: [
      'Dämmung von Türen, Boden, Dach oder Radkästen.',
      'Auch für Kastenwagen und Wohnmobile.',
      'Umfang und Preis nach Absprache.',
    ],
    cta: 'Dämmung anfragen',
    duur: 'Nach Absprache — je nach Umfang',
  },
};

const PAKKETTEN_EN = {
  'carplay-upgrade': {
    naam: "Wireless CarPlay Upgrade",
    prijs: "from €695",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "€574 excl. VAT",
    tagline: 'Apple CarPlay & Android Auto',
    short: 'Wireless Apple CarPlay and Android Auto, seamlessly in your original screen.',
    body:
      'The package that gets rid of dated navigation and phone holders for good. We integrate Apple CarPlay and Android Auto fully into your existing system. Maps, music and calls run through your original screen and steering wheel buttons.',
    features: [
      'Wireless Apple CarPlay and Android Auto.',
      'In your factory screen — or a new high-end display.',
      'Operated by your original steering wheel controls or touchpad.',
      'Factory system and on-board computer fully preserved.',
      'Includes hands-free calling in crystal-clear quality.',
    ],
    cta: 'Ask about CarPlay',
    duur: 'Ready in about 2 hours',
  },
  'akoestische-basis': {
    naam: "Acoustic Foundation",
    prijs: "€995",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "€822 excl. VAT",
    tagline: 'Quiet inside, clear on the phone.',
    short: 'The foundation: a quiet cabin and detail you have not heard before.',
    body:
      'Out with the thin paper speakers the factory fitted. We replace the front speakers with a proper 2-way component set. And we do more than that: the doors get two layers of premium sound deadening.',
    features: [
      'Premium 2-way component speakers.',
      'High-grade two-layer acoustic door damping.',
      'Solid, long-lasting mounting rings.',
      '100% invisible integration with the factory system.',
    ],
    cta: 'Ask about Basis',
    duur: 'Ready in half a day',
  },
  'oem-plus-executive': {
    naam: "The OEM+ Executive",
    prijs: "€2,195",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "€1,814 excl. VAT",
    tagline: '0% boot space lost. 100% dynamics.',
    short: 'For high-mileage drivers who want the maximum without giving up boot space.',
    body:
      'For people who live in their car. This is not a speaker upgrade but a full rework of your vehicle acoustics. At its heart sits a digital sound processor: it drives every speaker separately and corrects the arrival times, so you end up sitting in the middle of the music. Completed by an invisible but very present subwoofer.',
    features: [
      'Advanced DSP amplifier (digital sound processor).',
      'Vehicle-specific high-end speaker set.',
      'Invisible, ultra-compact active subwoofer.',
      'Three-layer damping of the doors.',
      'Fully measured and tuned to your car.',
    ],
    cta: 'Ask about Executive',
    duur: 'Your car stays with us for one working day',
  },
  'reference-edition': {
    naam: "The Reference Edition",
    prijs: "from €3,695",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "from €3,053 excl. VAT",
    tagline: 'Audiophile perfection, no compromises.',
    short: 'Audiophile perfection for those who refuse to compromise.',
    body:
      'The top of the range. Fully active drive, a multi-channel DSP amplifier, reference-class speakers and a tuning session that takes as long as it needs to. What goes in is decided together with you and your music.',
    features: [
      'Fully active system, every speaker driven separately.',
      'Reference-class speakers, chosen around your music.',
      'Multi-layer damping of doors, floor and wheel arches.',
      'Measured tuning across several sessions.',
    ],
    cta: 'Discuss a bespoke build',
    duur: 'Two to three days, tuning included',
  },
  'akoestische-isolatie': {
    naam: "Acoustic Insulation",
    prijs: "Price on request",
    prijsNoot: "",
    prijsExcl: "",
    tagline: 'Just after quiet?',
    short: 'Sound deadening only, for doors, floors and roofs — no new speakers.',
    body:
      'Sometimes it is not about music at all, but about quiet. Road noise, wind noise, a drone from the boot. That can be tackled on its own: damping where it actually does something, without replacing a single speaker.',
    features: [
      'Damping of doors, floor, roof or wheel arches.',
      'Also for vans and campers.',
      'Scope and price by arrangement.',
    ],
    cta: 'Ask about sound deadening',
    duur: 'By arrangement — depends on the scope',
  },
};

/* ------------------------------------------------------------------ DE --- */
const DE = {
  pakketten: PAKKETTEN_DE,

  prijzen: {
    titel: 'Preise für Car-Hifi und CarPlay — Audio Upgrade Emmen',
    omschrijving:
      'Vier Pakete mit Festpreisen ab 695 €, inklusive Einbau und Mehrwertsteuer. Kabelloses CarPlay, Lautsprecher, DSP-Abstimmung und Dämmung. Werksgarantie bleibt bestehen.',
    eyebrow: 'Festpreise, inklusive Einbau und Mehrwertsteuer',
    kop: 'Preise',
    lead:
      'Der Preis, den Sie hier sehen, ist der Preis, den Sie zahlen. Material und Arbeit inbegriffen, keine Anfahrtskosten, keine Überraschung bei der Abholung. Was genau in Ihr Auto passt, sagen wir Ihnen vorher — auch wenn die Antwort ist, dass ein kleineres Paket reicht.',
    meer: 'Mehr über dieses Paket',
    duurLabel: 'Dauer',
    watLabel: 'Das ist enthalten',
  },

  werkwijze: {
    titel: 'Ablauf — so läuft der Einbau bei uns | Audio Upgrade Emmen',
    omschrijving:
      'Von der ersten WhatsApp-Nachricht bis zur Abholung: wie ein Einbau bei Audio Upgrade Emmen abläuft, und woran Sie erkennen, dass sauber gearbeitet wurde.',
    eyebrow: 'Von der Nachricht bis zur Abholung',
    kop: 'So läuft es ab',
    lead: 'Drei Schritte. Kein Formular, keine Anzahlung für ein Gespräch.',
    stappen: [
      {
        nummer: '01',
        kop: 'Foto vom Armaturenbrett senden',
        tekst:
          'Keine langen Formulare. Eine WhatsApp-Nachricht mit Marke, Baujahr und einem Foto Ihres Radios oder Armaturenbretts genügt. Auf Deutsch, versteht sich.',
      },
      {
        nummer: '02',
        kop: 'Ehrliche Beratung und Festpreis',
        tekst:
          'Innerhalb von 24 Stunden wissen Sie, was in Ihrem Auto möglich ist und was es kostet. Wenn ein kleineres Paket reicht, sagen wir das — und wenn etwas nicht geht, sagen wir das auch.',
      },
      {
        nummer: '03',
        kop: 'Einbau und Abstimmung',
        tekst:
          'Sie bringen das Auto nach Emmen. Bleibt es einen Tag, fahren wir Sie im Umkreis von fünfzehn Kilometern nach Hause. Am Ende wird eingemessen und abgestimmt, bevor Sie es zurückbekommen.',
      },
    ],
    vakwerkKop: 'Warum bei uns?',
    slotKop: 'Neugierig, was das für Ihr Auto bedeutet?',
  },

  vragen: {
    titel: 'Häufige Fragen zu Car-Hifi und CarPlay | Audio Upgrade Emmen',
    omschrijving:
      'Bleibt die Werksgarantie bestehen? Wie lange dauert der Einbau? Was kostet es? Die Fragen, die wir am häufigsten bekommen, ehrlich beantwortet.',
    eyebrow: 'Alles, was Sie wissen wollen',
    kop: 'Häufige Fragen',
    lead:
      'Das sind die Fragen, die wir am häufigsten bekommen. Ist Ihre nicht dabei? Schreiben Sie uns über WhatsApp — Sie bekommen innerhalb von 24 Stunden eine Antwort.',
    slotKop: 'Ihre Frage ist nicht dabei',
    slotTekst:
      'Schicken Sie ein Foto Ihres Armaturenbretts und Ihre Frage dazu. Sie bekommen eine ehrliche Antwort, auch wenn die lautet, dass es bei Ihrem Auto nicht geht.',
    lijst: [
      {
        vraag: 'Bleibt meine Werksgarantie bestehen?',
        antwoord:
          'Ja. Wir arbeiten ausschließlich mit fahrzeugspezifischen Adapterkabeln, die an die vorhandenen Stecker angeschlossen werden. Es wird nichts durchtrennt und an der Originalverkabelung ändert sich nichts — es gibt also nichts, worauf ein Händler Sie ansprechen könnte.',
      },
      {
        vraag: 'Kann mein Auto später wieder in den Originalzustand versetzt werden?',
        antwoord:
          'Ja. Weil nichts durchtrennt wurde, lässt sich alles vollständig zurückbauen. Praktisch, wenn Sie das Auto irgendwann verkaufen oder in Zahlung geben.',
      },
      {
        vraag: 'Wie lange bin ich ohne mein Auto?',
        antwoord:
          'Das hängt vom Paket ab. Eine kabellose CarPlay-Aufrüstung ist in etwa zwei Stunden fertig; bei den größeren Paketen bleibt Ihr Auto einen Werktag bei uns. Bleibt es stehen, fahren wir Sie im Umkreis von fünfzehn Kilometern um Emmen nach Hause und holen Sie am Ende des Tages wieder ab.',
      },
      {
        vraag: 'Passt das auch in mein Auto?',
        antwoord:
          'Mit ziemlicher Sicherheit. Schicken Sie ein Foto Ihres Armaturenbretts über WhatsApp, dann bekommen Sie innerhalb von 24 Stunden eine klare Antwort. Die Kennzeichenabfrage auf unseren niederländischen Seiten funktioniert nur mit niederländischen Kennzeichen — für Sie ist das Foto der schnellere Weg.',
      },
      {
        vraag: 'Bleibt mein Originaldisplay funktionsfähig?',
        antwoord:
          'Ja, und genau darum geht es. CarPlay und Android Auto erscheinen in Ihrem eigenen Werksdisplay, bedient über die Lenkradtasten oder das Touchpad. Bordcomputer, Rückfahrkamera und Einparkhilfe arbeiten weiter wie vorher. Hat Ihr Auto kein Display, kann ein neues eingebaut werden.',
      },
      {
        vraag: 'Ist das CarPlay wirklich kabellos?',
        antwoord:
          'Ja. Ihr Telefon verbindet sich beim Einsteigen von selbst und kann in der Tasche bleiben. Genau daran scheitern die günstigen Nachrüstboxen: die wollen trotzdem ein Kabel.',
      },
      {
        vraag: 'Sieht man von außen, dass etwas gemacht wurde?',
        antwoord:
          'Nein. Alles verschwindet hinter Ihren Originalverkleidungen. Keine sichtbaren Kästen, keine losen Kabel, keine Leuchten. Wer einsteigt, sieht ein serienmäßiges Auto — bis Sie es einschalten.',
      },
      {
        vraag: 'Was kostet es?',
        antwoord:
          'Die Pakete beginnen bei 695 €, und das ist ein Festpreis inklusive Mehrwertsteuer und Einbau. Es kommen keine Montage- oder Anfahrtskosten dazu. Was genau Ihr Auto kostet, steht vorher im Angebot.',
      },
      {
        vraag: 'Gibt es Garantie auf die Arbeit selbst?',
        antwoord:
          'Ja, lebenslange Garantie auf die Einbauarbeit und die von uns verlegten Kabel, solange das Fahrzeug Ihnen gehört. Das können wir zusagen, weil wir löten statt Quetschverbinder zu verwenden. Für die Geräte selbst gilt die Garantie des Herstellers.',
      },
      {
        vraag: 'Ich verstehe nichts von Audio. Kann ich trotzdem kommen?',
        antwoord:
          'Gerade dann. Sie müssen keine Marken oder Wattzahlen kennen. Schicken Sie ein Foto und schreiben Sie, was Ihnen fehlt — zu wenig Bass, Stimmen die untergehen, oder einfach dass es blechern klingt. Den Rest übersetzen wir.',
      },
      {
        vraag: 'Machen Sie auch Oldtimer und Youngtimer?',
        antwoord:
          'Ja, ab Baujahr 1980. Dort arbeiten wir anders: keine festen Pakete, und Ihr Armaturenbrett bleibt, wie es ist. Den Preis besprechen wir vorher, denn jeder Klassiker verlangt etwas anderes.',
      },
      {
        vraag: 'Ich komme aus Deutschland. Geht das überhaupt?',
        antwoord:
          'Ja, und Sie sind nicht der Erste. Von Lingen, Nordhorn oder Meppen sind Sie in einer knappen halben Stunde da. Sie können auf Deutsch schreiben und bekommen eine Antwort auf Deutsch. Bringen Sie bitte Ihre Fahrzeugpapiere mit.',
      },
      {
        vraag: 'Wie und wann bezahle ich?',
        antwoord:
          'Bei der Abholung, per Karte oder Zahlungslink. Müssen fahrzeugspezifische Teile bestellt werden, kann vorab eine Anzahlung bis zur Hälfte der Materialkosten anfallen.',
      },
      {
        vraag: 'Kann ich meinen Termin noch verschieben?',
        antwoord:
          'Kostenlos bis sieben Tage vor dem Einbautermin. Danach berechnen wir einen Teil des Angebotsbetrags, weil die Zeit reserviert und die Teile bereits bestellt sind. Melden Sie sich also ruhig, wenn etwas dazwischenkommt — es lässt sich immer reden.',
      },
      {
        vraag: 'Wo sind Sie?',
        antwoord:
          'In Emmen in den Niederlanden, Charles Darwinstraat 35. Nur nach Vereinbarung, damit Sie nicht vor verschlossener Tür stehen und wir uns die Zeit für Ihr Auto freihalten können.',
      },
    ],
  },

  over: {
    titel: 'Über uns — Justus, Audio Engineer in Emmen | Audio Upgrade Emmen',
    omschrijving:
      'Am Konservatorium zum Audio Engineer ausgebildet, seit 2018 im Ton, und an Autointerieurs geschraubt, bevor es einen Führerschein gab. Lernen Sie den Mann hinter Audio Upgrade Emmen kennen.',
    eyebrow: 'Hinter Audio Upgrade Emmen',
    kop: 'Wer sind wir?',
    lead:
      'Sie lassen Ihr Auto einen Tag lang bei jemandem stehen, den Sie nicht kennen. Dann ist es nur recht, dass Sie vorher wissen, wer das ist.',
    adviesEyebrow: 'Auch außerhalb des Autos',
    adviesKop: 'Fragen Sie ruhig, auch ohne Auftrag',
    adviesAlineas: [
      'Unsicher bei einem Lautsprecherset, das Sie irgendwo gebraucht sehen? Wollen Sie wissen, warum Ihre Anlage zu Hause oder in der Werkstatt nicht so klingt, wie Sie gehofft hatten? Bauen Sie selbst etwas und kommen nicht weiter?',
      'Schreiben Sie einfach. Ich denke gern über Klang mit, im Auto und außerhalb. Da muss kein Auftrag hinterstehen und es kommt keine Rechnung.',
    ],
    adviesKnop: 'Kurz schreiben',
    merkenEyebrow: 'Womit wir arbeiten',
    merkenKop: 'Marken wählen wir pro Auto',
    merkenTekst:
      'Keine Marke hängt an einem Paket: was eingebaut wird, hängt von Ihrem Auto, Ihrer Musik und Ihrem Budget ab. Wir verkaufen keine Marke, wir lösen ein Problem.',
  },

  contact: {
    titel: 'Kontakt und Anfahrt | Audio Upgrade Emmen',
    omschrijving:
      'Schicken Sie ein Foto Ihres Armaturenbretts über WhatsApp und erfahren Sie innerhalb von 24 Stunden, was für Ihr Auto möglich ist. Audio Upgrade Emmen, nur nach Vereinbarung.',
    eyebrow: 'Nur nach Vereinbarung',
    kop: 'Bereit für den Klang, den Ihr Auto verdient?',
    lead:
      'Schicken Sie ein Foto Ihres Armaturenbretts, dann erfahren Sie innerhalb von 24 Stunden, was möglich ist und was es kostet.',
    manierenKop: 'So erreichen Sie uns',
    manieren: [
      { kop: 'WhatsApp', tekst: 'Der schnellste Weg: Foto vom Armaturenbrett, dazu Marke und Baujahr.', knop: 'WhatsApp öffnen' },
      { kop: 'Anrufen', tekst: 'Lieber jemanden am Telefon? Auf Deutsch geht auch.', knop: null },
      { kop: 'E-Mail', tekst: 'Für ausführliche Fragen oder geschäftliche Anfragen.', knop: 'E-Mail schreiben' },
    ],
    waarKop: 'Wo Sie uns finden',
    waarTekst: 'Nur nach Vereinbarung',
    kaartKnop: 'Karte anzeigen',
    kaartUitleg: 'Die Karte kommt von Google und setzt Cookies, sobald Sie sie öffnen.',
    routeKnop: 'Route planen',
    grens: 'Aus Deutschland: von Lingen, Nordhorn oder Meppen etwa eine halbe Stunde.',
  },

  oldtimer: {
    titel: 'Oldtimer und Youngtimer — Klang ohne Eingriff | Audio Upgrade Emmen',
    omschrijving:
      'Audio für Klassiker ab Baujahr 1980: das Originalarmaturenbrett bleibt, kein modernes Display, alles rückbaubar. Preis nach Absprache.',
    eyebrow: 'Ab Baujahr 1980',
    kop: 'Oldtimer und Youngtimer',
    lead:
      'Bei einem Klassiker gelten andere Regeln. Das Armaturenbrett ist das Gesicht des Autos, und da gehört kein moderner Bildschirm hinein. Also arbeiten wir anders.',
    punten: [
      {
        kop: 'Das Originalradio bleibt',
        tekst:
          'Wir setzen kein modernes Display ein. Was Sie sehen, bleibt genau so. Der Klang kommt aus dem, was dahinter sitzt.',
      },
      {
        kop: 'Alles rückbaubar',
        tekst:
          'Keine neuen Löcher, keine durchtrennten Leitungen. Wollen Sie das Auto irgendwann wieder original haben, ist es in einem Nachmittag zurückgebaut.',
      },
      {
        kop: 'Keine festen Pakete',
        tekst:
          'Jeder Klassiker verlangt etwas anderes. Manche Autos aus der Zeit vor 1980 haben sechs Volt oder umgekehrte Masse — das schauen wir uns vorher an. Preis nach Absprache.',
      },
    ],
    slotKop: 'Fahren Sie etwas Älteres?',
    slotTekst:
      'Schicken Sie ein Foto Ihres Armaturenbretts und schreiben Sie, um welches Auto es geht. Dann sagen wir Ihnen ehrlich, was sich machen lässt — und was besser nicht.',
  },
};

/* ------------------------------------------------------------------ EN --- */
const EN = {
  pakketten: PAKKETTEN_EN,

  prijzen: {
    titel: 'Car audio and CarPlay pricing | Audio Upgrade Emmen',
    omschrijving:
      'Four packages with all-in prices from €695, fitting and VAT included. Wireless CarPlay, speakers, DSP tuning and sound deadening. Factory warranty stays intact.',
    eyebrow: 'All-in prices, fitting and VAT included',
    kop: 'Pricing',
    lead:
      'The price you see is the price you pay. Parts and labour included, no call-out charge, no surprise at collection. What actually fits your car we tell you beforehand — including when the honest answer is that a smaller package will do.',
    meer: 'More about this package',
    duurLabel: 'Time needed',
    watLabel: 'What you get',
  },

  werkwijze: {
    titel: 'How it works — from message to collection | Audio Upgrade Emmen',
    omschrijving:
      'From the first WhatsApp message to picking your car back up: how an installation at Audio Upgrade Emmen works, and how you can tell the job was done properly.',
    eyebrow: 'From message to collection',
    kop: 'How it works',
    lead: 'Three steps. No forms, and no deposit for a conversation.',
    stappen: [
      {
        nummer: '01',
        kop: 'Send a photo of your dashboard',
        tekst:
          'No long forms. One WhatsApp message with your make, year and a photo of your radio or dashboard is enough.',
      },
      {
        nummer: '02',
        kop: 'Honest advice and a fixed price',
        tekst:
          'Within 24 hours you will know what is possible in your car and what it costs. If a smaller package will do, we say so — and if something cannot be done, we say that too.',
      },
      {
        nummer: '03',
        kop: 'Installation and tuning',
        tekst:
          'You bring the car to Emmen. If it stays for the day we will drive you home within fifteen kilometres. At the end it gets measured and tuned before you get it back.',
      },
    ],
    vakwerkKop: 'Why us?',
    slotKop: 'Curious what this means for your car?',
  },

  vragen: {
    titel: 'Frequently asked questions about car audio | Audio Upgrade Emmen',
    omschrijving:
      'Does the factory warranty stay valid? How long does it take? What does it cost? The questions we get most often, answered honestly.',
    eyebrow: 'Everything you want to know',
    kop: 'Frequently asked questions',
    lead:
      'These are the questions we get most often. Yours not among them? Send it over WhatsApp — you will have an answer within 24 hours.',
    slotKop: 'Your question is not here',
    slotTekst:
      'Send a photo of your dashboard with your question. You will get an honest answer, including when that answer is that it cannot be done on your car.',
    lijst: [
      {
        vraag: 'Does my factory warranty stay valid?',
        antwoord:
          'Yes. We work exclusively with vehicle-specific looms that plug into the connectors already there. Nothing is cut and nothing about the original wiring changes, so there is nothing a dealer can hold against you.',
      },
      {
        vraag: 'Can the car be put back to standard later?',
        antwoord:
          'Yes. Because nothing was cut, everything can be returned to factory condition. Useful if you ever sell or trade the car in.',
      },
      {
        vraag: 'How long will I be without my car?',
        antwoord:
          'It depends on the package. A wireless CarPlay upgrade is done in about two hours; for the larger packages your car stays with us for a working day. If it stays, we drive you home within fifteen kilometres of Emmen and pick you up at the end of the day.',
      },
      {
        vraag: 'Will it fit my car?',
        antwoord:
          'Almost certainly. Send a photo of your dashboard over WhatsApp and you will get a clear answer within 24 hours. The licence plate check on our Dutch pages only works with Dutch plates, so for you the photo is the faster route.',
      },
      {
        vraag: 'Does my original screen keep working?',
        antwoord:
          'Yes, and that is the whole point. CarPlay and Android Auto appear in your own factory screen, operated with your steering wheel buttons or touchpad. Your on-board computer, reversing camera and parking sensors carry on as before. If your car has no screen, a new display can go in.',
      },
      {
        vraag: 'Is the CarPlay really wireless?',
        antwoord:
          'Yes. Your phone connects by itself as you get in and can stay in your pocket. That is exactly where the cheap aftermarket boxes fall down: they still want a cable.',
      },
      {
        vraag: 'Can you tell from the outside that anything was done?',
        antwoord:
          'No. Everything disappears behind your original panels. No visible boxes, no loose cables, no lights. Anyone getting in sees a standard car — until you switch it on.',
      },
      {
        vraag: 'What does it cost?',
        antwoord:
          'Packages start at €695, and that is an all-in price including VAT and fitting. There are no separate labour or call-out charges. What your car costs specifically is in the quote, up front.',
      },
      {
        vraag: 'Is there a guarantee on the work itself?',
        antwoord:
          'Yes, a lifetime guarantee on the installation work and the wiring we lay, for as long as the car is yours. We can promise that because we solder rather than use scotch locks. The equipment itself carries its manufacturer warranty.',
      },
      {
        vraag: 'I know nothing about audio. Can I still come?',
        antwoord:
          'Especially then. You do not need to know brands or wattages. Send a photo and tell us what you are missing — not enough bass, voices getting lost, or simply that it sounds tinny. We will translate that into what your car needs.',
      },
      {
        vraag: 'Do you work on classics and youngtimers?',
        antwoord:
          'Yes, from 1980 onwards. We work differently there: no fixed packages, and your dashboard stays exactly as it is. We agree the price beforehand, because every classic asks for something different.',
      },
      {
        vraag: 'I am coming from abroad. Is that a problem?',
        antwoord:
          'Not at all. Emmen sits in the north-east of the Netherlands, twenty minutes from the German border. Plenty of our customers drive an hour to get here. Bring your vehicle documents.',
      },
      {
        vraag: 'How and when do I pay?',
        antwoord:
          'On collection, by card or payment link. If vehicle-specific parts need ordering, we may ask for a deposit of up to half the material cost beforehand.',
      },
      {
        vraag: 'Can I still move my appointment?',
        antwoord:
          'Free of charge up to seven days before the fitting date. Inside that we charge part of the quoted amount, because the time is reserved and the parts are already ordered. So do let us know if something comes up — there is always room to talk.',
      },
      {
        vraag: 'Where are you?',
        antwoord:
          'In Emmen, the Netherlands, at Charles Darwinstraat 35. By appointment only, so you never arrive at a closed door and we can keep the time free for your car.',
      },
    ],
  },

  over: {
    titel: 'About — Justus, audio engineer in Emmen | Audio Upgrade Emmen',
    omschrijving:
      'Trained as an audio engineer at the conservatory, in sound since 2018, and stripping car interiors before there was a driving licence. Meet the man behind Audio Upgrade Emmen.',
    eyebrow: 'Behind Audio Upgrade Emmen',
    kop: 'Who are we?',
    lead:
      'You are leaving your car for a day with someone you have never met. It is only fair that you know who that is first.',
    adviesEyebrow: 'Outside the car too',
    adviesKop: 'Ask us anything, even without a job',
    adviesAlineas: [
      'Unsure about a set of speakers you have found second-hand? Want to know why your system at home or in the workshop does not sound the way you hoped? Building something and stuck?',
      'Just send a message. I am happy to think along about sound, in a car and outside one. There does not need to be a job behind it and there is no invoice.',
    ],
    adviesKnop: 'Send a message',
    merkenEyebrow: 'What we work with',
    merkenKop: 'Brands are chosen per car',
    merkenTekst:
      'No brand is tied to a package: what goes in depends on your car, your music and your budget. We do not sell a brand, we solve a problem.',
  },

  contact: {
    titel: 'Contact and directions | Audio Upgrade Emmen',
    omschrijving:
      'Send a photo of your dashboard over WhatsApp and hear within 24 hours what is possible for your car. Audio Upgrade Emmen, by appointment only.',
    eyebrow: 'By appointment only',
    kop: 'Ready to hear what your car can do?',
    lead:
      'Send a photo of your dashboard and within 24 hours you will know what is possible and what it costs.',
    manierenKop: 'How to reach us',
    manieren: [
      { kop: 'WhatsApp', tekst: 'The fastest route: a photo of your dashboard, plus make and year.', knop: 'Open WhatsApp' },
      { kop: 'Call', tekst: 'Rather speak to someone directly?', knop: null },
      { kop: 'Email', tekst: 'For longer questions or business enquiries.', knop: 'Send an email' },
    ],
    waarKop: 'Where to find us',
    waarTekst: 'By appointment only',
    kaartKnop: 'Show map',
    kaartUitleg: 'The map comes from Google and sets cookies as soon as you open it.',
    routeKnop: 'Plan your route',
    grens: 'Coming from Germany: about half an hour from Lingen, Nordhorn or Meppen.',
  },

  oldtimer: {
    titel: 'Classics and youngtimers — sound without the surgery | Audio Upgrade Emmen',
    omschrijving:
      'Audio for classics from 1980 onwards: the original dashboard stays, no modern screen, everything reversible. Price by arrangement.',
    eyebrow: 'From 1980 onwards',
    kop: 'Classics and youngtimers',
    lead:
      'A classic plays by different rules. The dashboard is the face of the car, and a modern screen has no business in it. So we work differently.',
    punten: [
      {
        kop: 'The original radio stays',
        tekst:
          'We do not fit a modern display. What you see stays exactly as it is. The sound comes from what sits behind it.',
      },
      {
        kop: 'Everything reversible',
        tekst:
          'No new holes, no cut wires. If you ever want the car back to original, it is an afternoon of work.',
      },
      {
        kop: 'No fixed packages',
        tekst:
          'Every classic asks for something different. Some cars from before 1980 run six volts or a positive earth — we check that first. Price by arrangement.',
      },
    ],
    slotKop: 'Driving something older?',
    slotTekst:
      'Send a photo of your dashboard and tell us which car it is. We will tell you honestly what can be done — and what is better left alone.',
  },
};

export const PAGINAS = { de: DE, en: EN };

/** De inhoud van één taal. Nederlands heeft dit niet nodig: dat staat al in
 *  de gewone gegevensbestanden. */
export const paginasVan = (taal) => PAGINAS[taal] ?? PAGINAS.en;

export default PAGINAS;
