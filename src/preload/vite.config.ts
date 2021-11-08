import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  build: {
    outDir: join(process.cwd(), 'dist/preload'),
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    sourcemap: false,
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [
        ...builtinModules,
        'electron',
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
})
