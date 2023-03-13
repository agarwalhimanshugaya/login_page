const router=require("express").Router();
const {User,validate}=require("../models/user");
const bcrypt=require("bcrypt");
router.post("/signin",async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).send({message:"invalid email or password"});
    }
    const Validate=await bcrypt.compare(req.body.password,user.password);
    if(!Validate){
        res.status(400).send({messge:"wrong credentials entered"});
    }
    const token=user.generateAuthToken();
    res.status(200).send({data:token,message:"signing please wait"});
}
)

router.post("/signup",async(req,res)=>{
const {error}=validate(req.body);
if(error)return res.status(400).send({message:error.details[0].message});
const user=await User.findOne({email:req.body.email});
if(user){
    return res.status(403).send({message:"user with given data already exit"})
}
const salt=await bcrypt.genSalt(Number(process.env.SALT));
const hashPassword=await bcrypt.hash(req.body.password,salt);
let newUser=await new User({
    ...req.body,
    password:hashPassword
}).save();
newUser.password=undefined;
newUser.__v=undefined;
res.status(200).send({data:newUser,message:"account created successfully"});
}
)
module.exports=router;