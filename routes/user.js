const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("email-validator");
const passport = require("passport");

/* GET home page */
router.get("/", (req, res, next) => {
  let isLog = !!req.user;
  if (!isLog) {
    res.redirect("/");
  }
  console.log(req.user);
  res.render("user/account", { isLog: isLog, title: "Account" });
});

module.exports = router;
