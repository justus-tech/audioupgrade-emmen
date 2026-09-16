/**
 * DE JURIDISCHE PAGINA'S.
 *
 * De algemene voorwaarden zijn WOORD VOOR WOORD overgenomen van
 * audioupgradeemmen.nl. Daar is één ding in veranderd: de typefout
 * "ingespanned" is "ingespannen" geworden.
 *
 * Het privacy- en cookiebeleid zijn wél herschreven, en dat moest ook. De
 * oude teksten beschrijven Squarespace en Calendly, en die draaien deze site
 * niet meer. Een privacyverklaring die partijen noemt die je niet gebruikt is
 * niet alleen onnodig, hij is onjuist — en daarmee precies het tegenovergestelde
 * van wat de AVG vraagt.
 *
 * De nieuwe site heeft een aanzienlijk eenvoudiger verhaal: hij zet géén
 * cookies en stuurt geen persoonsgegevens naar een server. Sinds augustus
 * 2026 telt hij wel het bezoek, met Cloudflare Web Analytics — zonder
 * cookies, zonder IP-adres, zonder herkenning bij een volgend bezoek. Zet je
 * die teller ooit uit of om, pas dan artikel 1 van het cookiebeleid en
 * artikel 2 van het privacybeleid aan. Een privacyverklaring die niet klopt
 * is erger dan geen.
 *
 * DE TWEE ADRESSEN (door Justus bevestigd op 24 augustus 2026): post gaat
 * naar Vinkenveld 9, bezoek en werkplaats zijn Charles Darwinstraat 35. In
 * artikel 1 staan ze allebei, met erbij waarvoor ze zijn. Er is geen postbus.
 *
 * LET OP: dit is een concept, geen juridisch advies. Laat de voorwaarden een
 * keer nalezen door iemand met verstand van zaken — het is het enige stuk op
 * de site waar je aan vastzit.
 */
import { SITE, ADRES, POSTADRES } from './site.js';

/** Wanneer deze teksten voor het laatst zijn nagelopen. */
export const BIJGEWERKT = 'augustus 2026';

