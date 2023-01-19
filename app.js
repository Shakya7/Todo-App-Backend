const express=require("express");
const dotenv=require("dotenv");
const todoRouter=require("./routers/todoRouter");
const eventRouter=require("./routers/eventRouter");
const noteRouter=require("./routers/noteRouter");
const userRouter=require("./routers/userRouter");
const cookieParser=require("cookie-parser");
const cors=require("cors");

dotenv.config({path:".env"});

const app=express();

const allowedOrigins = [
    "https://tracebit.netlify.app"
]

const corsOptions={
    // origin:`${process.env.REACT_URL}`,
    // credentials:true
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}


//Default middleware configs 

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/notes", noteRouter);

app.get("/test",(req,res)=>{
    res.status(200).json({
        data:"success test"
    })
})


module.exports=app;