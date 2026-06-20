
const otpGenerator=require('otp-generator');
const OTP=require('../models/OTP');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const Profile=require('../models/profile');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.sendOTP=async(req,res)=>{
    try{
        const {email}=req.body;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            })
        }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //This checks whether the email follows the basic format:someText @ someText .someText

       if(!emailRegex.test(email)){  //emailRegex.test(email) checks if the email matches the pattern. return true or false
        return res.status(400).json({
            success:false,
            message:"Invalid email format"
        })
       }

        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(409).json({
                success:false,
                message:"User is already registered"
            })
        }

        let otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        console.log("otp",otp);

        let result=await OTP.findOne({otp:otp});
        console.log("result",result);

        while(result){
            otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
            });

            result=await OTP.findOne({otp:otp});

        }

        const otpPayload={email,otp};
        console.log("otpPayload",otpPayload);

        const otpBody=await OTP.create(otpPayload);
        console.log("otpBody",otpBody);

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


exports.signUp=async(req,res)=>{
    try{
        const { 
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp

        }=req.body;

        if(!firstName||!lastName||!email||!password||!confirmPassword||!accountType||!otp||!contactNumber){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email format"
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match"
            })
        }

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"user is already registered"
            })
        }

        const recentOtp=await OTP.find({otp}).sort({createdAt:-1}).limit(1);
        console.log("recentOtp",recentOtp);
        
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
       

        let hashPassword;
        try{
            hashPassword=await bcrypt.hash(password,10);
        }catch(err){
           return res.status(500).json({
            success:false,
            message:"Error while hashing password"
           })
        }

        const profileDetails=await Profile.create({
            gender:null,
            dateofBirth:null,
            about:null,
            contactNumber:null
        })

        const user=await user.create({
            fistname,
            lastName,
            password:hashPassword,
            email,
            accountType,
            profile:profileDetails._id,
            contactNumber,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success:true,
            message:"user is registered successfully",
            user
        })



    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        //validation
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check email formate
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email format"
            })
        }

        let user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found. Please sign up first"
            })
        }
        
        if(await bcrypt.compare(password,user.password)){

            const payload={
                id:user._id,
                accountType:user.accountType,
                email:user.email
            }
            const token=jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:"5h"
            });

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
                
            }

            res.cookie("token",token,options).json({
                success:true,
                message:"User logged in successfully",
                token,
                user,

            });

        }
        else{
            // 401 Unauthorized = authentication failed (Wrong password is an authentication issue.)
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.changePassword=async(req,res)=>{
    try{
       const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.user.id,{ password: hashedPassword} );

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}