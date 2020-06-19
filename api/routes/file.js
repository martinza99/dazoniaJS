const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");
const fs = require("fs");
const ratingRouter = require("./rating");

router.use("/ratings", ratingRouter);

router.get("/", async (req, res) => {
	res.json(req.file);
});

router.delete("/", checkOwner, async (req, res) => {
	const promises = [];
	try {
		promises.push(
			con
				.promise()
				.query("DELETE FROM file WHERE fileID = ?", req.file.fileID)
		);
		promises.push(
			fs.promises.unlink(
				`${__dirname}/../../uploads/files/${req.file.filename}`
			)
		);
		promises.push(
			fs.promises.unlink(
				`${__dirname}/../../uploads/thumbnails/${req.file.filename}`
			)
		);
		await Promise.all(promises);
		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

router.patch("/title", checkOwner, async (req, res) => {
	try {
		const sql = `UPDATE file SET title = ? WHERE fileID = ?`;
		await con.promise().query(sql, [req.body.title, req.file.fileID]);
		req.file.title = req.body.title;
		res.json(req.file);
	} catch (error) {
		res.sendStatus(500);
		throw error;
	}
});

module.exports = router;

async function checkOwner(req, res, next) {
	if (req.user.isAdmin || req.user.userID == req.file.userID) next();
	else res.status(403);
}
