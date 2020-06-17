const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");

const sql = `SELECT * FROM user ORDER BY userID`;

router.get("/", (req, res, next) => {
	con.execute(sql, function(err, results, fields) {
		if (err) throw err;
		res.render("users", { results, title: "User List" });
	});
});

module.exports = router;