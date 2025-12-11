const router =require("express").Router()
require("dotenv").config();
const multer=require("multer");
const mongoose=require("mongoose")
const path= require("path");
const {StationaryModel}=require("../models/model");

const StationaryUpload = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images/stationary')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const StationaryStorage=multer({storage: StationaryUpload})

router.get('/',async(req,res)=>{
    try{
        const stationary = await StationaryModel.find()
        if(!stationary) return res.send({"msg":"image not found"})

        res.json(stationary)
    }
    catch(error){
        res.send({"error":"unable to get photo"})
    }
})

router.post('/',StationaryStorage.single("stationary"), async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price

        const upload=await StationaryModel({name,path,filename,description,rating,price});
        upload.save()
        res.send(upload)

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;
