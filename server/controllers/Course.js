
const User=require('../models/user');
const Category=require('../models/Category');
const {uploadFileToCloudinary}=require('../utils/FileUpload');
require('dotenv').config();
const Course=require('../models/course');
require('../models/ratingAndReview')
const Section =require("../models/section");
const SubSection =require("../models/subSection");

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
        })

        await newCourse.populate("category")

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
         console.log("dekhti hun meina",req.body )
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

exports.editCourse=async(req,res)=>{
    try{
        const {courseId}=req.body;
        const course=await Course.findById(courseId);

        console.log("inside the edit re",req.body);

        if(!course){
          return   res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

         // Object containing ONLY the fields sent by frontend
        const updateData = {};

        if(req.body.category!==undefined){

            await Category.findByIdAndUpdate(course.category,{
                $pull:{courses:courseId}
            });

            await Category.findByIdAndUpdate(req.body.category,{
                $addToSet:{courses:courseId}
            })

            updateData.category=req.body.category
        }
        if (req.body.courseName !== undefined) {
            updateData.courseName = req.body.courseName;
        }

        if (req.body.courseDescription !== undefined) {
            updateData.courseDescription = req.body.courseDescription;
        }

        if (req.body.price !== undefined) {
            updateData.price = req.body.price;
        }

        if (req.body.whatYouWillLearn !== undefined) {
            updateData.whatYouWillLearn = req.body.whatYouWillLearn;
        }

        if (req.body.tag !== undefined) {
            updateData.tag = JSON.parse(req.body.tag);
        }

        if (req.body.instructions !== undefined) {
            updateData.instructions = JSON.parse(req.body.instructions);
        }

        if (req.body.status !== undefined) {
            updateData.status = req.body.status;
        }


        // If new image is sent, upload and update it
        if (req.files?.thumbnailImage) {
            const thumbnail = req.files.thumbnailImage;

            const uploadResult = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );

            updateData.thumbnail = uploadResult.secure_url;
        }

         // Update ONLY the fields present in updateData
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: updateData },
            { new: true }
        )
         .populate("category")
        .populate({path:"courseContent",populate:{path:"subSection"}}).exec();

       
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
            });

        } catch (err) {
            console.log("EDIT COURSE ERROR:", err);

            return res.status(500).json({
            success: false,
            message: "Something went wrong while editing course",
            error: err.message,
            });
        }
};



exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({
      instructor: instructorId,
    })
      .populate("category")
      .populate("courseContent")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log("GET INSTRUCTOR COURSES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor courses",
    });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      })
    }

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Get all section IDs of this course
    const sectionIds = course.courseContent;

    // Find all sections
    const sections = await Section.find({
      _id: { $in: sectionIds },
    })

    // Get all subsection IDs
    const subSectionIds = sections.flatMap(
      (section) => section.subSection
    )

    // Delete all subsections
    await SubSection.deleteMany({
      _id: { $in: subSectionIds },
    })

    // Delete all sections
    await Section.deleteMany({
      _id: { $in: sectionIds },
    })

    // Delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.log("DELETE COURSE ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    })
  }
}