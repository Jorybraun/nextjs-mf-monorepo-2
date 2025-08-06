const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    
    // Only enable Module Federation on client side to avoid SSR issues
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'remote',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './RemoteButton': './components/RemoteButton.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;