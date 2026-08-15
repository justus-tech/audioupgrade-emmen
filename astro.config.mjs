import { defineConfig } from 'astro/config';

/**
 * De site wordt op twee plekken gebouwd, en die verschillen.
 *
 *   Straks, op het eigen domein     https://audioupgradeemmen.nl/upgrades
 *   Nu, als voorbeeld op GitHub     https://justus-tech.github.io/audioupgrade-emmen/upgrades
 *
 * Dat tweede adres heeft een mapnaam in het midden staan. Alle links op de
 * site moeten die mapnaam meekrijgen, anders komt "/upgrades" op de wortel
 * van github.io terecht en krijg je een foutmelding.
 *
 * Daarom leest deze instelling een schakelaar uit: staat PUBLICEER_NAAR op
 * "github", dan bouwt hij voor de voorbeeldsite. Staat er niets, dan bouwt
 * hij voor het echte domein. Zo hoeft er nooit iets met de hand omgezet te
 * worden, en kan er dus ook niets vergeten worden.
 */
const naarGithub = process.env.PUBLICEER_NAAR === 'github';

export default defineConfig({
  site: naarGithub ? 'https://justus-tech.github.io' : 'https://audioupgradeemmen.nl',
  base: naarGithub ? '/audioupgrade-emmen' : '/',
  trailingSlash: 'never',
  build: { format: 'file' },

  vite: {
    server: {
      /**
       * Alleen voor het meekijken op afstand.
       *
       * De ontwikkelserver weigert standaard elk verzoek dat niet van
       * localhost komt. Dat is een goede beveiliging, maar het blokkeert ook
       * de tijdelijke tunnel waarmee je de site op een andere computer of
       * telefoon bekijkt. Deze twee adressen zijn de tunneldiensten zelf.
       *
       * Dit geldt UITSLUITEND tijdens `npm run dev`. De gebouwde site
       * (npm run build) heeft geen server en dus ook deze instelling niet.
       */
      allowedHosts: ['.lhr.life', '.localhost.run'],
    },
  },
});
