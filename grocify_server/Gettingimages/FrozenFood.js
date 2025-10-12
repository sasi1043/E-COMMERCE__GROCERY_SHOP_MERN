require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const path=require("path");
const {FrozenModel}=require('../models/model');

const FrozenStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/FrozenProducts');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const FrozenProducts=multer({storage:FrozenStorage});

router.get('/',async(req,res)=>{
    try{
    const Frozen=await FrozenModel.find();
    if(!Frozen) return res.status(404).send("no data found");
    res.json(Frozen);
    }
    catch(e){
        console.error(e);
    }
})

router.post('/',FrozenProducts.single("Frozen"),async(req,res)=>{
    try{
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await FrozenModel({name,path,filename,description,rating,price})
        upload.save();
        res.send("upload to db")
    }
    catch (e) {
    console.error(e);
    res.status(500).send({ error: "Upload failed", details: e.message });
}

});

module.exports=router;