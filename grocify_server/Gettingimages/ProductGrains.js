require("dotenv").config();
const router = require("express").Router();
const multer = require("multer")
const path=require("path")
const mongoose=require("mongoose")
const {GrainModel} =require("../models/model");


const Grains=multer.diskStorage({
    destination:function(req,res,cb){
      cb(null, './images/Grainsimages')
    },

    filename:function(req,file,cb){
        cb(null,Date.now() +"-"+ file.originalname)
    }
})

const GrainStorage=multer({storage:Grains})

router.get('/',async(req,res)=>{
    try{
    const Grain =await GrainModel.find()
    if(!Grain) return res.status(204).send("no data found");
    res.json(Grain)
    }
    catch(e){
        res.status(404).send({error:e.message})
    }
})

router.post('/',GrainStorage.single("grains"),async(req,res)=>{
    try{
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating = req.body.rating
        const price =req.body.price
        const Grain=await GrainModel({name,path,filename,description,rating,price})
        Grain.save()
        res.json(Grain)
    }
    catch(e){
        res.status(404).send({error:e.message});
    }
})


module.exports=router;