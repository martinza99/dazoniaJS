const express = require("express");
const config = require("../config/config.js");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
	const u = Object.assign({}, req.user);
	u.password = undefined;
	res.json(u);
});

router.post("/logout", (req, res) => {
	req.logout();
	res.sendStatus(204);
});

router.post("/resetPassword", (req, res) => {
	//todo
	res.sendStatus(501);
});

module.exports = router;
