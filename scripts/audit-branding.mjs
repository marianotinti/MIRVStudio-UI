import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const ignoredDirs = new Set(['.git', 'dist', 'node_modules']);
const ignoredFiles = new Set(['scripts/audit-branding.mjs']);
const patterns = [
  /Gemini/i,
  /AI Studio/i,
  /google-gemini/i,
  /aistudio-repository-template/i,
  /Run and deploy your AI Studio app/i,
  /react-example/i,
];

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(directory, entry.name), files);
      }
      continue;
    }

    files.push(path.join(directory, entry.name));
  }

  return files;
}

const matches = [];

for (const filePath of walk(rootDir)) {
  const relativePath = path.relative(rootDir, filePath);

  if (ignoredFiles.has(relativePath)) {
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (patterns.some((pattern) => pattern.test(line))) {
        matches.push(`${relativePath}:${index + 1}: ${line.trim()}`);
      }
    });
  } catch {
    // Ignore binary or non-UTF8 files.
  }
}

if (matches.length > 0) {
  console.error('Branding scan failed. Residual references found:');
  for (const match of matches) {
    console.error(`- ${match}`);
  }
  process.exit(1);
}

console.log('Branding scan: OK');