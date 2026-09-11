const Section=require('../models/section');
const Course=require('../models/course');
const course = require('../models/course');
const SubSection = require('../models/subSection');
require("../models/subSection");

exports.createSection=async(req,res)=>{
    try{

        const {sectionName,courseId}=req.body;

        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        const newSection=await Section.create({sectionName});
 
        /// TODO:How can i populate both section and subSection : Completed ✅
        const updateCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {$push:{courseContent:newSection._id}},
            {new:true}
        ).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updateCourseDetails,
            newSection
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create Section",
            error:err.message
        })

    }
}

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    console.log("req body",req.body)

    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Section Updated successfully",
      data: updatedCourse,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to update Section",
    });
  }
};


exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!courseId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Course ID and Section ID are required"
            });
        }

        // 1. Find the section
        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        // 2. Find the course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // 3. Check this section belongs to this course
        const sectionExistsInCourse = course.courseContent.some(
            (id) => id.toString() === sectionId
        );

        if (!sectionExistsInCourse) {
            return res.status(400).json({
                success: false,
                message: "This section does not belong to this course"
            });
        }

        // 4. Delete all subsections inside this section
        await SubSection.deleteMany({
            _id: { $in: section.subSection }
        });

        // 5. Remove section ID from course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            {
                returnDocument: "after"
            }
        ) .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        });

        // 6. Delete section document last
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: "Section and its subsections deleted successfully",
            data: updatedCourseDetails
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete section",
            error: err.message
        });
    }
};