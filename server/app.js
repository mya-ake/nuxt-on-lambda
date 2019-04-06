const express = require('express');

const { nuxt } = require('./core/nuxt');
const { setHeadersMiddleware } = require('./middlewares/header-middleware');
const { loggerMiddleware } = require('./middlewares/logger-middleware');
const { envMiddleware } = require('./middlewares/env-middleware');

const app = express();

/** middleware */
app.use(setHeadersMiddleware);

if (process.env.ENDPOINT_ENV === 'api_gw') {
  app.use(envMiddleware);
}

if (process.env.NODE_ENV !== 'development') {
  app.use(loggerMiddleware);
}

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
});

module.exports.app = app;
