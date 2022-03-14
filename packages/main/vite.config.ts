import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import esm2cjs from '../../scripts/vite-plugin-esm2cjs'
import pkg from '../../package.json'

export default defineConfig({
  root: __dirname,
  plugins: [
    esm2cjs([
      'execa',
      'node-fetch',
    ]),
  ],
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    minify: process.env./* from mode option */NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
})
