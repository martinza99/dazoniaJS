const config = require("./config");
const express = require("express");

const passport = require("passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(require("express-flash")());
app.use(
	require("express-session")({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: false,
	})
);
require("./LocalStrat")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(require("body-parser").urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/files|/thumbnails", express.static("../dazonia/thumbnails"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(function(req, res, next) {
	res.statusCode = 404;
	res.statusMessage = "Not Found";
	res.render("404", { title: "404 - Not Found", path: req.path, query: req.query });
});

app.listen(config.port, ()=>{
	console.log(`Running on port ${config.port}`);
});

module.exports = app;
