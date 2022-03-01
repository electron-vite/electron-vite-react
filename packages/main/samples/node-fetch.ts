import fetch from 'node-fetch'

(async () => {
  const body = await (await fetch('https://github.com/')).text()

  // console.log(body)
})()
