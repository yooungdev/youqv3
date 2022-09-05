/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['avatars.githubusercontent.com','s3.timeweb.com', 'sun1.userapi.com'] },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
