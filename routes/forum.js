const express = require("express");
const router = express.Router();

// // MODELS
const User = require("../models/user");
const Function = require("../models/function");
const PostModel = require("../models/post");

// /// CLOUDINARY MULTER
const fileUploader = require("../configs/cloudinary.config");
const upload = fileUploader.single("avatar");

// /// UTILS
const routeGuard = require("../configs/route-gard-isLog");
const { findById } = require("../models/user");

/* GET home page */
router.get("/:catname", async (req, res, next) => {
  function makePaginationObj(nbpage) {
    let pagination = {
      one: false,
      two: false,
      tree: false,
      four: false,
      more: false,
    };
    if (nbpage < 3) {
      pagination.one = true;
      pagination.two = true;
    } else if (nbpage < 4) {
      pagination.one = true;
      pagination.two = true;
      pagination.tree = true;
    } else {
      if (nbpage > 4) pagination.more = true;
      pagination.one = true;
      pagination.two = true;
      pagination.tree = true;
      pagination.four = true;
    }
    return pagination;
  }

  if (req.params.catname === "home") {
    try {
      const { page = 1, limit = 4 } = req.query;
      let functionsDataView, paginationFunctions;
      let postsDataview, paginationPosts;
      let usersDataView, paginationUsers;
      let nbPage = { functions: 0, posts: 0, users: 0 };
      if (!req.query.data || req.query.data === "functions") {
        let dataDb = await Function.find({})
          .sort({ createdAt: -1 })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate("userId")
          .exec();
        let nbDocFun = await Function.countDocuments({}).exec();
        let nbPageFun = Math.ceil(nbDocFun / limit);
        functionsDataView = dataDb.map((funDb) => {
          const { name, _id } = funDb;
          console.log(name, _id);

          const authorData = {
            avatar: funDb.userId ? funDb.userId.avatar : "/images/basicAvatar.png",
            name: funDb.userId ? funDb.userId.name : "Utilisateur plus présent.",
          };
          return { _id, name, authorData };
        });
        console.log(functionsDataView, dataDb);
        if (req.query.data) {
          // on retourne seulement la donnée si query data
          if (req.query.data) {
            res.json({
              functions: functionsDataView,
              nbPage: nbPageFun,
              page: page,
              limit: limit,
            });
            return;
          }
        } // sinon on prepare les données de la vue
        paginationFunctions = makePaginationObj(nbPageFun);
        nbPage.functions = nbPageFun;
      }
      if (!req.query.data || req.query.data === "answers") {
        let dataDb = await PostModel.find({ categorie: "question" })
          .sort({ createdAt: -1 })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .populate("userId")
          .exec();
        let nbDocanswer = await PostModel.countDocuments({
          categorie: "question",
        }).exec();
        let nbPageanswer = Math.ceil(nbDocanswer / limit);
        console.log("nbPageanswer", nbPageanswer);
        console.log("nbDocanswer", nbDocanswer);
        postsDataview = dataDb.map((answerDb) => {
          const { title, _id } = answerDb;
          console.log(title, _id);

          const authorData = {
            avatar: answerDb.userId ? answerDb.userId.avatar : "/images/basicAvatar.png",
            name: answerDb.userId ? answerDb.userId.name : "Utilisateur plus présent.",
          };
          return { _id, title, authorData };
        });
        console.log(req.query);

        // on retourne seulement la donnée si query data
        if (req.query.data) {
          res.json({
            answers: postsDataview,
            nbPage: nbPageanswer,
            page: page,
            limit: limit,
          });
          return;
        }

        paginationPosts = makePaginationObj(nbPageanswer);
        nbPage.posts = nbPageanswer;
      }
      if (!req.query.data || req.query.data === "users") {
        // execute query with page and limit values
        const users = await User.find()
          .select("-password")
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        // compter le nombre de présentations et calculer le nombre de page en conséquences pour pagination dans vue
        let nbDocUsers = await User.countDocuments({}).exec();
        let nbPagePrez = Math.ceil(nbDocUsers / limit);
        usersDataView = users.map((el) => {
          return {
            ...el._doc,
            nbPost: el.posts.length,
            nbFun: el.functions.length,
          };
        });
        if (req.query.data) {
          // on retourne seulement la donnée si query data
          if (req.query.data) {
            res.json({
              users: usersDataView,
              nbPage: nbPagePrez,
              page: page,
              limit: limit,
            });
            return;
          }
        } // sinon on prepare les données de la vue
        paginationUsers = makePaginationObj(nbPagePrez);
        nbPage.users = nbPagePrez;
      }

      res.render("forum/home", {
        nbPage: nbPage,
        users: usersDataView,
        paginationUsers: paginationUsers,
        functions: functionsDataView,
        paginationFunctions: paginationFunctions,
        paginationAnswers: paginationPosts,
        posts: postsDataview,
        page: page,
        limit: limit,
        isLog: !!req.user,
        title: "ForumHome",
        style: "presentations",
        script: "presentations",
      });
      return;
    } catch (error) {
      if (req.query.data) res.status(500).json({ error: error.message });
      else next(error);
    }
  }
});

