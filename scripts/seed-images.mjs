import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const devicesJsonPath = path.join(ROOT, 'devices', 'devices.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function writeDummyImage(fullPath, label) {
  ensureDir(path.dirname(fullPath));
  const width = 1200;
  const height = 800;
  const background = { r: 240, g: 240, b: 240 };

  // Create a plain background image
  let img = sharp({ create: { width, height, channels: 3, background } });
  img = img.jpeg({ quality: 80 });

  // Save to file
  await img.toFile(fullPath);
}

async function main() {
  const raw = fs.readFileSync(devicesJsonPath, 'utf8');
  const devices = JSON.parse(raw);
  const created = [];
  for (const d of devices) {
    if (!d.image || typeof d.image !== 'string') continue;
    const rel = d.image.startsWith('/') ? d.image.slice(1) : d.image;
    const full = path.join(ROOT, rel);
    await writeDummyImage(full, d.name || d.id || 'Device');
    created.push(full);
  }
  console.log('Created images:', created.map(p => path.relative(ROOT, p)));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
