const router =require("express").Router();
require("dotenv").config();
const multer = require("multer");
const {HealthcareModel}=require('../models/model');


const HealthStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Healthcare');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const HealthcareProd=multer({storage:HealthStorage});

router.get('/',async(req,res)=>{
    try{
    const Health=await HealthcareModel.find();
    if(!Health) return res.status(404).send("no data found");
    res.json(Health);
    }
    catch(e){
        console.error(e);
    }
})

router.post('/',HealthcareProd.single("Health"),async(req,res)=>{
    try{
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await HealthcareModel({name,path,filename,description,rating,price})
        upload.save();
        res.send(upload)
    }
    catch (e) {
    console.error(e);
    res.status(500).send({ error: "Upload failed", details: e.message });
}

});

module.exports=router;