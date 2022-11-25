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