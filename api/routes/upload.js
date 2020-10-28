const express = require("express");
const router = express.Router();
const con = require("../config/database");
const dazFile = require("../models/file");
const fs = require("fs");
const { execSync } = require("child_process");

//TODO: DELETE THIS
router.delete("/clear", async (req, res) => {
	await con.promise().query("TRUNCATE file");
	for (const file of fs.readdirSync("../uploads/files/")) {
		fs.unlinkSync("../uploads/files/" + file);
		fs.unlinkSync("../uploads/thumbnails/" + file);
	}
	res.json({ message: "deleted all files" });
});

router.post("/", async (req, res) => {
	if (!req.files) {
		res.status(400).json({ message: "No file uploaded" });
		return;
	}
	const response = [];
	if (!req.files.file.length) req.files.file = [req.files.file];
	try {
		for (const [key, file] of Object.entries(req.files.file)) {
			if (await dazFile.getByHash(file.md5)) {
				response.push({ message: "File already exists" });
				continue;
			}
			let hash = require("crypto")
				.createHash("md5")
				.update(file.data, "binary")
				.digest("base64")
				.replace("+", "-")
				.replace("/", "_");

			const ext = file.name.split(".").pop();

			let name = "";
			let fullname;
			do {
				name += hash.substring(1, 0);
				hash = hash.substring(1);
				fullname = `${name}.${ext}`;
			} while (
				(
					await con
						.promise()
						.execute(
							"SELECT * FROM file WHERE LOWER(filename) = LOWER(?)",
							[fullname]
						)
				)[0].length > 0
			);
			con.promise().execute(
				"INSERT INTO file (filename, title, hash, userID) VALUES (?,?,?,?)",
				[fullname, file.name, file.md5, req.user.userID]
			);
			//add reserved windows filenames

			await file.mv(`../uploads/files/${fullname}`);

			createThumbnail(180, fullname);

			response.push({
				fileID: undefined,
				filename: fullname,
				title: file.name,
				created: undefined,
				hash: file.md5,
				userID: req.user.userID,
			});
		}
		res.status(200).json(response);
	} catch (error) {
		throw error;
	}
});

module.exports = router;

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
