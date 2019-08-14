const yargs = require('yargs').argv

const { env } = yargs
const mockData = {
  local: 'http://localhost:8080',
  dev: 'https://dev-atlas.nevext.com/',
}

const defaultEnv = mockData.local
const target =
  env && env.m !== undefined ? mockData[env.m] || defaultEnv : defaultEnv

console.log(`
Proxy url is:

${target}\n`)

module.exports = {
  context: pathname =>
    !!pathname.match('^/api') || !!pathname.match('^/log(in|out)'),
  target,
  changeOrigin: true,
}
