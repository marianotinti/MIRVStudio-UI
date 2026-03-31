import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.join(process.cwd(), 'src');
const filePattern = /\.(ts|tsx|js|jsx)$/;
const longRelativeImportPattern = /(from|import\()\s*["'](\.\.\/){2,}[^"']*["']/g;
const matches = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath);
      continue;
    }

    if (!filePattern.test(entry.name)) {
      continue;
    }

    const relativePath = path.relative(process.cwd(), entryPath);
    const content = fs.readFileSync(entryPath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (longRelativeImportPattern.test(line)) {
        matches.push(`${relativePath}:${index + 1}: ${line.trim()}`);
      }
      longRelativeImportPattern.lastIndex = 0;
    });
  }
}

walk(srcDir);

if (matches.length > 0) {
  console.error('Alias import scan failed. Long relative imports found:');
  for (const match of matches) {
    console.error(`- ${match}`);
  }
  process.exit(1);
}

console.log('Alias import scan: OK');