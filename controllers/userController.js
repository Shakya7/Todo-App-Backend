const User=require("../models/userModel");

exports.getProfileData=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}