router.post("/:catname", (req, res, next) => {
  // /////////////PRESENTATION
  if (req.params.catname === "presentation") {
    return;
  }
  // /////////////FUNCTION
  if (req.params.catname === "function") {
    const { name, body } = req.body;
    if (!name || !body || body === "return") {
      res.render("forum/function", {
        errorMessage: "Le nom de fonction et le corps de fonction sont requis.",
        style: "function",
        module: "function",
      });
      return;
    }
    const args = req.body["[args]"];
    // console.log(req.query);
    // res.json(req.query);
    // return;
    // / TODO VERIF DATA
    if (req.query && req.query.edit) {
      Function.findById(req.query.id)
        .then((funFromDb) => {
          if (String(req.user.id) !== String(funFromDb.userId)) {
            // on verifie que c'est bien l'utilisateur connecter qui posséde la fonction
            res.redirect(
              "/forum/function/" + req.params.id + "?error=Seul le créateur peu éditer la function."
            );
            return;
          }
          funFromDb.name = name;
          funFromDb.args = args;
          funFromDb.body = body;
          funFromDb
            .save()
            .then((savedFun) => {
              res.redirect(
                "/forum/function/" + savedFun._id + "?message=Votre function a bien été édité."
              );
              return;
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    } else {
      new Function({ name: name, args: args, body: body, userId: req.user._id })
        .save()
        .then((funInDb) => {
          User.findById(req.user._id).then((userInDb) => {
            userInDb.functions.push(funInDb._id);
            userInDb.save().then((updateUser) => {
              // res.json({ fun: funInDb, upUser: updateUser });
              res.redirect("/forum/home");
            });
          });
        })
        .catch((err) => next(err));
      return;
    }
  }
  // /////////////ANSWER///////////////////
  if (req.params.catname === "answer") {
    console.log(req.body, req.query);
    const { title = "answer", body } = req.body;
    const categorie = req.query.type;
    let fromQuestion = false;
    const regexTitle = /^.{1,90}$/;
    if (categorie === "answer") {
      fromQuestion = req.query.from;
    }
    const userId = req.user._id;
    // const withFunction=req.function._id

    console.log(req.user._id);

    console.log("title", title);
    if (!title || !body) {
      res.render("forum/new/answer", {
        isLog: true,
        errorMessage: "Veuillez remplir le titre",
        style: "answer",
        module: "answer",
      });
      return;
    }

    console.log("mon test titre", regexTitle.test(title));
    if (!regexTitle.test(title)) {
      res.render("forum/new/answer", {
        errorMessage: "Votre question est tres longue",
        style: "answer",
        module: "answer",
      });
      return;
    }
    let newPost = {
      title: title,
      body: body,
      categorie: categorie,
      userId: userId,
    };
    console.log("mon nvx poste", newPost);
    if (fromQuestion) {
      newPost.fromQuestion = fromQuestion;
    }
    new PostModel(newPost)
      .save()
      .then(function (answersFromDb) {
        User.findById(userId)
        .then(userFromDb=>{
          userFromDb.posts.push(answersFromDb._id);
          userFromDb.save()
        }) .catch(err=>next(err))
        if (categorie === "question") {
          res.redirect("/forum/home");
        }
        if (categorie === "answer") {
          res.redirect("/forum/answer/" + fromQuestion);
        }
      })
      .catch((err) => next(err));
  }
  // si pas de route trouver continue vers 404 error
});

router.get("/:catname/new", (req, res, next) => {
  if (req.params.catname === "presentation") {
  }
  if (req.params.catname === "function") {
    routeGuard(req, res);
    res.render("forum/new/function", {
      isLog: true,
      title: "Function",
      style: "function",
      module: "function",
    });
    return;
  }
  if (req.params.catname === "home") {
  }

  if (req.params.catname === "answer") {
    if (req.params.catname === "answer") {
      routeGuard(req, res);
      res.render("forum/new/answer", {
        isLog: true,
        title: "Question",
        style: "answer",
        module: "answer",
      });
      return;
    }
  }

  // si pas de route trouver continue vers 404 error
});

router.get("/:catname/edit/:id", routeGuard, (req, res, next) => {
  if (req.params.catname === "function") {
    Function.findById(req.params.id)
      .then((funFromDb) => {
        if (String(req.user.id) !== String(funFromDb.userId)) {
          // on verifie que c'est bien l'utilisateur connecter qui posséde la fonction
          res.redirect(
            "/forum/function/" + req.params.id + "?error=Seul le créateur peu éditer la function."
          );
          return;
        }
        let args;
        if (funFromDb.args.length > 0) {
          let i = 1;
          args = {};
          funFromDb.args.map((arg) => {
            args[`arg${i}`] = arg;
            i++;
          });
          args.length = i - 1;
        } else {
          args = false;
        }
        console.log(args);
        res.render("forum/edit/function", {
          isLog: !!req.user,
          title: "EditFun",
          style: "function",
          module: "function",
          function: funFromDb,
          args: args,
        });
        return;
      })
      .catch((err) => next(err));
  }
  if (req.params.catname === "home") {
  }
  if (req.params.catname === "answer") {
    // if (req.params.catname === "answer") {
    //   routeGuard(req, res);
    //   res.render("forum/new/answer", {
    //     isLog: true,
    //     title: "Question",
    //     style: "answer",
    //     module: "answer",
    //   });
    //   return;
    // }
  }
  // si pas de route trouver continue vers 404 error
});
router.get("/:catname/delete/:id", routeGuard, (req, res, next) => {
  if (req.params.catname === "function") {
    Function.findById(req.params.id)
      .then((funFromDb) => {
        if (String(req.user.id) !== String(funFromDb.userId)) {
          // on verifie que c'est bien l'utilisateur connecter qui posséde la fonction
          res.redirect(
            "/forum/function/" +
              req.params.id +
              "?error=Seul le créateur peu supprimer la function."
          );
          return;
        }
        let oldname = funFromDb.name;
        Function.deleteOne(funFromDb, (err) => next(err));
        res.render("home", {
          isLog: !!req.user,
          title: "Home",
          message: `Votre fonction ${oldname} a bien été suprimé.`,
        });
        return;
      })
      .catch((err) => next(err));
  }
  if (req.params.catname === "home") {
  }
  if (req.params.catname === "answer") {
    // if (req.params.catname === "answer") {
    //   routeGuard(req, res);
    //   res.render("forum/new/answer", {
    //     isLog: true,
    //     title: "Question",
    //     style: "answer",
    //     module: "answer",
    //   });
    //   return;
    // }
  }
  // si pas de route trouver continue vers 404 error
});

router.get("/:catname/:id", (req, res, next) => {
  if (req.params.catname === "presentation") {
  }
  if (req.params.catname === "function") {
    let dataView = {
      canDelete: false,
      userAlwaysExist: true,
      errorMessage: req.query.error ? req.query.error : false,
    };
    Function.findById(req.params.id)
      .populate({ path: "userId", select: "avatar status _id name" })
      .then((funFromDb) => {
        if (!funFromDb.userId) {
          //on regarde si le créateur exist encore en db si non on set les valeurs en conséquences pour la vue
          dataView.userAlwaysExist = false;
          funFromDb.userId = {};
          funFromDb.userId.avatar = "/images/basicAvatar.png";
          funFromDb.userId.name = "Inconnu";
        } else if (req.user && String(funFromDb.userId._id) === String(req.user._id)) {
          // si l'utilisateur qui demande le détail est le créateur de la fonction il peu la supprimer
          dataView.canDelete = true;
        }
        if (funFromDb.args.length > 1) {
          funFromDb.argsArr = funFromDb.args;
          funFromDb.args = funFromDb.args.reduce((acc, val) => `${acc},${val}`);
        } else if (funFromDb.args.length > 0) {
          funFromDb.argsArr = funFromDb.args;
          funFromDb.args = funFromDb.args[0];
        } else {
          funFromDb.args = "";
        }
        console.log('coucou',funFromDb);
        let textFun = `
function ${funFromDb.name}(${funFromDb.args}) {
  ${funFromDb.body}
}`;
        // on récupére le message dans query si il y en as (aprés post edit par exemple)
        if (req.query && req.query.message) {
          message = req.query.message;
        } else {
          message = false;
        }
        console.log(funFromDb);
        res.render("forum/detail/function", {
          fun: funFromDb,
          ...dataView,
          textfun: textFun,
          style: "functiondetail",
          message: message,
          baseUrl: process.env.BASE_URL,
          dockerPort: process.env.DOCKER_PORT,
          script: "detailFunction",
        });
        return;
      })
      .catch((err) => next(err));
  }
  if (req.params.catname === "answer") {
    PostModel.findById(req.params.id)
      .then((questionFromDb) => {
        console.log("massiquestionFromDb", questionFromDb);
        User.findById(questionFromDb.userId)
          .select("avatar name createdAt")
          .then((userFromDb) => {
            PostModel.find({ fromQuestion: questionFromDb._id }).then((answersFromDb) => {
              console.log("kiwwwwwwwwwww", answersFromDb);
              PostModel.find({
                $and: [{ fromQuestion: questionFromDb._id }, { categorie: "answer" }],
              })
                .populate("userId")
                .then((useranswer) => {
                  if (!useranswer.userId) {
                    let user = {};
                    user.avatar = "/images/basicAvatar.png";
                    user.name = "inconnue";
                    useranswer.userId = user;
                  }
                  console.log("fadilauseranswer", useranswer);
                  console.log("lutilisateur est", userFromDb);
                  if (answersFromDb.length === 0) {
                    res.render("forum/detail/answer", {
                      question: questionFromDb,
                      userq: userFromDb,
                      userA: useranswer,
                      script: "answer",
                      isLog: !!req.user,
                    });
                  } else {
                    res.render("forum/detail/answer", {
                      question: questionFromDb,
                      answers: answersFromDb,
                      userq: userFromDb,
                      userA: useranswer,
                      script: "answer",
                      isLog: !!req.user,
                    });
                  }
                });
            });
          });
      })
      .catch((err) => next(err));
  }
});
module.exports = router;
