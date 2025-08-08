const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'productDetail',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './product': './pages/products/[id].js',
          './ProductDetail': './components/ProductDetail.js',
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