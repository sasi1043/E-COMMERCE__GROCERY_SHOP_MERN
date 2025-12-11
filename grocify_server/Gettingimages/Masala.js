const router =require("express").Router();
require("dotenv").config();
const multer = require("multer");
const {MasalaModel}=require('../models/model');


const masalaStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Masala');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const MasalaProd=multer({storage:masalaStorage});

router.get('/',async(req,res)=>{
    try{
    const masala=await MasalaModel.find();
    if(!masala) return res.status(404).send("no data found");
    res.json(masala);
    }
    catch(e){
        console.error(e);
    }
})

router.post('/',MasalaProd.single("Masala"),async(req,res)=>{
    try{
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await MasalaModel({name,path,filename,description,rating,price})
        upload.save();
        res.send(upload)
    }
    catch (e) {
    console.error(e);
    res.status(500).send({ error: "Upload failed", details: e.message });
}

});

module.exports=router;