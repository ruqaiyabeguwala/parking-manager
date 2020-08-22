//const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware'); 

module.exports = function(app) {
    app.use(createProxyMiddleware('/auth/**', { target: 'http://localhost:5000',changeOrigin: true }));
    app.use(createProxyMiddleware('/vehicle/**', { target: 'http://localhost:5000',changeOrigin: true }));
};
