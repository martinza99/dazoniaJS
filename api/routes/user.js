const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");

router.get("/@me", async (req, res) => {
	const u = Object.assign({}, req.user);
	u.password = undefined;
	res.json(u);
});

router.get("/:id", async (req, res) => {
	try {
		const sql = `SELECT userID, username FROM user WHERE userID = ?`;
		const results = (await con.promise().query(sql, req.params.id))[0];
		if (results.length > 0) res.json(results[0]);
		else res.status(404).json({ status: 404, message: "User not found" });
	} catch (error) {
		res.status(500).json({ status: 500, message: "An SQL error occured" });
		throw error;
	}
});

router.get("/", async (req, res) => {
	try {
		const sql = `SELECT userID, username FROM user`;
		const results = (await con.promise().query(sql))[0];
		res.json(results);
	} catch (error) {
		res.status(500).json({ status: 500, message: "An SQL error occured" });
		throw error;
	}
});

module.exports = router;
