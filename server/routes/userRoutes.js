// Controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// App router
const router = require("express").Router();

//? @ROUTE  user/new
//? @ACCESS Public
//? @METHOD POST
router.post("/new", registerUser);

//? @ROUTE  user/login
//? @ACCESS Public
//? @METHOD POST
router.post("/login", loginUser);

//? @ROUTE  user/logout
//? @ACCESS Protected
//? @METHOD POST
router.post("/logout", isAuthenticated, logoutUser);

//? @ROUTE  user/update
//? @ACCESS Protected
//? @METHOD POST
router.post("/update", isAuthenticated, updateUser);

//? @ROUTE  user/delete
//? @ACCESS Protected
//? @METHOD POST
router.delete("/delete", isAuthenticated, deleteUser);

//? @ROUTE  user/
//? @ACCESS Protected
//? @METHOD POST
router.get("/", isAuthenticated, getUser);

module.exports = router;
