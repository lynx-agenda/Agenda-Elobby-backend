const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//Load routings
const usersRouter = require("./routers/users.router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, X_Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// // Routers Basic
app.use("/users", usersRouter);

// app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
