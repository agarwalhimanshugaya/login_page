const express=require("express");
require("dotenv").config();
require("express-async-errors");
const connection=require("./db");
const authRoutes=require('./routes/auth');
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes);
const port=process.env.PORT||3000;
app.listen(port,()=>{
    connection();
    console.log(`listening at port${port}`)});