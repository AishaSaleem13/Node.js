import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwtSecret from "../config/jwt.mjs";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
const userschema=  new Schema({

email: {
    type:String,
    required:true,
    unique:true
},
password: {
    type:String,
    required:true,
    minLength: 6
},
fullname: {
    type:String,
    required:true
},
tokens:{
default:[],
type:[String],

}

})
userschema.pre('save',function(next){
    const user=this
    //encryption
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
    
        user.password = hash
    }
    next()
}),

userschema.methods.comparePassword =  function (password) {
    const user = this;
    return  bcrypt.compareSync (password, user.password);
};


userschema.methods.generateToken = function() {
    const { _id } = this
   
    const token = jwt.sign({ _id }, jwtSecret);

    return token
}
const Users = mongoose.model('user', userschema);

export default Users
