require('dotenv').config()
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const authControllers = {

    signUp : async(req,res)=>{

        try {
            const {name,email,password,password1} = req.body
    
            //checking all details
            if(!name||!email||!password||!password1){
                return res.json({message: "error",error:"please enter all required(*) fields"})
            }

            if(password !== password1){
                return res.json({message: "error",error:"password didn't match"})
            }
        
            //checking email already exists or not exists
            const EmailExists = await User.findOne({email : req.body.email}).lean()
            if(EmailExists) {
               
                return res.json({messege:"error",error:"email already registered"});
            }
        
        
            //bcrypt the password
            const hashedpassword = bcrypt.hashSync(req.body.password,8);
            req.body.password = hashedpassword
        
        
             //generating the token
             const token = jwt.sign({email:email},process.env.TOKEN_SECRET);
         
        
            //data save to database 
            const user =await User.create({...req.body})
            await user.save()
        
            //sending responce
            res.json({message: 'sucess',data:token})
            
        } catch (error) {
            res.json({message:"error",error:error.message})
        }
    
       
    },

    login : async(req, res) => {
        try {
    
        const {email,password} = req.body;
    
        //checking details
        if(!email || !password){ 
            return res.json({messege:"error",error:"email or password incorrect"})
        }
    
        //checking user exist or not
        const UserExist = await User.findOne({email : email}).lean();
        if(!UserExist ){
            return res.json({messege:"error",error:"email or password incorrect"})
        } 
    
        //comparing passwords
        let PasswordExists = await bcrypt.compare(password,UserExist.password);
        if(!PasswordExists){
        
            return res.json({messege:"error",error: "Email or Password is incorrect"})
        } 
    
        //4.generating token 
        const token = jwt.sign({email:email},process.env.TOKEN_SECRET);
    
       //sending responce
        res.json({messege:"sucess",data:token})
            
        } catch (error) {
            res.json({messege:"error",error:error.message})
        }
    
     
    }

}

module.exports = authControllers