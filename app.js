const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./config');
const jwt = require("jsonwebtoken");

const app = express();

mongoose.connect(
  `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster.ralzs.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
);

//  authentication middleware
function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Error 401 - Unauthorized
  if(token == null ) return res.sendStatus(401)

  jwt.verify(token, config.SECRET_KEY, (err, dataStored) => {
    console.log(err)
    // Error 403 – Forbidden
    if (err) return res.sendStatus(403)
    req.user = dataStored
    next()
  })
}

//Load routings
const usersRouter = require("./api/routers/users.router");
const authRouter = require("./api/routers/auth.router");
const reviewsRouter = require("./api/routers/reviews.router");

app.use(cors());

app.use(express.json()); // middleware used to parse JSON bodies
// app.use(express.urlencoded()); // middleware used to parse URL-encoded bodies

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
app.use("/api/users", usersRouter);
app.use("/auth", authRouter);
app.use("/api/reviews", reviewsRouter);

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
