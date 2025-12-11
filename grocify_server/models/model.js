const mongoose = require("mongoose")
const Joi = require("joi")

require("dotenv").config()

//model for registering user
const modelUser=new mongoose.Schema({
    name:{type:String,required:true,trim:true,minlength:3},
    email:{type:String,required:true,lowercase:true,unique:true,trim:true},
    mobile:{type:String,required:true,trim:true,minlength:10},
    passwordHash:{type:String,required:true},
},{timestamps:true}
)

const Users = mongoose.model("users",modelUser);
//end of model for register user


//validating the input field of register in frontend with respect to the registration model
const registerSchema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    mobile:Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({"string.pattern.base": "Phone number must be a valid 10-digit Indian number","string.empty": "Phone number is required",}),
    password:Joi.string().min(6).required()
});

//validating the input field of login in frontend with respect to the login model
const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
});


// model for home page product display image section
const homeImageSchema= mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
})

const HomeImageModel=mongoose.model("Homeimage",homeImageSchema)
// end of home page product display

//model for fruits page  product display
const fruitSchema = mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true}
})

const FruitModel=mongoose.model("ProductsFruits",fruitSchema);
//end of fruits page model

//model for grains page products display
const GrainsSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true}
});

const GrainModel=mongoose.model("ProductsGrains",GrainsSchema);
//end  of grain model


//model for dairy products
const dairy=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    measure:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true}
});

const DairyModel=mongoose.model("DairyProducts",dairy);
// end of dairy products model


//model for frozen products
const FrozenSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true}
});

const FrozenModel=mongoose.model("FrozenProducts",FrozenSchema);
//end of model for beverages


//model for beverages products
const BeverageSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    measure:{type:String,required:true}
});

const BeverageModel=mongoose.model("Beverageproducts",BeverageSchema);
//end of beverage model

//model for heaalthcare products
const HealthSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const HealthcareModel=mongoose.model("healthcareproducts",HealthSchema);
//end of beverage model


//model for heaalthcare products
const MasalaSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const MasalaModel=mongoose.model("Masalaprod",MasalaSchema);
//end of beverage model


//model for choc products
const chocSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const chocModel=mongoose.model("ChocoProducts",chocSchema);
//end of  choc model


//model for Biscut products
const BuscuitSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const BiscuitModel=mongoose.model("BiscuitProducts",BuscuitSchema);
//end of  Biscut model

//model for Stationary products
const StationarySchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const StationaryModel=mongoose.model("StationaryProducts",StationarySchema);
//end of  choc model

//model for Best Products products
const AllTimeSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const AllTImeBestModel=mongoose.model("AllTImeBest",AllTimeSchema);
//end of  choc model


//model for Best Products products
const NewProdSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
});

const NewProdModel=mongoose.model("NewProducts",NewProdSchema);
//end of  choc model

//model for Daily essential products

const DailyEssSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    measure:{type:String,required:false}
});

const DailyEssModel=mongoose.model("DailyEssentials",DailyEssSchema);


//model for Daily cooking ingredients products

const cookingSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    measure:{type:String,required:false}
});

const cookingModel=mongoose.model("cooking",cookingSchema);


//model for Daily cooking ingredients products

const KidsSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    measure:{type:String,required:false}
});

const KidsModel=mongoose.model("KidsFavourite",KidsSchema);

//model for Daily cooking ingredients products

const TopSellSchema=mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true},
    measure:{type:String,required:false}
});

const TopSellModel=mongoose.model("TopSelling",TopSellSchema);

// model for discount products

const DiscountSchema=mongoose.Schema({
     name:{type:String,required:true},
     path:{type:String,required:true},
     filename:{type:String,required:true},
     description:{type:String,required:true},
     rating:{type:String,required:true},
     price:{type:String,required:true},
     measure:{type:String,required:true},
     discount:{type:Number,required:true}
})

const discountModel=mongoose.model("DiscountProducts",DiscountSchema)


//for searchbar
const modelsearch=mongoose.Schema({
     name:{type:String,required:true},
    path:{type:String,required:true},
    filename:{type:String,required:true},
    description:{type:String,required:true},
    measure:{type:String,required:true},
    rating:{type:String,required:true},
    price:{type:String,required:true}
})

const search=mongoose.model("searchbar",modelsearch)
//searchbar end

//for orders
const orderSchema=mongoose.Schema({
    orderID:{type:String,required:true},
    items:{type:Array,required:true},
    date:{type:String,required:true},
    status:{type:String,required:true},
    referenceID:{type:String,required:true},
    time:{type:String,required:true},
    totalPrice:{type:String,required:true}
});

const orderModel=mongoose.model("orders",orderSchema)


module.exports={FrozenModel,
    orderModel,
    discountModel,
    TopSellModel,
    KidsModel,
    cookingModel,
    DailyEssModel,
    search,
    NewProdModel,
    AllTImeBestModel,
    DairyModel,
    GrainModel,
    HomeImageModel,
    FruitModel,
    Users,
    registerSchema,
    loginSchema,
    BeverageModel,
    HealthcareModel,
    MasalaModel,
    chocModel,
    BiscuitModel,
    StationaryModel}