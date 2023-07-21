const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://8qgx0tm7g6.execute-api.us-east-1.amazonaws.com/Prod',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
          },
      })
    );
  };