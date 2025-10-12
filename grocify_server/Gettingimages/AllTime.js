require('dotenv').config();
const router = require('express').Router();
const multer=require('multer');
const {AllTImeBestModel}=require('../models/model')


const Alltimeupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/AlltimeBest');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const AlltimeStorage=multer({storage:Alltimeupload});

router.get('/',async(req,res)=>{
    try{
        const allTime=await AllTImeBestModel.find();
    if(!allTime) return res.send("no products");
    res.json(allTime);
    }
    catch(e){
        console.error({error:e.message})
    }
    
})

router.post('/',AlltimeStorage.single("Alltime"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const measure=req.body.measure
        const rating=req.body.rating
        const price=req.body.price

        const prod=AllTImeBestModel({name,path,filename,description,measure,rating,price});
        prod.save();
        res.json(prod);
    } catch (e) {
        console.log({error:e.message})
    }
})

module.exports=router;