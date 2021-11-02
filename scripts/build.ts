process.env.NODE_ENV = 'production'

import { join, relative } from 'path'
import { build as viteBuild2 } from 'vite'
import { build as electronBuild2 } from 'electron-builder'
import { rollup, RollupOptions, OutputOptions, RollupOutput } from 'rollup'
import { config as builderConfig } from './electron-builder.config'
import chalk from 'chalk'
import {
  mainOptions,
  preloadOptions,
  BuildResult,
} from './utils'

const TAG = chalk.bgGray('[build.ts]')

// build main、preload
async function rollupBuild(options: RollupOptions): Promise<BuildResult> {
  try {
    const build = await rollup(options)
    const optOutput = (options.output || {}) as OutputOptions
    const output = await build.write(optOutput)

    output.output.forEach(out => {
      const relativePath = relative(__dirname, optOutput.dir as string)
      console.log(TAG, chalk.green(`Build successful - ${join(relativePath, out.fileName)}`))
    })

    return [null, output]
  } catch (error: any) {
    console.error(TAG, chalk.red('Build failed:\n'), error)
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

// build electron
async function electronBuild() {
  try {
    const result = await electronBuild2({ config: builderConfig })

    console.log(TAG, chalk.green(`electron-builder.build result - ${result}`))
    return [null, result]
  } catch (error) {
    return [error, null]
  }
}

; (async () => {
  console.log(TAG, chalk.blue('Build with rollup.'))
  try {
    await Promise.all([
      // Avoid logs cleaned by vite
      rollupBuild(mainOptions()),
      rollupBuild(preloadOptions()),
    ])
    await buildReactTs()
    await electronBuild()
  } catch (error) {
    console.error(TAG, chalk.red(error))
    process.exit(1)
  }
})();
