require("dotenv").config()
const express=require("express")
const mongose=require("mongoose");
const cookie=require("cookie-parser");
const bodyparser=require("body-parser")
const cors=require("cors")

const app=express();
app.use(cookie())
app.use(bodyparser.json())
app.use(cors())

mongose.connect("mongodb://localhost:27017/tests",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

const blogRoutes=require("./routes/blog");
const authRoutes=require("./routes/user");

app.use("/api",blogRoutes);
app.use("/api",authRoutes);


app.listen(process.env.PORT)