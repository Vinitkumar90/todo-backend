//going to create a auth middleware to validate a user with the token he passed us ...which he got while login🍒
const User = require("../model/user")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next) => {
    try{
        //grab the token first from header
        const token = req.header('Authorization')?.replace("Bearer ", "");
        //check 
        if(!token){
            return res.status(401).json({
                message:"No token provided, authorization denied"
            })
        }
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //now we will get the user
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                message:"Token is not valid"
            });
        }

        //seth the user to req object
        req.user = user;
        next();

    }catch(error){
        if(error.name === "JsonWebTokenError"){
            return res.status(400).json({
                message:"Token is not valid"
            })
        }
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({
                message:"Token has expired"
            })
        }
        res.status(500).json({
            message:"Server error in authentication"
        })
    }
}

module.exports = auth;