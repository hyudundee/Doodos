const express = require('express');

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if (enableHMR && (process.env.NODE_ENV !== 'production')) {
    console.log('Adding dev middleware, enabling HMR');
    /* eslint "global-require": "off" */
    /* eslint "import/no-extraneous-dependencies": "off" */
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');

    const config = require('./webpack.config.js')[0];
    config.entry.app.push('webpack-hot-middleware/client');
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(config);
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
}

require('dotenv').config();
const path = require('path');
const proxy = require('http-proxy-middleware');

app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
    app.use('/api', proxy({ target: apiProxyTarget, changeOrigin: true }));
}

if (!process.env.UI_API_ENDPOINT) {
    process.env.UI_API_ENDPOINT = 'http://localhost:5000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
    process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

if (!process.env.UI_AUTH_ENDPOINT) {
    process.env.UI_AUTH_ENDPOINT = 'http://localhost:5000/api/auth';
}

app.get('/env.js', (req, res) => {
    const env = {
        UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
        UI_AUTH_ENDPOINT: process.env.UI_AUTH_ENDPOINT,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
        CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    };
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`UI started on port ${port}`);
});
