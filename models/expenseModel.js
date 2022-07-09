const mongoose = require("mongoose");

const expenseModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    amount: {
      type: Number,
      required: [true, "Enter a Value"],
    },
    remarks: {
      type: String,
    } /*
    category: {
      type: String,
      required: [true, "Enter a category"],
    },*/,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", expenseModel);
