const express = require("express");
const router = express.Router();
const emailController = require("../controller/email");
const jsonCsvController = require('../controller/csv/csvExport')

// emaill sending

router.get("/sendemail/:id", emailController.sendEmail);

// export csv

router.get("/exportcsv", jsonCsvController.jsonToCsv);

exports.router = router;
