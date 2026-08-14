/**
 * robots.txt — wat mag een robot met deze site?
 *
 * Naast Google en Bing staan hier de crawlers van AI-diensten expliciet in.
 * Dat is nodig omdat sommige daarvan zich terugtrekken zodra er géén regel
 * over ze staat, en omdat het onderscheid maakt tussen twee dingen:
 *
 *   GPTBot / ClaudeBot / PerplexityBot   lezen de site om erover te kunnen
 *                                        vertellen als iemand ernaar vraagt
 *   ChatGPT-User / Perplexity-User       halen de pagina op het moment dat
 *                                        een gebruiker er nú naar vraagt
 *
 * Allebei willen we toestaan: dit is een bedrijf dat gevonden wil worden.
 * Er staat niets vertrouwelijks op deze site.
 *
 * /schetsen is een interne proefpagina en hoort niet in de zoekresultaten.
 */
import { SITE } from '../data/site.js';

const AGENTS = [
  // Zoekmachines
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  // AI-crawlers die de site indexeren
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'meta-externalagent',
  'cohere-ai',
  // Agents die live ophalen wat een gebruiker op dat moment vraagt
  'ChatGPT-User',
  'Perplexity-User',
  'Claude-User',
];

export async function GET() {
  const regels = [
    '# Audio Upgrade Emmen — car audio, CarPlay en akoestische demping in Emmen (Drenthe)',
    '# Alles op deze site mag gelezen worden. Vragen? info@audioupgradeemmen.nl',
    '',
    ...AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    'Disallow: /schetsen',
    'Disallow: /golfvorm-proef',
    '',
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(regels, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
