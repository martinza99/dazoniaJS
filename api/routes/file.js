const express = require("express");
const config = require("../config/config.js");
const router = express.Router();
const con = require("../config/database");
const fs = require("fs");
const ratingRouter = require("./rating");
const dazFile = require("../models/file");
const { execSync } = require("child_process");

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

router.patch("/", checkOwner, async (req, res) => {
	if (!req.files.file) {
		res.status(400).json({ message: "No file uploaded" });
		return;
	}
	const oldFile = req.file;
	const file = req.files.file;
	const exists = await dazFile.getByHash(file.md5);
	if (exists) {
		res.status(400).json({ message: "File already exists", file: exists });
		return;
	}

	con.promise().query("UPDATE file SET hash = ? WHERE filename = ?", [
		file.md5,
		oldFile.filename,
	]);

	await file.mv(`../uploads/files/${oldFile.filename}`);
	createThumbnail(180, oldFile.filename);
	oldFile.hash = file.md5;
	res.json(oldFile);
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

function createThumbnail(size, name) {
	const filename = `../uploads/files/${name}`;
	const thumbname = `../uploads/thumbnails/${name}`;
	const { width, height } = JSON.parse(
		execSync(
			`ffprobe -v error -select_streams v:0 -show_entries stream=height,width -of json ${filename}`
		)
	).streams[0];

	const ratio = width / height;
	const sizeString =
		ratio > 1
			? size + "x" + Math.round(size / ratio)
			: Math.round(size * ratio) + "x" + size;

	execSync(
		`ffmpeg -v error -i ${filename} -vframes 1 -an -s ${sizeString} ${thumbname}.png`
	);

	fs.renameSync(`${thumbname}.png`, thumbname);
}
