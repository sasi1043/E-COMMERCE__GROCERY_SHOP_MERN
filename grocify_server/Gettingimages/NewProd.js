require("dotenv").config();
const multer=require('multer')
const router=require('express').Router()
const {NewProdModel}=require('../models/model');

const newUpload=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./images/newProducts')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
})

const NewProdStorage=multer({storage:newUpload});

router.get('/',async(req,res)=>{
    try{
    const res=await NewProdModel.find();
    if(!res) return res.status(404).send("no data");
    return res.json(res);
    }
    catch(e){
        console.error({error:e.message})
    }
    
});

router.post('/',NewProdStorage.single("NewProducts"),async(req,res)=>{
    try {
        
        const name=req.body.name;
        const path=req.file.path;
        const filename=req.file.filename;
        const description=req.body.description;
        const rating=req.body.rating;
        const price=req.body.price;
        const measure=req.body.measure;

        const upload=await NewProdModel({name,path,filename,description,rating,price,measure});
        upload.save();
        res.json(upload);
    } catch (error) {
        
    }
});

module.exports=router;