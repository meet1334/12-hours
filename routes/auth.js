const express = require("express");
const authController = require("../controller/auth/auth");
const router = express.Router();
//ejs
router.post("/auth/signup", authController.signUpUser);
router.post("/auth/login", authController.loginUser);

exports.router = router;
