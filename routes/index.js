const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let isLog = !!req.user;
  res.render("home", { isLog: isLog, title: "Home" });
});

module.exports = router;
