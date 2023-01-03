const Event=require("../models/eventModel");

exports.createEvent=async(req,res)=>{
    try{
        const event=await Event.create(req.body);
        res.status(201).json({
            event
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.getEventsById=async (req,res)=>{
    try{
        const events=await Event.find({userID:req.params.id});
        res.status(200).json({
            status:"success",
            events
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.updateEventById=async(req,res)=>{
    try{
        const event=await Event.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            event
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.deleteEventById=async(req,res)=>{
    try{
        await Event.findByIdAndDelete(req.params.id);
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