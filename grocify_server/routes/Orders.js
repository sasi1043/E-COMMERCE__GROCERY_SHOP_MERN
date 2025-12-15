require("dotenv").config()
const router=require("express").Router();

const e = require("express");
const {orderModel}=require('../models/model.js')

router.get("/:orderID",async(req,res)=>{
    try{
        const orderID = req.params.orderID;
    const orders = await orderModel.find({ orderID }).sort({date:-1},{ unique: true });
   if(! orders) return res.status(404).send("no orders found");
    res.json(orders);
    }
    catch(error){
        res.send({e:error.message});
    }
});

router.post("/",async(req,res)=>{
    try {
       const orderID=req.body.orderID
       const items=req.body.items
       const date=req.body.date
       const status=req.body.status
       const referenceID=req.body.referenceID
       const time=req.body.time
       const totalPrice=req.body.totalPrice

       const order=new orderModel({orderID,items,date,status,referenceID,time,totalPrice});

       order.save();
       res.json(order)
    } catch (error) {
        res.send({e:error.message});
    }
})

module.exports=router;