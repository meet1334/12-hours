const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router.post("/", userController.createUsers);
router.get("", userController.getAllUsers);
router.get("/:id", userController.getUsers);
router.put("/:id", userController.replaceUser);
router.patch("/:id", userController.updatedUser);
router.delete("/:id", userController.deleteUser);

exports.router = router;