export const ALGEMENE_VOORWAARDEN = {
  slug: 'algemene-voorwaarden',
  titel: 'Algemene voorwaarden | Audio Upgrade Emmen',
  beschrijving:
    'De algemene voorwaarden van Audio Upgrade Emmen: offertes, betaling, uitvoering, aansprakelijkheid, garantie en annulering.',
  kop: 'Algemene voorwaarden',
  intro: `Deze voorwaarden gelden voor alles wat wij voor je doen. Ze staan hier volledig, zodat je vooraf weet waar je aan toe bent. Heb je er een vraag over, stel hem gerust via ${SITE.email}.`,
  artikelen: [
    {
      kop: 'Artikel 1 — Definities',
      lijst: [
        `**Audio Upgrade Emmen**: de eenmanszaak gevestigd te Emmen, ingeschreven bij de Kamer van Koophandel onder nummer ${SITE.kvk}.`,
        '**Klant**: de natuurlijke persoon (consument) of rechtspersoon (B2B) die een overeenkomst aangaat met Audio Upgrade Emmen.',
        '**Voertuig**: de auto of bedrijfswagen van de Klant waaraan de Werkzaamheden worden uitgevoerd.',
        '**Werkzaamheden**: het inbouwen, afstellen, repareren en leveren van car-audioapparatuur, DSP-versterkers, bekabeling, dashcams en akoestische dempingsmaterialen.',
      ],
    },
    {
      kop: 'Artikel 2 — Toepasselijkheid',
      lijst: [
        'Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten, uitgevoerde Werkzaamheden en geleverde producten door Audio Upgrade Emmen.',
        'Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien deze uitdrukkelijk en schriftelijk (waaronder begrepen per e-mail of WhatsApp) tussen beide partijen zijn overeengekomen.',
        'Eventuele algemene (inkoop)voorwaarden van een zakelijke Klant worden uitdrukkelijk van de hand gewezen.',
      ],
    },
    {
      kop: 'Artikel 3 — Offertes en overeenkomsten',
      lijst: [
        'Alle offertes en prijsopgaven van Audio Upgrade Emmen zijn vrijblijvend en hebben een geldigheidsduur van 30 dagen, tenzij schriftelijk anders aangegeven.',
        'Een overeenkomst komt bindend tot stand zodra de Klant mondeling, schriftelijk of digitaal (per e-mail of WhatsApp) akkoord gaat met de offerte, of wanneer er een definitieve inbouwdatum wordt vastgelegd.',
        'Audio Upgrade Emmen behoudt zich het recht voor om bij projecten een aanbetaling tot 50% van de totale materiaalkosten te verlangen alvorens voertuigspecifieke onderdelen worden besteld of de Werkzaamheden starten.',
      ],
    },
    {
      kop: 'Artikel 4 — Herroepingsrecht bij overeenkomsten op afstand',
      lijst: [
        'Dit artikel geldt uitsluitend voor Klanten die consument zijn én die de overeenkomst op afstand hebben gesloten (per telefoon, e-mail of WhatsApp) of buiten de verkoopruimte. Komt de overeenkomst tot stand in de werkplaats van Audio Upgrade Emmen zelf, dan bestaat er geen wettelijk herroepingsrecht.',
        'De consument heeft het recht de overeenkomst binnen **14 dagen** zonder opgave van redenen te ontbinden. Deze termijn begint voor diensten op de dag na het sluiten van de overeenkomst, en voor losse producten op de dag na ontvangst daarvan.',
        'Wenst de Klant dat de Werkzaamheden al binnen die 14 dagen beginnen, dan verzoekt hij daar uitdrukkelijk om. Ontbindt de Klant de overeenkomst daarna alsnog, dan is hij een bedrag verschuldigd dat evenredig is aan hetgeen op dat moment al is geleverd: het reeds verrichte werk tegen het geldende uurtarief, en de speciaal voor het Voertuig bestelde onderdelen.',
        'Het herroepingsrecht vervalt zodra de dienst volledig is uitgevoerd, mits met de uitvoering is begonnen op uitdrukkelijk verzoek van de Klant en de Klant heeft erkend dat hij zijn herroepingsrecht verliest zodra de Werkzaamheden zijn afgerond.',
        'Het herroepingsrecht geldt niet voor producten die volgens specificaties van de Klant zijn vervaardigd of duidelijk voor een specifiek persoon zijn bestemd, zoals op maat gebouwde subwooferbehuizingen en showbouw.',
        `Herroepen kan door dit binnen de termijn te melden via ${SITE.email} of WhatsApp. Reeds betaalde bedragen worden binnen 14 dagen na de melding terugbetaald, onder aftrek van het in dit artikel bedoelde evenredige bedrag.`,
      ],
    },
    {
      kop: 'Artikel 5 — Prijzen en betaling',
      lijst: [
        'Voor consumenten worden prijzen inclusief btw vermeld. Voor zakelijke klanten (B2B) worden prijzen exclusief btw vermeld.',
        'Betaling dient te geschieden direct bij de oplevering en overdracht van het Voertuig via pin of betaalverzoek, tenzij vooraf uitdrukkelijk en schriftelijk een betalingstermijn op factuur is overeengekomen.',
        'Het Voertuig wordt pas door Audio Upgrade Emmen aan de Klant vrijgegeven nadat de volledige betaling (of de afgesproken deelfactuur) door Audio Upgrade Emmen is ontvangen.',
      ],
    },
    {
      kop: 'Artikel 6 — Uitvoering van de werkzaamheden en demontage',
      lijst: [
        'Audio Upgrade Emmen voert de Werkzaamheden uit naar beste inzicht, vakmanschap en conform de geldende normen van de branche.',
        'De Klant is verplicht het Voertuig bezemvrij, schoon (interieur en exterieur) en volledig vrij van losse, waardevolle eigendommen aan te leveren. Audio Upgrade Emmen is nimmer aansprakelijk voor het verlies of diefstal van losse eigendommen die in het Voertuig zijn achtergelaten.',
        '**Risico bij demontage**: de Klant is ermee bekend dat bij het demonteren van interieurpanelen (met name bij oudere, gemodificeerde of door de zon uitgedroogde voertuigen) plastic bevestigingsclips of panelen kunnen scheuren of afbreken. Universele clips worden door Audio Upgrade Emmen kosteloos vervangen. Specifieke, merkgebonden panelen of componenten die door ouderdom, eerdere demontage door derden, of materiële slijtage defect raken, vallen buiten de aansprakelijkheid van Audio Upgrade Emmen, tenzij er sprake is van aantoonbare grove nalatigheid door Audio Upgrade Emmen.',
        'Audio Upgrade Emmen controleert voorafgaand aan de Werkzaamheden de basisfuncties van het Voertuig. Reeds aanwezige schades, krassen of elektronische storingsmeldingen worden vooraf vastgelegd en vallen buiten de verantwoordelijkheid van Audio Upgrade Emmen.',
      ],
    },
    {
      kop: 'Artikel 7 — Aansprakelijkheid en risicobeperking',
      lijst: [
        'De totale aansprakelijkheid van Audio Upgrade Emmen wegens een toerekenbare tekortkoming in de nakoming van de overeenkomst of uit enige andere hoofde, is te allen tijde beperkt tot het bedrag dat de bedrijfsaansprakelijkheidsverzekering (AVB) in het desbetreffende geval uitkeert, vermeerderd met het eigen risico van Audio Upgrade Emmen, en bedraagt in geen enkel geval meer dan een absoluut maximum van € 50.000,-.',
        'Audio Upgrade Emmen is uitsluitend aansprakelijk voor directe schade aan het Voertuig die het rechtstreekse en aantoonbare gevolg is van de Werkzaamheden. Aansprakelijkheid voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie van de Klant is uitdrukkelijk uitgesloten.',
        'Audio Upgrade Emmen voert geen testritten of voertuigverplaatsingen op de openbare weg uit. Indien het Voertuig voor de uitvoering van de Werkzaamheden op het terrein van de werklocatie verplaatst moet worden, gebeurt dit uitsluitend op risico van de Klant. De Klant dient zorg te dragen voor een geldige WA/Casco-verzekering voor het Voertuig.',
        'Audio Upgrade Emmen is niet aansprakelijk voor softwarematige fouten, bugs, of updates van de voertuigfabrikant die na de installatie optreden. Indien een derde partij (zoals een autodealer) een software-update of reset uitvoert waardoor klankinstellingen of DSP-profielen verloren gaan, valt het herstel hiervan buiten de garantie en wordt dit tegen het geldende uurtarief uitgevoerd.',
      ],
    },
    {
      kop: 'Artikel 8 — Garantie',
      lijst: [
        "Op alle geleverde hardware (luidsprekers, versterkers, subwoofers, DSP's) is de wettelijke fabrieksgarantie van de desbetreffende fabrikant of importeur van toepassing (veelal 1 of 2 jaar).",
        'Op de door Audio Upgrade Emmen uitgevoerde installatiewerkzaamheden en aangelegde bekabeling wordt een **levenslange garantie** verleend. Deze garantie is strikt persoonsgebonden en vervalt onmiddellijk zodra het Voertuig van eigenaar wisselt.',
        'Elke aanspraak op garantie vervalt onmiddellijk indien de Klant of een derde partij zelf aanpassingen, reparaties of wijzigingen heeft aangebracht in de hardware, software-instellingen (zoals DSP-tuning) of de aangelegde bekabeling.',
        'Elke aanspraak op garantie vervalt eveneens indien er sprake is van defecten door verkeerd gebruik, overbelasting (zoals het opblazen van speakers door oversturing of clipping), externe vochtschade, of schade door externe ongevallen.',
      ],
    },
    {
      kop: 'Artikel 9 — Annulering en no-show',
      lijst: [
        'Het kosteloos annuleren of verzetten van een inbouwafspraak is mogelijk tot uiterlijk 14 dagen voor de afgesproken inbouwdatum.',
        'Bij annulering of verplaatsing binnen 14 dagen voor de inbouwdatum is Audio Upgrade Emmen gerechtigd om 25% van het totale offertebedrag in rekening te brengen ter dekking van gereserveerde tijd en speciaal voor de Klant bestelde materialen.',
        'Indien de Klant zonder voorafgaande schriftelijke afmelding niet verschijnt op de afgesproken inbouwdatum (no-show), wordt 50% van het totale offertebedrag in rekening gebracht.',
      ],
    },
    {
      kop: 'Artikel 10 — Eigendomsvoorbehoud en retentierecht',
      lijst: [
        'Alle door Audio Upgrade Emmen geleverde, gemonteerde en ingebouwde componenten blijven het volledige eigendom van Audio Upgrade Emmen totdat de Klant aan alle betalingsverplichtingen uit de overeenkomst heeft voldaan.',
        'Audio Upgrade Emmen heeft het recht om het retentierecht uit te oefenen op het Voertuig indien de Klant tekortschiet in de betaling van de Werkzaamheden. Audio Upgrade Emmen mag het Voertuig onder zich houden (op risico en stallingskosten van de Klant) totdat de volledige betaling, inclusief eventuele bijkomende stallingskosten, is voldaan.',
      ],
    },
    {
      kop: 'Artikel 11 — Overmacht',
      lijst: [
        'Audio Upgrade Emmen is niet gehouden tot het nakomen van enige verplichting indien zij daartoe gehinderd wordt als gevolg van overmacht. Onder overmacht wordt in elk geval verstaan: ziekte van de sleutelfiguur binnen de eenmanszaak, extreme weersomstandigheden, stroomstoringen, acute leveringsproblemen bij toeleveranciers en overheidsmaatregelen.',
        'In geval van overmacht worden de verplichtingen opgeschort en zal Audio Upgrade Emmen in overleg met de Klant zo spoedig mogelijk een nieuwe inbouwdatum inplannen.',
      ],
    },
    {
      kop: 'Artikel 12 — Toepasselijk recht en geschillen',
      lijst: [
        'Op alle rechtsbetrekkingen waarbij Audio Upgrade Emmen partij is, is uitsluitend het Nederlands recht van toepassing.',
        'Partijen zullen pas een beroep op de rechter doen nadat zij zich tot het uiterste hebben ingespannen om het geschil in onderling overleg op te lossen.',
        'Geschillen die niet in onderling overleg kunnen worden opgelost, zullen uitsluitend worden voorgelegd aan de bevoegde rechter in het arrondissement Noord-Nederland, locatie Emmen.',
      ],
    },
  ],
};

