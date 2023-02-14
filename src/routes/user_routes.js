const router = require("express").Router();
const { json } = require("body-parser");
const crypto = require("crypto-js");
const userModel = require('./../models/user_model');
const cartModel = require('./../models/cart_model');
const cartItemModel = require('./../models/cart_item_model');
const { populate } = require("../models/product_model");
const jwt = require("jsonwebtoken");
const verify = require("./../middlewares/jwt")

router.post("/register",async (req,res)=>{
    const userData = req.body;

    const hashPassword = crypto.AES.encrypt(req.body.password,process.env.PASS_SEC);
    userData.password = hashPassword;
    
    const token = jwt.sign({username : userData.username},"SecretKey")
    userData.token = token;
    const newUser = new userModel(userData);
    await newUser.save((err)=>{
        if(err){
            res.json({success: false,error:err});
            return;
        } 
        res.json({success: true, data: newUser});
    })
})

router.post("/login",async (req,res)=> {
    const email = req.body.email;
    const foundUser =  await userModel.findOne({email:email});
    if(!foundUser){
        res.json({success: false,error: "User not found"}).status(404);
        return;
    }else{
const password = crypto.AES.decrypt(foundUser.password,process.env.PASS_SEC).toString(crypto.enc.Utf8);
        if(req.body.password != password){
            res.json({success:false,error: "Password incorrect!"});
            return;
        }else{
            res.json({success:true, data: foundUser});
        }
    }
})

router.get("/",verify,async (req,res)=>{
    await userModel.find().exec((err,result)=>{
        if(err){
        res.json({success:false,error:err});
        return;
        }
        res.json({success:true,data:result});
    });
})

router.get("/:username",verify,async (req,res)=>{
    const username = req.params.username;
    const foundUser = await userModel.findOne({username:username});
    if(!foundUser){
        res.json({success:false,error: "User not found"});
        return;
    }
    res.json({success:true,data: foundUser});
})


router.put("/",verify,async(req,res)=>{
    var username = req.body.username;
    var data = await userModel.findOneAndUpdate({username: username},req.body);
    if(!data){
        res.json({success:false,error:"User not found"})
        return;
    }
    var updated = await userModel.findOne({username:username});
    res.json({success:true,data:updated});
})

router.post("/:username/addtocart",verify,async(req,res)=>{
    const username = req.params.username;
    const cartItem = req.body;
    const userCart = await cartModel.findOne({username:username});
    if(!userCart)
    {
        const newCart = new cartModel({username: username,cartitems:[]});
        await newCart.save();
        cartItem.cartid = newCart.cartid;
    }else{
        cartItem.cartid = userCart.cartid;
    }

    const newCartItem = new cartItemModel(cartItem);
    await newCartItem.save(async (err)=>{
        if(err){
            res.json({success:false,error:err});
            return;
        }console.log(newCartItem._id);
    // console.log(newCartItem.cartid);
        await cartModel.findOneAndUpdate({cartid:newCartItem.cartid},{ $push: { cartitems:newCartItem._id } });
        res.json({success:true,data: newCartItem});
    })
})

router.get("/:username/viewcart",verify,async (req,res)=>{
    const username = req.params.username;
    const foundCart = await cartModel.findOne({username:username}).populate({
        path:"cartitems",
        populate:[{
            path:"product",
            model:"Product", 
        },{
            path:"styles",
            model:"productstyle"
    }]
        
    });
    if(!foundCart){
        res.json({success:false,error: "Cart not found"});
        return;
    }
    res.json({success:true,data: foundCart});
})

router.delete("/:username/removefromcart",verify,async(req,res)=>{
    const username = req.params.username;

    const presentCart = await cartModel.findOneAndUpdate({username: username},{$pull: {cartitems:req.body.itemid}});
    if(!presentCart){
        res.json({success:false,error: "Cart item not found"});
        return;
    }
    res.json({success:true,data: "Item removed"});
})
b


module.exports = router;