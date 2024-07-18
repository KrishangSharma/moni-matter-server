// Package Import
const mongoose = require("mongoose");

// Variable Import
const uri = process.env.MONGO_URI;

// Connect to DB
const connectDb = function () {
  mongoose
    .connect(uri)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error(err.message));
};

module.exports = { connectDb };
