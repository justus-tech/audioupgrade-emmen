# Audio Upgrade Emmen

De website van Audio Upgrade Emmen: car audio, CarPlay-inbouw, DSP-tuning en
akoestische demping in Emmen.

Dit is een **statische site**. Er is geen server en geen database — alles wordt
vooraf omgezet naar kant-en-klare pagina's. Dat maakt hem snel, goedkoop om te
hosten en vrijwel onmogelijk om te hacken.

---

## Snel beginnen

Je hebt [Node.js](https://nodejs.org) nodig (versie 20 of hoger). Daarna:

```bash
npm install
npm run dev
```

Open daarna `http://localhost:4321` in je browser. Pas je iets aan, dan zie je
het meteen — je hoeft niets opnieuw te starten.

## De commando's

| Commando | Wat het doet |
| --- | --- |
| `npm run dev` | Start de site op je eigen computer om aan te werken |
| `npm run build` | Bouwt de definitieve site in de map `dist/` |
| `npm test` | Bouwt de site en controleert alles (± 30 seconden) |
| `npm run test:snel` | Alleen de snelle controles, zonder bouwen (± 2 seconden) |
| `npm run rdw` | Kijkt bij de RDW hoeveel auto's de site herkent |
| `npm run schermafdrukken` | Maakt plaatjes van de pagina's in `shots/` |

**Draai `npm test` voordat je iets naar GitHub stuurt.** Er zitten 275 controles
in die dingen vangen die je zelf niet ziet: een kapotte link, een prijs die op
één plek is blijven staan, een knop die op de telefoon over de rand valt.

---

## Waar staat wat

```
src/
  pages/        Elke pagina van de site. De bestandsnaam is het webadres:
                upgrades.astro wordt /upgrades
  components/   Stukken die op meerdere pagina's terugkomen (knoppen,
                kaarten, de kentekenplaat)
  layouts/      Base.astro — het raamwerk om élke pagina heen
  data/         ALLE TEKST EN PRIJZEN. Hier pas je inhoud aan.
  lib/          Het rekenwerk: kentekens, kleuren, RDW-gegevens
  styles/       global.css — de opmaak voor de hele site
  assets/       Afbeeldingen die door de site verwerkt worden

tests/          De controles. Draaien met npm test
scripts/        Losse hulpprogramma's die je zelf start
public/         Bestanden die ongewijzigd op de site komen (favicon)
```

### De belangrijkste bestanden

| Wil je dit aanpassen? | Open dit bestand |
| --- | --- |
| Een prijs of pakkettekst | `src/data/site.js` |
| Adres, telefoon, e-mail | `src/data/site.js` |
| Tekst die op élke modelpagina staat | `src/data/generiek.js` |
| Een specifiek automodel | `src/data/modellen/<merk>.js` |
| Het verhaal bij een merk | `src/data/merken.js` |
| Kleuren | `src/data/brand.js` |
| Algemene voorwaarden, privacy | `src/data/juridisch.js` |

---

## Veelvoorkomende klusjes

### Een prijs aanpassen

Open `src/data/site.js`, zoek het pakket en pas `price` aan. Staat er ook een
`bedrag` bij, pas die dan mee aan — dat is hetzelfde bedrag zonder opmaak, voor
Google en AI-assistenten.

Er staat een test op de prijzen. Draai `npm test`: die klaagt dat de prijs is
veranderd. Dat is de bedoeling — het dwingt je om even te bevestigen dat het
klopt. Pas daarna de verwachte prijs aan in `tests/data.test.js`.

### Een nieuw automodel toevoegen

1. Open `src/data/modellen/<merk>.js` (of maak het bestand aan als het merk
   nieuw is en voeg het toe in `src/data/modellen/index.js`).
2. Kopieer een bestaand model en pas alles aan.
3. **De volgorde telt.** De kenteken-check pakt de eerste treffer, dus een
   specifiek model hoort bóven een algemener model: "Range Rover Sport" vóór
   "Range Rover".
4. Voeg een geval toe aan `tests/gevallen.js` met de RDW-schrijfwijze.
5. `npm test`

### Tekst aanpassen

Bijna alle tekst staat in `src/data/`. Zoek de zin met de zoekfunctie van je
editor en pas hem aan. Sla op, en je ziet het meteen in de browser.

---

## Hoe de kenteken-check werkt

De bezoeker typt zes tekens. Zijn browser vraagt daarmee rechtstreeks bij de
[open data van de RDW](https://opendata.rdw.nl) op welke auto dat is. Die
gegevens komen nooit bij ons langs.

Daarna gebeurt er één van twee dingen:

- **Kennen we het model?** Dan gaat hij naar die modelpagina, met zijn eigen
  kenteken bovenaan als bevestiging.
- **Kennen we het niet?** Dan gaat hij naar `/upgrades`, waar de naam
  rechtstreeks uit de RDW komt. Dat werkt voor élke auto in Nederland.

### Waarom er patronen in de data staan

De RDW schrijft modelnamen niet zoals mensen praten. Een BMW 3-serie staat er
als `3ER REIHE` of gewoon `320I`, een Mercedes C-klasse als `C 180`. Daarom
staat er per model een patroon (`matchers`) in plaats van een naam.

**Twee valkuilen:**

1. Gebruik geen `\b` direct achter een cijfer. Tussen de `0` en de `I` van
   `320I` ligt geen woordgrens, dus `/^3\d{2}\b/` matcht niet. Gebruik `(?!\d)`.
2. Een patroon dat te breed is, is erger dan een patroon dat ontbreekt. Een
   Mercedes CLA mag geen C-klasse worden. Daarom staan er in `tests/gevallen.js`
   vooral gevallen die júíst niet mogen matchen.

### Twee systemen, en waarom

Er zijn twee herkenningslijsten, en dat is bewust:

- `src/data/modellen/` — de 150 modellen met een eigen pagina. Draait op de
  ruwe RDW-tekst.
- `src/data/autos.js` — een bredere lijst die ook auto's kent zonder eigen
  pagina, zodat de upgradepagina "jouw Bentley Continental GT" kan tonen in
  plaats van de ruwe RDW-tekst. Draait op genormaliseerde tekst.

Dat is dubbelop en het zou mooier zijn als het één systeem was. Het is nu niet
samengevoegd omdat de twee lijsten verschillende invoer verwachten, en zo'n
verbouwing raakt precies het onderdeel dat het meeste stuk kan. Er staat wel een
test op die controleert dat ze elkaar niet tegenspreken.

---

## De controles

| Bestand | Waar het over gaat |
| --- | --- |
| `tests/match.test.js` | Kentekens opschonen en van streepjes voorzien |
| `tests/matchers.test.js` | Herkennen echte RDW-namen de juiste auto? |
| `tests/voertuig.test.js` | RDW-gegevens omzetten naar uitleg over geluid |
| `tests/data.test.js` | Kloppen de modellen, pakketten en merken? |
| `tests/huisstijl.test.js` | Kleuren, licht en donker, leesbaarheid |
| `tests/gebouwd.test.js` | De opgeleverde site: links, titels, sitemap |
| `tests/browser.test.js` | De site in een echte browser, met nagemaakte RDW |

`tests/gevallen.js` is geen test maar de lijst met voorbeelden die
`matchers.test.js` gebruikt. Voeg daar iets toe als je een patroon aanpast.

---

## Headroom — je offerte-app

Op `/headroom` staat een app voor jezelf, niet voor klanten. Je vult een
kenteken in, vinkt aan wat de klant wil, en er rolt een pdf-offerte uit die
je meteen via WhatsApp kunt versturen.

> De app heette eerst **Werkbak** en stond op `/werkbak`. Dat oude adres
> stuurt je door naar `/headroom`, dus een oud icoon op je beginscherm blijft
> werken. Wat je er al in hebt gezet — je onderdelen, je auto's, je
> offertes — blijft gewoon staan; die worden onder de oude naam bewaard en
> daar is met opzet niets aan veranderd.

**Je zet hem één keer klaar:**

1. Open `audioupgradeemmen.nl/headroom` op je telefoon.
2. Ga naar **Instellingen** en vul je uurtarief en je standaard marge in.
3. Ga naar **Onderdelen** en zet erin wat je bij je leveranciers koopt:
   naam, inkoopprijs, marge en hoeveel uur montage het kost.
4. Zet de pagina op je beginscherm (in Safari: delen → "Zet op beginscherm").

Daarna is een offerte maken: kenteken, naam, aantikken wat erin gaat,
**Pdf & versturen**.

**Wat de klant wél en niet ziet.** Op de pdf staat één bedrag per regel, met
montage en (bij particulieren) btw er al in. Je inkoopprijzen, je marge en je
uurtarief staan er nooit op — daar staat een test op in
`tests/headroom.test.js`.

### Elk kabeltje klopt

Bij een onderdeel zet je onder **Wat hoort hier verplicht bij** de ringen,
adapterkabels en butyl die er altijd bij gaan, met artikelnummer en leverancier.
Kies je dat onderdeel op een offerte, dan komt de hele sleep automatisch mee:

- in je **inkoop**, dus je marge klopt (twee ringen van € 14,50 zijn geen ruis);
- op je **werkbon**, dus je staat niet bij de auto met een kabel te weinig;
- **niet** op de offerte van de klant — die ziet één regel met één prijs.

### De werkbon

Naast de offerte maakt de app een tweede pdf, voor jezelf. Daarop staat:

1. de auto, met wat er over dat model is vastgelegd;
2. de stuklijst — elk artikel apart, met artikelnummer, om af te vinken;
3. de werkinstructie stap voor stap, van stoelhoes tot proefrit.

Er staan **geen prijzen** op. Een werkbon ligt op de bumper; daar hoort je marge
niet te liggen. Daar staat een test op.

### Auto's: wat de RDW niet weet

Van de RDW krijg je merk, model, bouwjaar en kleur. Niet: welke speakermaat
erin zit, welke adapterring past, welk fabrieksscherm het is, welke stekker
erachter zit. Dat verschilt per uitvoering en is nergens op te halen.

**De app verzint dat dus niet.** Waar het dossier leeg is, komt er op de werkbon
een lege regel met een streep — geen gok. Een verzonnen stekkertype kost een
middag; een verzonnen draadkleur kost de fabrieksgarantie van je klant.

Onder **Auto's** leg je per model vast wat je hebt nagemeten. De volgende keer
dat zo'n auto op de brug staat, herkent de app hem aan het kenteken en staat
alles al ingevuld. Vul bij de bouwjaren de jaren van de **generatie** in (een
Golf 7 liep van 2013 tot 2020), niet het bouwjaar van de auto die er nu staat.

### De aanbetalingsfactuur

Onder de offerte staat **Aanbetaling**. Vul een percentage in — of laat het leeg
voor je standaard uit Instellingen — en je ziet meteen wat de klant nu betaalt en
wat er bij oplevering nog komt. De knop maakt er een pdf van die eruitziet als je
offerte, en die je net zo via WhatsApp stuurt.

**Eerst even instellen.** Bij Instellingen vul je je **rekeningnummer** en de
tenaamstelling in. Zonder rekeningnummer maakt de app geen factuur: de klant zou
niet weten waar het geld heen moet.

**Wat er op de factuur staat**, omdat de Belastingdienst dat wil: een doorlopend
factuurnummer, de datum, jouw naam en adres, je KVK- en btw-nummer, de naam en het
adres van de klant, wat je levert, het bedrag zonder btw, het btw-tarief en het
btw-bedrag.

Dat adres van de klant is geen sierlijkheid: **boven de honderd euro is een factuur
zonder adres niet geldig.** Staat het er niet, dan vraagt de app het je eerst.

**Facturen hebben een eigen nummerreeks**: offerte 2026-014, factuur 2026-F014. Zou
je één teller delen, dan zitten er gaten in je factuurreeks zodra een offerte niet
doorgaat — en dat wil je niet uitleggen aan de Belastingdienst.

### Korting geven

Onder de regels staat een veld **Korting**. Tik `50` voor vijftig euro, of
`10%` voor tien procent. Bij een particulier is dat bedrag inclusief btw —
dezelfde maat die hij op de offerte ziet.

De korting gaat overal doorheen: de btw, je marge, de aanbetaling en beide
facturen rekenen er meteen mee.

### Drie soorten factuur

In het blok Factuur kies je wat je stuurt:

| | |
|---|---|
| **Aanbetaling** | een deel vooraf, met een percentage dat je zelf invult |
| **Eindfactuur** | wat er na die aanbetaling nog open staat |
| **Alles ineens** | de hele klus in één keer, zonder aanbetaling |

Op de eindfactuur staat het offertetotaal, met de aanbetaling eraf en het
factuurnummer erbij. Zo kan de klant beide papieren naast elkaar leggen en
zien dat het sluit — tot de cent.

### De afspraken staan op het papier

Het blok **Afspraken op papier** zorgt dat je die dingen niet meer los hoeft te
appen. Onder *Goed om te weten* komen ze op de offerte **en** op de factuur: hoe
lang de offerte geldig is, tot wanneer kosteloos afzeggen kan, de levenslange
garantie op je montage, en dat de fabrieksgarantie 100% behouden blijft. Achterin
gaan je volledige algemene voorwaarden als bijlage mee.

Die teksten komen uit dezelfde bron als de pagina
`/algemene-voorwaarden` op de site, `src/data/juridisch.js`. Pas je daar iets
aan, dan schuift het papier vanzelf mee. Staan er op papier andere voorwaarden
dan online, dan mag een klant kiezen welke hem het beste uitkomt.

Er staan drie schakelaars bij:

| | |
|---|---|
| **Afspraak op afstand gemaakt** | Staat aan. Spreek je het via WhatsApp, telefoon of mail af, dan heeft een particuliere klant 14 dagen bedenktijd en moet dat erop staan. Komt hij bij jou langs, zet dit dan uit — anders beloof je iets wat de wet niet van je vraagt. |
| **Klant wil dat je binnen die 14 dagen begint** | Staat uit. Zet hem aan als de afspraak eerder staat dan 14 dagen na vandaag. Zonder die zin moet je bij afzeggen álles terugbetalen, ook het werk dat er al in zit; mét die zin alleen wat er nog niet gedaan is. |
| **Volledige voorwaarden achterin meesturen** | Staat aan. Twee extra pagina's. Voorwaarden gelden pas als de klant ze ook echt gekregen heeft, dus laat dit gewoon aan staan. |

**De afzegtermijn staat op één plek.** Artikel 9 in `src/data/juridisch.js`
zegt dat kosteloos afzeggen kan tot **14 dagen** voor de afgesproken dag. Dat
is bewust hetzelfde getal als de wettelijke bedenktijd: twee verschillende
termijnen op één stuk papier leest als een addertje. Zet je er ooit een ander
aantal dagen neer, dan schuiven de offerte, de factuur en de FAQ vanzelf mee —
de app leest het getal daar vandaan en typt het nergens zelf.

### De agenda

Zet bij een offerte een **inbouwdatum**, dan komt de klus in het tabblad
**Agenda** te staan. Je ziet per klus drie dingen:

| | |
|---|---|
| **Wanneer** | de dag en het tijdstip, met "over 12 dagen" erachter |
| **Uiterlijk bestellen** | de laatste dag dat je de onderdelen nog kunt bestellen |
| **De voorbereiding** | twee lijstjes om af te vinken: een week vooraf en de dag ervoor |

De besteldag is de inbouwdatum min het aantal dagen dat je bij **Instellingen**
hebt staan (standaard veertien). Daar zit de levertijd in én de speling voor
als er iets verkeerd geleverd is en opnieuw moet.

**Er staat pas "bestellen" als de aanbetaling binnen is.** Dat is met opzet:
bestel je op eigen kosten voor een klant die niet aanbetaalt, dan lig jij met
die onderdelen. Zet de status van de offerte op *aanbetaald* zodra het geld
er is, dan gaat de Agenda pas duwen. Is de besteldag gepasseerd en is er nog
niet betaald, dan zegt hij dat ook — dan is het tijd om te bellen.

Heb je besteld, tik dan **De onderdelen zijn besteld** aan. Daarna houdt die
klus op je eraan te herinneren.

### De meldingen

**De app kan je geen melding sturen als hij dichtstaat.** Daar is een server
voor nodig en die is er niet: dit is een website zonder achterkant. Wat wél
werkt, en beter werkt, is de agenda die al op je telefoon staat.

Tik bij een klus op **Zet in je agenda**. Je krijgt een bestand dat je één
keer opent; daarna staat het in je eigen agenda-app. Daar zitten twee
afspraken in:

1. **De inbouw zelf**, met een wekker **een week** en **een dag** van tevoren.
   In de afspraak staat het lijstje van wat je die dag klaar moet hebben.
2. **De dag dat je uiterlijk moet bestellen**, met een wekker een dag van
   tevoren.

Die wekkers gaan af ook als Headroom dichtstaat en ook zonder internet — dat
is precies waarom het zo werkt en niet met een melding uit de app zelf.

De tijden staan er zonder tijdzone in. Dat heet een *zwevende tijd*: negen uur
is negen uur op de klok waar je bent. Voor een werkplaats die altijd in
Nederland staat is dat precies goed, en het scheelt gedoe met de zomertijd.

### Je offertes terugvinden

Onderaan staat een zoekveld: typ een naam, een kenteken of een offertenummer.
Elke offerte heeft een status die je ziet staan en die je verzet door erop te
tikken: concept → verstuurd → aanbetaald → gefactureerd → betaald. De app zet
hem zelf waar hij het zeker weet.

### Prijslijsten inlezen

Leveranciersprijzen komen als bestand binnen, dat je bij **Onderdelen** inleest
met "Lees bestand in". Zo'n lijst wordt **toegevoegd** aan wat je al hebt: je
instellingen, je eigen onderdelen en je auto's blijven staan. Lees je hem per
ongeluk twee keer in, dan komt er niets dubbel bij.

Alleen een bestand dat je zelf met **Bewaar als bestand** hebt gemaakt vervangt
alles — dat is je reservekopie, en daar vraagt hij eerst nog bij of je het zeker
weet.

Zo'n aangeleverd bestand kan ook instellingen meebrengen, bijvoorbeeld je
rekeningnummer. Die vullen alleen velden die nog **leeg** zijn: wat je zelf hebt
ingesteld wordt nooit overschreven.

**Waar je gegevens staan.** In de browser van je telefoon, nergens anders.
Geen server, geen database, geen inlog. Dat betekent ook: raakt je telefoon
kwijt, dan is je lijst weg. Druk daarom af en toe op **Bewaar als bestand**
bij Onderdelen en mail dat bestand naar jezelf.

> **Belangrijk:** zet je inkoopprijzen nooit in de code van dit project. Deze
> map staat openbaar op GitHub — iedereen kan hem lezen. In de app zelf is
> veilig, in een bestand hier niet.

---

## Publiceren

De site staat nog **niet** live. Het domein `audioupgradeemmen.nl` wijst nog
naar de oude Squarespace-site.

Als het zover is: `npm run build` maakt de map `dist/`, en die kan bij elke
statische host (Cloudflare Pages, Netlify, Vercel). Er is geen server nodig.

---

## Afspraken

- **Alles in het Nederlands**, ook code-commentaar en commit-berichten.
- **Kleuren komen uit `src/data/brand.js`.** Zet nooit een losse kleurcode in
  een bestand — er staat een test op.
- **Mobiel eerst.** 99% van de bezoekers zit op een telefoon. Test op 390 pixels
  breed, en op 320 voor de zekerheid.
- **Geen emoji's** op de site. Ook daar staat een test op.
- **De klant is "je", nooit "u".**

Meer over hoe er aan dit project gewerkt wordt staat in [CLAUDE.md](CLAUDE.md).
