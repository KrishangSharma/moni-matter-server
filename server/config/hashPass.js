// Package Import
const bcrypt = require("bcrypt");

const hashPass = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  } catch (err) {
    console.log(err.message);
  }
};

const comparePass = async (inputPass, storedPass) => {
  try {
    const isCorrectPass = await bcrypt.compare(inputPass, storedPass);
    return isCorrectPass;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = { hashPass, comparePass };
