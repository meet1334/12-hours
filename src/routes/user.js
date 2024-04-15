const express = require("express");
const userController = require("../controller/user");
const userExcelController = require('../controller/userExcel');
const { imageUpload, videoUpload } = require("../middlewares/multer/multer");
const router = express.Router();

// router.post("/", userController.createUsers);

// router.post('/uploadBulkImage', imageUpload.array('images', 4)
// uploadStorage.array("file", 10)
router.get("" ,userController.getAllUsers);
router.post("/uploadImage",imageUpload.single('image'), userController.uploadFile);
router.post("/uploadImage/multi",imageUpload.array('image',3), userController.uploadMultiFiles);
router.post("/uploadVideo",videoUpload.single('video'), userController.uploadFile);

// excel exporting
router.get('/exportExcel',userExcelController.getAllUsersToExcel);

router.get("/:id", userController.getUsers);
router.put("/:id", userController.replaceUser);
router.patch("/:id", userController.updatedUser);
router.delete("/:id", userController.deleteUser);

exports.router = router;
