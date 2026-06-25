
const User=require('../models/user');
const Category=require('../models/Category');
const {uploadFileToCloudinary}=require('../utils/FileUpload');
require('dotenv').config();
const Course=require('../models/course');
require('../models/ratingAndReview')

exports.createCourse=async(req,res)=>{
    try{
        // Get user ID from request object
		const userId = req.user.id;

        let { courseName,
            courseDescription,
            category,
            price,
            whatYouWillLearn,
            tag,status }=req.body;

        const thumbnail=req.files?.thumbnailImage;

        console.log("dekhte hai bhai",courseName,
            courseDescription,
            category,
            price,
            whatYouWillLearn,
            tag);

            console.log("req.body",req.body);

        if(!courseName||!courseDescription||!category||!whatYouWillLearn||!price||!thumbnail||!tag){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

		// Check if the user is an instructor
	    const instructorDetails = await User.findOne({
            _id:userId,
            accountType:"Instructor"
        });
        
        console.log("instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            });
        }
        
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found"
            })
        }

        const thumbnailImageUrl=await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log("coudinary responce",thumbnailImageUrl);

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail:thumbnailImageUrl.secure_url,
            category:categoryDetails._id,
            tag

        })

       const updatedUser = await User.findByIdAndUpdate(userId,{$push:{courses:newCourse._id}},{new:true});
        console.log("user",updatedUser);

        const updatedCategory=await Category.findByIdAndUpdate(category,{$push:{courses:newCourse._id}},{returnDocument:'after'});
        console.log("category",updatedCategory);

       return res.status(201).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
            updatedCategory,
            updatedUser
})


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:err.message
        })
    }
}


exports.showAllCourses=async(req , res)=>{
    try{
        const allCourses=await Course.find({});

        return res.status(200).json({
            success:true,
            message:"all courses fetch Successfully",
            data:allCourses
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch all courses",
            error:err.message
        })
    }
}


exports.getCourseDetails=async(req,res)=>{
    try{
         const { courseId }=req.body;
         if(!courseId){
            return res.status(400).json({
                success:false,
                message: "Course ID is required"
            })
         }

         const courseDetails=await Course.findById(courseId)
         .populate({path:"instructor",populate:{path:"additionalDetails"}})
         .populate("ratingAndReviews")
         .populate("category")
         .populate("studentsEnrolled")
         .populate({path:"courseContent",populate:{path:"subSection"}}).exec();

         if(!courseDetails){
            return res.status(404).json({
                success:false,message:"Course not found"
            })
         }

         return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails
         })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}