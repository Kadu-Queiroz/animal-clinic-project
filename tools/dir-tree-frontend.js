#!/usr/bin/env node
/**
 * dir-tree-frontend.mjs — ASCII tree para projetos Vite/React em ESM.
 *
 * Uso:
 *   node tools/dir-tree-frontend.mjs --root . --only src --out tree-frontend.txt --max-depth 20
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

function getArg(name, def) {
  const i = args.indexOf(name);
  if (i !== -1 && args[i + 1]) return args[i + 1];
  return def;
}

// só se você precisar de __dirname/__filename em algum momento:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(getArg('--root', '.'));
const ONLY = getArg('--only', 'src');
const OUT = path.resolve(getArg('--out', 'tree-frontend.txt'));
const MAX_DEPTH = parseInt(getArg('--max-depth', '50'), 10);

const EXCLUDE_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git',
  '.github',
  '.husky',
  '.next',
  '.turbo',
  '.cache',
  '.vscode',
  '.idea',
  '.pnpm-store',
  '.DS_Store',
]);

const IMPORTANT_ROOT_FILES = new Set([
  'package.json',
  'tsconfig.json',
  'jsconfig.json',
  'vite.config.ts',
  'vite.config.js',
  'index.html',
  '.env',
  '.env.local',
  '.env.development',
  '.env.production',
  '.env.example',
  'docker-compose.yml',
  'Dockerfile',
  'README.md',
]);

const INCLUDE_EXTS = new Set([
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.tsx',
  '.ts',
  '.jsx',
  '.js',
  '.json',
  '.yml',
  '.yaml',
  '.md',
  '.env',
]);

const EXCLUDE_FILE_PATTERNS = [
  /\.d\.ts$/i,
  /\.map$/i,
  /\.log$/i,
  /^package-lock\.json$/i,
  /^yarn\.lock$/i,
  /^pnpm-lock\.yaml$/i,
];

function shouldIncludeFile(baseName, fullPath, depth, isRoot) {
  if (EXCLUDE_FILE_PATTERNS.some(rx => rx.test(baseName))) return false;

  if (isRoot) {
    if (IMPORTANT_ROOT_FILES.has(baseName)) return true;
    if (/^readme\.md$/i.test(baseName)) return true;
    return false;
  }

  const ext = path.extname(baseName).toLowerCase();
  return INCLUDE_EXTS.has(ext);
}

function isExcludedDir(baseName) {
  return EXCLUDE_DIRS.has(baseName);
}

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function tree(startDir) {
  const lines = [];
  const startStats = fs.existsSync(startDir) ? fs.statSync(startDir) : null;
  if (!startStats || !startStats.isDirectory()) {
    throw new Error(`Diretório inválido: ${startDir}`);
  }

  const rootDisplay = path.relative(ROOT, startDir) || path.basename(startDir);
  lines.push(rootDisplay || path.basename(startDir));

  function walk(dir, prefix, depth, isRootSection) {
    if (depth > MAX_DEPTH) return;

    let entries = readDirSafe(dir);
    entries = entries.filter(dent => {
      const name = dent.name;
      if (dent.isDirectory()) return !isExcludedDir(name);
      return shouldIncludeFile(name, path.join(dir, name), depth, isRootSection);
    });

    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    entries.forEach((dent, idx) => {
      const last = idx === entries.length - 1;
      const branch = last ? '└── ' : '├── ';
      const nextPrefix = prefix + (last ? '    ' : '│   ');
      lines.push(prefix + branch + dent.name);

      if (dent.isDirectory()) {
        walk(path.join(dir, dent.name), nextPrefix, depth + 1, false);
      }
    });
  }

  walk(startDir, '', 1, true);
  return lines.join('\n');
}

let startPath = ROOT;
if (ONLY) {
  const maybe = path.join(ROOT, ONLY);
  if (fs.existsSync(maybe) && fs.statSync(maybe).isDirectory()) {
    startPath = maybe;
  } else {
    console.warn(`[dir-tree] Aviso: pasta "${ONLY}" não encontrada em ${ROOT}. Listando do root…`);
  }
}

const header = [
  `# Project Tree (Vite Frontend)`,
  `# Root: ${ROOT}`,
  ONLY ? `# Focus: ${path.relative(ROOT, startPath) || '.'}` : `# Focus: (root)`,
  `# Max Depth: ${MAX_DEPTH}`,
  `# Gerado em: ${new Date().toISOString()}`,
  ``,
].join('\n');

try {
  const output = header + tree(startPath);
  fs.writeFileSync(OUT, output, 'utf8');
  console.log(`OK! Árvore salva em: ${OUT}`);
} catch (err) {
  console.error(`[dir-tree] Erro: ${err.message}`);
  process.exitCode = 1;
}
