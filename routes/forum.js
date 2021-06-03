const express = require("express");
const router = express.Router();

//// MODELS
const User = require("../models/user");
const Function = require("../models/function");

///// CLOUDINARY MULTER
const fileUploader = require("../configs/cloudinary.config");
const upload = fileUploader.single("avatar");

///// UTILS
const routeGuard = require("../configs/route-gard-isLog");

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
        title: "Presentations",
        style: "presentations",
        script: "presentations",
      });
      return;
    } catch (err) {
      next(err);
    }
  }
  if (req.params.catname === "function") {
    routeGuard(req, res);
    res.render("forum/function", {
      isLog: true,
      title: "Function",
      style: "function",
      module: "function",
    });
    return;
  }
  if (req.params.catname === "home") {
    res.render("forum/home", { isLog: !!req.user });
    return;
  }
  if (req.params.catname === "answer") {
    routeGuard(req, res);
    res.render("forum/answer", {
      isLog: true,
      title: "Question",
      style: "answer",
      module: "answer",
    });
    return;
  }
  next();
});

router.post("/:catname", (req, res, next) => {
  ///////////////PRESENTATION
  if (req.params.catname === "presentation") {
    return;
  }
  ///////////////FUNCTION
  if (req.params.catname === "function") {
    const { name, body } = req.body;
    const args = req.body["[args]"];
    console.log(name, args, body, req.body, req.user._id);
    /// TODO VERIF DATA

    new Function({ name: name, args: args, body: body, userId: req.user._id })
      .save()
      .then((funInDb) => {
        User.findById(req.user._id).then((userInDb) => {
          userInDb.functions.push(funInDb._id);
          userInDb.save().then((updateUser) => {
            res.json({ fun: funInDb, upUser: updateUser });
          });
        });
      })
      .catch((err) => next(err));
    return;
  }
  ///////////////ANSWER
  if (req.params.catname === "answer") {
    const { title, body } = req.body;
    const categorie = "answer";
    console.log(req.user._id);

    console.log("title", title);
    if (!title || !body) {
      console.log("jai pas de titre et de body");
      res.render("forum/answer", {
        isLog: true,
        errorMessage: "Veuillez remplir le titre",
        style: "answer",
        module: "answer",
      });
    }
    return;
  }
  next(); // si pas de route trouver continue vers 404 error
});

module.exports = router;
