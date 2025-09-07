const Todo = require("../model/todo");
const User = require("../model/user");


//get all todos
const getTodos = async (req,res) => {
    try{
        const todos = await Todo.find({user:req.user._id})
        .sort({createdAt: -1});

        res.json({
            todos
        })

    }catch(error){
        res.status(500).json({
            message:"Server error fetching todos"
        })
    }
}

//create new todo
const createTodo = async (req,res) => {
    try{
        const {title,description} = req.body;

        const todo = new Todo({
            title:title.trim(),
            description: description ? description.trim() : "",
            user:req.user._id
        });

        await todo.save();
        
        res.status(201).json({
            message:"Todo created successfully",
            todo
        })
    }catch(error){
        res.status(500).json({
            message:"error while creating todo"
        })
    }
}

// update existing todo
const updateTodo = async (req,res) => {
    try{
        const {id} = req.params;
        const {title,description} = req.body;
        
        const updateData =  {};

        if(title !== undefined) updateData.title = title.trim();
        if(description !== undefined) updateData.description = description.trim();

        const todo = await Todo.findOneAndUpdate({
            _id:id,
            user:req.user._id
        },updateData,{
            new:true,
            runValidators:true
        })

        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }

        res.json({
            message: "Todo updated successfully",
            todo
        })

    }catch(error){
        res.status(500).json({
            message:"error while updating todo"
        })
    }
}

//delete todo
const deleteTodo = async (req,res) => {
    try{
        const {id}  = req.params;
        
        const todo = await Todo.findByIdAndDelete({
            _id:id,
            user:req.user._id
        })

        if(!todo){
            return res.status(400).json({
                message:"Todo not found"
            })
        }

        res.json({
            message: "Todo deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"error while deleting todo"
        })
    }
}

//done/undone todo
const toggleTodo = async(req,res) => {
    try{
        const {id} = req.params;

        const todo = await Todo.findOne({
            _id:id,
            user:req.user._id,
        })

        if(!todo){
            return res.status(404).json({
                message:"Todo not found"
            })
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.json({
            message:`Todo marked as ${todo.completed ? "completed" : "incomplete"} `,
            todo
        })

    }catch(error){
        res.send(500).json({
            msg:"error while toggling the todo"
        })
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
}