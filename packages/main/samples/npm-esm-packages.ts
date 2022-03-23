import { execa } from 'execa'

(async () => {
  const { stdout } = await execa('echo', ['unicorns'])

  // console.log(stdout) // unicorns
})()
