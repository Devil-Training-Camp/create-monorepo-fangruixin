import * as esbuild from 'esbuild'

const { watch } = await esbuild.context({
  entryPoints: ['index.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  outdir: './dist',
  format: 'esm',
  color: true,
  logLevel: 'info',
  banner:{
    js: `
import { fileURLToPath } from 'url';
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    `
  },
})

await watch()