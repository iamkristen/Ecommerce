const productModel = require('./../models/product_model');
const productStyleModel = require('./../models/product_style_model');
const router = require('express').Router();

router.post("/",async (req,res)=>{
    const productData =  req.body;

    var styleids = [];
    productData.styles.forEach(async (style)=>{
        const newStyle = new productStyleModel(style);
        styleids.push(newStyle._id);
        await newStyle.save((err)=>{
            if(err){
                res.json({success:false,error:err});
                return;
            }
 
        });
    });

    productData.styles = styleids;

    const newProduct =new productModel(productData);
    await newProduct.save((err)=>{
        if(err){
            console.log(err.message);
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newProduct});
    });
})

router.get("/",async(req,res)=>{
    await productModel.find().populate("category styles").exec((err,result)=>{
        if(err){
            res.json({success:false,error:err});
            return;

        }
        res.json({success:true,data:result});
    });
})

router.delete("/",async (req,res)=>{
    var result = await productModel.findOneAndDelete({productid: req.body.productid});
    if(!result){
        res.json({success:false, error:"Product not found"});
        return;
    }
    res.json({success:true,data: result});
})

router.put("/",async(req,res)=>{
    var productid = req.body.productid;
    var data = await productModel.findOneAndUpdate({productid:productid},req.body);
    if(!data){
        res.json({success:false,err:"Product not found"});
        return; 
    }
    var updated = await productModel.findOne({productid:productid});
    res.json({success:true,data: updated});
})


module.exports = router;