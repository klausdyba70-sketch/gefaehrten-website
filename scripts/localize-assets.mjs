import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ASSETS_DIR = 'public/images/tina';
const CONTENT_DIR = 'content';
const TINA_CLOUD_URL_REGEX = /https:\/\/assets\.tina\.io\/[a-zA-Z0-9-]+\/([^"'\s)>]+)/g;

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.join(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

async function downloadAsset(url, filename) {
  const decodedFilename = decodeURIComponent(filename);
  const dest = path.join(ASSETS_DIR, decodedFilename);
  
  if (fs.existsSync(dest)) {
    return;
  }

  console.log(`Downloading: ${url} -> ${dest}`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);

    // OPTIMIZATION: If it's a large image, downscale it
    if (filename.toLowerCase().endsWith('.png') || filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg')) {
      const stats = fs.statSync(dest);
      if (stats.size > 1024 * 1024) { // > 1MB
        console.log(`Optimizing large image: ${decodedFilename} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
        try {
          // Use ffmpeg to resize to max 1400px width
          execSync(`ffmpeg -i "${dest}" -vf "scale='min(1400,iw)':-1" -y "${dest}.tmp.png" && mv "${dest}.tmp.png" "${dest}"`, { stdio: 'ignore' });
          const newStats = fs.statSync(dest);
          console.log(`Optimized: ${decodedFilename} -> ${(newStats.size / 1024 / 1024).toFixed(2)}MB`);
        } catch (optimizeErr) {
          console.warn(`Optimization failed for ${decodedFilename}, keeping original.`);
        }
      }
    }
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

async function localize() {
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  const allFiles = getFiles(CONTENT_DIR);
  const files = allFiles.filter(f => f.endsWith('.json') || f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    const matches = [...content.matchAll(TINA_CLOUD_URL_REGEX)];
    
    for (const match of matches) {
      const fullUrl = match[0];
      const filename = match[1];
      const decodedFilename = decodeURIComponent(filename);
      
      // Check if it exists in the main images folder (manually renamed ones)
      const mainImagesPath = path.join('public/images', decodedFilename);
      let localPath;
      
      if (fs.existsSync(mainImagesPath)) {
        localPath = `/images/${decodedFilename}`;
        console.log(`Using existing image in /images: ${decodedFilename}`);
      } else {
        localPath = `/images/tina/${decodedFilename}`;
        await downloadAsset(fullUrl, filename);
      }
      
      content = content.replace(fullUrl, localPath);
      hasChanges = true;
    }
    
    if (hasChanges) {
      console.log(`Updated references in: ${file}`);
      fs.writeFileSync(file, content);
    }
  }
}

localize().then(() => {
  console.log('Localization & Optimization complete.');
}).catch(err => {
  console.error('Task failed:', err);
  process.exit(1);
});


