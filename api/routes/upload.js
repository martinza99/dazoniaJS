const express = require("express");
const router = express.Router();
const con = require("../config/database");
const dazFile = require("../models/file");
const fs = require("fs");
const { execSync } = require("child_process");

router.post("/", async (req, res) => {
	if (!req.files) {
		res.status(400).json({ message: "No file uploaded" });
		return;
	}
	const response = [];
	try {
		for (const [key, file] of Object.entries(req.files)) {
			if (await dazFile.getByHash(file.md5)) {
				response.push({ message: "File already exists" });
				continue;
			}
			let hash = require("crypto")
				.createHash("md5")
				.update(req.files.file.data, "binary")
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
				await con
					.promise()
					.execute(
						"SELECT * FROM file WHERE LOWER(filename) = LOWER(?)",
						[fullname]
					)[0]
			);
			con.promise().execute(
				"INSERT INTO file (filename, title, hash, userID) VALUES (?,?,?,?)",
				[fullname, file.name, file.md5, req.user.userID]
			);

			const path = `../uploads/files/${fullname}`;
			await file.mv(path);

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

function createThumbnail(size, fullname) {
	const { width, height } = JSON.parse(
		execSync(
			`ffprobe -v error -select_streams v:0 -show_entries stream=height,width -of json ../uploads/files/${fullname}`
		)
	).streams;

	const sizeStr = width > height ? `${size}x?` : `?x${size}`;

	require("simple-thumbnail")(
		`../uploads/files/${fullname}`,
		`../uploads/thumbnails/${fullname}`,
		sizeStr
	);
}
