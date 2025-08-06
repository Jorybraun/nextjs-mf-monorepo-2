const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './button': './components/RemoteButton.js',
          './products': './pages/products.js',
        },
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    );

    return config;
  },
};