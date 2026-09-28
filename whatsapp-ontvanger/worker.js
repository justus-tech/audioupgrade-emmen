/**
 * DE WHATSAPP-ONTVANGER — vangt klantberichten op en bewaart ze in de EU.
 *
 * WAAROM DIT BESTAAT
 * De site zelf heeft geen server (GitHub Pages), dus iets moet 24 uur per dag
 * klaarstaan om een melding van 360dialog aan te nemen. Dat is dit kleine
 * programmaatje bij Cloudflare. Het doet drie dingen en verder niets:
 *
 *   POST /webhook     360dialog meldt een nieuw bericht; wij bewaren het.
 *   GET  /berichten   Claude haalt 's ochtends op wat er nieuw is.
 *   (elke dag)        Berichten ouder dan BEWAAR_DAGEN worden gewist.
 *
 * WAT HIER BEWUST NIET IN ZIT
 * Versturen. Er is geen enkele manier om via dit programma een bericht naar een
 * klant te sturen. Dat doet Justus zelf vanuit zijn app.
 *
 * WAAR DE BERICHTEN STAAN
 * In één opslagbak (een "Durable Object") die we vastzetten in de EU. Dat staat
 * hieronder in de code, dus het kan niet per ongeluk ergens anders belanden.
 *
 * DE TWEE SLEUTELS
 * Ze staan nooit in deze map (die is openbaar), maar als geheim bij Cloudflare.
 *   WEBHOOK_SLEUTEL  360dialog stuurt die mee in de kop x-ontvanger-sleutel.
 *   OPHAAL_SLEUTEL   Claude stuurt die mee als "Authorization: Bearer …".
 * Ontbreekt een sleutel, dan gaat die deur dicht.
 */
import { DurableObject } from 'cloudflare:workers';
import { berichtenUit, sleutelKlopt } from './berichten.js';

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
  }

  /** Bewaar berichten. Stuurt 360dialog iets twee keer, dan blijft er één over. */
  async bewaar(berichten) {
    const nu = Date.now();
    for (const b of berichten) {
      this.sql.exec(
        `INSERT OR IGNORE INTO berichten
           (id, richting, klant, naam, tijd, soort, tekst, media_id, ontvangen)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        b.id, b.richting, b.klant, b.naam, b.tijd, b.soort, b.tekst, b.mediaId, nu,
      );
    }
    if ((await this.ctx.storage.getAlarm()) === null) {
      await this.ctx.storage.setAlarm(nu + DAG_MS);
    }
  }

  /** Alles na een bepaald volgnummer, oudste eerst. */
  lijst(na) {
    return this.sql
      .exec(
        `SELECT volgnr, id, richting, klant, naam, tijd, soort, tekst, media_id AS mediaId
           FROM berichten WHERE volgnr > ? ORDER BY volgnr LIMIT ?`,
        na, PER_KEER,
      )
      .toArray();
  }

  /** Eén keer per dag: wat ouder is dan de bewaartermijn gaat weg. */
  async alarm() {
    const dagen = Math.max(1, Number(this.env.BEWAAR_DAGEN) || 90);
    this.sql.exec('DELETE FROM berichten WHERE ontvangen < ?', Date.now() - dagen * DAG_MS);
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

export default {
  async fetch(request, env) {
    const { pathname, searchParams } = new URL(request.url);

    if (pathname === '/webhook' && request.method === 'POST') {
      if (!sleutelKlopt(request.headers.get('x-ontvanger-sleutel'), env.WEBHOOK_SLEUTEL)) {
        return new Response('geen toegang', { status: 401 });
      }
      let melding;
      try {
        melding = await request.json();
      } catch {
        // Onleesbaar: gewoon "ok" zeggen, anders blijft 360dialog het een week
        // lang opnieuw proberen met dezelfde onleesbare melding.
        return new Response('ok');
      }
      const berichten = berichtenUit(melding);
      // Lukt het bewaren niet, dan geeft dit een fout terug en probeert
      // 360dialog het later opnieuw. Zo raakt er geen bericht kwijt.
      if (berichten.length > 0) await bak(env).bewaar(berichten);
      return new Response('ok');
    }

    if (pathname === '/berichten' && request.method === 'GET') {
      const kop = request.headers.get('authorization') ?? '';
      if (!sleutelKlopt(kop.replace(/^Bearer\s+/i, ''), env.OPHAAL_SLEUTEL)) {
        return new Response('geen toegang', { status: 401 });
      }
      const na = Math.max(0, Number.parseInt(searchParams.get('na') ?? '0', 10) || 0);
      const berichten = await bak(env).lijst(na);
      return Response.json({ berichten, perKeer: PER_KEER });
    }

    if (pathname === '/') {
      return new Response('Audio Upgrade Emmen: WhatsApp-ontvanger. Hier valt niets te zien.\n');
    }
    return new Response('niet gevonden', { status: 404 });
  },
};
