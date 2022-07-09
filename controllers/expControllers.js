const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });
  res.status(200);
  res.json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  const { amount, remarks } = req.body;
  const user = req.user.id;
  const expenseObject = { user, amount, remarks };
  console.log(expenseObject);
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Please Enter an amount and choose valid category");
  }
  res.status(200);
  const expense = await Expense.create(expenseObject);
  res.json(expense);
});

const editExpense = asyncHandler(async (req, res) => {
  const { amount, remarks } = req.body;
  const userid = req.user.id;
  const expenseObject = { userid, amount, remarks };
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Please Enter an amount and choose valid category");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const expense = await Expense.findById(req.params.id);

  if (expense.user.toString() != user.id) {
    res.status(401);
    throw new Error("Unauthorised Action");
  }

  const updatedexpense = await Expense.findByIdAndUpdate(req.params.id, expenseObject, { new: true });
  res.status(200);
  res.json(updatedexpense);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error("Entry not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (expense.user.toString() != user.id) {
    res.status(401);
    throw new Error("Unauthorised Action");
  }

  const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
  res.json(deleteExpense);
});

module.exports = { getExpenses, createExpense, editExpense, deleteExpense };
