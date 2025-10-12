const jwt =require("jsonwebtoken")

module.exports=(req,res,next)=>{
    const header=req.headers.authorization || ''

    const token =header.startswith('Bearer')?header.slice(7): null

    if(!token) return res.status(401).send("no token provided");

    try{
        const decode = jwt.verify(token,"Secret_code")
        res.user = decode
        next()
    }
    catch(e){
        res.status(401).send("invalid token provided")
    }
}