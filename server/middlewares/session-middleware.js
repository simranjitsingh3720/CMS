const session = require('express-session');

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.AUTH_SECRET,
  cookie: {},
  name: 'sess_id',
  unset: 'destroy',
});

module.exports = sessionMiddleware;
