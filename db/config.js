require('dotenv').config();

const {
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DB_NAME,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DIALECT,
} = process.env;

module.exports = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB_NAME,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: MYSQL_DIALECT,
  dialectOptions: { bigNumberStrings: true },
};
