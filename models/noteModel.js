const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    title:String,
    note:String,
    userID:String,
    color:String,
    createdDate:Date,
    updatedDate:Date,

});

const Note=mongoose.model("Note",noteSchema);
module.exports=Note;