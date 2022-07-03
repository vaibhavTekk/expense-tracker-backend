const { loginUser, registerUser, getUser } = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", protect, getUser);

module.exports = router;