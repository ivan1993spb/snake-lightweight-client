const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const packageJson = require('./package.json')

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --abbrev=0',
  commithashCommand: 'rev-parse --short HEAD'
})

const environmentPlugin = new webpack.EnvironmentPlugin({
  VERSION: gitRevisionPlugin.version(),
  BUILD: gitRevisionPlugin.commithash(),
  LICENSE: packageJson['license'],
  AUTHOR: packageJson['author']['name']
})

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      gitRevisionPlugin,
      environmentPlugin
    ]
  }
}
