# CLAUDE.md — Audio Upgrade Emmen

Instructies voor Claude Code bij het werken aan dit project.

## Met wie je werkt

Justus, eigenaar van Audio Upgrade Emmen. **Hij is relatief nieuw met coderen en GitHub.**

- Praat **Nederlands**. Ook in code-commentaar en commit-berichten.
- **Simpele taal.** Geen jargon zonder uitleg. Zeg "de map met de bestanden" in plaats van "de repository root".
- **Kort en precies.** Twee of drie zinnen per wijziging: wat is er veranderd en waarom. Geen code in het antwoord tenzij hij erom vraagt.
- Werkt soms vanaf het account van zijn broer Thijs.

## Wat je zelf mag doen

Justus heeft volledige vrijheid gegeven. Je hoeft niet te vragen voor:

- Siteteksten, koppen, FAQ's en SEO aanpassen
- Code, opmaak en techniek wijzigen
- Prijzen en pakketinhoud aanpassen
- Nieuwe modelpagina's toevoegen
- Committen **en** pushen naar GitHub

**Uitzondering die je wel altijd meldt:** noem elke prijswijziging expliciet in je samenvatting. Die raakt zijn omzet, dus die mag hij nooit per ongeluk over het hoofd zien.

**Uitzondering die je wel altijd vraagt:** de oude Squarespace-site aanpassen, en het domein (DNS) omzetten naar de nieuwe site. Die staan live voor klanten.

## Het bedrijf

Premium car audio, CarPlay-inbouw, DSP-tuning en akoestische deurdemping. Emmen, Drenthe. Uitsluitend op afspraak. Vanaf 1 september 2026 een eigen loods; adres volgt zodra de Google-verificatie rond is.

- Telefoon: +31 6 44 37 98 44 · info@audioupgradeemmen.nl
- WhatsApp: https://wa.me/message/RDCWOKTCKSPIF1
- KVK 96356723 · Btw NL005205204B66

Merken: Alpine, Pioneer, JL Audio, Musway, Gladen Mosconi, STEG.

## Mobiel is de site

**99% van de bezoekers zit op een telefoon (Android of iPhone).** Behandel de mobiele weergave dus niet als een afgeleide van desktop, maar als het hoofdontwerp. Controleer elke wijziging op 390px breed voordat je hem oplevert.

Vaste aandachtspunten:

- Geen horizontale overflow. Controleer met `document.documentElement.scrollWidth`.
- Zet `:hover`-effecten altijd in `@media (hover: hover)`. Op een telefoon blijft hover na een tik plakken, waardoor een knop er leeg of uitgeschakeld uitziet.
- Knoppen vullen op mobiel de breedte, zodat je ze met een duim raakt.
- De zwevende WhatsApp-knop rechtsonder is de belangrijkste conversieknop. Weghalen mag alleen als Justus dat vraagt.
- De kopbalk is sticky; houd `scroll-margin-top` in stand, anders verdwijnt de bovenkant van een sectie eronder.

## Schrijfstijl op de site

- **Aanspreekvorm: "je"**, nooit "u". Consequent op de hele site.
- Donker, premium, minimalistisch. Zelfverzekerd vakmanschap, "geen half werk".
- **Probleem eerst.** Begin bij wat er mis is met de auto, niet bij wat wij verkopen.
- Engels mag als premium-signaal (The OEM+ Executive, Plug & Play), maar nooit als sjabloontaal.
- Beloof niets wat niet waargemaakt kan worden. Geen verzonnen cijfers over hoeveel stiller iets wordt.

**Drie dingen nooit weghalen** — dit zijn de conversie-troeven:
1. Transparante all-in prijzen (incl. montage en btw)
2. "Stuur een foto van je dashboard via WhatsApp" als drempelloze CTA
3. 100% behoud van fabrieksgarantie

## Kleuren — één bron van waarheid

Alle kleuren staan in **`src/data/brand.js`**. Dat is de enige plek. `Base.astro` zet ze om naar CSS-variabelen, de rest van de site gebruikt alleen `var(--...)`.

