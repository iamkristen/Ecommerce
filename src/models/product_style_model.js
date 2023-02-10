const {Schema,model} = require("mongoose");

const productStyleSchema = new Schema({
    styleid: {type: String,required:true,unique:true},
    title: {type: String, required:true},
    price: {type:String,required:true},
    image: {type:Array,required:true},
    color:{type:String}
},{timestamps:true});

module.exports = model("productstyle",productStyleSchema);