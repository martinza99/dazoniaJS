const express = require("express");
const router = express.Router();
const con = require("../config/database");
const dazFile = require("../models/file");
const fs = require("fs");
const crypto = require("crypto");
const genThumbnail = require("simple-thumbnail");

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
			let hash = crypto
				.createHash("md5")
				.update(req.files.file.data, "binary")
				.digest("base64")
				.replace("+", "-")
				.replace("/", "_");

			const ext = file.name.split(".").pop();
			let name = "";
			do {
				name += hash.substring(1, 0);
				hash = hash.substring(1);
			} while (
				await con
					.promise()
					.execute("SELECT * FROM file WHERE filename = ?", [
						`${name}.${ext}`,
					])[0]
			);
			con.promise().execute(
				"INSERT INTO file (filename, title, hash, userID) VALUES (?,?,?,?)",
				[`${name}.${ext}`, file.name, file.md5, req.user.userID]
			);

			const path = `../uploads/files/${name}.${ext}`;
			file.mv(path);
			// genThumbnail(path, `../uploads/thumbanils/${name}.${ext}`, "");

			response.push({
				fileID: undefined,
				filename: `${name}.${ext}`,
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
