const mongoose=require('mogoose');
const mailSender = require('../utils/mailSender');

const OTPSchema=new mongoose.Schema({

    email:{
        type:String
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//a function ==> to send emails
async function sendVerificationEmail(email,otp){
    try{
        const mailResponce=await mailSender(email,"Verification Email From StudyNotion",otp);
        console.log("Email Sent Successfully",mailResponce);

    }catch(err){
        console.log("error occured while sending mails",err);
        throw err;
    }
}

OTPSchema.pre('save',async function(next){
     try{
        await sendVerificationEmail(this.email, this.otp);  //Inside a Mongoose pre-save middleware, this keyword  refers to the document being saved. Therefore this.email and this.otp come from the fields of the current OTP document."
        next();
    }
    catch(err){
        console.log(err);
    }
})

module.exports=mongoose.model('OTP',OTPSchema);