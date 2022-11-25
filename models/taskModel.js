const mongoose=require("mongoose");
const Todo=require("./todoModel");

const taskSchema=new mongoose.Schema({
    content: String,
    color: {
        type:String,
        default: "#ffffff"
    },
    todo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }
})


const Task=mongoose.model("Task",taskSchema);
module.exports=Task;