const express=require("express");
const router=express.Router();

const {isSignedIn,isAuthenticated}=require("../middlewares/user")
const {getAllBlogs,createBlog,deleteBlog}=require("../controllers/blog")
const {blogValidations}=require("../validators/blog")
const {getBlogById}=require("../middlewares/blog")

router.param("blogId",getBlogById);
router.get("/blogs",getAllBlogs);
router.post("/blog",isSignedIn,isAuthenticated,createBlog);
router.delete("/blog/:blogId",isSignedIn,deleteBlog);

module.exports=router