const express = require("express");
const config = require("../config");
const router = express.Router();
const con = require("../database");
const sizeOf = require("image-size");

const sql = `SELECT file.*, FLOOR(AVG(userrating.rating)) AS rating
    FROM file
    NATURAL LEFT JOIN userrating
    NATURAL JOIN tagfile
    NATURAL JOIN tag
    WHERE tag.tagname = ?
    GROUP BY file.fileID
    ORDER BY file.fileID DESC
    LIMIT ${config.dazonia.picsPerPage} OFFSET ?`;

router.get("/", (req, res) => {
	req.query.page = parseInt(req.query.page) || 1;
	req.query.tag = req.query.tag || config.dazonia.defaultTagName;
	const args = [req.query.tag, (req.query.page - 1) * config.dazonia.picsPerPage];
	con.execute(sql, args, function(err, results, fields) {
		if (err) throw err;
		for (const img of results) {
			img.thumbnail = sizeOf("../dazonia/thumbnails/" + img.filename);
			if (["gif", "mp4"].some(type => img.filename.endsWith(type))) img.hasIcon = true;
		}
		res.render("index", { results, title: "Dazonia", dazonia: config.dazonia, query: req.query });
	});
});

module.exports = router;
