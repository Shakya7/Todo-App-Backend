const Todo = require("../models/todoModel");

exports.createSingleTodo=async (req,res)=>{
    //const {title}=req.body;
    try{
    const newTodo=await Todo.create(req.body);
    console.log("Created a new id of ",newTodo._id);
    res.status(201).json({
        status:"success",
        data:{
            todo:newTodo
        }
    })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}


exports.getAllTodos=async (req,res)=>{
    try{
        const {id}=req.params;
        const todos=await Todo.find({userID:id});
        res.status(200).json({
            status:"success",
            total_todos:todos.length,
            data:{
                todos
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
    
}

exports.updateTodo=async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
            todo
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
        console.log(req.body.taskID)
        await Todo.findByIdAndUpdate(req.params.id,{
            $pull:{
                tasks:{_id:req.body.taskID}
            }
        });
        const todo=await Todo.findById(req.params.id);

        res.status(200).json({
            todo
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}



exports.updateTask=async(req,res)=>{
    try{
        const todo=await Todo.findOne({_id:req.params.id});
        const taskToBeUpdated=todo.tasks.filter((task)=>task.id===req.body.taskID);
        taskToBeUpdated[0].title=req.body.newTitle;
        await todo.save()
        res.status(200).json({
            todo
        })
        
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.createTask=async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndUpdate(req.params.id,{
            $push:{
                tasks:req.body
            }
        },{new:true})
        res.status(200).json({
            todo
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}