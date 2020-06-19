const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");

router.get("/", async (req, res) => {
	try {
		let sql = `SELECT * FROM file ORDER BY fileID DESC LIMIT ${config.dazonia.picsPerPage}`;
		const results = (await con.promise().query(sql))[0];
		res.json(results);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

router.get("/search", async (req, res) => {
	//TODO
	res.json({ message: "searching..." });
});

module.exports = router;
