// User Model
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// Import Password Methods
const { hashPass, comparePass } = require("../config/hashPass");

// Register New User
const registerUser = async (req, res) => {
  try {
    const { fName, lName, email, tel, password } = req.body;

    // Validate the data
    if (!fName || !lName || !email || !tel || !password) {
      return res
        .status(400)
        .json({ message: "Required fields cannot be empty!" });
    }

    // Check for existing user
    const isExisting = await User.findOne({
      $or: [{ email: email }, { phoneNum: tel }],
    });
    console.log(isExisting);
    if (isExisting) {
      return res.status(400).json({
        message:
          "User with this ID already exists! LogIn or try a different email.",
      });
    }

    // Hash the password
    const hashed = await hashPass(password);

    // Create User Object
    const newUser = new User({
      firstName: fName,
      lastName: lName,
      email: email,
      phoneNum: tel,
      password: hashed,
    });

    // Save the user to DB
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "Registration Successful!", savedUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    // I might receive email OR phone number for login
    const { credential, password } = req.body;

    // Validate Data
    if (!credential || !password) {
      return res
        .status(400)
        .json({ message: "Required fields cannot be empty!" });
    }

    // Check if credential is email
    const isEmail = credential.includes("@");

    // Decide the login method
    const param = isEmail
      ? { email: credential }
      : { phoneNum: parseInt(credential) };

    // Find The User
    const user = await User.findOne(param);

    // Check if User exists
    if (!user) {
      return res.status(404).json({
        message: "User does not exist! Please create an account first.",
      });
    }

    // Compare Passwords
    const isMatch = await comparePass(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Create and Store a Session
    req.session.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return res
      .status(200)
      .json({ message: "Login Successful!", user: req.session.user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Failed to log out." });
      }
      res.clearCookie("connect.sid");
      return res
        .status(200)
        .json({ message: "Logged out. Please login again." });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

//(DONE)Todo: Routes for updating a user, deleting a user and to get all details
// Update User Details
const updateUser = async (req, res) => {
  try {
    // Get the data that needs to be updated
    const updates = req.body;

    // Find the user that is REQUESTING for the update
    const user = await User.findOne({ email: req.session.user.email });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Check if the new email is unique
    if (updates.email && updates.email !== user.email) {
      const emailExists = await User.findOne({ email: updates.email });
      if (emailExists) {
        return res
          .status(400)
          .json({ message: "A user with this email already exists!" });
      }
    }

    // Check if the new phone number is unique
    if (updates.phoneNum && updates.phoneNum !== user.phoneNum) {
      const phoneNumExists = await User.findOne({ phoneNum: updates.phoneNum });
      if (phoneNumExists) {
        return res
          .status(400)
          .json({ message: "A user with this phone number already exists!" });
      }
    }

    // Update the User with whatever data is passed
    const updatedUser = await User.findOneAndUpdate(
      { email: req.session.user.email },
      { $set: updates },
      { new: true }
    );

    // Update the Session too
    req.session.user = updatedUser;

    return res.status(200).json({ message: "Profile Updated!", updatedUser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Deleting a User
const deleteUser = async (req, res) => {
  try {
    // Find the User
    const user = await User.findOneAndDelete({ email: req.session.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Destroy the session too
    req.session.destroy((err) => {
      if (err) {
        console.log(err.message);
        return res
          .status(500)
          .json({ message: "Failed to delete the session" });
      }
    });
    res.clearCookie("connect.sid");

    return res.status(200).json({ message: "Profile Deleted Successfully!" });
  } catch (err) {
    console.log(err.mesasge);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

// Get User Data
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.session.user.email }).populate(
      "transactions groups",
      "name"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message:
        "Server encountered an error while processing the request. Please try again later.",
    });
  }
};

//TODO: Get all groups for a user

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUser,
};
