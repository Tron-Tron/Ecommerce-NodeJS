const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const categoryController = require("../../controllers/categoryController");
const router = express.Router();

//router.use(jwtAuth, authorize("admin"));
router
  .route("/")
  .post(categoryController.createNewCategory)
  .get(categoryController.getAllCategory);

router.delete("/:categoryId", categoryController.deleteCategoryById);

router.patch("/:categoryId", categoryController.updateCategoryById);
module.exports = router;
