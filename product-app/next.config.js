const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config, options) {
    // Externalize sqlite3 for server-side
    if (options.isServer) {
      config.externals.push('sqlite3');
    }
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'product',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './ProductList': './components/ProductList.tsx',
          './ProductDetail': './components/ProductDetail.tsx',
          './ProductCard': './components/ProductCard.js',
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
