module.exports = {
  distDir: 'dist/next',
  enableSvg: true,
  publicRuntimeConfig: {
    CF_DELIVERY_ACCESS_TOKEN: process.env.CF_DELIVERY_ACCESS_TOKEN,
    CF_SPACE_ID: process.env.CF_SPACE_ID
  },
  useFileSystemPublicRoutes: false
};
