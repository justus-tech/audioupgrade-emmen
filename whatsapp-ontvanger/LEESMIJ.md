# WhatsApp-ontvanger

Dit kleine programma vangt de WhatsApp-berichten van je klanten op, zodat Claude
elke ochtend kan zien wie iets nieuws vraagt en de offerte alvast kan bijwerken.
Jij blijft gewoon je WhatsApp Business-app gebruiken.

## Hoe het werkt

```
klant ──WhatsApp──▶ jouw telefoon (app, zoals nu)
                 └▶ 360dialog ──▶ deze ontvanger (Cloudflare, EU) ◀── Claude haalt 's ochtends op
```

- **360dialog** is de erkende Meta-partner die je nummer aansluit. Zonder zo'n
  partner staat Meta niet toe dat je nummer tegelijk in de app én aan een
  koppeling hangt.
- **Deze ontvanger** draait bij Cloudflare en bewaart de berichten in de EU.
  Na 90 dagen worden ze vanzelf gewist.
- **Versturen kan hij niet.** Er zit geen verzendknop in. Klanten krijgen alleen
  berichten die jij zelf stuurt.

Ook wat jij vanuit de app terugstuurt komt mee. Zo weet Claude wat je al hebt
toegezegd.

## Eén keer instellen

Doe dit in deze volgorde. Een sleutel is een lange geheime tekst: plak die
alleen op de plekken die hieronder staan, nooit in een bestand in deze map
(die staat openbaar op GitHub).

1. **360dialog.** Maak een account op hub.360dialog.com en kies voor het
   aansluiten van een nummer dat al in de WhatsApp Business-app zit. Je scant
   dan een QR-code met de app. Maak daarna bij het nummer een API-sleutel aan.
2. **Cloudflare.** Maak een gratis account op cloudflare.com. Open één keer
   *Workers & Pages* en kies een naam voor je werkadres (bv. `justus`). Maak
   bij *My Profile → API Tokens* een token met het sjabloon
   *Edit Cloudflare Workers*. Noteer ook je *Account ID* (staat rechts op de
   Workers-pagina).
3. **Twee eigen sleutels.** Laat je wachtwoordmanager twee lange willekeurige
   wachtwoorden maken (40 tekens, alleen letters en cijfers). De ene is voor
   360dialog, de andere voor Claude.
4. **GitHub.** Zet bij deze map op GitHub onder *Settings → Secrets and
   variables → Actions → New repository secret* deze vijf neer:

   | Naam | Wat erin |
   |---|---|
   | `CLOUDFLARE_API_TOKEN` | het token uit stap 2 |
   | `CLOUDFLARE_ACCOUNT_ID` | het Account ID uit stap 2 |
   | `D360_API_KEY` | de API-sleutel uit stap 1 |
   | `WHATSAPP_WEBHOOK_SLEUTEL` | je eerste eigen sleutel |
   | `WHATSAPP_OPHAALSLEUTEL` | je tweede eigen sleutel |

5. **Aanzetten.** Ga op GitHub naar *Actions → WhatsApp-ontvanger publiceren →
   Run workflow*. Wordt hij groen, dan staat de ontvanger live en weet
   360dialog waar de berichten heen moeten. Het adres staat in de uitvoer.
6. **Claude toegang geven.** Zet in de instellingen van je Claude-project, bij
   de omgeving:
   - onder *Netwerktoegang* het adres van de ontvanger erbij
     (bv. `aue-whatsapp.justus.workers.dev`);
   - onder de omgevingsvariabelen `WHATSAPP_ADRES` (het volledige adres met
     `https://`) en `WHATSAPP_OPHAALSLEUTEL` (je tweede eigen sleutel).

Laat het daarna aan Claude weten; die test het en zet de ochtendronde aan.

## Niet vergeten: je privacyverklaring

Klantberichten worden nu automatisch verwerkt door 360dialog en Cloudflare om
offertes voor te bereiden. Zet dat in je privacyverklaring, met de bewaartermijn
van 90 dagen.

## Voor wie eraan werkt

- `berichten.js` haalt de berichten uit een melding van 360dialog (formaat van
  Meta). Getest in `tests/whatsapp.test.js`.
- `worker.js` is de ontvanger zelf.
- `scripts/whatsapp-berichten.mjs` (`npm run whatsapp`) haalt nieuwe berichten
  op en zet ze per klant in een gesprek, in de vorm van een WhatsApp-export.
- Lokaal testen: zet `WEBHOOK_SLEUTEL`, `OPHAAL_SLEUTEL` en `LOKAAL=1` in
  `.dev.vars` in deze map en draai `npx wrangler dev`.
