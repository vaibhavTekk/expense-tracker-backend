const { getExpenses, createExpense, editExpense, deleteExpense } = require("../controllers/expControllers");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getExpenses);
router.post("/", protect, createExpense);
router.put("/:id", protect, editExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
