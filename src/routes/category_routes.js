const router = require("express").Router();
const categoryModel = require("./../models/category_model");

router.post("/",async(req,res)=>{
    const categoryData = req.body;

    const newCategory = new categoryModel(categoryData);
    await newCategory.save((err)=>{
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newCategory});
    })
     
    
    

       
})

router.delete("/",async (req,res)=>{
    const categoryId = req.body.categoryid;
    const result = await categoryModel.findOneAndDelete({categoryid:categoryId});
    if(!result){
        res.json({success:false,error:"Category not found"});
        return;
    }
    res.json({success:true,data:result});
 });

 
router.get("/",async (req,res)=>{
    await categoryModel.find().exec((err,result)=>{
        if(err){
            res.json({success: false, error:err});
            return;

        }
        res.json({success:true,data:result});
    })
 })

 router.put("/",async (req,res)=>{
    categoryId = req.body.categoryid;
    var data = await categoryModel.findOneAndUpdate({categoryid: categoryId},req.body);
    if(!data){
        res.json({success:false,error:"Category not found"});
        return;

    }
    var updated = await categoryModel.findOne({categoryid:categoryId});
    res.json({success:true,data:updated});
 })

module.exports = router;