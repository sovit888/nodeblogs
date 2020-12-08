const {validationResult}=require("express-validator")
const jwt=require("jsonwebtoken")
const Publisher=require("../models/User");

exports.login=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
return res.json({error:errors.array()[0].msg})
    }
    const {email,password}=req.body;
Publisher.findOne({email}).exec((error,publisher)=>{
    if(error||!publisher){
        return res.status(401).json({error:"sorry email donot exists"})
    }
    if(!publisher.authenticate(password)){
        return res.status(401).json({error:"sorry email and password do not match"})
    }
    const token=jwt.sign({_id:publisher._id},process.env.JWT_SECRET);
    res.cookie("token",token,{expire:Date.now()+400000})
    return res.json({token})
})
}

exports.signin=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
return res.json({error:errors.array()[0].msg})
    }
    const publisher=new Publisher(req.body)
publisher.save((error,user)=>{
    if(error){
        return res.status(422).json({error:"cannot insert new publisher"})
    }
    return res.json({user})
})
    
}
exports.passwordResetLink=(req,res)=>{
    Publisher.findOne({email:req.body.email}).exec((error,publisher)=>{
        if(error||!publisher){
            return res.json({error:"sorry email do nt exits"})
        }
        const reset_token=publisher.resetPasswordLink();
        return res.json({token:reset_token})
    })
}

exports.changePassword=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
return res.json({error:errors.array()[0].msg})
    }
    const {newpassword,confirmpassword}=req.body
    if(newpassword!==confirmpassword){
        return res.status(422).json({error:"confirm and new password must be same"})
    }
    req.publisher.changePassword(confirmpassword);
    return res.json({message:"updated successfully"})
}