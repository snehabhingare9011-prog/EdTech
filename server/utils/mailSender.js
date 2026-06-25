
const nodemailer=require('nodemailer');
require('dotenv').config();

const mailSender=async(email, title, body)=>{
    try{

      console.log("email,title,boyd",email,title,body);

        const transporter=nodemailer.createTransport({
          host:process.env.MAIL_HOST,
          auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
          }
        });

        const info= await transporter.sendMail({
             from:"StudyNotion",
             to:email,
             subject:title,
             html:body
        });

        console.log("info",info);
        return info;

    }catch(err){
        console.error("error",err.message);

    }
    
   

}

module.exports=mailSender;