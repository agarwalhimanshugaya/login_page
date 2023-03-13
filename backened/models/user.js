const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const joi=require("joi");
const passwordComplexity=require("joi-password-complexity");
const {string} =require("joi");
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    collegeName:{type:String,required:true},
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign(
        {_id:this._id,name:this.name},
        process.env.JWTPRIVATEKEY,
        {expiresIn:"7d"}
    )
    return token;
}
const validate=(user)=>{
    const schema=joi.object({
        name:joi.string().min(5).max(20).required(),
        email:joi.string().required(),
        password:passwordComplexity().required(),
        collegeName:joi.string().min(4).max(20).required(),
    
    });
    return schema.validate(user);
}
const User=mongoose.model("user",userSchema);
module.exports={User,validate};
