const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
//ejs
router.get("/ssr", productController.getAllProductsSSR);
router.get("/add", productController.getAddFormProductsSSR);

router.post("/", productController.createProducts);
router.get("", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.replaceProduct);
router.patch("/:id", productController.updatedProduct);
router.delete("/:id", productController.deleteProduct);

exports.router = router;
