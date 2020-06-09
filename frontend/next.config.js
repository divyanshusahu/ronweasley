const withPlugins = require("next-compose-plugins");
const withOffline = require("next-offline");
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withPlugins([
  withCss,
  withPurgeCss,
  [
    withOffline,
    {
      workboxOpts: {
        swDest: process.env.NEXT_EXPORT
          ? "service-worker.js"
          : "static/service-worker.js",
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "offlineCache",
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
      },
      experimental: {
        async rewrites() {
          return [
            {
              source: "/service-worker.js",
              destination: "/_next/static/service-worker.js",
            },
          ];
        },
      },
    },
  ],
]);
