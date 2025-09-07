const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Todo title is required"],
        trim:true,
        maxlength: [100,"Title cannot exceed 500 characters"]
    },
    description:{
        type : String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    completed:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,  //user field will store MongoDB objectId
        ref:"User",  //now we can populate this user field with User document that matched the objectId 
        required:true,
    }
},{
    timestamps: true
})


const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;