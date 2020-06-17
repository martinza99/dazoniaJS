const express = require("express");
const config = require("../config/config.js");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/"
	}
));

router.post("/logout", (req, res)=>{
	req.logout();
	res.redirect("/auth/login");
});

module.exports = router;
