const express = require("express");
const usersModel = require("../models/user");
const router = express.Router();
const User = require("../models/user");

/* GET home page */
router.get("/:catname", async (req, res, next) => {
  if (req.params.catname === "presentation") {
    const { page = 1, limit = 15 } = req.query;
    try {
      // execute query with page and limit values
      const users = await User.find()
        .select("-password")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const usersDataView = users.map((el) => {
        return { ...el._doc, nbPost: el.posts.length, nbFun: el.functions.length };
      });
      // console.log(usersDataView);
      res.render("forum/presentation", {
        users: usersDataView,
        page: page,
        limit: limit,
        style: "presentations",
        script: "presentations",
      });
      return;
    } catch (err) {
      next(err);
    }
  }
  if (req.params.catname === "function") {
    res.render("forum/function");
    return;
  }
  if (req.params.catname === "home") {
    res.render("forum/home");
    return;
  }
  if (req.params.catname === "answer") {
    res.render("forum/answer");
    return;
  }
  next();
});

module.exports = router;
