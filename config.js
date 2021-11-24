const dotenv = require("dotenv").config({path: '.env'});

module.exports = {
  API_VERSION: process.env.API_VERSION || "v1",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  DB_USERNAME: process.env.DB_USERNAME || "homer",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "myMongoDB",
  SECRET_KEY: process.env.SECRET || "MyLittlePony",
};
