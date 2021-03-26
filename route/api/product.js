const express = require("express");
const productController = require("../../controllers/productController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const mongoUpload = require("../../middleware/mongoUpload");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(mongoUpload.single("image"), productController.createNewProduct);

router
  .route("/:productId")
  .get(productController.getProductById)
  .delete(jwtAuth, authorize("admin"), productController.deleteProductById)
  .patch(productController.updateProductById);
module.exports = router;
