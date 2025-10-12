require("dotenv").config();
const router = require("express").Router();
const multer =require("multer")
const {chocModel}=require('../models/model');

const chocupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Chocolates');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const chocStorage=multer({storage:chocupload});

router.get('/',async(req,res)=>{
    try{
    const choc=await chocModel.find();
    if(!choc) return res.status(404).send("no data found");
    res.json(choc)
    }
    catch(e){
        console.error({error:e.message})
    }
});


router.post('/',chocStorage.single("choco"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await chocModel({name,path,filename,description,rating,price});
        upload.save()
        res.send("products upload to db")

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;