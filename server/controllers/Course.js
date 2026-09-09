
const User=require('../models/user');
const Category=require('../models/Category');
const {uploadFileToCloudinary}=require('../utils/FileUpload');
require('dotenv').config();
const Course=require('../models/course');
require('../models/ratingAndReview')

exports.createCourse = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        let { courseName, courseDescription, category, price, whatYouWillLearn, tag: _tag, status, instructions: _instructions, } = req.body;

        const thumbnail = req.files?.thumbnailImage;

        console.log( "Course Details:", courseName, courseDescription, category, price, whatYouWillLearn, _tag, _instructions );

        console.log("req.body:", req.body);

        // Validation
        if ( !courseName || !courseDescription || !category || !whatYouWillLearn || !price || !thumbnail || !_tag || !_instructions ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Convert JSON strings back into arrays
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        // Validate arrays
        if ( !Array.isArray(tag) || !Array.isArray(instructions) || tag.length === 0 || instructions.length === 0 ) {
            return res.status(400).json({
                success: false,
                message: "Tags and requirements are required",
            });
        }

        // Set default status
        if (!status) {
            status = "Draft";
        }

        // Check if user is an instructor
        const instructorDetails = await User.findOne({
            _id: userId,
            accountType: "Instructor",
        });

        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        // Find category
        const categoryDetails = await Category.findById(category);

        console.log("Category Details:", categoryDetails);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        // Upload thumbnail to Cloudinary
        const thumbnailImageUrl = await uploadFileToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        console.log("Cloudinary Response:", thumbnailImageUrl);

        // Create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            courseContent: [],
            ratingAndReviews: [],
            price,
            thumbnail: thumbnailImageUrl.secure_url,
            studentsEnrolled: [],
            category: categoryDetails._id,
            tag,
            status,
            instructions,
        });

        // Add course to instructor
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {
                new: true,
            }
        );

        console.log("Updated User:", updatedUser);

        // Add course to category
        const updatedCategory = await Category.findByIdAndUpdate(
            category,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {
                new: true,
            }
        );

        console.log("Updated Category:", updatedCategory);

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });

    } catch (err) {
        console.log("Error in course creation:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
};


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