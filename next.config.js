const path = require('path');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');

// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map',
});

module.exports = withSourceMaps(
  withFonts(
    withOptimizedImages({
      experimental: {
        modern: true,
        // reactRefresh: false,
        // reactMode: 'concurrent',
      },
      optipng: {
        interlaced: true,
      },
      webpack: (config, { isServer }) => {
        // https://github.com/ethereum/web3.js/issues/1105
        // https://spectrum.chat/zeit/general/error-while-building-project~cf3cadfd-6370-4dae-8399-84c8ab2b4841
        config.resolve.alias['scrypt.js'] = path.resolve(
          __dirname,
          './node_modules/scrypt.js/js.js',
        );
        if (!isServer) {
          config.node = {
            fs: 'empty',
            child_process: 'empty',
            module: 'empty',
          };
        }
        return config;
      },
    }),
  ),
);
