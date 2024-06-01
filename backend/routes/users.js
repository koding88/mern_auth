var express = require("express");
var router = express.Router();
const { test, updateUser } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken.js");

/* GET users listing. */
router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
