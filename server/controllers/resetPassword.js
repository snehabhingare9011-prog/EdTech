
const mailSender=require('../utils/mailSender');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const crypto = require("crypto");
const {passwordResetToken}=require("../mail/templates/passwordResetToken");
const { passwordUpdatedSuccess } = require('../mail/templates/passwordUpdatedSuccess');


exports.resetPasswordToken=async(req,res)=>{
    console.log("dekhte hai bahi",req.body);
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        console.log("user",user);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const token=crypto.randomUUID();
        console.log("token",token);

        const updatedDetails=await User.findOneAndUpdate(
            {email},
            {token:token, resetPasswordExpires:Date.now()+3*60*1000 },
            {new :true}
        );
        
        console.log("updatedUser",updatedDetails);

        const url=`http://localhost:5173/update-password/${token}`;

       const mailResponse = await mailSender(
            email,
            "Reset Your Password",
            passwordResetToken(url)
        );

        // console.log("mailResponce",mailResponce);

        return res.status(200).json({
            success:true,
            message:"Password reset link sent successfully through email"
        })

    }catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        });

    }


}

exports.resetPassword=async(req, res)=>{
    try{
        const {password,confirmPassword,token}=req.body;

        console.log("aataa thet backend",req.body);

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match"
            });
        }

        const user=await User.findOne({token});
        console.log("user sapdla ka",user)

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });
        }
        
        //token time check
        if(user.resetPasswordExpires<Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token has expired. Please generate a new token"
            });
        }

        const hashPassword=await bcrypt.hash(password,10);
       
        const updatedUser =  await User.findOneAndUpdate({token},{password:hashPassword, token: undefined,
        resetPasswordExpires: undefined},{new:true}); // token: undefined,resetPasswordExpires: undefinedOtherwise the same token could potentially be reused until expiry.

        await mailSender(
            updatedUser.email,
            "Password Updated Successfully",
            passwordUpdatedSuccess(updatedUser.email, updatedUser.firstName)
        );
        
        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
            email: user.email
        });

    }catch(err){
         return res.status(500).json({
            success:false,
            message:err.message
        });

    }
}

// the token helps the server identify: "Which user requested the password reset?"