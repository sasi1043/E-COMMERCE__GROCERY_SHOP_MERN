const router =require("express").Router()

const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const { Users, loginSchema } = require("../models/model")

router.post("/",async(req,res)=>{

const {error,value}=await loginSchema.validate(req.body)
if(error) res.status(400).send(error.details[0].message)

    const loginuser =await Users.findOne({email:value.email.toLowerCase()});
    if(!loginuser) return res.status(401).send("invalid email or password");

    //decrypting the password
    const check =await bcrypt.compare(value.password,loginuser.passwordHash);
    if(!check) return res.status(401).send("invalid password")

    const token =jwt.sign({
        id:loginuser._id,
        email:loginuser.email,
        name:loginuser.name
    },
    
        process.env.JWT_SECRET || "Secret_code",
    {expiresIn:process.env.EXPIRES_IN_JWT || '7d'}
);

res.send({
    message:"logged in successfully",
    token,
    name:loginuser.name,
    email:loginuser.email,
    mobile:loginuser.mobile,
    id:loginuser._id
})
})

module.exports = router;