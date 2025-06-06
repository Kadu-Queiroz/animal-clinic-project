import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastas a ignorar
const IGNORAR_PASTAS = new Set([
  '__pycache__',
  '.git',
  '.venv',
  'node_modules',
  '.idea',
  '.vscode',
  'migrations',
]);

const EXTENSOES_PERMITIDAS = ['.html', '.ts', '.tsx'];

const outputPath = path.join(__dirname, 'estrutura.txt');
const writeStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });

function listarPastasEArquivos(dir: string, nivel: number = 0) {
  let itens: string[];
  try {
    itens = fs.readdirSync(dir).sort();
  } catch {
    return;
  }

  for (const item of itens) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      if (IGNORAR_PASTAS.has(item)) continue;

      writeStream.write('│   '.repeat(nivel) + `📁 ${item}/\n`);
      listarPastasEArquivos(itemPath, nivel + 1);
    } else if (EXTENSOES_PERMITIDAS.includes(path.extname(item))) {
      writeStream.write('│   '.repeat(nivel) + `├── ${item}\n`);
    }
  }
}

// Caminho base (um nível acima do script)
const baseDir = path.resolve(__dirname, '..');
listarPastasEArquivos(baseDir);

writeStream.end('\n✅ Estrutura gerada com sucesso.\n');
