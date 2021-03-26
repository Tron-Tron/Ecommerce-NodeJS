const Category = require("../database/models/Category");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorRespone = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewCategory = asyncMiddleware(async (req, res, next) => {
  const { name, description } = req.body;
  const category = new Category({
    name,
    description,
  });
  const newCate = await category.save();
  res.status(200).json(new SuccessResponse(200, newCate));
});

exports.getAllCategory = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(new SuccessResponse(200, categories));
});

exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    return next(new ErrorRespone(400, "CategoryId is empty"));
  }
  const deletedCate = await Category.findByIdAndDelete(categoryId);
  if (!deletedCate) {
    return next(new ErrorRespone(400, "Can not delete"));
  }
  res
    .status(200)
    .json(
      new SuccessResponse(200, `category has is ${categoryId} was deleted`)
    );
});
exports.updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    return next(new ErrorRespone(400, "Category is empty"));
  }
  const updatedCate = await Category.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    { new: true }
  );
  if (!updatedCate) {
    return next(new ErrorRespone(400, "Can not Update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedCate));
});
