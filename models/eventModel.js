const mongoose=require("mongoose");

const eventSchema=new mongoose.Schema({
    title:String,
    start:Date,
    end:Date,
    link:String,
    userID:String
    //attachments:[]
});

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;