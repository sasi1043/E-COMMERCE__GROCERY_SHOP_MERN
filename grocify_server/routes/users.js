const router =require("express").Router()
const bcrypt =require("bcrypt")

const {Users,registerSchema}=require('../models/model')

router.post("/",async(req,res)=>{
    // valid the input field of register inputs
    const {error,value}=registerSchema.validate(req.body);
    if(error) return res.status(401).send(error.details[0].message)

    const exist = await Users.findOne({email:value.email.toLowerCase()});
    if (exist) return res.status(409).send("email id already exist");

    const saltRounds =Number(process.env.SALT_ROUNDS) || 10
    const passwordHash =await bcrypt.hash(value.password,saltRounds)

    //creating the registered user
    const user =await Users.create({
        name:value.name,
        email:value.email,
        mobile:value.mobile,
        passwordHash
    })
 
    //return a response
    res.status(201).send({
        id:user._id,
        name:user.name,
        email:user.email,
        mobile:user.mobile
    })

})

module.exports = router;  