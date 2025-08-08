const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './checkout': './pages/checkout.js',
          './Checkout': './components/Checkout.js',
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