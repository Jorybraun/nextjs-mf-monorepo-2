const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'productList',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './ProductList': './components/ProductList.tsx',
          './ProductCard': './components/ProductCard.js',
          './ProductPage': './pages/products.js',
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