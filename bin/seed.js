const mongoose = require('mongoose')
const User = require('../models/users')

mongoose.connect('mongodb://localhost/forumfaas', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const modo = [
    {
        Pseudo: 'massytak',
        email: 'massi06.messalti@gmail.com',
        password: 'MOBejaia',
        confirmPw: 'MOBejaia'
    }, {
        Pseudo: 'massytahk',
        email: 'massi06.messalti@gmail.com',
        password: 'MOBejaia',
        confirmPw: 'MOBejaia'
    }
];

User.insertMany(modo).then(function (modoFromDb) {
    console.log(modoFromDb);
}).catch(err => console.log(err));
