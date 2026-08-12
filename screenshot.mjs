import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' };
const root = './dist';

const server = createServer(async (req, res) => {
  let p = req.url.split('?')[0];
  if (p.endsWith('/')) p += 'index.html';
  if (!extname(p)) p += '.html';
  try {
    const data = await readFile(join(root, p));
    res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});
await new Promise((r) => server.listen(4321, r));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const shots = [
  ['/', 'home'],
  ['/upgrades', 'upgrades'],
  ['/audio-upgrade', 'kenteken-check'],
  ['/audio-upgrade/volkswagen-golf', 'model-vw-golf'],
  ['/werkwijze', 'werkwijze'],
  ['/contact', 'contact'],
];

for (const [path, name] of shots) {
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  console.log('shot:', name);
}

// mobiele weergave van de homepage
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'shots/home-mobiel.png', fullPage: true });
console.log('shot: home-mobiel');

await browser.close();
server.close();
console.log('done');
