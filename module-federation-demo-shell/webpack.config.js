const webpack = require('webpack');
const pkg = require('./package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// module.exports = (config, options) => {
//   config.plugins.push(
//     new webpack.DefinePlugin({
//       'APP_VERSION': JSON.stringify(pkg.version),
//     }),
//   );
  
//   console.log("something has been done here.")
//   return config;
// };

module.exports = {
  output: {
    publicPath: 'http://localhost:4200/',
    uniqueName: 'shell',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        profile: 'http://localhost:58881/remoteEntry.js',
      },
      shared: {
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
        '@ngxs/store': { singleton: true, eager: true },
      },
    }),
  ],
};