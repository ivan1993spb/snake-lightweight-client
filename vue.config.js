const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const packageJson = require('./package.json')

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --abbrev=0 --always',
  commithashCommand: 'rev-parse --short HEAD'
})

const env = {
  VERSION: gitRevisionPlugin.version(),
  BUILD: gitRevisionPlugin.commithash(),
  LICENSE: packageJson['license'],
  AUTHOR: packageJson['author']['name']
}

if (process.env.SNAKE_SERVER_HOST) {
  env.SNAKE_SERVER_HOST = process.env.SNAKE_SERVER_HOST
}
if (process.env.SNAKE_SERVER_PORT) {
  env.SNAKE_SERVER_PORT = process.env.SNAKE_SERVER_PORT
}
if (process.env.SNAKE_SERVER_WEB_SCHEME) {
  env.SNAKE_SERVER_WEB_SCHEME = process.env.SNAKE_SERVER_WEB_SCHEME
}
if (process.env.SNAKE_SERVER_SOCKET_SCHEME) {
  env.SNAKE_SERVER_SOCKET_SCHEME = process.env.SNAKE_SERVER_SOCKET_SCHEME
}

const environmentPlugin = new webpack.EnvironmentPlugin(env)

module.exports = {
  baseUrl: '.',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      gitRevisionPlugin,
      environmentPlugin
    ]
  }
}
