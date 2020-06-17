const express = require("express");
const router = express.Router();
const loginRouter = require("./login");

router.get("/test", (req,res)=>{
    res.json({text:"This is a json text"})
});

router.use("/login", loginRouter);

module.exports = router;