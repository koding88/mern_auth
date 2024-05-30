var express = require("express");
var router = express.Router();
var test = require("../controllers/userController.js");

/* GET users listing. */
router.get("/", test);

module.exports = router;
