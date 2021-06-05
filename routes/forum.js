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

/* GET home page */
router.get("/:catname", async (req, res, next) => {
  if (req.params.catname === "presentation") {
    const { page = 1, limit = 4 } = req.query;
    try {
      // execute query with page and limit values
      const users = await User.find()
        .select("-password")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      // compter le nombre de présentations et calculer le nombre de page en conséquences pour pagination dans vue
      const nbDoc = await User.countDocuments({}).exec();
      let nbPage = Math.floor(nbDoc / limit);
      if (nbDoc % nbPage !== 0) {
        nbPage++;
      }

      const usersDataView = users.map((el) => {
        return {
          ...el._doc,
          nbPost: el.posts.length,
          nbFun: el.functions.length,
        };
      });
      // on retourne seulement la donnée si query data sinon on envoi la vue
      if (req.query.data) {
        res.json({
          users: usersDataView,
          nbPage: nbPage,
          page: page,
          limit: limit,
        });
        return;
      }
      // console.log(usersDataView);
      let pagination = { one: false, two: false, tree: false, four: false };
      if (nbPage < 3) {
        pagination.one = true;
        pagination.two = true;
      } else if (nbPage < 4) {
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
      } else {
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
        pagination.four = true;
      }
      res.render("forum/presentation", {
        users: usersDataView,
        nbPage: nbPage,
        page: page,
        limit: limit,
        pagination: pagination,
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
    PostModel.find({})
      .sort({ createdAt: -1 })
      .exec()
      .then((postFromDb) => {
        console.log("jai trouve sa", postFromDb);
        res.render("forum/home", {
          isLog: !!req.user,
          posts: postFromDb,
        });
      })
      .catch((err) => next(err));
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
  // /////////////PRESENTATION
  if (req.params.catname === "presentation") {
    return;
  }
  // /////////////FUNCTION
  if (req.params.catname === "function") {
    const { name, body } = req.body;
    const args = req.body["[args]"];
    console.log(name, args, body, req.body, req.user._id);
    // / TODO VERIF DATA

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
  // /////////////ANSWER///////////////////
  if (req.params.catname === "answer") {
    console.log(req.body, req.query);
    const { title = "answer", body } = req.body;
    const categorie = req.query.type;
    let fromQuestion = false;
    if (categorie === "answer") {
      fromQuestion = req.query.from;
    }
    const userId = req.user._id;
    // const withFunction=req.function._id

    console.log(req.user._id);

    console.log("title", title);
    if (!title || !body) {
      res.render("forum/answer", {
        isLog: true,
        errorMessage: "Veuillez remplir le titre",
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
        res.redirect("/forum/home");
      })
      .catch((err) => next(err));
  }
  // si pas de route trouver continue vers 404 error
});

router.get("/:catname/:id", (req, res, next) => {
  PostModel.findById(req.params.id)
    .then((questionFromDb) => {
      console.log(questionFromDb);
      PostModel.find({ fromQuestion: questionFromDb._id }).then((answersFromDb) => {
        if (answersFromDb.length === 0) {
          res.render("forum/detail/answer", { question: questionFromDb });
        } else {
          res.render("forum/detail/answer", { questionFromDb, answers: answersFromDb });
        }
      });
    })
    .catch((err) => next(err));
});
router;
module.exports = router;
