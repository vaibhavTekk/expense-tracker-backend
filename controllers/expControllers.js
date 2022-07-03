const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.status(200);
  res.json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  const { amount, remarks, category } = req.body;
  const user = req.user.id;
  const expenseObject = { user, amount, remarks, category };
  if (!amount || amount == 0 || !category) {
    res.status(400);
    throw new Error("Please Enter an amount and choose valid category");
  }
  res.status(200);
  const expense = await Expense.create(expenseObject);
  res.json(expense);
});

const editExpense = asyncHandler(async (req, res) => {
  res.json(`put expense ${req.params.id}`);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ id: req.params.id, user: req.user.id });
  if (!expense) {
    res.status(400);
    throw new Error("Entry not found");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  await expense.remove();
  res.json(`deleted expense ${req.params.id}`);
});

module.exports = { getExpenses, createExpense, editExpense, deleteExpense };
