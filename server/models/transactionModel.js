const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    receipt: {
      type: String,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
