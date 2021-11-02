import { builtinModules } from 'module'
import { RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
// import swc from 'rollup-plugin-swc'

function optionsFactory(options: RollupOptions): RollupOptions {
  return {
    input: options.input,
    output: {
      name: '[name].js',
      format: 'cjs',
      ...options.output,
    },
    plugins: [
      commonjs(),
      nodeResolve({
        extensions: ['.ts', '.js', 'json'],
      }),
      typescript(),
      // swc(), Error: Cannot find module 'regenerator-runtime'
    ],
    external: [
      'electron',
      ...builtinModules,
    ],
  }
}

export { optionsFactory }
