const Note=require("../models/noteModel");

exports.createNote=async(req,res)=>{
    try{
        const note=await Note.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
                note
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.getAllNotes=async(req,res)=>{
    try{
        const notes=await Note.find({userID:req.params.id});
        res.status(200).json({
            status:"success",
            data:{
                notes
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.updateNote=async(req,res)=>{
    try{
        const note=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
            data:{
                note
            }
        })
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.deleteNote=async (req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id);
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