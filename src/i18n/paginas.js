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
      'Das Paket, mit dem Sie veraltete Navigation und klobige Handyhalterungen endgültig los sind. Wir integrieren Apple CarPlay und Android Auto zu hundert Prozent nahtlos in Ihr vorhandenes System. Spotify, Google Maps und Ihre Telefonate laufen einfach über das Originaldisplay und die Tasten an Ihrem Lenkrad.',
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
      'Weg mit den dünnen Papierlautsprechern ab Werk. Wir ersetzen die vorderen Lautsprecher durch ein kräftiges 2-Wege-Kompo-Set. Und wir tun mehr: die Vordertüren bekommen eine zweilagige Dämmung in Premiumqualität.',
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
      'Hochwertiges 2-Wege-Lautsprecherset, fahrzeugspezifisch eingebaut.',
      'Unsichtbarer, kompakter Subwoofer, angesteuert vom DSP-Verstärker.',
      'Dreilagige Dämmung der Vorder- und Hintertüren.',
      'Vollständig akustisch eingemessen.',
      'Batterie und Ladespannung gemessen, die Werte auf dem Auftragsschein.',
    ],
    cta: 'Executive anfragen',
    duur: 'Ihr Auto bleibt einen Werktag bei uns',
  },
  'reference-edition': {
    naam: "The Reference Edition",
    prijs: "3.695 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "3.054 € zzgl. MwSt.",
    tagline: 'Kompromisslose audiophile Perfektion.',
    short: 'Audiophile Perfektion für alle, die sich weigern, Kompromisse zu machen.',
    body:
      'Die höchste Stufe. Ein High-End-Verstärker mit eingebautem 10-Kanal-DSP, High-End-Lautsprecherkomponenten mit Phase Plug und ein Subwoofergehäuse, das für Ihr Fahrzeug gebaut und bezogen wird. Danach nehmen wir uns Stunden Zeit für die Abstimmung am Laptop — genau da entsteht der Unterschied, den man nicht mehr vergisst.',
    /* Deze vijf staan één op één in de Nederlandse prijslijst. Ze waren eerst
       samengevat tot vier vage regels, en juist de concrete details verkopen
       dit pakket: acht kanalen, op maat gebouwd, urenlange fase-afstemming. */
    features: [
      'High-End-Verstärker mit eingebautem 10-Kanal-DSP.',
      'High-End-Lautsprecherkomponenten mit Phase Plug.',
      'Lautsprecher hinten für Ihre Mitfahrer, bewusst zurückhaltend abgestimmt.',
      'Maßgefertigtes und bezogenes Subwoofergehäuse.',
      'Komplette Dämmung: alle Türen, der Boden und die Heckklappe.',
      'Stundenlange Abstimmung am Laptop: alles erreicht Ihre Ohren gleichzeitig.',
      'Batterie und Ladespannung gemessen, die Werte auf dem Auftragsschein.',
    ],
    cta: 'Reference anfragen',
    duur: 'Zwei bis drei Tage, inklusive Abstimmung',
  },
  /* Het duurste pakket. In het Duits mag dit gerust groot klinken: daar is
     "Wettbewerbsanlage" een begrip en showbouw een eigen wereld. */
  'competitie-show': {
    naam: "The Competition Build",
    prijs: "Preis auf Anfrage",
    prijsNoot: "Projekte beginnen bei rund 12.500 €",
    prijsExcl: "Inklusive MwSt. und Einbau",
    tagline: 'Für alle, die es zeigen wollen.',
    short: 'Wettbewerbs- und Showanlagen nach Maß, bei denen der Einbau selbst das Schaustück ist.',
    body:
      'Überall auf dieser Seite steht, dass man nichts davon sieht. Dieses Paket ist die Ausnahme, und genau das ist der Sinn. Eine Wettbewerbs- oder Showanlage wird gezeichnet, bevor die erste Schraube gesetzt wird: sichtbare Endstufen hinter Plexiglas, ein Kofferraum, der aufgeklappt eine ganze Anlage zeigt, und Gehäuse, die in Form und Bezug zum Interieur passen. Darunter steckt die Technik, die das trägt — mehrere Endstufen, vollaktive Ansteuerung und eine Abstimmung über mehrere Sitzungen. Das ist kein Paket, das man bestellt, sondern ein Projekt, das wir gemeinsam entwerfen.',
    features: [
      'Entwurf vorab, gemeinsam gezeichnet und besprochen.',
      'Sichtbarer Aufbau: Plexiglas, Beleuchtung und Bezug nach Maß.',
      'Mehrere Endstufen, vollaktiv pro Weg angesteuert.',
      'Handgebaute Gehäuse, passend zum Interieur.',
      'Abstimmung über mehrere Sitzungen, mit Messtechnik.',
      'Mindestens zwei Batterien, mit einer Ladeanlage, die das trägt.',
    ],
    cta: 'Projekt besprechen',
    duur: 'Eine Woche oder länger — nach Absprache',
    /* Geen balkjes maar drie regels; zie `uitgelicht` in site.js. */
    uitgelicht: [
      { label: 'Stil', waarde: 'Bewusst sichtbar statt versteckt' },
      { label: 'Entwurf', waarde: 'Vorab gezeichnet, gemeinsam bestimmt' },
      { label: 'Aufbau', waarde: 'Von Hand, komplett nach Maß' },
    ],
    vlag: 'Maßarbeit',
  },
  'accu-voeding': {
    naam: "Batterie & Stromversorgung",
    prijs: "395 €",
    prijsNoot: "Inklusive MwSt. und Einbau",
    prijsExcl: "326 € zzgl. MwSt.",
    tagline: 'Strom, der nicht einbricht.',
    short: 'Eine gesunde Batterie und eine kräftige Stromversorgung, damit Ihre Anlage bekommt, was sie braucht.',
    body:
      'Ein DSP-Verstärker mit Subwoofer zieht mehr Strom, als die Werksverkabelung je liefern musste. Bricht die Spannung ein, hören Sie das als schlaffen Bass und sehen es an flackernden Scheinwerfern. Wir ersetzen die Batterie durch eine passende AGM-Batterie, melden sie im Batteriemanagement an, verlegen ein stärkeres Hauptkabel mit Sicherung und verstärken die Masseverbindung. Die Spannung messen wir vorher und nachher, und diese Werte stehen auf Ihrem Auftragsschein.',
    features: [
      'AGM-Batterie, passend zu Ihrem Fahrzeug und Ihrer Anlage.',
      'Im Batteriemanagement angemeldet, also mit der richtigen Ladespannung.',
      'Stärkeres Hauptkabel mit Sicherung direkt an der Batterie.',
      'Verstärkte Masseverbindung zu Karosserie und Motorblock.',
      'Spannung vorher und nachher gemessen, die Werte auf dem Auftragsschein.',
    ],
    cta: 'Stromversorgung anfragen',
    duur: 'Fertig in etwa 2 Stunden',
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
      'The package that gets rid of dated built-in navigation and ugly stick-on phone holders for good. We integrate Apple CarPlay and Android Auto seamlessly into the system you already have. Spotify, Google Maps and your calls all run through the original screen and the buttons on your steering wheel.',
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
      'Out with the thin paper speakers the factory fitted. We replace the front speakers with a proper 2-way component set. And we do more than that: the front doors get two layers of premium sound deadening.',
    features: [
      'Premium 2-way component speakers.',
      'High-grade two-layer acoustic door damping.',
      'Solid, long-lasting mounting rings.',
      '100% invisible integration with the factory system.',
    ],
    /* Heette eerst "Ask about Basis", terwijl het pakket in het Engels
       "Acoustic Foundation" is. De knop wees dus naar een naam die nergens
       op de pagina stond. */
    cta: 'Ask about the Foundation',
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
      'For people who live in their car, and for anyone who actually listens. This is not a speaker upgrade but a complete rework of your vehicle acoustics. At its heart sits a digital signal processor: it drives every speaker separately and corrects the arrival times, so you end up sitting in the middle of the music rather than in front of it. Finished off with a subwoofer you cannot see but can certainly feel.',
    features: [
      'Advanced DSP amplifier (digital signal processor).',
      'High-grade 2-way speaker set, fitted to suit your car.',
      'Invisible, compact subwoofer, driven by the DSP amplifier.',
      'Three-layer damping of the front and rear doors.',
      'Fully measured and tuned to your car.',
      'Battery and charging voltage measured, figures on your job sheet.',
    ],
    cta: 'Ask about Executive',
    duur: 'Your car stays with us for one working day',
  },
  'reference-edition': {
    naam: "The Reference Edition",
    prijs: "€3,695",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "€3,054 excl. VAT",
    tagline: 'Audiophile perfection, no compromises.',
    short: 'Audiophile perfection for those who refuse to compromise.',
    body:
      'The top of the range. A high-end amplifier with a built-in 10-channel DSP, high-end speaker components with a phase plug, and a subwoofer enclosure built and trimmed for your car. Then we spend hours tuning it on a laptop — that is where the difference comes from, and it is not one you forget.',
    /* Deze vijf komen één op één uit de Nederlandse prijslijst. Ze waren eerst
       samengevat tot vier vage regels, terwijl juist de concrete details dit
       pakket verkopen. */
    features: [
      'High-end amplifier with a built-in 10-channel DSP.',
      'High-end speaker components with a phase plug.',
      'Rear speakers for your passengers, deliberately kept in the background.',
      'Custom-built and trimmed subwoofer enclosure.',
      'Complete damping: all doors, the floor and the tailgate.',
      'Hours of tuning on a laptop: everything reaches your ears at the same moment.',
      'Battery and charging voltage measured, figures on your job sheet.',
    ],
    cta: 'Ask about Reference',
    duur: 'Two to three days, tuning included',
  },
  'competitie-show': {
    naam: "The Competition Build",
    prijs: "Price on request",
    prijsNoot: "Projects start at around €12,500",
    prijsExcl: "VAT and fitting included",
    tagline: 'For the ones who want it seen.',
    short: 'Competition and show builds to order, where the installation itself is the showpiece.',
    body:
      'Everywhere else on this site we tell you that you will not see a thing. This package is the exception, and that is entirely the point. A competition or show build is drawn before a single screw goes in: amplifiers on display behind acrylic, a boot that opens onto a full installation, and enclosures shaped and trimmed to match the interior. Underneath sits the engineering that backs it up — multiple amplifiers, fully active on every way, and tuning spread over several sessions. This is not a package you order; it is a project we design together.',
    features: [
      'Design up front, drawn and agreed with you.',
      'Visible build: acrylic, lighting and trim to order.',
      'Multiple amplifiers, fully active on every way.',
      'Hand-built enclosures, matched to the interior.',
      'Tuning across several sessions, with measuring equipment.',
      'At least two batteries, with charging to match.',
    ],
    cta: 'Discuss your project',
    duur: 'A week or longer — by arrangement',
    uitgelicht: [
      { label: 'Style', waarde: 'Built to be seen, not hidden' },
      { label: 'Design', waarde: 'Drawn up front, agreed together' },
      { label: 'Build', waarde: 'By hand, entirely bespoke' },
    ],
    vlag: 'Bespoke',
  },
  'accu-voeding': {
    naam: "Battery & Power",
    prijs: "€395",
    prijsNoot: "VAT and fitting included",
    prijsExcl: "€326 excl. VAT",
    tagline: 'Power that does not sag.',
    short: 'A healthy battery and heavy wiring, so your system gets what it asks for.',
    body:
      'A DSP amplifier with a subwoofer draws more current than the factory wiring ever had to deliver. When the voltage sags you hear it as soft bass and see it in dimming headlights. We fit an AGM battery matched to your car, register it with the battery management so it charges properly, run a heavier main cable with a fuse and strengthen the earth connection. We measure the voltage before and after, and those figures go on your job sheet.',
    features: [
      'AGM battery, matched to your car and your system.',
      'Registered with the battery management, so it charges correctly.',
      'Heavier main cable with a fuse right at the battery.',
      'Strengthened earth connection to body and engine block.',
      'Voltage measured before and after, figures on your job sheet.',
    ],
    cta: 'Ask about Battery & Power',
    duur: 'Ready in about 2 hours',
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
      'Vier Pakete mit Festpreisen ab 695 €, inklusive Einbau und Mehrwertsteuer. Kabelloses CarPlay, Lautsprecher, DSP-Abstimmung und Dämmung.',
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
          'Gerade dann. Sie müssen keine Marken oder Wattzahlen kennen. Schicken Sie ein Foto und schreiben Sie, was Ihnen fehlt — zu wenig Bass, Stimmen, die untergehen, oder einfach der Eindruck, dass es blechern klingt. Den Rest übersetzen wir.',
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
        vraag: 'Wo sind Sie zu finden?',
        antwoord:
          'In Emmen im Nordosten der Niederlande, Charles Darwinstraat 35. Nur nach Vereinbarung, damit Sie nicht vor verschlossener Tür stehen und wir uns den Tag für Ihr Auto freihalten können.',
      },
    ],
  },

  over: {
    titel: 'Über uns — Justus, Audio Engineer in Emmen | Audio Upgrade Emmen',
    omschrijving:
      'Am Konservatorium zum Audio Engineer ausgebildet, seit 2018 im Audiobereich, und Fahrzeuginnenräume zerlegt, bevor es einen Führerschein gab.',
    eyebrow: 'Hinter Audio Upgrade Emmen',
    kop: 'Wer sind wir?',
    lead:
      'Sie lassen Ihr Auto einen Tag lang bei jemandem stehen, den Sie nicht kennen. Dann ist es nur recht, dass Sie vorher wissen, wer das ist.',
    adviesEyebrow: 'Auch außerhalb des Autos',
    adviesKop: 'Fragen Sie ruhig, auch ohne Auftrag',
    adviesAlineas: [
      'Unsicher bei einem Lautsprecherset, das Sie irgendwo gebraucht sehen? Wollen Sie wissen, warum Ihre Anlage zu Hause oder in der Werkstatt nicht so klingt, wie Sie gehofft hatten? Bauen Sie selbst etwas und kommen nicht weiter?',
      'Schreiben Sie einfach. Ich denke gern über Klang mit, im Auto und außerhalb davon. Da muss kein Auftrag dahinterstecken, und eine Rechnung kommt dafür auch nicht.',
    ],
    adviesKnop: 'Kurz schreiben',
    merkenEyebrow: 'Womit wir arbeiten',
    garantieEyebrow: 'Worauf Sie sich verlassen können',
    merkenKop: 'Marken wählen wir pro Auto',
    merkenTekst:
      'Keine Marke hängt an einem Paket: was eingebaut wird, hängt von Ihrem Auto, Ihrer Musik und Ihrem Budget ab. Wir verkaufen keine Marke, wir lösen ein Problem.',
  },

  contact: {
    titel: 'Kontakt und Anfahrt | Audio Upgrade Emmen',
    omschrijving:
      'Schicken Sie ein Foto Ihres Armaturenbretts über WhatsApp und erfahren Sie innerhalb von 24 Stunden, was möglich ist. Nur nach Vereinbarung.',
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
    titel: 'Oldtimer und Youngtimer | Audio Upgrade Emmen',
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
          'Packages start at €695, and that is an all-in price including VAT and fitting. There are no separate labour or call-out charges. What your own car will cost is in the quote, before any work starts.',
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
        vraag: 'Where are you based?',
        antwoord:
          'In Emmen, in the north-east of the Netherlands, at Charles Darwinstraat 35. By appointment only, so you never arrive at a closed door and we can keep the day free for your car.',
      },
    ],
  },

  over: {
    titel: 'About — Justus, audio engineer in Emmen | Audio Upgrade Emmen',
    omschrijving:
      'Trained as an audio engineer at a conservatoire, in audio since 2018, and taking car interiors apart before he had a driving licence.',
    eyebrow: 'Behind Audio Upgrade Emmen',
    kop: 'Who are we?',
    lead:
      'You are leaving your car for a day with someone you have never met. It is only fair that you know who that is first.',
    adviesEyebrow: 'Outside the car too',
    adviesKop: 'Ask us anything, even without a job',
    adviesAlineas: [
      'Unsure about a set of speakers you have found second-hand? Wondering why your system at home or in the workshop never sounds the way you hoped? Building something yourself and stuck halfway?',
      'Just send a message. I enjoy talking sound with people, in a car and well outside one. There does not need to be a job in it for me, and no invoice follows.',
    ],
    adviesKnop: 'Send a message',
    merkenEyebrow: 'What we work with',
    garantieEyebrow: 'What you can count on',
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
    titel: 'Classics and youngtimers | Audio Upgrade Emmen',
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
