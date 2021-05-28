const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const Users = require("../models/user");
var validator = require("email-validator");
// const baseDataview = {
//     frame: true,
//     title: 'home'
// }
// router.get('/', (req, res, next) => {

//     res.render('home', {
//         ... baseDataview
//     });
// });

router.get("/signUp", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signUp", (req, res, next) => {
  let nameAdd = req.body.pseudo;
  let emailAdd = req.body.email;
  let passwordAdd = req.body.password;
  let oldValues = { pseudo: req.body.pseudo, email: req.body.email };
  // 1. Check username, email and password are not empty
  if (!nameAdd || !passwordAdd || !emailAdd) {
    res.render("auth/signup", {
      errorMessage: "Tous les champs sont obligatoire.",
      oldValues: oldValues,
    });
    return;
  }
  // 2. check valide email regex
  if (!validator.validate(emailAdd)) {
    res.render("auth/signup", {
      errorMessage: "Email non valide.",
      oldValues: oldValues,
    });
    return;
  }
  // Encrypt the password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(passwordAdd, salt);

  const adduser = new Users({
    name: nameAdd,
    email: emailAdd,
    password: hashPass,
  });
  adduser
    .save()
    .then(function (usersFromDb) {
      res.render("home", {
        message: "Votre compte à bien été enregistré vous pouvez désormais vous connecter.",
      });
    })
    /// voir ici si message dans modéles ou ici
    .catch((err) => {
      // catch E11000 duplicate key error
      if (err.code === 11000) {
        res.render("auth/signup", { errorMessage: "Un utilisateur avec ce mail existe deja." });
        return;
      }
      next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.post("/login", (req, res, next) => {
  console.log(req.body);
  res.render("home");
});

module.exports = router;
