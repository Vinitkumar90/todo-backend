//now we will make api level validation middlewares

const validateEmail = (email) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const validatePassword = (p) => {
    return p && p.length>=6;
}

//user registration validation
const validateRegister = (req,res,next) => {
    const{name,email,password} = req.body;
    const errors = [];
    //first check wether all fields are entered
    if(!name)errors.push("Name is required");
    if(!email)errors.push("Email is required");
    if(!password)errors.push("Password is required");

    //validate name
    if(name && (name.trim().length < 2 || name.trim().length > 50)){
        errors.push("Name must")
    }

    //validate email
    if(email && !(validateEmail(email))){
        errors.push("Please enter a valid email");
    }

    //validate password
    if(password && !validatePassword(password)){
        errors.push("Password must be at least 6 characters");
    }

    if(errors.length > 0){
        return res.status(400).json({
            message:"validation failed",
            errors
        });
    }

    next(); 
}

//we are just validating the data ...is the format correct ,,or even entered or not .(nothing to do anything w db)
//user login validation
const validateLogin = (req,res,next)=>{
    const {email,password} = req.body;
    const errors = [];

    if(!email)errors.push("email is required");
    if(!password)errors.push("password is required")

    if(email && !validateEmail(email)){
        errors.push("please enter a valid email")
    }

    if(errors.length > 0){
        return res.status(400).json({
            message:"validation error",
            errors
        })
    }

    next();
    
}

//todo validation
const validateTodo = (req,res,next) => {
    const {title, description, priroity, dueDate} = req.body;
    const errors= [];


    if(!title || !title.trim()){
        errors.push("Title is required")
    }

    if(title && title.trim().length>100){
        errors.push("Title cannot exceed 100 characters")
    }

    if(description && description.length > 500){
        errors.push("Description cannot exceed 500 characters")
    }

    if(errors.length > 0){
        return res.status(400).json({
            message:"validation error",
            errors
        })
    }

    next();
}


module.exports = {
    validateRegister,
    validateLogin,
    validateTodo
}
