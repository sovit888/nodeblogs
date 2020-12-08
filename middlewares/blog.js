const Blog=require("../models/Blog");
exports.getBlogById=(req,res,next,id)=>{
    Blog.findById(id).exec((error,blog)=>{
        if(error||!blog){
            return res.status(401).json({errror:"cannot find blog of that id"})
        }
        req.blog=blog;
        next();
    })
}