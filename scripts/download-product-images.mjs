import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'public', 'assets', 'products');
const images = [
  {
    "name": "cream-puffs-01.jpg",
    "url": "https://images.pexels.com/photos/16402037/pexels-photo-16402037.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "cream-puffs-02.jpg",
    "url": "https://images.pexels.com/photos/16402100/pexels-photo-16402100.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "strawberry-roll-01.jpg",
    "url": "https://images.pexels.com/photos/36476829/pexels-photo-36476829.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "strawberry-roll-02.jpg",
    "url": "https://images.pexels.com/photos/33187811/pexels-photo-33187811.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "danish-pastry-01.jpg",
    "url": "https://images.pexels.com/photos/33626999/pexels-photo-33626999.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "danish-pastry-02.jpg",
    "url": "https://images.pexels.com/photos/17593890/pexels-photo-17593890.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "basque-cheesecake-01.jpg",
    "url": "https://images.pexels.com/photos/38648017/pexels-photo-38648017.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "basque-cheesecake-02.jpg",
    "url": "https://images.pexels.com/photos/6607317/pexels-photo-6607317.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "carrot-cake-01.jpg",
    "url": "https://images.pexels.com/photos/6133476/pexels-photo-6133476.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "carrot-cake-02.jpg",
    "url": "https://images.pexels.com/photos/5742607/pexels-photo-5742607.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "baklava-01.jpg",
    "url": "https://images.pexels.com/photos/36593610/pexels-photo-36593610.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "baklava-02.jpg",
    "url": "https://images.pexels.com/photos/37315443/pexels-photo-37315443.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "traditional-cookies-01.jpg",
    "url": "https://images.pexels.com/photos/797761/pexels-photo-797761.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "traditional-cookies-02.jpg",
    "url": "https://images.pexels.com/photos/14580492/pexels-photo-14580492.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "fruit-tart-01.jpg",
    "url": "https://images.pexels.com/photos/35495063/pexels-photo-35495063.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    "name": "fruit-tart-02.jpg",
    "url": "https://images.pexels.com/photos/4748356/pexels-photo-4748356.jpeg?auto=compress&cs=tinysrgb&w=1400"
  }
];

await mkdir(outputDir, { recursive: true });
for (const image of images) {
  const response = await fetch(image.url, {
    signal: AbortSignal.timeout(30000),
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; YasBakeryPreview/1.0)' },
  });
  if (!response.ok) throw new Error(`Image download failed for ${image.name}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) throw new Error(`Unexpected content type for ${image.name}: ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10000) throw new Error(`Downloaded image is unexpectedly small: ${image.name} (${bytes.length} bytes)`);
  await writeFile(path.join(outputDir, image.name), bytes);
  process.stdout.write(`Downloaded ${image.name} (${bytes.length} bytes)\\n`);
}
process.stdout.write(`Prepared ${images.length} local product images in public/assets/products\\n`);
