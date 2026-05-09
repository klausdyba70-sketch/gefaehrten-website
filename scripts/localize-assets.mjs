import fs from 'fs';
import path from 'path';

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
  // Decode filename to handle spaces/special characters
  const decodedFilename = decodeURIComponent(filename);
  const dest = path.join(ASSETS_DIR, decodedFilename);
  
  if (fs.existsSync(dest)) {
    return; // Skip if already exists
  }

  console.log(`Downloading: ${url} -> ${dest}`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

async function localize() {
  // Ensure assets dir exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // Find all content files
  const allFiles = getFiles(CONTENT_DIR);
  const files = allFiles.filter(f => f.endsWith('.json') || f.endsWith('.md') || f.endsWith('.mdx'));
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    
    // Find all Tina Cloud URLs
    const matches = [...content.matchAll(TINA_CLOUD_URL_REGEX)];
    
    for (const match of matches) {
      const fullUrl = match[0];
      const filename = match[1];
      const decodedFilename = decodeURIComponent(filename);
      const localPath = `/images/tina/${decodedFilename}`;
      
      await downloadAsset(fullUrl, filename);
      
      // Replace URL in content
      content = content.replace(fullUrl, localPath);
      hasChanges = true;
    }
    
    if (hasChanges) {
      console.log(`Updated: ${file}`);
      fs.writeFileSync(file, content);
    }
  }
}

localize().then(() => {
  console.log('Localization complete.');
}).catch(err => {
  console.error('Localization failed:', err);
  process.exit(1);
});

