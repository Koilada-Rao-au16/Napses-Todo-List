const Todo = require('../models/TodoModel')


const todoControllers = {

    addTodo : async(req,res)=>{
        try {
            const {name,time,description} = req.body
            
            if(!name||!description||!time){
                return res.json({message:"error",error:"please enter all details"})
            }
           const todo = await Todo.create({...req.body,userId:req.user._id})
            res.json({messege:"sucess",data:todo})
        } catch (error) {
            res.json({messege:"error",error:error.message})
        }
    }, 

    getTodo : async(req,res)=>{
        try {
           const result = await Todo.find({userId:req.user._id}).lean()
           res.json({messege:"sucess",data:result})
        } catch (error) {
            res.json({messege:"error",error:error.message})
        }
    },

    updateTodo : async(req,res)=>{
    
        try {
            const {id} = req.params
            let result = await Todo.findByIdAndUpdate({_id:id},{...req.body},{new:true})
            if(result==null){
                return res.json({messege:"error",error:"Id does not exist"})
            }
            res.json({messege:"sucess",data:result})
        } catch (error) {
            res.json({messege:"error",error:error.message})
        }
    },

    deleteTodo : async(req,res)=>{
    
        try {
            const {id} = req.params
            let result = await Todo.findByIdAndDelete({_id:id})
            if(result==null){
                return res.json({messege:"error",error:"Id does not exist"})
            }
            res.json({messege:"sucess",data:result})
        } catch (error) {
            res.json({messege:"error",error:error.message})
        }
    }
}

module.exports = todoControllers