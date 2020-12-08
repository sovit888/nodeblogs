const mongoose=require("mongoose")
const crypto=require("crypto");
const {ObjectId}=mongoose.Schema.Types
const uuid=require("uuid").v4;

const PublisherSchema=new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    salt:{type:String,trim:true,required:true},
    enc_password:{type:String,trim:true,required:true},
    blogs:[{type:ObjectId,ref:"blog"}],
    reset_token:{type:String,default:null},
    expiry_token:{type:Date,default:null}
})

PublisherSchema.virtual("password")
.set(function(plainpassword){
    this.salt=uuid();
    this.enc_password=this.securePassword(plainpassword)
})

PublisherSchema.method({
    authenticate:function(plainpassword){
        return this.enc_password===this.securePassword(plainpassword);
    },
    securePassword:function(plainpassword){
        return crypto.createHmac("sha256",process.env.CRYPTO_SECRET)
        .update(plainpassword)
        .digest("hex")
    },
    updateBlogs:function(blogId){
        this.blogs.push(blogId);
        this.save();
    }
    ,
    resetPasswordLink:function(){
        this.reset_token=uuid();
        this.expiry_token=Date.now()+360000
        this.save();
        return this.reset_token;
    }
    ,changePassword:function(newpassword){
        this.enc_password=this.securePassword(newpassword);
        this.reset_token=null;
        this.expiry_token=null;
        this.save();
        return this;
    },
  changeDetails:function(informations){
this.username=informations.username;
this.save();
return this;
  }  
})


module.exports=mongoose.model("Publisher",PublisherSchema);
