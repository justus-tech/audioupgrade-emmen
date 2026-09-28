# WhatsApp-ontvanger

Dit kleine programma vangt de WhatsApp-berichten op je zakelijke nummer op,
zodat Claude elke ochtend kan zien wie iets nieuws vraagt en de offerte alvast
kan bijwerken. Je blijft je WhatsApp Business-app gebruiken, met een paar
veranderingen (zie hieronder).

## Hoe het werkt

```
iemand ──WhatsApp──▶ jouw telefoon (de app)
                  └▶ 360dialog ──▶ deze ontvanger (Cloudflare) ◀── Claude haalt 's ochtends op
```

- **360dialog** is de erkende Meta-partner die je nummer aansluit. Zonder zo'n
  partner staat Meta niet toe dat je nummer tegelijk in de app én aan een
  koppeling hangt. Dat kost een maandbedrag; kijk vooraf op hun prijspagina.
- **Deze ontvanger** draait bij Cloudflare (gratis bij dit gebruik) en bewaart
  de berichten in de EU. 90 dagen na het versturen worden ze vanzelf gewist.
- **Versturen kan hij niet.** Er zit geen verzendknop in, en de sleutel van
  360dialog (die wel kan versturen) komt er nooit bij. Berichten stuur je
  altijd zelf.

Het gaat om **alle één-op-één-gesprekken op het zakelijke nummer**: klanten,
maar ook leveranciers, vrienden of familie die dat nummer gebruiken. Ook wat jij
vanuit de app terugstuurt komt mee, zodat Claude weet wat je al hebt toegezegd.
Groepsgesprekken komen niet mee.

## Wat er in je app verandert

- **Open de app minstens één keer per 13 dagen.** Doe je dat niet (vakantie,
  telefoon stuk), dan valt de koppeling weg. Je krijgt je berichten dan nog wel
  op je telefoon, maar Claude niet meer, en dan moet je opnieuw aansluiten.
- **Een paar functies gaan uit:** verzendlijsten (broadcast), verdwijnende
  berichten, eenmalig bekijken en live locatie delen.
- **Oude gesprekken:** bij het aansluiten kan WhatsApp hoogstens het laatste
  half jaar meesturen.

## Eén keer instellen

Doe dit in deze volgorde: eerst de ontvanger klaarzetten, dan pas je nummer
aansluiten. Zo mist hij niets, ook niet de oude gesprekken die bij het
aansluiten één keer meekomen.

Een sleutel is een lange geheime tekst. Plak die alleen op de plekken die
hieronder staan, nooit in een bestand in deze map (die staat openbaar op GitHub).

1. **Twee eigen sleutels.** Laat je wachtwoordmanager twee lange willekeurige
   wachtwoorden maken (40 tekens, alleen letters en cijfers). De eerste is voor
   360dialog, de tweede voor Claude.
2. **Cloudflare.** Maak een gratis account op cloudflare.com. Open één keer
   *Workers & Pages* en kies een naam voor je werkadres (bv. `justus`). Maak
   bij *My Profile → API Tokens* een token met het sjabloon
   *Edit Cloudflare Workers*. Noteer ook je *Account ID* (staat op de
   Workers-pagina).
3. **GitHub.** Ga bij deze map op GitHub naar *Settings → Environments → New
   environment* en noem hem `whatsapp`. Zet bij *Deployment branches and tags*
   de keuze op *Selected branches* en voeg `main` toe. Zet daarna in die
   omgeving onder *Environment secrets* deze vier neer:

   | Naam | Wat erin |
   |---|---|
   | `CLOUDFLARE_API_TOKEN` | het token uit stap 2 |
   | `CLOUDFLARE_ACCOUNT_ID` | het Account ID uit stap 2 |
   | `WHATSAPP_WEBHOOK_SLEUTEL` | je eerste eigen sleutel |
   | `WHATSAPP_OPHAALSLEUTEL` | je tweede eigen sleutel |

4. **Ontvanger live zetten.** Ga op GitHub naar *Actions → WhatsApp-ontvanger
   publiceren → Run workflow*. Wordt hij groen, dan staat de ontvanger live;
   het adres staat bovenaan bij de uitkomst (bv.
   `https://aue-whatsapp.justus.workers.dev`). Wordt hij rood, dan staat erbij
   wat er ontbreekt.
5. **360dialog.** Maak een account op hub.360dialog.com en kies voor het
   aansluiten van een nummer dat al in de WhatsApp Business-app zit. Je scant
   dan een QR-code met de app. Maak daarna bij het nummer een API-sleutel aan.
   **Die sleutel kan berichten versturen namens jouw nummer.** Bewaar hem
   alleen in je wachtwoordmanager: niet bij GitHub, niet bij Cloudflare, niet
   bij Claude.
