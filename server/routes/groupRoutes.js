// Controllers
const {
  createGroup,
  addMembers,
  updateGroup,
} = require("../controller/groupController");

// Auth Middleware
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// App router
const router = require("express").Router();

//? @ROUTE  group/new
//? @ACCESS PROTECTED
//? @METHOD POST
router.post("/new", isAuthenticated, createGroup);

//? @ROUTE  group/:id/members
//? @ACCESS PROTECTED
//? @METHOD POST
router.post("/:id/members", isAuthenticated, addMembers);

//? @ROUTE  group/:id/
//? @ACCESS PROTECTED
//? @METHOD PATCH
router.patch("/:id", isAuthenticated, updateGroup);

module.exports = router;
