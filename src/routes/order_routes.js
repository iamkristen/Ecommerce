const router = require("express").Router();
const { update } = require("../models/order_model");
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

router.get("/:id",async (req,res)=>{
    const user = req.params.id;

    await orderModel.find({"userId":user}).populate("userId").exec((err,docs)=>{
        if(err){
            res.json({success: false, error: err});

        }
        res.json({success : true, data: docs});
    })

});

router.put("/",async (req,res)=>{
    const data =  req.body;
    const updatedData = await orderModel.findOneAndUpdate({"_id": data.orderId},{"status":data.status});
    if(!updatedData){
        res.json({
            success: false,
            error: "Order Not Found"
        })
        return;
    }
    res.json({success:true, data: updatedData});

});


module.exports = router;
