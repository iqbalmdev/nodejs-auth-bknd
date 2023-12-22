const jwt  = require('jsonwebtoken')
const User = require("../models/userModel");
const userModel = require('../models/userModel');


const requireAuth = async (req,res,next)=>{
const {authorization  }  = req.headers;


if(!authorization){
    return res.status(401).json({error:"Authorization token is required"})
}

const token = authorization.split(" ")[1];

try{
const {_id} = jwt.verify(token,process.env.SECRET)


req.user = await userModel.findOne({_id}).select('_id')

next()
}catch(err){
console.log(err)

res.status(401).json({error:err})
}
}

module.exports = requireAuth