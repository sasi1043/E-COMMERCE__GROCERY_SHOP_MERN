require("dotenv").config();
const router = require("express").Router();
const multer =require("multer")
const {BiscuitModel}=require('../models/model');

const Biscuitupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Buiscuit');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const BiscuitStorage=multer({storage:Biscuitupload});

router.get('/',async(req,res)=>{
    try{
    const Biscuit=await BiscuitModel.find();
    if(!Biscuit) return res.status(404).send("no data found");
    res.json(Biscuit)
    }
    catch(e){
        console.error({error:e.message})
    }
});


router.post('/',BiscuitStorage.single("Biscuit"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await BiscuitModel({name,path,filename,description,rating,price});
        upload.save()
        res.send("products upload to db")

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;