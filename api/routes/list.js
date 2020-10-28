const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");

router.get("/", async (req, res) => {
	try {
		let sql = `SELECT * FROM file LIMIT ${config.dazonia.picsPerPage}`;
		// if (req.query.tags) {
		// 	sql += "NATURAL JOIN tagfile NATURAL JOIN tag WHERE ";
		// 	for (const tag of req.query.tags.split(" ")) {
		// 		sql += "tagname = ? AND ";
		// 	}
		// }
		// sql += ` fileID > 0 ORDER BY fileID DESC LIMIT ${config.dazonia.picsPerPage}`;
		const results = (await con.promise().query(sql, req.params))[0];
		res.json(results);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

module.exports = router;
