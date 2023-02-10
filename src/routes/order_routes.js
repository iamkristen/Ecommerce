const router = require("express").Router();
const orderModel = require("../models/order_model");

router.post("/",async(req,res)=>{
    const order = req.body;
    const newOrder =new orderModel(order);
    await newOrder.save((err)=>{
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newOrder});
    })
})

module.exports = router;