const express = require("express");
const route = express.Router();
const authController = require("../../controllers/authController");
const { baseAuth } = require("../../middleware/baseAuth");
const { jwtAuth } = require("../../middleware/jwtAuth");

//authentication va authorization

//authentication: noi ve thong tin cua user dang hoat dong
//authorization: xac dinh  quyen cua user de su dung

// route.get(
//   "/test",
//   jwtAuth,
//   authorize("admin"),
//   asyncMiddleware(async (req, res, next) => {
//     res.status(200).json({ success: true });
//   })
// );

route.post("/register", baseAuth, authController.register);
route.post("/login", baseAuth, authController.login);
route.get("/logout", authController.logout);
route.get("/me", jwtAuth, authController.currentUser);

route.post("/get_token", authController.getToken);
module.exports = route;
