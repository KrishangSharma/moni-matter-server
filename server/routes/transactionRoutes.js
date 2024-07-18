// Image upload middleware
const upload = require("../config/multerConfig");

// Controllers
const {
  addTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controller/transactionController");

// Auth Middleware
const { isAuthenticated } = require("../middleware/authMiddleware");

// App router
const router = require("express").Router();

//? @ROUTE  transaction/add
//? @ACCESS PROTECTED
//? @METHOD POST
router.post("/add", isAuthenticated, upload.single("receipt"), addTransaction);

//? @ROUTE  transaction/:id
//? @ACCESS PROTECTED
//? @METHOD GET
router.get("/:id", isAuthenticated, getTransaction);

//? @ROUTE  transaction/delete/:id
//? @ACCESS PROTECTED
//? @METHOD DELETE
router.delete("/delete/:id", isAuthenticated, deleteTransaction);

//? @ROUTE  transaction/update/:id
//? @ACCESS PROTECTED
//? @METHOD PATCH
router.patch("/update/:id", isAuthenticated, updateTransaction);

module.exports = router;
