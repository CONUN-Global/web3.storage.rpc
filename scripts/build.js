import { build } from "esbuild";

build({
    entryPoints: ['src/main.ts'],
    platform: 'node',
    target: 'node16',
    bundle: true,
    sourcemap: true,
    target: ['ES2020'],
    format: 'esm',
    outfile: 'lib/main.js',
}).catch(()=>process.exit(1))