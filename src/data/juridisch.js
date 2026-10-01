/**
 * DE JURIDISCHE PAGINA'S.
 *
 * De algemene voorwaarden zijn WOORD VOOR WOORD overgenomen van
 * audioupgradeemmen.nl. Daar zijn twee dingen in veranderd. De typefout
 * "ingespanned" is "ingespannen" geworden. En de aanbetaling in artikel 3
 * rekent nu over het totale offertebedrag in plaats van over de totale
 * materiaalkosten (Justus, september 2026), omdat hij op zijn offertes 40%
 * van het totaal vraagt en de voorwaarden daar ruimte voor moeten geven.
 *
 * DE GRENS VAN 50% IS EEN WETTELIJKE. Bij een consumentenkoop kan de koper
 * worden verplicht tot vooruitbetaling van "ten hoogste de helft van de
 * koopprijs" (artikel 7:26 lid 2 BW), en daarvan mag niet ten nadele van de
 * consument worden afgeweken (artikel 7:6 lid 1 BW). Zet hier dus nooit een
 * hoger percentage in en laat het woord "tot" staan: het is een maximum,
 * geen vast bedrag.
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
        'Audio Upgrade Emmen behoudt zich het recht voor om bij projecten een aanbetaling tot 50% van het totale offertebedrag te verlangen alvorens voertuigspecifieke onderdelen worden besteld of de Werkzaamheden starten. Meer dan de helft van het offertebedrag wordt nooit vooruit gevraagd.',
      ],
    },
    {
      kop: 'Artikel 4 — Herroepingsrecht bij overeenkomsten op afstand',
      lijst: [
        'Dit artikel geldt uitsluitend voor een Klant die consument is — een natuurlijke persoon die niet handelt voor zijn beroep of bedrijf — én die de overeenkomst op afstand heeft gesloten (per telefoon, e-mail of WhatsApp) of buiten de werkplaats. Voor een zakelijke Klant geldt dit artikel niet, ook niet wanneer de afspraak per WhatsApp is gemaakt. Komt de overeenkomst in de werkplaats van Audio Upgrade Emmen tot stand, dan bestaat er geen wettelijk herroepingsrecht. Is onduidelijk hoe de overeenkomst tot stand is gekomen, dan gaat Audio Upgrade Emmen ervan uit dat de Klant het herroepingsrecht heeft.',
        'De Klant mag de overeenkomst binnen **14 dagen** zonder opgave van redenen ontbinden. De wet noemt dat het herroepingsrecht; herroepen en ontbinden betekenen in dit artikel hetzelfde. Voor het gebruik van dat recht brengt Audio Upgrade Emmen geen boete, geen administratiekosten en geen vergoeding voor gereserveerde tijd in rekening: verrekend kunnen uitsluitend de bedragen worden die in dit artikel met naam worden genoemd.',
        'Gebruikt een Klant die consument is zijn herroepingsrecht, dan geldt uitsluitend dit artikel. Artikel 9 over annulering en no-show blijft dan buiten toepassing, en de 25% en de 50% die daar staan worden niet in rekening gebracht. Ook het onder zich houden van het Voertuig en de stallingskosten uit artikel 10, en de vrijgave tegen volledige betaling uit artikel 5, worden niet gebruikt tegen een Klant die zijn herroepingsrecht uitoefent. Van dit artikel kan niet ten nadele van die Klant worden afgeweken, ook niet langs artikel 2. Artikel 9 blijft onverkort gelden voor zakelijke Klanten en voor gevallen waarin geen herroepingsrecht bestaat.',
        'Zegt een Klant die consument is binnen de termijn af, dan geldt dat als een beroep op dit artikel, ook wanneer hij het woord herroepen niet gebruikt. Is onduidelijk wat hij bedoelt, dan behandelt Audio Upgrade Emmen het bericht als een herroeping en vraagt zij het na.',
        'Een opdracht die zowel de levering van onderdelen als de montage daarvan omvat, geldt op grond van artikel 6:230g lid 2 BW voor de vraag wanneer de bedenktijd begint uitsluitend als consumentenkoop. De termijn begint dan op de dag nadat de Klant het Voertuig met de gemonteerde apparatuur heeft ontvangen, en dus niet op de dag waarop de afspraak is gemaakt en niet op de dag waarop het werk begint. Betreft de opdracht uitsluitend een dienst zonder levering van onderdelen, zoals alleen het inmeten en afstellen van een bestaande installatie, dan begint de termijn op de dag na het sluiten van de overeenkomst. Wordt de opdracht over meer dan één bezoek of meer dan één levering verdeeld, dan begint de termijn pas op de dag nadat de Klant het Voertuig na het laatste bezoek heeft ontvangen, en geldt zij vanaf dat moment voor de hele opdracht.',
        'De Klant hoeft niet te wachten tot de termijn is begonnen: ook tussen het akkoord op de offerte en de inbouwdag kan hij de overeenkomst ontbinden. Is er op dat moment nog niets aan het Voertuig gedaan, dan is hij niets verschuldigd en wordt een aanbetaling volledig terugbetaald. Dat geldt ook wanneer de onderdelen al zijn besteld, al binnen zijn of al voor het Voertuig zijn klaargelegd: dat inkooprisico is van Audio Upgrade Emmen.',
        `Herroepen kan door dit binnen de termijn te melden via ${SITE.email} of WhatsApp. Iedere ondubbelzinnige verklaring volstaat en een reden hoeft de Klant niet te geven. De melding is tijdig wanneer zij op de laatste dag van de termijn is verzonden, ook als Audio Upgrade Emmen haar pas daarna leest.`,
        'Bij elke offerte die op afstand aan een consument wordt uitgebracht ontvangt de Klant, vóórdat hij aan de overeenkomst gebonden is, deze voorwaarden met dit artikel en het wettelijke modelformulier voor herroeping als bijlage. Het gebruik van dat formulier is niet verplicht: iedere ondubbelzinnige verklaring binnen de termijn volstaat.',
        'Bij een opdracht met onderdelen én montage is het werk vrijwel altijd al klaar voordat de bedenktijd begint: de Klant krijgt het Voertuig immers pas terug wanneer de apparatuur erin zit. Wenst de Klant dat Audio Upgrade Emmen met de Werkzaamheden begint en deze voltooit vóór het verstrijken van zijn bedenktijd, dan verzoekt hij daar vooraf uitdrukkelijk om, in zijn eigen woorden per e-mail of WhatsApp. Audio Upgrade Emmen vraagt dat verzoek per opdracht en bewaart het; een voorgedrukt vinkje of een standaardinstelling geldt niet als verzoek.',
        'Ontbindt de Klant de overeenkomst daarna alsnog, dan is hij voor de Werkzaamheden een bedrag verschuldigd dat evenredig is aan dat gedeelte van de verbintenis dat op het moment van de ontbinding door Audio Upgrade Emmen is nagekomen, berekend over de voor deze opdracht overeengekomen totaalprijs. Voor die berekening wordt geen uurtarief en geen urenopgave gebruikt: de bedragen op de offerte zijn all-in regelprijzen en dat is wat de Klant heeft aanvaard. De geleverde onderdelen blijven buiten die berekening, want die gaan terug. Audio Upgrade Emmen legt bij de oplevering vast welke Werkzaamheden zijn verricht en onderbouwt het bedrag aan de hand van wat op het moment van de ontbinding was uitgevoerd.',
        'Heeft de Klant niet uitdrukkelijk om die aanvang verzocht, of heeft Audio Upgrade Emmen hem over dat verzoek of over dat evenredige bedrag niet of onjuist geïnformeerd, dan is hij voor de Werkzaamheden **niets** verschuldigd, ook niet wanneer de installatie volledig is afgerond.',
        'Bij een ontbinding gaan de geleverde onderdelen terug naar Audio Upgrade Emmen en gaat het daarvoor betaalde bedrag terug naar de Klant. Dat geldt voor alle apparatuur uit het assortiment: luidsprekers, versterkers, DSP-versterkers, subwoofers, CarPlay- en navigatiesystemen, dashcams, kabelsets, kabelbomen, pasringen en wat daar verder bij hoort. Het geldt ook wanneer die onderdelen speciaal voor het Voertuig zijn ingekocht, wanneer de verpakking open is en wanneer ze daardoor niet meer als nieuw verkocht kunnen worden: dat inkooprisico is van Audio Upgrade Emmen. Alleen de waardevermindering uit het volgende lid kan worden verrekend.',
        'De Klant is wel aansprakelijk voor de waardevermindering van de geleverde onderdelen, voor zover hij er meer mee heeft gedaan dan nodig was om de aard, de kenmerken en de werking ervan vast te stellen. De maatstaf is wat in een winkel met een product mag: bekijken, aansluiten en beluisteren. Het beluisteren en controleren van de installatie bij de oplevering valt daar niet onder; het rijden met de installatie in de dagen daarna wel. Apparatuur die is ingebouwd, bedraad, weggewerkt, bereden en daarna weer uitgebouwd is tweedehands geworden, en die waardedaling komt voor rekening van de Klant. Audio Upgrade Emmen legt de staat van de apparatuur bij de oplevering en bij de terugname fotografisch vast, specificeert de waardevermindering per onderdeel met een onderbouwing, werkt niet met vaste percentages en verstrekt die opstelling schriftelijk voordat er iets wordt verrekend. Deze aansprakelijkheid betreft de waarde van de onderdelen en is geen vergoeding voor de verrichte Werkzaamheden. Heeft Audio Upgrade Emmen de Klant niet vooraf over zijn herroepingsrecht geïnformeerd, dan is hij deze waardevermindering niet verschuldigd.',
        'Ook voor de deurdemping en het ontdreuningsmateriaal kan de Klant ontbinden. Dat materiaal wordt op het plaatwerk verlijmd en is na verwijdering niet opnieuw te gebruiken. Kiest de Klant ervoor het te laten verwijderen, dan brengt Audio Upgrade Emmen daarvoor niets anders in rekening dan de waardevermindering uit het vorige lid; die is voor dat materiaal ten hoogste de waarde van het materiaal zelf, zonder het montagedeel van de betrokken offerteregel. Laat de Klant het materiaal liever zitten, dan ontbindt hij de overeenkomst voor die regel niet en blijft het bedrag van die regel verschuldigd; die keuze is aan de Klant en Audio Upgrade Emmen legt haar schriftelijk vast. Audio Upgrade Emmen houdt de demping daarom altijd als eigen regel op de offerte, zodat vooraf vaststaat over welk bedrag het ten hoogste kan gaan.',
        'Het herroepingsrecht geldt niet voor de levering van zaken die niet geprefabriceerd zijn en die worden vervaardigd op basis van een individuele keuze of beslissing van de Klant, dan wel duidelijk voor hem persoonlijk bestemd zijn. Bij Audio Upgrade Emmen zijn dat uitsluitend de op maat gebouwde subwooferbehuizingen, baffles, inbouwpanelen en showbouw. Zo’n onderdeel staat als eigen regel op de offerte, met bij die regel de vermelding dat daarvoor geen bedenktijd geldt; ontbreekt die vermelding, dan geldt de bedenktijd ook voor dat onderdeel. De uitzondering geldt uitsluitend voor dat onderdeel en niet voor de rest van de opdracht.',
        'Die uitzondering geldt uitdrukkelijk niet voor apparatuur uit het assortiment. Uitzoeken, samenstellen of inkopen is geen vervaardigen, en dat een onderdeel voor dit Voertuig is uitgezocht of besteld maakt het geen maatwerk. Een opdracht met een op maat gebouwde behuizing, een kant-en-klaar composet luidsprekers en montage kan dus volledig worden ontbonden, met uitzondering van die behuizing.',
        'Betreft de opdracht uitsluitend een dienst zonder levering van onderdelen, dan vervalt het herroepingsrecht zodra die dienst volledig is uitgevoerd, mits met de uitvoering is begonnen op uitdrukkelijk verzoek van de Klant en de Klant heeft erkend dat hij zijn herroepingsrecht verliest zodra de Werkzaamheden zijn afgerond. Audio Upgrade Emmen vraagt dat verzoek en die erkenning vooraf per e-mail of WhatsApp en bewaart ze bij de opdracht. Omvat de opdracht ook de levering van onderdelen, dan geldt die uitzondering niet: de termijn gaat dan pas lopen bij de oplevering van het Voertuig en loopt daarna door.',
        'Na de melding biedt de Klant het Voertuig binnen **14 dagen** op afspraak aan in de werkplaats, zodat Audio Upgrade Emmen de geleverde apparatuur kan uitbouwen; de Klant hoeft de onderdelen niet zelf te verwijderen. De Klant is op tijd wanneer hij binnen die 14 dagen om een afspraak vraagt; kan Audio Upgrade Emmen hem niet binnen die termijn inplannen, dan schuift de termijn op en wordt dat de Klant niet aangerekend. De rechtstreekse kosten van het terugbrengen draagt de Klant: omdat een ingebouwde installatie nooit per post terug kan, bestaan die kosten uit het zelf naar de werkplaats rijden, of, moet het Voertuig worden vervoerd, uit de werkelijke vervoerskosten. Is de overeenkomst buiten de werkplaats gesloten en heeft Audio Upgrade Emmen het Voertuig bij de Klant afgeleverd, dan draagt Audio Upgrade Emmen die kosten. Voor het uitbouwen zelf brengt Audio Upgrade Emmen niets in rekening, en zij rekent geen voorrij- of afhaalkosten.',
        'De bij de inbouw verwijderde originele onderdelen, zoals de fabrieksluidsprekers, de fabrieksversterker en originele panelen, bewaart Audio Upgrade Emmen tot de bedenktijd is verstreken, en bij een ontbinding plaatst zij ze kosteloos terug. Heeft de Klant onderdelen zelf meegenomen, dan levert hij ze bij het terugbrengen aan. Zijn originele onderdelen niet meer beschikbaar, dan leggen partijen dat bij de terugname samen vast. Bij het uitbouwen kunnen bevestigingspunten, kabeldoorvoeren of lijmresten zichtbaar blijven; Audio Upgrade Emmen werkt het Voertuig zo netjes af als redelijkerwijs mogelijk is, legt de staat bij de terugname vast en draagt de kosten daarvan. Artikel 6 en artikel 7 brengen bij een ontbinding geen kosten voor de Klant mee.',
        'Behoudens het volgende lid betaalt Audio Upgrade Emmen alles terug wat zij van de Klant heeft ontvangen, de aanbetaling daaronder begrepen, onverwijld en uiterlijk **14 dagen** na de dag waarop de Klant zijn ontbinding heeft gemeld. Dat gebeurt met hetzelfde betaalmiddel waarmee de Klant heeft betaald, tenzij hij uitdrukkelijk met een ander middel instemt, en zonder kosten voor hem. Een tegoedbon of een korting op een volgende opdracht komt niet in de plaats van terugbetaling.',
        'Zijn er onderdelen in het Voertuig gemonteerd, dan mag Audio Upgrade Emmen met de terugbetaling wachten totdat zij die onderdelen heeft terugontvangen, of totdat de Klant het Voertuig daarvoor in de werkplaats heeft aangeboden, wat van die twee het eerst gebeurt. Is er nog niets gemonteerd, dan geldt onverkort de termijn van het vorige lid. Van het terug te betalen bedrag gaan uitsluitend de waardevermindering en het eventuele evenredige bedrag uit dit artikel af, elk met de onderbouwing erbij.',
        'Behoudens de in dit artikel genoemde bedragen is de Klant wegens de uitoefening van zijn herroepingsrecht geen kosten verschuldigd. Dit artikel beoogt de wettelijke regeling van het herroepingsrecht weer te geven; wijkt het daarvan op enig punt ten nadele van de Klant af, dan geldt de wet.',
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
