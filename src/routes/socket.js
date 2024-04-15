const express = require("express");
const socketController = require("../controller/socket/socket");
const router = express.Router();
console.log("router 123");
//ejs
router.get("/socket", socketController.socketIo);

exports.router = router;
