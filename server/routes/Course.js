const express=require('express');
const { auth,isAdmin,isInstructor,isStudent } = require('../middlewares/auth');
const { createCategory,showallCategories,categoryPageDetails } = require('../controllers/category');
const { createCourse,getCourseDetails,showAllCourses, editCourse, getInstructorCourses, deleteCourse } = require('../controllers/Course');
const {createSection,updateSection,deleteSection}=require('../controllers/section');
const {createSubSection,updateSubSection,deleteSubSection}=require('../controllers/subSection');
const {createRating, getAverageRating ,getAllRating}=require("../controllers/RatingAndReviewController");


const router=express.Router();

router.post("/createCategory",auth,isAdmin,createCategory);
router.get('/showallCategories',showallCategories);
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/categoryPageDetails',categoryPageDetails)
router.delete("/deleteCourse",deleteCourse);
router.put('/editCourse',editCourse);

router.post('/createSection',createSection);
router.delete('/deleteSection',deleteSection);
router.put('/updateSection',updateSection);


router.post('/createSubSection',createSubSection);
router.delete('/deleteSubSection',deleteSubSection);
router.put('/updateSubSection',updateSubSection);

router.post('/getCourseDetails',getCourseDetails);
router.get('/showAllCourses',showAllCourses)

router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get("/getAllRating",getAllRating)

router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)





module.exports=router;