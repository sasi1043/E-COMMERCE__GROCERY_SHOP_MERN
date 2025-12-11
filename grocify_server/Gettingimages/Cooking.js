require("dotenv").config();
const router = require("express").Router();
const multer =require("multer")
const {cookingModel}=require('../models/model');

const cookingupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/cooking');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const cookingStorage=multer({storage:cookingupload});

router.get('/',async(req,res)=>{
    try{
    const prod=await cookingModel.find();
    if(!prod) return res.status(404).send("no data found");
    res.json(prod)
    }
    catch(e){
        console.error({error:e.message})
    }
});


router.post('/',cookingStorage.single("cooking"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await cookingModel({name,path,filename,description,rating,price});
        upload.save()
        res.send("products upload to db")

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;