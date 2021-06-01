const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("email-validator");
const fileUploader = require("../configs/cloudinary.config");
const upload = fileUploader.single("avatar");
const routeGuard = require("../configs/route-gard-isLog");
router.use(routeGuard);

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
  if(req.params.catname==='answer'){
    res.render('forum/answer',{
      isLog:true,
      title:"Question",
      style:"answer"
    });
    return;
  }
  next();
});

router.post('/answer',(req,res,next)=>{
  const {title,body} =req.body
  const categorie='answer'
  console.log(req.user._id);
  
  console.log('title',title);
  if(!title || !body){
    console.log('jai pas de titre et de body');
    res.render("forum/answer",{
      errorMessage: "Veuillez remplir le titre",
      style:'answer'
    })
  }
})


module.exports = router;
