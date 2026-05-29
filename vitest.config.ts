import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['test/e2e.spec.ts'],
    passWithNoTests: true,
    testTimeout: 1000 * 29,
  },
})
