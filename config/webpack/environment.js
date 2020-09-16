/* eslint-disable */

const { environment } = require('@rails/webpacker');
const erb = require('./loaders/erb');
const path = require('path');

const webpack = require('webpack');

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
);

environment.loaders.append('erb', erb);

const nodeModulesLoader = environment.loaders.get('nodeModules');
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude =
    nodeModulesLoader.exclude == null ? [] : [nodeModulesLoader.exclude];
}
nodeModulesLoader.exclude.push(/gmaps/);

module.exports = environment;
