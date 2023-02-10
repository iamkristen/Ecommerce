const {Schema,model} = require("mongoose");

const productSchema = new Schema({
    productid:{type: String,required:true, unique:true},
    title: {type:String, required: true},
    description: {type:String,},
    category: {type:Schema.Types.ObjectId,ref:"Category"},
    styles:{type: [{type: Schema.Types.ObjectId,ref:"productstyle"}],default:[] },
   
},{timestamps:true});

module.exports = model("Product",productSchema);