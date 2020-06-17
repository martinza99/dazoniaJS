const config = require("./config/config.js");
const express = require("express");
const cookieSession = require("cookie-session");

const passport = require("passport");
const passportSetup = require("./config/LocalStrat.js");
const apiRouter = require("./routes/api");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: config.session.cookieKey
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require("body-parser").urlencoded({ extended: true }));

app.use("/files|/thumbnails", express.static("../../dazonia/thumbnails"));
app.use("/api", apiRouter);
app.use(express.static("../client/build"));

app.use(function(req, res, next) {
	res.statusCode = 404;
	res.statusMessage = "Not Found";
	res.render("404", { title: "404 - Not Found", path: req.path, query: req.query });
});

app.listen(config.port, ()=>{
	console.log(`Running on port ${config.port}`);
});

module.exports = app;
