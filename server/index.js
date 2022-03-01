require('../helpers/init-env')();
const express = require('express');
const next = require('next');

const sessionMiddleware = require('./middlewares/session-middleware');
const authMiddleware = require('./middlewares/auth-middleware');

const {
  APP_URL, APP_HOSTNAME, APP_PORT, APP_NAME, NODE_ENV,
} = process.env;

const app = next({
  dev: NODE_ENV !== 'production',

  hostname: APP_HOSTNAME,
  port: APP_PORT,
});
const handle = app.getRequestHandler();

const main = async () => {
  try {
    await app.prepare();
    const server = express();
    // server.use('/', handle);

    // middlewares
    server.use(sessionMiddleware);
    server.use('/', authMiddleware, handle);

    // running customised server at specified port
    server.listen(APP_PORT, (err) => {
      if (err) throw err;
      console.log(`${APP_NAME} started at ${APP_URL}`);
    });
  } catch (err) {
    console.log('error in starting server', err);
    process.exit(1);
  }
};

main();
