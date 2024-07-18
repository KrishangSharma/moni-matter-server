// Package Imports
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { connectDb } = require("./config/db");

// App Routes
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Create the App
const app = express();

// Enable CORS
app.use(cors());

// Hides the fact that app uses express for "SECURITY" purposes
app.disable("x-powered-by");

// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use(morgan("dev"));

// Configure Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 72,
      secure: false,
      httpOnly: true,
    },
  })
);

// Test route
app.get("/test", (req, res) => {
  res.status(200).send("Server working :)");
});

// Enable app routes
app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/transaction", transactionRoutes);

// Define the listening port
const port = process.env.PORT || 3000;

// Start the server and connect to DB
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
  connectDb();
});
