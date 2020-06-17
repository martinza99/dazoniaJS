const config = require("./config/config");
const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const passport = require("passport");
const passportSetup = require("./config/LocalStrat");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const app = express();

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: config.session.cookieKey
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/files|/thumbnails", express.static("../../dazonia/thumbnails"));
app.use("/api", authCheck, apiRouter);
app.use("/auth", authRouter);
app.use("/", express.static("./test"));
// app.use(express.static("../client/build"));

app.listen(config.port, ()=>{
	console.log(`Running on port ${config.port}`);
});

function authCheck(req, res, next){
	if(!req.user)
		res.redirect("/auth/login?fail");
	next();
}

module.exports = app;
