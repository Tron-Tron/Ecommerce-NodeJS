const Role = require("../database/models/Role");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.createNewRole = asyncMiddleware(async (req, res, next) => {
  const { role_name, role_desc } = req.body;

  const newRole = new Role({ role_name, role_desc });
  const saved_role = await newRole.save();
  //tao thanh cong thi 200 hoac 201
  res.status(201).json(new SuccessResponse(201, saved_role));
});
exports.getAllRoles = asyncMiddleware(async (req, res, next) => {
  const roles = await Role.find();
  res.status(200).json(new SuccessResponse(200, roles));
});
