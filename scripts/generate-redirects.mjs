import fs from 'fs';
import path from 'path';

const REDIRECTS_FILE = path.join(process.cwd(), 'content/redirects/index.json');
const OUTPUT_FILE = path.join(process.cwd(), 'public/_redirects');

try {
  if (fs.existsSync(REDIRECTS_FILE)) {
    const data = JSON.parse(fs.readFileSync(REDIRECTS_FILE, 'utf-8'));
    const redirects = data.items || [];
    
    let content = '# Generated Redirects from TinaCMS\n';
    redirects.forEach(item => {
      if (item.from && item.to) {
        content += `${item.from}  ${item.to}  ${item.status || '301'}\n`;
      }
    });

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Successfully generated ${redirects.length} redirects to ${OUTPUT_FILE}`);
  } else {
    console.log('No redirects file found in content/redirects/index.json');
  }
} catch (error) {
  console.error('Error generating redirects:', error);
}
