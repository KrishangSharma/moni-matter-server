// Package Imports
const User = require("../models/userModel");
const cloudinary = require("../config/cloudinaryConfig");
const Transaction = require("../models/transactionModel");

//TODO: complete the routes: ADD, MODIFY, DELETE
// Add a transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, name, category, description } = req.body;
    const receipt = req.file;

    let receiptUrl;

    // Upload receipts to Cloudinary and get it's URL
    if (receipt) {
      const res = await cloudinary.uploader.upload(receipt.path);
      receiptUrl = res.secure_url;
    }

    // Construct a Transaction Object
    const newTransaction = new Transaction({
      amount,
      name,
      category,
      receipt: receiptUrl,
      description,
      user: req.session.user.id,
    });

    // Save the transaction
    const savedTransaction = await newTransaction.save();

    // Add the transaction to respective user
    await User.findOneAndUpdate(
      { email: req.session.user.email },
      { $push: { transactions: savedTransaction._id } }
    );

    return res.status(201).json({
      message: "Transaction added successfully!",
      transaction: savedTransaction,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Get Transaction by ID
const getTransaction = async (req, res) => {
  try {
    // Find the transaction
    const transaction = await Transaction.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );
    if (!transaction) {
      return res.status(404).json({ message: "Resource not found!" });
    }

    // Check for original user
    const isOwner = transaction.user.email === req.session.user.email;
    if (!isOwner) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this." });
    }

    return res.status(200).json({ transaction });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.session.user.id;
    // Find the transaction and ensure it belongs to the user
    const transaction = await Transaction.findById(transactionId).populate(
      "user",
      "firstName lastName email"
    );
    if (!transaction) {
      return res.status(404).json({
        message: "Resource not found.",
      });
    }

    // Check for original user
    const isOwner = transaction.user.email === req.session.user.email;
    if (!isOwner) {
      return res
        .status(401)
        .json({ message: "You are not authorized to do this." });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(transactionId);

    // Remove the transaction from user's array
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { transactions: transactionId } }
    );

    return res.status(200).json({
      message: "Transaction deleted successfully.",
      transaction,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const receipt = req.file;
    let receiptUrl;

    // Upload receipt to Cloudinary and get its URL
    if (receipt) {
      const result = await cloudinary.uploader.upload(receipt.path);
      receiptUrl = result.secure_url;
    }

    // Construct update object
    const updateData = {
      ...(amount && { amount }),
      ...(category && { category }),
      ...(receiptUrl && { receipt: receiptUrl }),
      ...(description && { description }),
    };

    // Find and update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found!" });
    }

    return res.status(200).json({
      message: "Transaction updated successfully!",
      transaction: updatedTransaction,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

module.exports = {
  addTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
};
