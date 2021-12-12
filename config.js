const dotenv = require("dotenv").config({path: '.env'});

module.exports = {
  API_VERSION: process.env.API_VERSION || "v1",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  
  DB_USERNAME: process.env.DB_USERNAME || "homer",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "myMongoDB",

  SECRET_KEY: process.env.SECRET || "MyLittlePony",

  GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY || "Teemo",
  TMDB_API_KEY: process.env.TMDB_API_KEY || "Volibear",
  RAWG_IO_API_KEY: process.env.RAWG_IO_API_KEY || "Ezreal",

  REDIS_URL: process.env.REDIS_URL || 'localhost',
};