const { findById } = require("../models/taskModel");
const Task=require("../models/taskModel");
const Todo=require("../models/todoModel");

exports.createTask=async(req,res)=>{
    try{
    const todoID=req.body.todo;
    const newTask=await Task.create(req.body);
    await Todo.findByIdAndUpdate(todoID,{
        $push:{
            tasks:newTask._id
        }
    })
    res.status(201).json({
        status:"success",
        data:{
            task:newTask
        }
    })}catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.getTask=async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id)
        res.status(200).json({
            status:"success",
            data:{
                task
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.getAllTasks=async (req,res)=>{
    try{
        const tasks=await Task.find()
        res.status(200).json({
            status:"success",
            total_tasks:tasks.length,
            data:{
                tasks
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
    
}

exports.updateTask=async (req,res)=>{
    try{
        const {id}=req.params;
        const updatedTask=await Task.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:"success",
            data:{
                todo:updatedTask
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.deleteTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const data=await Task.findById(id);

        await Task.findByIdAndDelete(id);
        await Todo.findByIdAndUpdate(data.todo,{
            $pull:{
                tasks:id
            }
        })
        res.status(204).json({
            status:"success",
            data:{
                message:"Task deleted successfully"
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.deleteTasks=async(req,res)=>{
    try{
        await Task.deleteMany();
        await Todo.updateMany({},{
            tasks:[]
        },{
            new:true,
            runValidators:true
        });
        res.status(204).json({
            status:"success",
            data:{
                message:"Tasks deleted successfully"
            }
        })

    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
    
}