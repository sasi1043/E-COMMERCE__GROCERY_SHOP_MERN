const router =require("express").Router()
require("dotenv").config();
const multer=require("multer");
const mongoose=require("mongoose")
const path= require("path");
const {HomeImageModel}=require("../models/model");

const Homeimage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../images/Homeimagess')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})
// const HomeimageUpload=multer({storage: Homeimage})

router.get('/',async(req,res)=>{
    try{
        const photo = await HomeImageModel.find()
        if(!photo) return res.send({"msg":"image not found"})

        res.json(photo)
    }
    catch(error){
        res.send({"error":"unable to get photo"})
    }
})

// router.post('/',HomeimageUpload.single("image"), async(req,res)=>{
//     try{
//         const path=req.file.path
//         const filename=req.file.filename
//         const name=req.body.name
//         const image =await HomeImageModel({name,path,filename})
//         await image.save()
//         res.send({"msg":"image uploaded",image})

//     }
//     catch(e){         
//     console.error("Upload error:", e);
//      res.send({"error":"unable to upload image"})
//     }
// })

module.exports=router;
