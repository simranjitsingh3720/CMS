require('dotenv').config();
const express = require('express');
const next = require('next');
// const sequelize = require("./services/sequelize");
const db = require('../db/models/index');

const { PORT, APP_NAME, NODE_ENV } = process.env;
const app = next({ dev: NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const main = async () => {
  try {
    await app.prepare();
    const server = express();
    server.use('/', handle);

    // syncing database tables
    db.sequelize.sync();

    // running customised server at specified port
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`${APP_NAME} started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('error in starting server', err);
    process.exit(1);
  }
};

main();
