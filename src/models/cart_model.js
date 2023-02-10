const {Schema,model} = require("mongoose");
const uuid = require("uuid")

const cartSchema = new Schema({
    cartid: {type: String, default: uuid.v4},
    username : {type:String,required:true},
    cartitems : {type: [{type:Schema.Types.ObjectId,ref:"cartitem"}],default:[]},
},{timestamps:true});

module.exports = model("cart",cartSchema);