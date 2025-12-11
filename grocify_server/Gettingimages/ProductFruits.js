require("dotenv").config();
const router =require("express").Router();
const mongoose=require("mongoose");
const path=require("path");
const multer=require("multer");
const {FruitModel}=require('../models/model');


const fruitsImage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Fruitimages')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const fruits=multer({storage:fruitsImage});

router.get('/',async(req,res)=>{
    try{
    const fruit=await FruitModel.find();
    if(!fruit) res.status(204).send("no products found");
    res.json(fruit)
    }
    catch(e){
        res.send({error:e.message})
    }
});


router.post('/',fruits.single("fruits"),async(req,res)=>{
    try{
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price
        const fruitdb=await FruitModel({name,path,filename,description,rating,price})
        fruitdb.save();
        res.send("product uploaded to db")

    }
    catch(e){
        res.send({error:e.message})
    }
})



module.exports=router;