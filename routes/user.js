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
  // console.log(req.user.createdAt.toLocaleString());
  const dataView = {
    avatar: req.user.avatar,
    name: req.user.name,
    email: req.user.email,
    description: req.user.description,
    nbPost: req.user.posts.length,
    nbFunction: req.user.functions.length,
    status: req.user.status,
    creationDate: req.user.createdAt.toLocaleString(),
  };
  res.render("user/account", { isLog: isLog, title: "Account", ...dataView });
});

module.exports = router;
