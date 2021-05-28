const express = require('express');
const router  = express.Router();

const Users = require('../models/user')
// const baseDataview = {
//     frame: true,
//     title: 'home'
// }
// router.get('/', (req, res, next) => {

//     res.render('home', {
//         ... baseDataview
//     });
// });

router.get('/signUp', (req, res, next) => {

    res.render('auth/signup')
})

router.post('/signUp', (req, res, next) => {

    let nameAdd = req.body.pseudo;
    let emailAdd = req.body.email;
    let passwordAdd = req.body.password;
   
        const adduser=new Users({
            name:nameAdd,
            email:emailAdd,
            password:passwordAdd
            
        })
        adduser.save()
        .then(function(usersFromDb){
            res.redirect('/')
        })
        .catch((err)=>console.log(err))
   
})


module.exports = router;