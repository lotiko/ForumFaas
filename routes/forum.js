const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/:catname', (req, res, next) => {
  if(req.params.catname==='presentation'){
    res.render('forum/presentation');
    return;
  }
  if(req.params.catname==='function'){
    res.render('forum/function');
    return;
  }
  if(req.params.catname==='home'){
    res.render('forum/home');
    return;
  }
  if(req.params.catname==='answer'){
    res.render('forum/answer');
    return;
  }
  next();
});


module.exports = router;
