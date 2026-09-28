/**
 * DE WHATSAPP-ONTVANGER — vangt WhatsApp-berichten op en bewaart ze in de EU.
 *
 * WAAROM DIT BESTAAT
 * De site zelf heeft geen server (GitHub Pages), dus iets moet 24 uur per dag
 * klaarstaan om een melding van 360dialog aan te nemen. Dat is dit kleine
 * programmaatje bij Cloudflare. Het doet drie dingen en verder niets:
 *
 *   POST /webhook/<sleutel>   360dialog meldt een nieuw bericht; wij bewaren het.
 *   GET  /berichten           Claude haalt 's ochtends op wat er nieuw is.
 *   (elke dag)                Berichten ouder dan BEWAAR_DAGEN worden gewist.
 *
 * Het gaat om alle één-op-één-gesprekken op het zakelijke nummer, ook met
 * mensen die geen klant zijn. Groepsgesprekken komen niet mee.
 *
 * WAT HIER BEWUST NIET IN ZIT
 * Versturen. Er is geen enkele manier om via dit programma een bericht naar
 * iemand te sturen, en de sleutel van 360dialog (die dat wel kan) staat hier
 * nergens. Berichten stuurt Justus zelf vanuit zijn app.
 *
 * WAAR DE BERICHTEN STAAN
 * In één opslagbak (een "Durable Object") die we vastzetten in de EU. Dat staat
 * hieronder in de code, dus het kan niet per ongeluk ergens anders belanden.
 *
 * DE TWEE SLEUTELS
 * Ze staan nooit in deze map (die is openbaar), maar als geheim bij Cloudflare.
 *   WEBHOOK_SLEUTEL  Staat achter /webhook/ in het adres dat 360dialog gebruikt.
 *                    (Meesturen in de kop x-ontvanger-sleutel mag ook.)
 *   OPHAAL_SLEUTEL   Claude stuurt die mee als "Authorization: Bearer …".
 * Ontbreekt een sleutel, dan gaat die deur dicht.
 */
import { DurableObject } from 'cloudflare:workers';
import { bewaarDagen, sleutelKlopt, teBewaren } from './berichten.js';

const DAG_MS = 24 * 60 * 60 * 1000;
const PER_KEER = 500;

