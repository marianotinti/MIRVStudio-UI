import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.join(process.cwd(), 'src');
const componentFilePattern = /components\/.*\.(ts|tsx|js|jsx)$/;
const mockImportPattern = /(from|import\()\s*["'][^"']*\/mocks\/[^"']*["']/g;
const matches = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath);
      continue;
    }

    const relativePath = path.relative(process.cwd(), entryPath);

    if (!componentFilePattern.test(relativePath)) {
      continue;
    }

    const content = fs.readFileSync(entryPath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (mockImportPattern.test(line)) {
        matches.push(`${relativePath}:${index + 1}: ${line.trim()}`);
      }
      mockImportPattern.lastIndex = 0;
    });
  }
}

walk(srcDir);

if (matches.length > 0) {
  console.error('Component mock scan failed. Mock imports found inside components:');
  for (const match of matches) {
    console.error(`- ${match}`);
  }
  process.exit(1);
}

console.log('Component mock import scan: OK');