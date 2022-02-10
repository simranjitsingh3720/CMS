require('dotenv').config();
const express = require('express');
const next = require('next');
// const sequelize = require("./services/sequelize");
const db = require('../db/models/index');

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

console.log(process.env);

const main = async () => {
  try {
    await app.prepare();
    const server = express();

    // middlewares
    server.use(sessionMiddleware);
    server.use('/', authMiddleware, handle);

    // syncing database tables
    db.sequelize.sync();

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
