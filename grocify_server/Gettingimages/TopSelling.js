require("dotenv").config();
const router=require("express").Router();
const multer=require("multer")
const {TopSellModel}=require('../models/model.js');

const TopSellStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images/TopSelling');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const storage=multer({storage:TopSellStorage});

router.get('/',async(req,res)=>{
    try{
        const prod = await TopSellModel.find()
        if(!prod) return res.send({"msg":"image not found"})

        res.json(prod)
    }
    catch(error){
        res.send({"error":"unable to get photo"})
    }
})

router.post('/',storage.single("TopSell"), async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const rating=req.body.rating
        const price=req.body.price
        const measure=req.body.measure

        const upload=await TopSellModel({name,path,filename,description,rating,price,measure});
        upload.save()
        res.send(upload)

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;
