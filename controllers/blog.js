const Blog=require("../models/Blog")
const {validationResult}=require("express-validator")

exports.getAllBlogs=(req,res)=>{
    Blog.find().sort("-createdAt").exec((error,blogs)=>{
        if(error){
            return res.status(401).json({error:"server error"})
        }
        return res.json({blogs})
    })
};
exports.createBlog=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
return res.json({error:errors.array()[0].msg})
    }
    const blog=new Blog(req.body);
    blog.save((error,savedBlog)=>{
        if(error){
            return res.status(401).json({error:"Cannot create new blogs"})
        }
        req.user.addBlog(savedBlog._id);
        return res.json({blog:savedBlog})
    })
}

exports.deleteBlog=(req,res)=>{
Blog.findByIdAndRemove(req.blog._id).exec((error,data)=>{
    if(error){
        return res.status(401).json({error:"cannot delete blog"})
    }
    req.user.removeBlog(data._id);
    return res.json({message:"deleted successfully"})
})
}