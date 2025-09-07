require('dotenv').config()
const express = require("express");
const app = express();
const connect = require("./config/db");

app.use(express.json());

//routes import
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo")

const Port = process.env.PORT || 6000

//routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

//testing route
app.get("/",(req,res)=>{
    res.send("all you know is grind")
})


const main = async() =>{
    try{
        await connect();
        app.listen(Port,()=>{
            console.log(`app is listening on port ${Port}`);
        })
    }catch(error){
        console.log("Failed to start the server",error);
    }
}
main();