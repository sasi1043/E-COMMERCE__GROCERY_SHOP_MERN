require('dotenv').config()
const crypto=require('crypto');
const router = require("express").Router();
const Razorpay=require('razorpay');

//instances
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET,
});

router.post("/",async(req,res)=>{

   const options={
    amount:Number(req.body.amount*100),
    currency:"INR"
   }

   const order=await instance.orders.create(options)
   res.status(200).json({
    success:true,
    order
   })
}) 

router.get("/",async(req,res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
})

router.post("/paymentverification",async(req,res)=>{

  const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
  const body=razorpay_order_id+ "|"+razorpay_payment_id;
  const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
  console.log(`Razorpay Signature,${razorpay_signature}`);
  console.log(`expected Signature,${razorpay_signature}`);

   const check=expectedSignature===razorpay_signature;
   if(check){
    return res.redirect(`https://grocify-rluk.onrender.com/paymentSuccess?referance=${razorpay_payment_id}`);
   }
   else{
    res.status(404).json({
        success:false
    })
   }
})


module.exports=router;