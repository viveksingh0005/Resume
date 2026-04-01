const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel= require("../models/blacklist.model")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Controller
const googleLoginController = async (req, res) => {
  const { token } = req.body;   // This is the credential (ID token) from @react-oauth/google

  if (!token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Token is required' 
    });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,   // Must match your web client ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token payload' 
      });
    }

    const { sub: googleId, email, name, picture } = payload;

    // Find existing user or create new one
    let user = await userModel.findOne({ googleId });

    if (!user) {
    user = await userModel.create({
        googleId,
        email,
        name: name || email.split('@')[0],   // fallback name
        picture,
        isGoogleUser: true,
        // username and password will be null/undefined → allowed now
    });
}

    // Generate your own JWT
    const jwtToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        // You can add role or other claims here
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });

  } catch (error) {
    console.error("FULL ERROR:", error.message); // ← Check your terminal RIGHT NOW
  res.status(500).json({ message: error.message });
    console.error('Google auth error:', error.message);

    // Common errors: audience mismatch, expired token, invalid signature
    if (error.message.includes('audience') || error.message.includes('Invalid token')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Google token - audience mismatch or token expired' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Something went wrong during Google sign in' 
    });
  }
};

async function registerUserController(req,res){
    const {username,email,password}=req.body
    if(!username||!email||!password){
        return res.status(400).json({
            message:"please provide username,email and password"
        })
    }
    const isUserAlreadyExists = await
    userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists with this email address or username"
        })
    }
    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,email,password:hash
    })

    const token = jwt.sign({
        id:user._id,username:user.username
    },
    process.env.JWT_SECRET,{expiresIn:"1d"}
)
res.cookie ("token",token)

res.status(201).json({
    message:"User registered successfully",
    user:{
        id:user._id,
        username:user.userrname,
        email:user.email
    }
})
}

async function loginUserController(req, res) {
    const { email, password } = req.body

    

    const user = await userModel.findOne({ email })
    

     


   

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log("Password match result:", isPasswordValid) 

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
         token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}




module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    googleLoginController,
}