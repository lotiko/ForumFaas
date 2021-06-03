const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Function = require("../models/function");
const PostModel=require("../models/post");
/* GET home page */
router.get("/", (req, res, next) => {
  
    let isLog = !!req.user;
    res.render("home", { isLog: isLog, title: "Home"});
  
  
});

module.exports = router;
