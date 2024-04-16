const express = require("express");
const streamController = require("../controller/streaming/stream");
const router = express.Router();

router.get("", streamController.streamFile);

exports.router = router;