export class Berichtenbak extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    // volgnr loopt op in de volgorde van binnenkomst. Claude onthoudt het
    // laatste volgnr dat hij heeft gezien, zodat ook oude berichten die later
    // binnenkomen (de geschiedenis bij het aansluiten) niet gemist worden.
    this.sql.exec(`CREATE TABLE IF NOT EXISTS berichten (
      volgnr    INTEGER PRIMARY KEY AUTOINCREMENT,
      id        TEXT UNIQUE NOT NULL,
      richting  TEXT NOT NULL,
      klant     TEXT NOT NULL,
      naam      TEXT,
      tijd      INTEGER,
      soort     TEXT,
      tekst     TEXT,
      media_id  TEXT,
      ontvangen INTEGER NOT NULL
    )`);
    // Een vaste naam voor deze opslagbak. Wordt de ontvanger ooit opnieuw
    // opgezet, dan krijgt de nieuwe bak een andere naam en weet het ophaalscript
    // dat het opnieuw bij volgnr 0 moet beginnen.
    this.sql.exec('CREATE TABLE IF NOT EXISTS over (sleutel TEXT PRIMARY KEY, waarde TEXT)');
    this.sql.exec("INSERT OR IGNORE INTO over VALUES ('bak', ?)", crypto.randomUUID());
    this.bakId = this.sql.exec("SELECT waarde FROM over WHERE sleutel = 'bak'").one().waarde;
  }

  /**
   * Een melding van 360dialog verwerken en de berichten bewaren.
   *
   * We krijgen de ruwe tekst en lezen die hier pas uit. Hier mag het rekenwerk
   * langer duren dan in de voorkant, waar Cloudflare op het gratis abonnement
   * maar 10 milliseconden rekentijd per verzoek geeft. De eerste melding met
   * een half jaar aan oude gesprekken kan groot zijn.
   *
   * Stuurt 360dialog iets twee keer, dan blijft er één over. Berichten die al
   * ouder zijn dan de bewaartermijn slaan we niet eens op.
   */
  async bewaarMelding(ruweTekst) {
    const nu = Date.now();
    const berichten = teBewaren(ruweTekst, nu, bewaarDagen(this.env.BEWAAR_DAGEN));
    for (const b of berichten) {
      this.sql.exec(
        `INSERT OR IGNORE INTO berichten
           (id, richting, klant, naam, tijd, soort, tekst, media_id, ontvangen)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        b.id, b.richting, b.klant, b.naam, b.tijd, b.soort, b.tekst, b.mediaId, nu,
      );
    }
    if (berichten.length > 0 && (await this.ctx.storage.getAlarm()) === null) {
      await this.ctx.storage.setAlarm(nu + DAG_MS);
    }
  }

  /** Alles na een bepaald volgnummer, oudste eerst, met de naam van deze bak. */
  lijst(na) {
    const berichten = this.sql
      .exec(
        `SELECT volgnr, id, richting, klant, naam, tijd, soort, tekst, media_id AS mediaId
           FROM berichten WHERE volgnr > ? ORDER BY volgnr LIMIT ?`,
        na, PER_KEER,
      )
      .toArray();
    return { bak: this.bakId, perKeer: PER_KEER, berichten };
  }

  /**
   * Eén keer per dag: wat ouder is dan de bewaartermijn gaat weg. Gerekend
   * vanaf het versturen (tijd), en voor berichten zonder tijd vanaf binnenkomst.
   */
  async alarm() {
    const grensMs = Date.now() - bewaarDagen(this.env.BEWAAR_DAGEN) * DAG_MS;
    this.sql.exec(
      'DELETE FROM berichten WHERE ontvangen < ? OR (tijd > 0 AND tijd < ?)',
      grensMs, Math.floor(grensMs / 1000),
    );
    await this.ctx.storage.setAlarm(Date.now() + DAG_MS);
  }
}

/**
 * De ene opslagbak, vastgezet in de EU.
 *
 * Alleen bij het testen op je eigen computer (`wrangler dev`, met LOKAAL=1 in
 * .dev.vars) slaan we de EU-regel over, want die bestaat daar niet. Bij
 * Cloudflare zelf staat LOKAAL nooit aan.
 */
function bak(env) {
  const ruimte = env.LOKAAL === '1' ? env.BAK : env.BAK.jurisdiction('eu');
  return ruimte.get(ruimte.idFromName('berichten'));
}

/** Een stuk van het adres terugvertalen; bij rommel geen sleutel. */
function leesDeel(deel) {
  try {
    return decodeURIComponent(deel);
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env) {
    const { pathname, searchParams } = new URL(request.url);
    const webhook = pathname.match(/^\/webhook(?:\/([^/]*))?$/);

    if (webhook && request.method === 'POST') {
      const gegeven = webhook[1] ? leesDeel(webhook[1])
        : request.headers.get('x-ontvanger-sleutel');
      if (!sleutelKlopt(gegeven, env.WEBHOOK_SLEUTEL)) {
        return new Response('geen toegang', { status: 401 });
      }
      // Lukt het bewaren niet, dan geeft dit een fout terug en probeert
      // 360dialog het later opnieuw. Zo raakt er geen bericht kwijt.
      // Een onleesbare melding levert gewoon niets op, en dan zeggen we "ok",
      // anders blijft 360dialog het een week lang opnieuw proberen.
      await bak(env).bewaarMelding(await request.text());
      return new Response('ok');
    }

    if (webhook && request.method === 'GET') {
      // Sommige diensten kijken eerst of het adres bestaat. Via GET kan niemand
      // iets opslaan of lezen, dus dat mag gewoon.
      return new Response('ok');
    }

    if (pathname === '/berichten' && request.method === 'GET') {
      const kop = request.headers.get('authorization') ?? '';
      if (!sleutelKlopt(kop.replace(/^Bearer\s+/i, ''), env.OPHAAL_SLEUTEL)) {
        return new Response('geen toegang', { status: 401 });
      }
      const na = Math.max(0, Number.parseInt(searchParams.get('na') ?? '0', 10) || 0);
      return Response.json(await bak(env).lijst(na));
    }

    if (pathname === '/') {
      return new Response('Audio Upgrade Emmen: WhatsApp-ontvanger. Hier valt niets te zien.\n');
    }
    return new Response('niet gevonden', { status: 404 });
  },
};
