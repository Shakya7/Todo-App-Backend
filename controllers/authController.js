const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const emailSend=require("../utils/email");
const crypto=require("crypto");
const bcrypt=require("bcryptjs");

exports.signup=async(req,res)=>{
    try{
    const newUser=await User.create(req.body);
    const token=jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    const cookieOptions={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
        httpOnly:true,
        secure:true
    }
    res.cookie("jwt",token,cookieOptions);
    res.status(201).json({
        status:"success",
        data:{
            user:newUser
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

exports.login=async(req,res)=>{    
    try{
        const {email,password}=req.body;
        const user=await User.findOne({
            email:email
        }).select("+password");
        if(!user)
            throw `Please enter a valid email or password`;
        const correct=await user.compareNormalPwithHashedP(password,user.password);
        if(!correct) 
            throw `Please provide valid email or password`;   
        console.log(user);
        const token= jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES}); 
        const cookieOptions={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
            httpOnly:true,
            secure:true
        }
        res.cookie("jwt",token,cookieOptions);
        res.status(200).json({
            status:"success",
            message:"You have logged in successfully",
            data:{
                user,
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

exports.logout=async(req,res)=>{
    try{
        const cookieOptions={
            expires: new Date(Date.now()-10*1000),
            httpOnly:true,
            secure:true,
            //domain:"localhost",
            //path: '/',
        };
        console.log("Logging out");
        res.cookie("jwt","null",cookieOptions);
        res.clearCookie('jwt');
        res.status(200).json({
            status:"success",
            message:"Cookie has been deleted"
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"failed",
            message: err.message
        })
    }
}

exports.protectRouteWithJWT=async(req,res,next)=>{
    try{
    let token;
    if(req.cookies.jwt)
        token=req.cookies.jwt;
    if(!token)
        return next("Authentication failed...please try again");
    const decoded=jwt.verify(token,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    const user=await User.findById({_id:decoded.id});
    if(!user)
        return next("No user found! Please signup first...");
    res.user=user;
    next();
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.checkCookiePresent=async(req,res)=>{
    try{
    let token;
    if(req.cookies.jwt)
        token=req.cookies.jwt;
    if(!token)
        throw "Cookie not found. User is not logged in";
    const decoded=jwt.verify(token,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    const user=await User.findById({_id:decoded.id});
    if(!user)
        throw "No user found! Please login first...";
    res.status(200).json({
        status:"success",
        data:{
            message:"User is logged in",
            userID:decoded.id
        }
    });
    }catch(err){
        console.log(err.message);
        res.status(401).json({
            status:"failure",
            data:{
                message:err.message
            }
        });
    }    
}

exports.checkPassword=async(req,res,next)=>{
    try{
        //console.log("Hello")
        const user=await User.findById(req.params.userid).select("+password");
        if(!user)
            return next("No user found! Please signup first...");
        else if(!await user.compareNormalPwithHashedP(req.body.password,user.password))
            return next("Incorrect password provided");
        res.user=user;
        next();
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.forgotPass=async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)
        return next("Email is not registered. Please enter valid registered email");
    const resetToken=await user.getResetToken();
    await user.save({validateBeforeSave:false});
    //`${req.protocol}://${"localhost:3000" || req.get("host")}/resetPassword/${resetToken}`
    const resetURL=`${process.env.REACT_URL}/resetPassword/${resetToken}`;
    const message=`Forgot your password? Go to ${resetURL} and change the password`;
    try{
        await emailSend({
            email:user.email,
            subject:"Your TraceBIT - Reset Token",
            message
        });
        res.status(200).json({
            status:"success",
            message:"Token sent to email, please check..."
        });
    }
    catch(err){
        this.passwordResetToken=undefined;
        this.passwordResetExpires=undefined;
        await user.save({validateBeforeSave:false});
        console.log("failed", err)
        res.status(400).json({
            status:"fail",
            message:err.message,
            data:{
                user:null
            }
        })
    }
}

exports.resetPassword=async(req,res,next)=>{
    try{
    const hashedToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(hashedToken);
    const user=await User.findOne({passwordResetToken:hashedToken,passwordResetTokenExpiry:{$gte:Date.now()}});
    console.log(user);
    if(!user)
        return next("Token expired or invalid token provided");
    console.log(req.body.password);
    console.log(req.body.confirmPassword);
    if(req.body.password!==req.body.confirmPassword)
        return next("Password not matched");
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpiry=undefined;
    const updatedUser=await User.findByIdAndUpdate(user._id,{
        password:await bcrypt.hash(req.body.password,12),
        confirmPassword:undefined,
        passwordChangedAt:Date.now()-1000,
    },{new:true});
    //user.password=req.body.password;
    //user.confirmPassword=req.body.confirmPassword;
    //user.passwordResetToken=undefined;
    //user.passwordResetTokenExpiry=undefined;
    //await user.save(); 
    await updatedUser.clearResetToken();
    
    res.status(200).json({
        status:"success",
        
        message:"Password has been reset"
    })
    }catch(err){
        console.log(err)
        res.status(400).json({
            status:"fail",
            message: err.message
        });
    }
}

exports.checkResetToken=async(req,res)=>{
    try{
        const hashedToken=crypto.createHash("sha256").update(req.body.passwordResetToken).digest("hex");
        const user=await User.findOne({passwordResetToken:hashedToken,passwordResetTokenExpiry:{$gte:Date.now()}});
        if(!user)
            throw "The link is not correct. Please enter correct link";
        res.status(200).json({
            status:"success",
            message:"Reset token found!",
            user
        })
    }catch(err){
        res.status(401).json({
            status:"fail",
            message:"Reset token not found",
            user:null
        })
    }
}