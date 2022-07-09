const { loginUser, registerUser, getUser, isLoggedin } = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", protect, getUser);
router.get("/isloggedin", protect, isLoggedin);

module.exports = router;
