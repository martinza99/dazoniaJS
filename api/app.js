const config = require("./config/config");
const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const User = require("./models/user");

const passport = require("passport");
const passportSetup = require("./config/LocalStrat");

const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const app = express();

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: config.session.cookieKey,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/files|/thumbnails", express.static("../../dazonia/thumbnails"));
app.use("/api", authCheck, apiRouter);
app.use("/auth", authRouter);
app.use("/test", express.static("../client/test"));
// app.use(express.static("../client/build"));

app.use((req, res) => {
	res.status(404).json({
		method: req.method,
		url: req.url,
		status: "not found",
	});
});

app.listen(config.port, () => {
	console.log(`Running on port ${config.port}`);
});

/**
 * Middleware to check if logged in
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
async function authCheck(req, res, next) {
	if (req.user) next();
	else {
		if (req.body.apiKey) {
			req.user = await User.getByApiKey(req.body.apiKey);
			if (req.user) next();
			else res.status(400).json({ message: "Invalid API key" });
		} else res.sendStatus(401);
	}
}

module.exports = app;
