const express = require("express");
const config = require("../config");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("login", { title: "Login", query: req.query });
});

router.post("/", passport.authenticate("local", { failureRedirect: "/login" + Date.now() }), (req, res) => {
	res.send("logged in :)");
});

module.exports = router;
