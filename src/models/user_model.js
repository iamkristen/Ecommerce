const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    username : {type: String, unique: true},
    fullname : {
        type: String,
    },
    email:{
        type:String,unique:true
    },
    phone:{
        type:String,unique:true
    },
    password: {type: String,},
    address:{type: String},
    country:{
        type:String    },
    
},{timestamps:true});

module.exports = model("Users",userSchema);