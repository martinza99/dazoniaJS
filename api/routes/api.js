const express = require("express");
const router = express.Router();
const fileRouter = require("./file");
const userRouter = require("./user");

router.use("/files", fileRouter);
router.use("/users", userRouter);

module.exports = router;