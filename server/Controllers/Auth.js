const User = require("../Modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator')
const Profile= require("../Modals/Profile");
const Otp = require("../Modals/Otp");
const send_mail = require("../Utils/mail_send");

const otp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please send email to send otp!",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Please use a different email, user already exists!",
      });
    }

    const generated_otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otp_res = await Otp.create({
      email,
      value: generated_otp,
    });

    const mail_res=await send_mail(email,"Verification Mail",`Otp for sign-up -> ${generated_otp}`);


    if(mail_res){
        console.log("verification Mail send succussfully !");
    }
    return res.status(200).json({
      success: true,
      data: otp_res,
      message: "OTP sent successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data:error,
      message: "Unable to send OTP!",
    });
  }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please pass user email and password!"
            });    
        }

        const foundUser = await User.findOne({ email: email });

        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "User does not exist with the given mail"
            });    
        }

        const pass_match = await bcrypt.compare(password, foundUser.password);
        
        if (!pass_match) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            });    
        }
        
        const payload = {
            email: foundUser.email,
            id: foundUser._id,
            role: foundUser.role,
        };

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: "3d" });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 3600 * 1000), 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user: {
                id: foundUser._id,
                email: foundUser.email,
                user_name: foundUser.user_name
            },
            message: "Login successful!"
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "Error while logging in!"
        });
    }
};
const Logout= async(req,res)=>{
    try{
        res.cookie("token",'',{
            maxAge:0
        })
        res.status(200).json({
            success:true,
            message:"Logout successfull !"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            data:error,
            message:"Error while logging out !"
        })
    }
}
const Signup = async (req, res) => {
    try {
        const { 
            first_name, 
            last_name, 
            email, 
            user_name, 
            password, 
            gender,
            role,
            otp
        } = req.body;

        if (!first_name || !last_name || !email || !user_name || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields"
            });
        }

  
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered. Please login instead."
            });
        }


        const usernameExists = await User.findOne({ user_name });
        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken. Please try another one."
            });
        }

        const recent_otp= await Otp.find({email:email}).sort({created_at:-1}).limit(1);
    console.log("recent_otp : ", recent_otp);
    
    if (recent_otp.length === 0) {
      return res.status(401).json({
        success: false,
        data: "unable to sign_up",
        message: "Otp not found",
      });
    }

    if (recent_otp[0].value !== otp) {
      return res.status(401).json({
        success: false,
        data: "unable to sign_up",
        message: "wrong otp please enter valid otp!",
      });
    }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newProfile = await Profile.create({
            gender:gender||null,
        });

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            user_name,
            password: hashedPassword,
            profile: newProfile._id,
            profile_pic: `https://api.dicebear.com/7.x/initials/svg?seed=${first_name}%20${last_name}`,
            role:role,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: {
                id: newUser._id,
                user_name: newUser.user_name
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            success: false,
            data:error,
            message: "Something went wrong during registration."
        });
    }
};
module.exports = { Login,Signup,otp ,Logout};