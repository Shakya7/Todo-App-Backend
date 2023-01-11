const Todo = require("../models/todoModel");

exports.createSingleTodo=async (req,res)=>{
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
        todo.updatedDate=new Date(Date.now());
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
        },{new:true});
        todo.updatedDate=new Date(Date.now());
        await todo.save();
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

exports.updateSingleTaskCheckbox=async(req,res)=>{
    try{
        const todo=await Todo.findOne({_id:req.params.id});
        const taskToBeUpdated=todo.tasks.filter((task)=>task.id===req.body.taskID);
        taskToBeUpdated[0].inProgress=!(taskToBeUpdated[0].inProgress);
        todo.updatedDate=new Date(Date.now());
        await todo.save();
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
function inProgressTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===true){
                    updatedTodos.push(todos[i]);
                    break;
                }
            }
        }
        else
            updatedTodos.push(todos[i]);
    }
    return updatedTodos;
}

exports.getInProgressTodos=async (req,res)=>{
    try{
        const {id}=req.params;
        const todos=await Todo.find({userID:id});
        const filteredTodos=inProgressTodos(todos);
        res.status(200).json({
            filteredTodos
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

function completedTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        let flag=true;
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===false){
                    flag=true;
                    continue;
                }
                else{
                    flag=false
                    break;
                }
                    
            }
            if(flag)
                updatedTodos.push(todos[i]);
        }

    }
    return updatedTodos;
}

exports.getCompletedTodos=async (req,res)=>{
    try{
        const {id}=req.params;
        const todos=await Todo.find({userID:id});
        const filteredTodos=completedTodos(todos);
        res.status(200).json({
            filteredTodos
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.deleteTodo=async (req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:"deleted"
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}