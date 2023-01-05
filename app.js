const express=require("express");
const dotenv=require("dotenv");
const todoRouter=require("./routers/todoRouter");
const eventRouter=require("./routers/eventRouter");
const noteRouter=require("./routers/noteRouter");
const cors=require("cors");

dotenv.config({path:".env"});

const app=express();

const corsOptions={
    origin:`${process.env.REACT_URL}`,
    credentials:true
}


//Default middleware configs 
app.use(express.json());
app.use(cors(corsOptions));



app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/notes", noteRouter);

app.get("/test",(req,res)=>{
    res.status(200).json({
        data:"success test"
    })
})


module.exports=app;