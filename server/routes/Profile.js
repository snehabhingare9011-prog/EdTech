const express=require('express');
const router=express.Router();
const {updateProfile,getUserDetails,deleteAccount, getEnrolledCourses}=require('../controllers/profile');
const {auth,isInstructor}=require('../middlewares/auth');
const {resetPassword,resetPasswordToken}=require('../controllers/resetPassword');
const {updateDisplayPicture}=require('../controllers/profile');
const {instructorDashboard} =require("../controllers/profile")

router.put('/updateProfile',auth, updateProfile);
router.get('/getUserDetails',auth,getUserDetails);
router.post('/resetPassword',resetPassword);
router.post('/resetPasswordToken',resetPasswordToken);
router.delete('/deleteAccount',auth,deleteAccount);
router.put('/updateDisplayPicture',auth,updateDisplayPicture);

router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports=router;