const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'productList',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './ProductList': './components/ProductList.js',
          './ProductCard': './components/ProductCard.js',
          './products': './pages/index.js',
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