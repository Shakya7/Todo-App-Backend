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
            title:String,
            inProgress:{
                type:Boolean,
                default:true
            },
            id:String

        }
    ],
    userID:String,
    priority:String
})


const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;