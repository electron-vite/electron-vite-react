import { join, relative } from 'path'
import { readdirSync } from 'fs'
import { OutputOptions, rollup, RollupOptions, RollupOutput, RollupError } from 'rollup'
import { build as viteBuild2 } from 'vite'
import { optionsFactory } from './rollup.config'

export type BuildResult = [RollupError | null, RollupOutput | null]

const TAG = '[build.ts]'

function mainOptions() {
  return optionsFactory({
    input: join(__dirname, '../main/index.ts'),
    output: {
      dir: 'dist/main',
    },
  })
}

function preloadOptions() {
  const dirs = readdirSync(join(__dirname, '../preload'))
  const inputs = dirs.filter(name => /^index\..+\.ts$/.test(name))

  return optionsFactory({
    input: inputs.map(input => join(__dirname, '../preload', input)),
    output: {
      dir: 'dist/preload',
    },
  })
}

// build main、preload
async function rollupBuild(options: RollupOptions): Promise<BuildResult> {
  try {
    const build = await rollup(options)
    const optOutput = (options.output || {}) as OutputOptions
    const output = await build.write(optOutput)

    output.output.forEach(out => {
      const relativePath = relative(__dirname, optOutput.dir as string)
      console.log(TAG, `Build successful - ${join(relativePath, out.fileName)}`)
    })

    return [null, output]
  } catch (error: any) {
    console.error(TAG, 'Build failed:\n', error)
    return [error, null]
  }
}

// build react-ts
async function buildReactTs(): Promise<BuildResult> {
  try {
    const output = await viteBuild2({
      root: join(__dirname, '../react-ts'),
      configFile: join(__dirname, '../react-ts/vite.config.ts'),
    }) as RollupOutput

    return [null, output]
  } catch (error: any) {
    return [error, null]
  }
}

; (async () => {

  console.log(TAG, 'Build with rollup.')
  try {
    await Promise.all([
      rollupBuild(mainOptions()),
      rollupBuild(preloadOptions()),
    ])
    await buildReactTs()
  } catch (error) {
    console.error(TAG, error)
    process.exit(1)
  }
})();
