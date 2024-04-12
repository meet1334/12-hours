const express = require('express');
const router = express.Router();
const emailController = require('../controller/email');


router.get('/sendemail/:id',emailController.sendEmail);

exports.router = router;