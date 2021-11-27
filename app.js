const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const config = require('./config');

const { authenticateToken, checkAuthUserValidity } = require('./src/middlewares/auth.middleware');

// Create the Express application object
const app = express();

mongoose.connect(
  `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster.ralzs.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
);

//Load routings
const usersRouter = require("./src/api/routers/users.router");
const authRouter = require("./src/api/routers/auth.router");
const reviewsRouter = require("./src/api/routers/reviews.router");

app.use(compression()); //Compress all routes
app.use(cors());

app.use(express.json()); // middleware used to parse JSON bodies
app.use(express.urlencoded()); // middleware used to parse URL-encoded bodies

app.use('/auth', authRouter);

app.use(authenticateToken)

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
app.use("/api/users", checkAuthUserValidity, usersRouter);
app.use("/api/reviews", checkAuthUserValidity, reviewsRouter);

// app.use(`/api/${API_VERSION}`, authRoutes);

app.listen(config.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("###############");
    console.log("### API REST ##");
    console.log("###############");
    console.log(`http://${config.HOST}:${config.PORT}/api/`);
  }
});
