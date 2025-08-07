const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */

const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    remote: `remote@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    productList: `productList@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    productDetail: `productDetail@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
    cart: `cart@http://localhost:3004/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3005/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
     config.cache = false;
  // ...existing code...
    // Only enable Module Federation on client side to avoid SSR issues
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        dts: false,
        shared: {},
        extraOptions: {
          exposePages: true,
        },
        // shared: {
        //   react: {
        //     singleton: true,
        //     requiredVersion: false,
        //   },
        //   'react-dom': {
        //     singleton: true,
        //     requiredVersion: false,
        //   },
        // },
      })
    );

    return config;
  },
};

module.exports = nextConfig;