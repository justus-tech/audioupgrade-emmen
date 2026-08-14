import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://audioupgradeemmen.nl',
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
