const expressJwt=require("express-jwt");
const User = require("../models/User");
const Publisher=require("../models/User");
exports.isSignedIn=expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})
exports.publisherDetail=(req,res,next,reset_token)=>{
Publisher.findOne({reset_token,expiry_token:{$gt:Date.now()}}).exec((error,publisher)=>{
    if(error||!publisher){
        return res.status(401).json({error:"cannot get email of that tokens"})
    }
    req.publisher=publisher;
    next();
})
}

exports.isAuthenticated=(req,res,next)=>{
    User.findById(req.auth._id).exec((error,user)=>{
        if(error){
            return res.status(401).json({error:"sorry user dont exits"})
        }
        req.user=user;
        next();
    })
    next()
}
