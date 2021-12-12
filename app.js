const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const config = require("./config");

const Redis = require("redis");

const client = Redis.createClient({
	url: config.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", (err) => console.log("connected to redis successfully"));

client.connect();

module.exports = { client };

const { authenticateToken, checkAuthUserValidity } = require("./src/middlewares/auth.middleware");

// Create the Express application object
const app = express();

mongoose.connect(
	`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster.ralzs.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
);

//Load routings
const usersRouter = require("./src/api/routers/users.router");
const authRouter = require("./src/api/routers/auth.router");
const reviewsRouter = require("./src/api/routers/reviews.router");
const thirdRouter = require("./src/api/routers/third.router");
const diariesRouter = require("./src/api/routers/diaries.router");
const elementsRouter = require("./src/api/routers/elements.router");
const tierlistsRouter = require("./src/api/routers/tierlists.router");

app.use(compression()); //Compress all routes
app.use(cors());

app.use(express.json()); // middleware used to parse JSON bodies
// app.use(express.urlencoded()); // middleware used to parse URL-encoded bodies

app.use("/auth", authRouter);
app.use("/third", thirdRouter);

app.use(authenticateToken);

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
app.use("/api/reviews", reviewsRouter);
app.use("/api/diaries", diariesRouter);
app.use("/api/elements", elementsRouter);
app.use("/api/tierlists", tierlistsRouter);

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
