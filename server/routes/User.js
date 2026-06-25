const express=require('express');
const { sendOTP, signUp, login, changePassword } = require('../controllers/auth');
const { auth, isStudent,isAdmin,isInstructor } = require('../middlewares/auth');
const router=express.Router();


router.post('/sendOTP', sendOTP);
router.post('/signup',signUp);
router.post('/login',login);

router.post('/auth/isStudent',auth,isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"welcome student"
    })
});

router.post('/auth/isAdmin',auth,isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"welcome Admin"
    })
});

router.post('/changePassword',auth,changePassword);
module.exports=router;