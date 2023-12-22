const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")


const generateToken = async (_id)=>{
    const token =  jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
return token
}


const login = async (req,res)=>{
    const {email,password} = req.body;

try {
const user = await userModel.login(email,password)

const token = await generateToken(user?._id)
res.json(  { status:200,
    email,
    userObject:user,
    token,
message:"you logged in now"})
}catch (err){
    res.status(401).json({error:err.message})
}
}


const signup = async (req,res)=>{
const {email,password} = req.body;

try{
const user = await userModel.signup(email,password);
const token = await generateToken(user?._id)

res.json({
    status:200,
    email,
    userObject:user,
    token
})
}catch(err){
console.log(err)
res.status(401).json({error:err.message})
}

}


module.exports = {login,signup}