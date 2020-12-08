const mongoose=require("mongoose");
const BlogSchema=new mongoose.Schema({
title:{type:String,required:true},
header:{type:String,required:true},
body:{type:String,required:true},
footer:{type:String,required:true},
image:{type:String,default:null}
},{timestamps:true})

module.exports=mongoose.model("blog",BlogSchema)