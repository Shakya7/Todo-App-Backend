const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({
    title: String,
    color: {
        type:String,
        default:"#CAD5E2"
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ]
})


const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;