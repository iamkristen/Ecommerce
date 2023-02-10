const { Schema,model } = require("mongoose")


const categorySchema = new Schema({
    categoryid:{type: String, required:true,unique:true},
    title: {type:String, required:true},
    
},{timestamps:true});

module.exports = model("Category",categorySchema);