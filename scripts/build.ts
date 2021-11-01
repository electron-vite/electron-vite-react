import { join } from 'path'
import { readdirSync } from 'fs'
import { OutputOptions, rollup, RollupOptions, RollupOutput } from 'rollup'
import { optionsFactory } from './rollup.config'

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

async function doBuild(options: RollupOptions): Promise<[Error | null, RollupOutput | null]> {
  try {
    const build = await rollup(options)
    const output = await build.write(options.output as OutputOptions)

    return [null, output]
  } catch (error: any) {
    return [error, null]
  }
}

// build
[mainOptions(), preloadOptions()].forEach(options => {
  doBuild(options)
    .then(([err, output]) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      output?.output.forEach(out => {
        console.log(TAG, `Build successed -- ${(out as any).facadeModuleId}`)
      })
    })
})