| Kleur | Code | Waarvoor |
|---|---|---|
| Neon oranje | `#FF5E1F` | Signatuur: accenten, eyebrows, hoofdknoppen, scorebalken |
| Bijna wit | `#F5F5F5` | Koppen en belangrijke tekst |
| Grijs | `#878787` | Bodytekst en bijschriften |
| Donkergrijs | `#1A1A1A` | Afwisselende secties en kaarten |
| Bijna zwart | `#121212` | Ondergrond van de pagina |

**Nooit een losse kleurcode in een `.css` of `.astro` zetten.** Staat een kleur er niet bij, voeg hem dan toe in `brand.js` met een duidelijke naam. Lijnen zijn het grijs op lage dekking, geen zesde kleur.

Eén bewuste uitzondering: de kentekenplaat in de kenteken-check blijft de echte Nederlandse geel/blauw. Dat is herkenning, geen huisstijl — bezoekers moeten meteen zien dat daar hun kenteken in moet.

Controleren of er geen losse kleuren zijn ingeslopen:

```bash
grep -rnoE "#[0-9a-fA-F]{3,6}\b" src/ --include=*.css --include=*.astro
```

## Hoe het project in elkaar zit

Astro 5, statische site. Geen database, geen server.

```
src/data/site.js      Bedrijfsgegevens + de 5 pakketten met prijzen
src/data/models.js    De modelpagina's: 1 record = 1 pagina
src/pages/            De vaste pagina's
src/components/       Herbruikbare blokken (o.a. de kenteken-check)
src/layouts/Base.astro  Kop, voet en de SEO-tags van elke pagina
```

Nieuwe modelpagina toevoegen = één record toevoegen aan `models.js`. De pagina wordt automatisch gebouwd.

Commando's:

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run test:kenteken
```

## De kenteken-check — lees dit voor je iets wijzigt

De widget vraagt het kenteken op bij de gratis open data van de RDW en stuurt de bezoeker naar de juiste modelpagina.

**De valkuil:** de RDW schrijft modelnamen niet zoals mensen praten.

| Wat mensen zeggen | Wat er in de RDW staat |
|---|---|
| BMW 3-serie | `3ER REIHE`, `320I`, `318I`, `330E` |
| Mercedes C-klasse | `C 180`, `C 180 KOMPRESSOR` |
| Audi A3 | `A3 SPORTBACK`, `AUDI A3` |
| Tesla Model 3 | `MODEL 3`, `Model 3`, `MODEL3` |

Daarom staan er patronen (`matchers`) in `models.js` in plaats van gewone modelnamen. **Wijzig die patronen nooit zonder daarna `npm run test:kenteken` te draaien.** Die test controleert ze tegen de echte RDW-database en let er ook op dat er niets verkeerd matcht — een Mercedes CLA mag geen C-klasse worden, een BMW iX3 geen 3-serie.

## SEO-regels

- Elke paginatitel eindigt op ` | Audio Upgrade Emmen`. **Let op:** op Squarespace werd die naam er automatisch achter geplakt, in Astro niet. Vergeet hem dus niet.
- Elke modelpagina heeft **eigen** tekst. Nooit een sjabloon waarin alleen de modelnaam verschilt — dat rankt niet en leest als spam.
- FAQ's per model verschillend houden, ook als de vraag lijkt op die van een ander model.

## Werkwijze

- **Verifieer je eigen werk** voordat je iets oplevert: build draaien, tests draaien, links controleren. Vraag Justus niet om te testen of iets werkt.
- De oude Squarespace-site blijft gewoon draaien tot de nieuwe klaar is. Niet aanraken.
- Nieuwe site eerst als preview. Pas als Justus tevreden is gaat het domein om, met 301-redirects van alle oude adressen (ook `/store/p/…`).
- Foto's: nu deels stockbeeld. Vervangen door eigen werkfoto's zodra Justus die aanlevert — dat scoort beter bij klanten én in Google.
