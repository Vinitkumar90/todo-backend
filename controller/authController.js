const User = require("../model/user");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    //create a new user
    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    await newUser.save();

    const token = newUser.generateAuthToken(); //generatin the jwt

    res.status(200).json({
      message: "User registered successfully",
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "error during registration",
    });
  }
};

const login = async (req,res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const PasswordCheck = await user.comparePassword(password);
    if (!PasswordCheck) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = user.generateAuthToken(); //genreate jwt

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("login error",error);
    res.status(500).json({
        message:"Server error during login"
    })
  }
};


const getProfile = (req,res) => {
    try{
        res.json({
            user:{
                id:req.user._id,
                name:req.user.name,
                email:req.user.email,
                createdAt:req.user.createdAt
            }
        })
    }catch(error){
        res.status(500).json({
            message:"Server  error fetching profile"
        })
    }
}

const logout = async (req,res) => {
    try{
        res.json({
            message:"Logout successful"
        })
    }catch(error){
        res.status(500).json({
            message:"Server error during logout"
        })
    }
}

module.exports = {
    register,
    login,
    getProfile,
    logout
}