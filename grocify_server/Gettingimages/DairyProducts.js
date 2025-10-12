const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const path=require("path");
const {DairyModel}=require('../models/model');

const Dairyupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/DairyProducts');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const dairyStorage=multer({storage:Dairyupload});

router.get('/',async(req,res)=>{
    try{
    const Dairy=await DairyModel.find();
    if(!Dairy) return res.status(404).send("no data found");
    res.json(Dairy)
    }
    catch(e){
        console.error({error:e.message})
    }
});

router.post('/',dairyStorage.single("Dairy"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const measure=req.body.measure
        const rating=req.body.rating
        const price=req.body.price

        const upload=await DairyModel({name,path,filename,description,rating,price,measure});
        upload.save()
        res.send("products upload to db")

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;