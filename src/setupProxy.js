const { createProxyMiddleware } = require("http-proxy-middleware");

const host = process.env.REACT_APP_API;

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: host,
      changeOrigin: true,
    })
  );
};
