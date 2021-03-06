const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("email-validator");
const fileUploader = require("../configs/cloudinary.config");
const upload = fileUploader.single("avatar");
const routeGuard = require("../configs/route-gard-isLog");

router.use(routeGuard); //only authenthicate user can use this router

router.get("/", (req, res, next) => {
  // console.log(req.user.createdAt.toLocaleString());
  const dataView = getDataView(req.user);
  res.render("user/account", {
    isLog: true,
    title: "Account",
    ...dataView,
    id: req.user._id,
    script: "deleteAccount",
    style: "deleteAccount",
  });
});
router
  .get("/edit", (req, res, next) => {
    console.log(req.user.descriptions);
    const dataView = getDataView(req.user);
    if (!dataView.description) dataView.description = "";
    console.log(req.session);
    res.render("user/edit", { isLog: true, title: "EditUser", ...dataView, style: "editUser" });
  })
  .post(
    "/edit",
    /// middelware to catch error of file upload
    (req, res, next) => {
      upload(req, res, (err) => {
        console.log(err);
        if (err) {
          res.render("user/edit", {
            errorMessage: "Probléme avec le fichier image seul jpg, png, jpeg sont acceptés.",
            ...getDataView(req.user),
            style: "editUser" 
          });
          return;
        } else {
          next();
        }
      });
    },
    /////////////////////////////////////////////////
    (req, res, next) => {
      console.log(req.user.createdAt.toLocaleString());
      console.log(req.file);
      const { email, name, description } = req.body;
      const avatar = req.file ? req.file.path : req.user.avatar;
      // check valide email regex
      if (!validator.validate(email)) {
        res.render("user/edit", {
          errorMessage: "Email non valide.",
          title: "EditUser",
          style: "editUser",
          ...getDataView(req.user),
        });
        return;
      }
      // const dataView = getDataView(req.user);
      console.log(req.body, "hererereerr");
      User.findById(req.user._id)
        .then((userFromdb) => {
          userFromdb.avatar = avatar;
          userFromdb.name = name;
          userFromdb.email = email;
          userFromdb.descriptions = description;
          userFromdb.save().then((updatedUser) => {
            console.log("oldUser => ", userFromdb, "newuser => ", updatedUser);
          });
          res.redirect("/user");
        })
        .catch((err) => next(err));
    }
  );
router.get("/delete/:id", (req, res, next) => {
  console.log(String(req.user._id), String(req.params.id));
  if (String(req.user._id) !== String(req.params.id)) {
    res.render("home", { errorMessage: "Vous ne pouvez pas supprimer cette utilsateur." });
    return;
  }
  User.findByIdAndDelete(req.user._id, (err) => {
    if (err) {
      next(err);
    } else {
      req.logout();
      req.session.destroy((err) => next(err));
      console.log("session =>", req.session, "passport =>", req.user);
      res.redirect("/");
      return;
    }
  });
});

// utils
function getDataView(user) {
  return {
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    description: user.descriptions === "Aucune" ? false : user.descriptions,
    nbPost: user.posts.length,
    nbFunction: user.functions.length,
    status: user.status,
    creationDate: user.createdAt.toLocaleString(),
  };
}
module.exports = router;
