const express=require("express");
const dotenv=require("dotenv");
const todoRouter=require("./routers/todoRouter");
const taskRouter=require("./routers/taskRouter");

dotenv.config({path:"./config.env"})

const app=express();


//Default middelware configs 
app.use(express.json());



app.use("/api/v1/todos",todoRouter);
app.use("/api/v1/tasks",taskRouter);

module.exports=app;