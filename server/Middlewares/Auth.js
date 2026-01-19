const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

// auth 
exports.auth = async (req, res, next) => {
  try {
    // fetch token 
   const token = req.body?.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    //   validate 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please login again to proceed.",
      });
    }
// verify token 
    try {
      const payload = jwt.verify(token, secret);
      req.user = payload; 
      next(); 
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error during authentication.",
      error: error.message,
    });
  }
};

// is Admin
exports.is_admin= async(req,res ,next)=>{
    try{
    // fetch payload 
    const role= req.user.role;
    // validate 
    if(role!=="Admin"){
        return res.status(401).json({
            success:false,
            data:"Unable to proceed further ",
            messege:"This page is only acscessble by ADMIN try again with different account"
        })
    }
    // move to next middleware 
    next()
}
 catch (error) {
    return res.status(500).json({
      success: false,
      data:`${error}`,
      message: "Error during Admin verification !.",
    });
  }
};

// is Admin
exports.is_user= async(req,res ,next)=>{
    try{
    // fetch payload 
    const role= req.user.role;
    // validate 
    if(role!=="User"){
        return res.status(401).json({
            success:false,
            data:"Unable to proceed further ",
            messege:"This page is only acscessble by logged in USERS, try again with different account"
        })
    }
    // move to next middleware 
    next()
}
 catch (error) {
    return res.status(500).json({
      success: false,
      data:`${error}`,
      message: "Error during Admin verification !.",
    });
  }
};
