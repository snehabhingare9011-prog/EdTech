
const otpGenerator=require('otp-generator');
const OTP=require('../models/OTP');
const User=require('../models/user');

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