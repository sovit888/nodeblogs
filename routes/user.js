const express=require("express");
const router=express.Router();

const {login,signin,changePassword,passwordResetLink}=require("../controllers/user")
const {signinValidations,loginValidations,resetValidations}=require("../validators/user");
const {publisherDetail}=require("../middlewares/user")

router.param("resettoken",publisherDetail)
router.post("/user/login",loginValidations,login)
router.post("/user/signin",signinValidations,signin);
router.post("/user/resetlink",passwordResetLink);
router.put("/user/:resettoken",resetValidations,changePassword);


module.exports=router