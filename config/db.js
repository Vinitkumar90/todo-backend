const mongoose = require("mongoose")

const connect = async() => {
    try{
        await mongoose.connect("mongodb+srv://admin:JEW9oxG5VFA3KpXv@cluster0.bumbj.mongodb.net/mernTodo")
    }catch(err){
        console.log("failed to connect w mongodb",err);
    }
}

module.exports = connect;