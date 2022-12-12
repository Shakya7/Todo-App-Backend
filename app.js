const express=require("express");
const dotenv=require("dotenv");
const todoRouter=require("./routers/todoRouter");
const cors=require("cors");

dotenv.config({path:"./config.env"});

const app=express();

const corsOptions={
    origin:`${process.env.REACT_URL}`,
    credentials:true
}


//Default middelware configs 
app.use(express.json());
app.use(cors(corsOptions));



app.use("/api/v1/todos",todoRouter);
app.get("/test",(req,res)=>{
    res.status(200).json({
        data:"success test"
    })
})


module.exports=app;