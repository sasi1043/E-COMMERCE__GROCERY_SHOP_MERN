require("dotenv").config()
const router=require("express").Router()
const multer=require("multer")
const {DailyEssModel}=require('../models/model.js');

const Dstorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./images/DailyEssentials");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const DailyStorage=multer({storage:Dstorage});

router.get("/",async(req,res)=>{
    try {
        const prod=await DailyEssModel.find();
        if(!prod) return res.status(404).send("no products found")
            res.json(prod)
    } catch (e) {
        console.error({error:e.message});
    }
});

router.post("/",DailyStorage.single("DailyEssential"),async(req,res)=>{
    try {
        
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const price=req.body.price
        const description=req.body.description
        const rating =req.body.rating

        const upload=await DailyEssModel({name,path,filename,price,rating,description});
        upload.save()
        res.json(upload)

    } catch (e) {
        console.error({error:e.message})
    }
})

module.exports=router;