6. **Aanmelden, dezelfde dag nog.** Open op je eigen computer de map van de
   site, haal eerst de nieuwste versie op, en typ in de terminal:

   ```bash
   npm run whatsapp:aanmelden
   ```

   Het vraagt het adres uit stap 4, je eerste eigen sleutel en de API-sleutel
   van 360dialog. Het kijkt eerst of de ontvanger de sleutel accepteert, meldt
   hem dan aan en vergeet de API-sleutel weer. Doe dit binnen 24 uur na stap 5,
   anders kunnen de oude gesprekken verloren gaan.
7. **Claude toegang geven.** Zet in de instellingen van je Claude-project, bij
   de omgeving:
   - onder *Netwerktoegang* het adres van de ontvanger erbij
     (bv. `aue-whatsapp.justus.workers.dev`);
   - onder de omgevingsvariabelen `WHATSAPP_ADRES` (het volledige adres met
     `https://`) en `WHATSAPP_OPHAALSLEUTEL` (je tweede eigen sleutel).

Stuur jezelf daarna vanaf een ander nummer een WhatsApp en laat het Claude weten.
Die kijkt of het binnenkomt en zet de ochtendronde aan.

## Niet vergeten: je privacyverklaring

Berichten op je zakelijke nummer gaan nu langs drie bedrijven die ze voor jou
verwerken om offertes voor te bereiden. Zet ze alle drie in je
privacyverklaring, en schrijf het voor **iedereen die je via WhatsApp benadert**,
niet alleen voor klanten:

- **360dialog** (Berlijn) sluit je nummer aan en geeft de berichten door.
- **Cloudflare** bewaart ze in de ontvanger, in de EU.
- **Anthropic** (Claude, je AI-assistent) leest de gesprekken. Daarvoor staan ze
  ook in de projectmap bij Claude. Anthropic is een Amerikaans bedrijf, dus die
  kopie staat niet gegarandeerd in de EU.

**Bewaartermijn: 90 dagen na het versturen**, in de ontvanger én in de
projectmap: elke keer dat `npm run whatsapp` draait, gaan oudere berichten ook
daar weg (Cloudflare kan gewiste gegevens nog korte tijd in een back-up hebben).
Niet vanzelf gewist worden:

- WhatsApp-exports die je zelf in het project zet;
- de offertes zelf;
- je gesprekken met Claude, zoals de ochtendronde en wat Claude daarover
  schrijft. Die blijven staan zolang je Claude-abonnement gesprekken bewaart, of
  tot je ze zelf verwijdert.

**Verwerkersovereenkomst.** Met alle drie heb je er een nodig. Bij 360dialog en
Cloudflare hoort die bij hun voorwaarden. Kijk bij Claude of je abonnement er
een heeft: bij een zakelijk abonnement wel, bij een persoonlijk niet. Heb je een
persoonlijk abonnement, kijk dan ook in je instellingen of je gesprekken
gebruikt mogen worden om Claude te verbeteren, en zet dat uit.

## Voor wie eraan werkt

- `berichten.js` haalt de berichten uit een melding van 360dialog (formaat van
  Meta). Getest in `tests/whatsapp.test.js`.
- `worker.js` is de ontvanger zelf. 360dialog meldt op
  `/webhook/<WEBHOOK_SLEUTEL>`; de sleutel in het adres is de toegang.
- `scripts/whatsapp-berichten.mjs` (`npm run whatsapp`) haalt nieuwe berichten
  op en zet ze per persoon in een gesprek, in de vorm van een WhatsApp-export,
  op volgorde van tijd. Het wist daar ook berichten ouder dan
  `WHATSAPP_BEWAAR_DAGEN` (standaard 90); houd die gelijk aan `BEWAAR_DAGEN` in
  `wrangler.toml`.
- `scripts/whatsapp-aanmelden.mjs` (`npm run whatsapp:aanmelden`) meldt de
  ontvanger aan bij 360dialog. Alleen op Justus' eigen computer draaien.
- **Nooit** de API-sleutel van 360dialog in GitHub, Cloudflare, de omgeving van
  Claude of deze map zetten, en nooit iets bouwen dat berichten verstuurt.
- Lokaal testen: zet `WEBHOOK_SLEUTEL`, `OPHAAL_SLEUTEL` en `LOKAAL=1` in
  `.dev.vars` in deze map en draai `npx wrangler dev`.
