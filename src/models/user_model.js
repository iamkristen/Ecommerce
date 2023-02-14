const {Schema,model} = require("mongoose");
const uuid = require("uuid");

const userSchema = new Schema({
    username : {type: String, unique: true},
    fullname : {type: String},
    email:{
        type:String,unique:true
    },
    phone:{
        type:String,unique:true
    },
    password: {type: String,},
    address:{type: String},
    country:{type:String },
    token: {type:String, required: true}
    
},{timestamps:true});

module.exports = model("Users",userSchema);