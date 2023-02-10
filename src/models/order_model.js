const { Schema, model } = require('mongoose');
const uuid = require('uuid');


const orderSchema = new Schema({
    orderId : {type: String, default: uuid.v4},
    userId : {type:Schema.Types.ObjectId, ref: "Users" },
    status : {type:Number , default : 0},
    item: {type: Array , default: []},
},{
    timestamps:true
});

module.exports = model("Order",orderSchema);