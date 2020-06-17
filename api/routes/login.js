const express = require("express");
const config = require("../config/config.js");
const passport = require("passport");
const router = express.Router();

router.post("/", passport.authenticate("local",
	{
		failureRedirect: "/login.html?status=failure",
		successRedirect: "/?status=success"
	}
));

module.exports = router;
