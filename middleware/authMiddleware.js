const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorisation && req.headers.authorisation.startsWith("Bearer")) {
    try {
      //get token from header
      token = req.headers.authorisation.split(" ")[1];
      //verify token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      //obtain the user using id and send it to the next controller
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorised Action");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorised , No token");
  }
});

module.exports = { protect };
