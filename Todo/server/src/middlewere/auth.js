const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/UserModel');


//checking is logedin or not
 const isLogin = (req,res,next) => {
     
    //verifying the token if token exist
    try {
        let authToken = req.header("Authorization")
   
        if(!authToken ){
            return res.json({messege:"error",error:"Invalid token"})
        }

        let payload = jwt.verify(authToken,process.env.TOKEN_SECRET,async (err,data)=>{

            if(err){
                return res.json({message:"error",error:"Invalid token"})   
            }else{
                const userData = await User.findOne({email:data.email});
                req.user = userData;
                next()   
            }
            
        });
    }catch(e){
        res.json({messege:"error",error:"Invalid Authentication"})
    }

 }


module.exports = isLogin;
