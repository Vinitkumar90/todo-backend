require('dotenv').config()
const express = require("express");
const app = express();
const connect = require("./config/db");

const Port = process.env.PORT || 6000

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