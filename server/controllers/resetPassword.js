
const mailSender=require('../utils/mailSender');
const User=require('../models/user');
const bcrypt=require('bcrypt');

exports.resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const token=crypto.randomUUID();

        const updatedDetails=await User.findOneAndUpdate(
            {email},
            {token:token, resetPasswordExpires:Date.now()+3*60*1000 },
            {new :true}
        );


        const url=`http://localhost:3000/update-password/${token}`

        await mailSender(email,"Password Reset Link",`password Reset Line:${url}`)

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

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match"
            });
        }

        const user=await User.findOne({token});

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
            })
        }

        const hashPassword=await bcrypt.hash(password,10);
       
        await User.findOneAndUpdate({token},{password:hashPassword, token: undefined,
        resetPasswordExpires: undefined},{new:true}); // token: undefined,resetPasswordExpires: undefinedOtherwise the same token could potentially be reused until expiry.

        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        });

    }catch(err){
         return res.status(500).json({
            success:false,
            message:err.message
        });

    }
}

// the token helps the server identify: "Which user requested the password reset?"