export const PRIVACYBELEID = {
  slug: 'privacybeleid',
  titel: 'Privacybeleid | Audio Upgrade Emmen',
  beschrijving:
    'Wat Audio Upgrade Emmen met je gegevens doet. Deze website zet geen cookies, meet alleen anoniem hoeveel bezoek er is en slaat je kenteken nergens op.',
  kop: 'Privacybeleid',
  intro:
    'Wij nemen je privacy net zo serieus als de afwerking van onze inbouw. Hieronder staat precies wat we met je gegevens doen, waarom, en welke rechten je hebt. De korte versie: deze website herkent je niet en volgt je niet, en wat je ons stuurt gebruiken we alleen om je auto te kunnen helpen.',
  artikelen: [
    {
      kop: '1. Wie zijn wij',
      alineas: [
        `Audio Upgrade Emmen. Post: ${POSTADRES}. Werkplaats en bezoekadres: ${ADRES}, uitsluitend op afspraak. KvK-nummer ${SITE.kvk}, btw-nummer ${SITE.btw}. Voor alle vragen over privacy: ${SITE.email}.`,
      ],
    },
    {
      kop: '2. Deze website herkent je niet',
      alineas: [
        'Wij tellen wel hoeveel mensen de site bezoeken en welke pagina\'s ze bekijken, maar we kunnen niet zien wie je bent. Dat doen we met Cloudflare Web Analytics: geen cookies, geen opgeslagen IP-adres, en geen kenmerk waaraan je bij een volgend bezoek herkend wordt. Wat we precies zien staat in het cookiebeleid.',
        'Verder staan er geen advertentiepixels of trackers op de site. Het zijn vaste pagina\'s zonder server die iets over jou bijhoudt.',
      ],
      lijst: [
        '**Je kenteken** wordt door je eigen browser rechtstreeks naar de open data van de RDW gestuurd. Wij zien dat verzoek niet en ontvangen het antwoord niet. Het kenteken blijft in het geheugen van je tabblad staan zodat de volgende pagina je auto kan tonen, en verdwijnt zodra je dat tabblad sluit.',
        '**De kaart op de contactpagina** laadt pas nadat je zelf op "Toon kaart" klikt. Doe je dat, dan gaat er een verzoek naar Google en gelden vanaf dat moment de voorwaarden van Google. Klik je niet, dan gebeurt er niets.',
      ],
    },
    {
      kop: '3. Welke gegevens verwerken we wél, en waarom',
      alineas: [
        'Zodra je zelf contact opneemt via WhatsApp, e-mail of telefoon, verwerken wij wat je ons stuurt:',
      ],
      lijst: [
        '**Naam, e-mailadres en telefoonnummer**: nodig om je afspraak te bevestigen, contact te houden over de inbouw en de factuur te versturen.',
        '**Voertuiggegevens (kenteken, merk, model en bouwjaar)**: nodig om te controleren wat er technisch kan, om de juiste voertuigspecifieke kabelbomen en pasringen voor te bereiden, en om onze persoonsgebonden levenslange garantie op inbouwwerkzaamheden te kunnen registreren.',
        '**Betaalgegevens (IBAN)**: uitsluitend in onze bankomgeving en boekhouding, wanneer je een factuur of aanbetaling voldoet.',
      ],
      naAlineas: [
        'De wettelijke grondslag: wij verwerken deze gegevens omdat dat nodig is om de overeenkomst uit te voeren en om te voldoen aan onze wettelijke administratieplicht.',
      ],
    },
    {
      kop: '4. Wie heeft toegang tot je gegevens',
      alineas: [
        'Alleen Audio Upgrade Emmen. Wij verkopen je gegevens nooit aan derden voor commerciële doeleinden.',
        'Voor de bedrijfsvoering gebruiken wij externe partijen die noodzakelijkerwijs gegevens verwerken: onze bank en boekhoudsoftware voor de verplichte financiële administratie, en de aanbieder van onze e-mail en WhatsApp voor het contact dat via die kanalen loopt. Met deze partijen gelden verwerkersovereenkomsten of standaard contractbepalingen.',
      ],
    },
    {
      kop: '5. Hoe lang bewaren we je gegevens',
      lijst: [
        '**Facturen en financiële administratie**: 7 jaar, omdat de Belastingdienst dat verplicht.',
        '**Klant- en voertuiggegevens**: omdat wij levenslange garantie geven op onze inbouwwerkzaamheden zolang het voertuig in jouw bezit is, bewaren wij de inbouwhistorie gekoppeld aan je naam en kenteken. Verkoop je het voertuig, dan vervalt die garantie en kun je ons vragen deze gegevens te verwijderen.',
        '**Vrijblijvende contactaanvragen**: als er geen overeenkomst tot stand komt, verwijderen we je gegevens uiterlijk na een jaar.',
      ],
    },
    {
      kop: '6. Beveiliging',
      alineas: [
        'De website werkt uitsluitend over een beveiligde verbinding (HTTPS). Onze digitale systemen zijn beveiligd met sterke wachtwoorden en tweestapsverificatie. Omdat de website zelf geen gegevens opslaat, valt er via de site ook niets te ontvreemden.',
      ],
    },
    {
      kop: '7. Je rechten',
      alineas: [
        'Onder de AVG heb je het recht om je gegevens in te zien, te laten aanpassen of te laten wissen, en het recht om ze in een standaardformaat overgedragen te krijgen.',
      ],
      naAlineas: [
        `Wil je daar gebruik van maken, stuur dan een e-mail naar ${SITE.email}. We reageren zo snel mogelijk, uiterlijk binnen 30 dagen. Ben je het niet eens met hoe wij met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.`,
      ],
    },
  ],
};

