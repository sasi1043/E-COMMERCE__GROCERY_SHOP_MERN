require("dotenv").config();
const router = require("express").Router();
const multer =require("multer")
const {BeverageModel}=require('../models/model');

const Beverageupload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/Beverages');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const BeverageStorge=multer({storage:Beverageupload});

router.get('/',async(req,res)=>{
    try{
    const Beverage=await BeverageModel.find();
    if(!Beverage) return res.status(404).send("no data found");
    res.json(Beverage)
    }
    catch(e){
        console.error({error:e.message})
    }
});


router.post('/',BeverageStorge.single("Beverage"),async(req,res)=>{
    try {
        const name=req.body.name
        const path=req.file.path
        const filename=req.file.filename
        const description=req.body.description
        const measure=req.body.measure
        const rating=req.body.rating
        const price=req.body.price

        const upload=await BeverageModel({name,path,filename,description,rating,price,measure});
        upload.save()
        res.send("products upload to db")

    } catch (error) {
        res.send({e:error.message})
    }
})

module.exports=router;