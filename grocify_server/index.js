require("dotenv").config()

const express=require("express")
const cors= require("cors")
const db = require('./db')
const path=require("path")
const Razorpay=require('razorpay');

const registerUSer= require('./routes/users');
const loginVerify=require('./routes/login');
const gettingImage=require('./Gettingimages/Renderimage');
const gettingfruits=require('./Gettingimages/ProductFruits');
const gettingGrains=require('./Gettingimages/ProductGrains');
const DairyProducts=require('./Gettingimages/DairyProducts');
const FrozenProducts=require('./Gettingimages/FrozenFood');
const Beverage=require('./Gettingimages/Beverages')
const Healthcare =require('./Gettingimages/Healthcare')
const masalaprod=require('./Gettingimages/Masala')
const chocos=require('./Gettingimages/Chocolates')
const Biscuit=require('./Gettingimages/Biscuit')
const Stationary=require('./Gettingimages/Stationary')
const payment=require('./routes/Payment.js');
const allTime=require('./Gettingimages/AllTime.js');
const NewProducts=require('./Gettingimages/NewProd.js')
// const postimage=require('./Gettingimages/Renderimage')

const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static("Homeimagess"))
app.use(express.urlencoded({extended:true}));

db();

//register
app.use('/api/register',registerUSer)

//login 
app.use('/api/login',loginVerify)


//for homepage images
app.use('/images', express.static(path.join(__dirname, 'images')));


//Uploading images in the home
// app.use('/api/homeimagesend',postimage)
//for getting home page first division images       
app.use('/api/products/homeimageget',gettingImage);

//posting fruit products and getting fruits
app.use('/api/products/fruits',gettingfruits);

//posting grains product and getting grains::
app.use('/api/products/grains',gettingGrains)

//posting Dairy product and getting DairyProducts::
app.use('/api/products/DairyProducts',DairyProducts)


//posting Frozen product and getting FrozenProducts::
app.use('/api/products/FrozenProducts',FrozenProducts)

//posting beverages products and getting bevegages::
app.use('/api/products/beverages',Beverage);


//posting Healthcare products and getting Hea;thcare::
app.use('/api/products/healthcare',Healthcare);

//posting Masala products and getting Masla::
app.use('/api/products/masala',masalaprod);

//posting chocolate products and getting chocolates::
app.use('/api/products/choco',chocos);

//posting chocolate products and getting chocolates::
app.use('/api/products/biscuit',Biscuit);

//posting Stationary products and getting Stationary::
app.use('/api/products/stationary',Stationary);


//posting and getting Alltime best  products and getting Stationary::
app.use('/api/products/AllTimeBest',allTime);

//posting  and getting new released products
app.use('/api/NewProducts',NewProducts)


//payment Gateway::
app.use("/paymentprocess",payment)
app.use("/getkey",payment)
app.use("/api",payment)


app.listen(4000,()=>console.log("app is running in the http://localhost:4000 port"));