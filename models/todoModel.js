const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({
    title: {
        type:String,
        required:[true,"Please provide a title of todo"]
    },
    createDate:{
        type: Date
    },
    updatedDate:{
        type:Date
    },
    tasks:[
        {
            type:String
        }
    ]
})


const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;