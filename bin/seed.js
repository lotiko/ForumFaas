const mongoose = require('mongoose')
const User = require('../models/user')

mongoose.connect('mongodb://localhost/forumfaas', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const modo = [
    {
        name: 'massytak',
        email: 'massi06.messalti@gmail.com',
        password: 'MOBejaia06',
        status:'admin'
    }, {
        Pseudo: 'lolodev',
        email: 'lo@lo.com',
        password: 'Plop1234',
        status:'admin'
    }
];

User.insertMany(modo).then(function (modoFromDb) {
    console.log(modoFromDb);
}).catch(err => console.log(err));
