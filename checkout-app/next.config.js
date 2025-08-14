const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './Checkout': './components/Checkout.js',
        },
        remotes: {
          'cart': `cart@http://localhost:3004/_next/static/${isServer ? 'ssr' : 'chunks'}/chunks/remoteEntry.js`
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