const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");
const file = require("../models/file");
const fs = require("fs");
const ratingRouter = require("./rating");

router.use("/:id/ratings", checkFile, ratingRouter);

router.get("/search", async (req, res) => {
	//TODO
	res.send("done");
});

router.get("/:id", checkFile, async (req, res) => {
	res.json(req.file);
});

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

router.delete("/:id", checkFile, async (req, res) => {
	if (req.user.isAdmin || req.user.userID == req.file.userId) {
		const promises = [];
		try {
			promises.push(con.promise().query("DELETE FROM file WHERE fileID = ?", req.file.fileID));
			promises.push(fs.promises.unlink(`${__dirname}/../../uploads/files/${req.file.filename}`));
			promises.push(fs.promises.unlink(`${__dirname}/../../uploads/thumbnails/${req.file.filename}`));
			await Promise.all(promises);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(500);
			throw error;
		}
	}
	else
		res.status(403).json({ status: 403, message: `No permission to delete file` })
});

router.post("/", async (req, res) => {
	//TODO
	res.send("done");
});

router.patch("/:id/title", checkFile, async (req, res) => {
	if (req.user.isAdmin || req.user.userID == req.file.userId) {
		try {
			const sql = `UPDATE file SET title = ? WHERE fileID = ?`;
			await con.promise().query(sql, [req.body.title, req.file.fileID]);
			req.file.title = req.body.title;
			res.json(req.file);
		} catch (error) {
			res.sendStatus(500);
			throw error;
		}
	}
	else
		res.status(403).json({ status: 403, message: `No permission to edit this file` })

});

module.exports = router;

async function checkFile(req, res, next) {
	try {
		const f = await file.getByName(req.params.id);
		req.file = f;
		next();
	} catch (error) {
		res.status(404).json({ status: 404, message: "File not found" });
	}
}