const router = require("express").Router();
require("dotenv").config();
const multer=require("multer")
const path=require("path")
const {discountModel}=require("../models/model.js");
const { route } = require("./DairyProducts");
const { default: mongoose } = require("mongoose");

const discount=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/discountProd');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const DiscountStorage=multer({storage:discount});

router.post('/',DiscountStorage.single("discount"),async(req,res)=>{
    try{
    const name=req.body.name
   const path=req.file.path
   const filename=req.file.filename
   const description=req.body.description
   const price=req.body.price
   const rating=req.body.rating
   const discount=req.body.discount
   const measure=req.body.measure

   const product=await discountModel({name,path,filename,description,price,rating,discount,measure})
   product.save();
   res.send(product)
    }
    catch(error){
          res.send({e:error.message});
    }
});

router.get('/',async(req,res)=>{
    try {
        const Discount=await discountModel.find();
        if(!Discount) return res.status(404).send("no data found");
        res.json(Discount)
    } catch (error) {
        res.send({e:error.message});
    }
})

module.exports=router;
