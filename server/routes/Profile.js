const express=require('express');
const router=express.Router();
const {updateProfile,getUserDetails,deleteAccount}=require('../controllers/profile');
const {auth}=require('../middlewares/auth');
const {resetPassword,resetPasswordToken}=require('../controllers/resetPassword');
const {updateDisplayPicture}=require('../controllers/profile');


router.put('/updateProfile',auth, updateProfile);
router.get('/getUserDetails',auth,getUserDetails);
router.post('/resetPassword',resetPassword);
router.post('/resetPasswordToken',resetPasswordToken);
router.delete('/deleteAccount',auth,deleteAccount);

router.put('/updateDisplayPicture',auth,updateDisplayPicture);


module.exports=router;