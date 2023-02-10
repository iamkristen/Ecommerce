const {Schema,model} = require("mongoose");
const uuid = require("uuid");

const cartItemSchema = new Schema({
    cartitemid:{type: String,default: uuid.v1},
    cartid: {type: String, required:true},
    product : {type: Schema.Types.ObjectId,ref:"product"},
    styles:{type: Schema.Types.ObjectId,ref:"productstyle"},
    quantity: {type:Number,default:1}
},{timestamps:true});

module.exports = model("cartitem",cartItemSchema);