const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.updateName=async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name
        },{new:true});
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })


    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}


exports.updateEmail=async(req,res)=>{
    try{
        // const user=await User.findByIdAndUpdate(req.params.id,{
        //     email:req.body.email
        // },{new:true});
        // res.status(200).json({
        //     status:"success",
        //     data:{
        //         user
        //     }
        // })
        // if(!res.user)
        //     return next("No user found! Please signup first...");
        // else if(!req.body.email)
        //     return next("No email is provided! Please provide email...");
        // console.log(res.user);
        
        const user=await User.findByIdAndUpdate(req.params.userid,{
            email:req.body.email
        },{new:true, runValidators:true});

        const token= jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES}); 
        const cookieOptions={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
            httpOnly:true,
            secure:true,
            sameSite:"none"
        }
        res.cookie("jwt",token,cookieOptions);
        res.status(200).json({
            status:"test",
            data:{
                user
            }
        })
        
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.updateMobile=async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.userid,{
            mobile_number:req.body.mobile
        },{new:true,runValidators:true});

        res.status(200).json({
            status:"test",
            data:{
                user
            }
        })
        
    }catch(err){
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.updatePassword=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.userid).select("+password");
        if(!await user.compareNormalPwithHashedP(req.body.currentPassword,user.password))
            return next("Invalid password");
        const updatedUser=await User.findByIdAndUpdate(req.params.userid,{
            password:await bcrypt.hash(req.body.password,12),
            confirmPassword:undefined,
            passwordChangedAt:Date.now()-1000
        },{new:true});
        
        res.status(200).json({
            status:"success",
            message:"password has been updated",
            user:updatedUser,
        });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message
        });
    }
}


exports.test=async(req,res)=>{
    try{
        res.status(200).json({
            status:"test"
        })

    }catch(err){
        
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}