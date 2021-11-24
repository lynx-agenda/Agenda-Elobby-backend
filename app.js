const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config');

const app = express();

mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster.ralzs.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`);

//Load routings
const usersRouter = require("./api/routers/users.router");
const authRouter = require("./api/routers/auth.router");

app.use(cors())

app.use(express.json()); // middleware used to parse JSON bodies
// app.use(express.urlencoded()); // middleware used to parse URL-encoded bodies

app.use('/auth', authRouter);

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

// Routers Basic
app.use("/api/users", usersRouter);

// app.use(`/api/${API_VERSION}`, authRoutes);

app.listen(config.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("###############");
    console.log("### API REST ##");
    console.log("###############");
    console.log(`http://${config.HOST}:${config.PORT}/api/`);
    };
  }
);