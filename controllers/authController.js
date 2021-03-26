const User = require("../database/models/User");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorRespone = require("../model/ErrorResponse");
const jwt = require("jsonwebtoken");
const SuccessResponse = require("../model/SuccessResponse");

exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
  //Su dung UserSchema de luu du lieu len MongoDB
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    //neu ton tai user tren database
    const isMatchPassword = await User.comparePassword(
      password,
      isExistEmail.password
    );
    if (isMatchPassword) {
      //generate jsonwebtoken
      //payload la nhung thu muon luu trong token
      const payload = {
        id: isExistEmail._id,
        email: isExistEmail.email,
        name: isExistEmail.name,
        role: isExistEmail.role,
      };
      const access_token = jwt.sign(
        payload,
        process.env.JWT_KEY, //secret key
        { expiresIn: "2h" }
      );
      const refresh_token = jwt.sign(
        payload,
        process.env.JWT_KEY, //secret key
        { expiresIn: "7d" }
      );
      const hashToken = crypto
        .createHash("sha256")
        .update(refresh_token)
        .digest("hex");
      req.session.refresh_token = hashToken;
      // luu refreshtoken trong db

      await Token.findOneAndUpdate(
        { email },
        { token: hashToken, ...payload },
        { upsert: true, new: true }
      );
      return res
        .status(200)
        .json(
          new SuccessResponse(200, { access_token, refresh_token: hashToken })
        );
    } else {
      return next(new ErrorRespone(404, "Password is incorrect"));
    }
  } else {
    //404: http status khi khong tim thay tai nguyen
    return next(new ErrorRespone(404, "Email is not found"));
  }
});

exports.getToken = asyncMiddleware(async (req, res, next) => {
  const { refresh_token } = req.body;

  const refreshToken = req.session.refresh_token || refresh_token;
  const token = await Token.findOne({ token: refreshToken });
  if (!token) {
    return next(new ErrorResponse(404, "Invalid refresh token "));
  }
  // console.log(token);
  const { id, name, email, role } = token;
  const payload = { id, name, email, role };
  const access_token = jwt.sign(
    payload,
    process.env.JWT_KEY, //secret key
    { expiresIn: "10s" }
  );
  return res.status(200).json(new SuccessResponse(200, { access_token }));
});

exports.logout = asyncMiddleware(async (req, res, next) => {
  req.user = null;
  return res.status(200).json(new SuccessResponse(200, "Logged out"));
});

exports.currentUser = asyncMiddleware(async (req, res, next) => {
  return res.status(200).json(new SuccessResponse(200, req.user));
});
