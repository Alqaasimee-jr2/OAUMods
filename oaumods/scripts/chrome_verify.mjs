import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const routes = [
  { path: '/', label: 'Homepage Launchpad', mustContain: ['Quick-Action Launchpad', 'Ambulance Line 1', 'Obafemi Awolowo'] },
  { path: '/app', label: 'Companion Mobile Hub', mustContain: ['Freshman Companion', '5.0 GPA Calculator'] },
  { path: '/app/clearance', label: 'Clearance Pipeline', mustContain: ['Freshman Clearance Master Pipeline', 'Pay School Fees on ePortal'] },
  { path: '/map', label: 'Campus Map', mustContain: ['Great Ife', 'Arieh Sharon'] },
  { path: '/faculties', label: '15 Faculties Directory', mustContain: ['Faculty of Administration', 'Faculty of Technology'] }
];

console.log('=== CHROME HEADLESS RUNTIME VERIFICATION (390x844 Mobile) ===');

for (const route of routes) {
  const url = 'https://oaumods.vercel.app' + route.path;
  const tempDir = path.join(process.env.TEMP, `chrome_qa_${route.path.replace(/\//g, '_')}`);
  const shotPath = path.join(process.env.TEMP, `shot_${route.path.replace(/\//g, '_')}.png`);
  
  const cmd = `"${chrome}" --headless=new --user-data-dir="${tempDir}" --window-size=390,844 --screenshot="${shotPath}" --dump-dom "${url}"`;
  
  try {
    const html = execSync(cmd, { encoding: 'utf-8', maxBuffer: 15 * 1024 * 1024 });
    const checks = route.mustContain.map(needle => ({
      needle,
      found: html.includes(needle)
    }));
    
    const allFound = checks.every(c => c.found);
    const shotExists = fs.existsSync(shotPath);
    const shotSize = shotExists ? fs.statSync(shotPath).size : 0;
    
    console.log(`[${allFound ? 'PASS' : 'FAIL'}] ${route.label} (${route.path})`);
    console.log(`   DOM Size: ${html.length.toLocaleString()} bytes | Screenshot: ${shotSize.toLocaleString()} bytes`);
    checks.forEach(c => console.log(`   - "${c.needle}": ${c.found ? 'MATCHED' : 'MISSING'}`));
  } catch (err) {
    console.error(`[ERROR] ${route.label}:`, err.message);
  }
}