export const COOKIEBELEID = {
  slug: 'cookiebeleid',
  titel: 'Cookiebeleid | Audio Upgrade Emmen',
  beschrijving:
    'Deze website zet geen cookies. Wat we wel meten en wat er op je apparaat wordt bewaard, staat hier uitgelegd.',
  kop: 'Cookiebeleid',
  intro:
    'Deze website zet geen cookies. Daarom zie je hier ook geen banner die om toestemming vraagt: er valt niets toe te staan of te weigeren. Toch leggen we hieronder uit wat we wél meten en wat er op je apparaat wordt bewaard, want dat is niet helemaal niets.',
  artikelen: [
    {
      kop: '1. Bezoekersaantallen, zonder cookies',
      alineas: [
        'We tellen hoeveel mensen de site bezoeken en welke pagina\'s ze bekijken. Dat doen we met Cloudflare Web Analytics. Daarbij worden geen cookies gezet, wordt je IP-adres niet bewaard en krijg je geen kenmerk mee waaraan je bij een volgend bezoek herkend wordt. Je bent voor ons dus geen persoon maar een streepje.',
        'Wat we zien: hoeveel bezoeken er waren, welke pagina\'s zijn bekeken, uit welk land of welke regio ze kwamen, of het een telefoon of een computer was, en via welke site of zoekmachine iemand binnenkwam. Meer niet — en die gegevens zijn niet naar jou terug te leiden.',
        'Er staan geen advertentiepixels op de site en er is geen koppeling met Google Analytics, Meta of welke advertentiepartij dan ook.',
      ],
    },
    {
      kop: '2. Alles wat je ziet komt van deze site',
      alineas: [
        'Lettertypen, afbeeldingen en scripts staan allemaal op onze eigen server. Je browser hoeft dus nergens anders aan te kloppen om deze pagina te tonen, en er gaat geen enkel gegeven van jou naar een andere partij.',
        'Dat is bewust. Veel websites laden hun lettertypen rechtstreeks bij Google, waarmee het IP-adres van elke bezoeker naar Google gaat zonder dat iemand daar iets van merkt. Wij deden dat eerst ook; sinds augustus 2026 niet meer.',
      ],
    },
    {
      kop: '3. Wat er wel op je apparaat wordt bewaard',
      alineas: [
        'Twee dingen, en allebei blijven ze op je eigen apparaat: je kenteken zolang je tabblad openstaat, en je keuze voor licht of donker. Het eerste zorgt dat de volgende pagina weet om welke auto het gaat, het tweede dat de site er bij een volgend bezoek hetzelfde uitziet.',
        'Technisch zijn dit geen cookies maar lokale opslag. Het verschil: cookies gaan bij elk bezoek automatisch mee naar een server, dit niet. Wij kunnen er dus ook niet bij.',
      ],
    },
    {
      kop: '4. De kaart op de contactpagina',
      alineas: [
        'Op de contactpagina staat een kaart van Google. Die laadt bewust niet vanzelf: je ziet eerst een knop. Klik je erop, dan wordt de kaart bij Google opgehaald en kan Google op dat moment cookies plaatsen. Dat is jouw keuze, en daarom staat die knop er.',
        'Wil je dat niet, dan kun je in plaats daarvan de routelink gebruiken. Die opent Google Maps pas in een nieuw venster, buiten deze site om.',
      ],
    },
    {
      kop: '5. Zelf beheren',
      alineas: [
        'Je kunt alles wat websites op je apparaat bewaren op elk moment verwijderen via de instellingen van je browser. Bij deze site verlies je daarmee hooguit je voorkeur voor licht of donker.',
      ],
    },
  ],
};

export const JURIDISCHE_PAGINAS = [ALGEMENE_VOORWAARDEN, PRIVACYBELEID, COOKIEBELEID];

export default JURIDISCHE_PAGINAS;
