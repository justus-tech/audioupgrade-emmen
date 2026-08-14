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
