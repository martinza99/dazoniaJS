const express = require("express");
const config = require("../config/config.js");
const router = express.Router({ mergeParams: true });
const con = require("../config/database");

router.get("/", async (req, res) => {
	try {
		const sql = `SELECT userID, rating FROM userrating WHERE fileID = ?`;
		const results = (await con.promise().execute(sql, [req.file.fileID]))[0];
		res.json(results);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}

});

router.delete("/", async (req, res) => {
	try {
		const sql = `DELETE FROM userrating WHERE fileID = ? AND userID = ?`;
		const results = (await con.promise().query(sql, [req.file.fileID, req.user.userID]))[0];
		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

router.put("/", async (req, res) => {
	try {
		const sql = `INSERT INTO userrating (userID, fileID, rating) VALUES (?, ?, ?)`;
		const results = (await con.promise().execute(sql, [req.user.userID, req.file.fileID, req.body.rating]))[0];
		res.json(results);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

module.exports = router;
