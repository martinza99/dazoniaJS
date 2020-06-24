const express = require("express");
const router = express.Router();
const fileRouter = require("./file");
const userRouter = require("./user");
const uploadRouter = require("./upload");
const listRouter = require("./list");
const file = require("../models/file");

router.use("/files", uploadRouter);
router.use("/files/:id", checkFile, fileRouter);
router.use("/list", listRouter);
router.use("/users", userRouter);

module.exports = router;

async function checkFile(req, res, next) {
	const f = await file.getByName(req.params.id);
	if (f) {
		req.file = f;
		next();
	} else res.status(404).json({ status: 404, message: "File not found" });
}
