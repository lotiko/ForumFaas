const mongoose = require('mongoose')
const Users = require('../models/users')

mongoose.connect('mongodb://localhost/forumfaas', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const modo = [
    {
        pseudo: 'massytak',
        email: 'massi06.messalti@gmail.com',
        password: 'MOBejaia',
        confirmPw: 'MOBejaia'
    }, {
        pseudo: 'massytahk',
        email: 'massi06.messalti@gmail.com',
        password: 'MOBejaia',
        confirmPw: 'MOBejaia'
    }
];

Users.insertMany(modo).then(function (modoFromDb) {
    console.log(modoFromDb);
}).catch(err => console.log(err));
