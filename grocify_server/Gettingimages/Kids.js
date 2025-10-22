require("dotenv").config()
const router=require("express").Router()
const multer=require("multer")
const {KidsModel}=require('../models/model.js');

const kstorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./images/Kids");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const KidsStorage=multer({storage:kstorage});

router.get("/",async(req,res)=>{
    try {
        const prod=await KidsModel.find();
        if(!prod) return res.status(404).send("no products found")
            res.json(prod)
    } catch (e) {
        console.error({error:e.message});
    }
});

router.post("/",KidsStorage.single("Kids"),async(req,res)=>{
    try {
        
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const price=req.body.price
        const description=req.body.description
        const rating =req.body.rating
        const measure=req.body.measure

        const upload=await KidsModel({name,path,filename,price,rating,description,measure});
        upload.save()
        res.json(upload)

    } catch (e) {
        console.error({error:e.message})
    }
})

module.exports=router;
