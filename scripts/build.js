import { build } from "esbuild";

build({
    entryPoints: ['src/main.ts'],
    platform: 'node',
    target: ['node16'],
    bundle: true,
    sourcemap: true,
    format: 'esm',
    outfile: 'lib/main.js',
    allowOverwrite: true,
    treeShaking: true,
    ignoreAnnotations: true,
    minifySyntax: true,

}).catch(()=>process.exit(1))