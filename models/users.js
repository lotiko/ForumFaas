const mongoose= require('mongoose')


const UsersSchema= new mongoose.Schema({
    
    Pseudo: { type:String, required: true },
    email: {type:String,required: true},
    
    password:{ type: String, required: true /*,match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/*/},
    confirmPw:{ type: String, required: true/*,match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/*/}
},{
    timestamps:true
})
const usersModel= mongoose.model('Users',UsersSchema)
module.exports= usersModel