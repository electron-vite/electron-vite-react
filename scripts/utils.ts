import { join } from 'path'
import { readdirSync } from 'fs'
import { OutputOptions, rollup, RollupOptions, RollupOutput, RollupError } from 'rollup'
import { optionsFactory } from './rollup.config'

export type BuildResult = [RollupError | null, RollupOutput | null]

function mainOptions(): RollupOptions {
  return optionsFactory({
    input: join(__dirname, '../main/index.ts'),
    output: {
      dir: 'dist/main',
    },
  })
}

function preloadOptions(): RollupOptions {
  const dirs = readdirSync(join(__dirname, '../preload'))
  const inputs = dirs.filter(name => /^index\..+\.ts$/.test(name))

  return optionsFactory({
    input: inputs.map(input => join(__dirname, '../preload', input)),
    output: {
      dir: 'dist/preload',
    },
  })
}

export {
  mainOptions,
  preloadOptions,
}

