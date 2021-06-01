const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");
const validator = require("email-validator");
const passport = require("passport");

router.get("/signUp", (req, res, next) => {
  let isLog = !!req.user;
  if (isLog) {
    res.redirect("/user");
    return;
  }
  res.render("auth/signup", { title: "signUp" });
});

router.post("/signUp", (req, res, next) => {
  const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
  let nameAdd = req.body.pseudo;
  let emailAdd = req.body.email;
  let passwordAdd = req.body.password;
  let oldValues = { pseudo: req.body.pseudo, email: req.body.email };
  // 1. Check username, email and password are not empty
  if (!nameAdd || !passwordAdd || !emailAdd) {
    res.render("auth/signup", {
      errorMessage: "Tous les champs sont obligatoire.",
      oldValues: oldValues,
      title: "signUp",
    });
    return;
  }
  // 2. check valide email regex
  if (!validator.validate(emailAdd)) {
    res.render("auth/signup", {
      errorMessage: "Email non valide.",
      oldValues: oldValues,
      title: "signUp",
    });
    return;
  }
  //3.check the password validate
  if (!regex.test(passwordAdd) === true) {
    res.render("auth/signup", {
      errorMessage:
        "Le mot de passe doit être de 8 caractères minimum et contenir au moins un chiffre une majuscule et minuscule",
      title: "signUp",
      oldValues: oldValues,
    });
    return;
  }
  // Encrypt the password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(passwordAdd, salt);

  const adduser = new User({
    name: nameAdd,
    email: emailAdd,
    password: hashPass,
  });
  adduser
    .save()
    .then(function (usersFromDb) {
      res.render("home", {
        message: "Votre compte à bien été enregistré vous pouvez désormais vous connecter.",
        title: "Home",
      });
    })
    /// voir ici si message dans modéles ou ici
    .catch((err) => {
      // catch E11000 duplicate key error
      if (err.code === 11000) {
        res.render("auth/signup", {
          errorMessage: "Un utilisateur avec ce mail existe deja.",
          title: "signUp",
        });
        return;
      }
      next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { title: "login" });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }

    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("auth/login", { errorMessage: failureDetails.message, title: "login" });
      return;
    }

    // save user in session: req.user
    req.login(theUser, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }
      // All good, we are now logged in and `req.user` is now set
      res.render("home", { message: "Vous étes connecté.", isLog: !!req.user, title: "Home" });
    });
  })(req, res, next);
});
router.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy((err) => next(err));
  res.render("home", { message: "Vous étes déconnecté.", isLog: !!req.user, title: "home" });
});
module.exports = router;
