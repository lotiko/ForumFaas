const express = require('express');
const router  = express.Router();

const Users = require('../models/users')
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

    let pseudoAdd = req.body.pseudo;
    let emailAdd = req.body.email;
    let passwordAdd = req.body.password;
    if (passwordAdd === req.body.confirmPw) {
        const adduser=new Users({
            Pseudo:pseudoAdd,
            email:emailAdd,
            password:passwordAdd,
            confirmPw:req.body.confirmPw
        })
        adduser.save()
        .then(function(usersFromDb){
            res.redirect('/')
        })
        .catch((err)=>console.log(err))
    } else {
        
        console.log('vous devez mettre un mot de pass egal');
    }
})


module.exports = router;