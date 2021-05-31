const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("email-validator");
const passport = require("passport");
const fileUploader = require("../configs/cloudinary.config");
const routeGuard = require("../configs/route-gard-isLog");

router.use(routeGuard); //only authenthicate user can use this router

router.get("/", (req, res, next) => {
  // console.log(req.user.createdAt.toLocaleString());
  const dataView = getDataView(req.user);
  res.render("user/account", { isLog: true, title: "Account", ...dataView });
});
router.get("/edit", (req, res, next) => {
  // console.log(req.user.createdAt.toLocaleString());
  const dataView = getDataView(req.user);
  console.log(req.session);
  res.render("user/edit", { isLog: true, title: "EditUser", ...dataView });
});

// utils
function getDataView(user) {
  return {
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    description: user.description,
    nbPost: user.posts.length,
    nbFunction: user.functions.length,
    status: user.status,
    creationDate: user.createdAt.toLocaleString(),
  };
}
module.exports = router;
