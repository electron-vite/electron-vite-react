import { builtinModules } from 'module'
import { RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
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
      // swc(), Error: Cannot find module 'regenerator-runtime',
      replace({
        ...Object
          .entries({ NODE_ENV: process.env.NODE_ENV })
          .reduce(
            (acc, [k, v]) => Object.assign(acc, { [`process.env.${k}`]: JSON.stringify(v) }),
            {},
          ),
        preventAssignment: true,
      }),
    ],
    external: [
      'electron',
      ...builtinModules,
    ],
  }
}

export { optionsFactory }
