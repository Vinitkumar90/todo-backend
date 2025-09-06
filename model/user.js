const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//schema = class definition or blueprint
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true,"name field is required"],
        trim:true,
        minlength:[2,"it should have more than 2 characters"],  //schema level validation..thorws an error while creating a document and saving it
        maxlength:[50, "not more than 50 characters"]
    },

    email:{
        type: String,
        required:[true, "email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type: String, 
        required: [true, "please enter the password"],
        minlength: [6, "enter password with length greater than 6"],
        select: false //ye exclude krdeta hai password ko from queries
                      
    }
},{
    timestamps: true  //created at and updated at
})

//now we will hash password before saving to db
//adding pre
userSchema.pre('save', async (next) => {
    try{
        //hash the password with salt rounds
        const salt = await bcrypt.genSalt(12)
        this.password = bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error)
    }
})

//instance method to compare password
userSchema.methods.comparePassword = async (candidatePassword) => {
    return bcrypt.compare(candidatePassword,this.password);
}

//instance method to generate jwt
userSchema.methods.generateAuthToken = () => {
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

//model is constructor built from a schema
//model = class with db power
const User = mongoose.model('User',userSchema);
module.exports = User;