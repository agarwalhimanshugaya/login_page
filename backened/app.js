const express=require("express");
require("dotenv").config();
require("express-async-errors");
const connection=require("./db");
const app=express();
connection();
const port=process.env.PORT||3000;
app.listen(port,console.log(`listening at port${port}`));