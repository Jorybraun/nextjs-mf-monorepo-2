const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

module.exports = {
  transpilePackages: ["shared"],
  webpack(config, options) {
    // Externalize sqlite3 for server-side
    if (options.isServer) {
      config.externals.push('sqlite3');
    }
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cart',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './Cart': './components/Cart.js',
          './CartProvider': './contexts/CartContext.tsx',
          './cartPage': './pages/index.js',
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