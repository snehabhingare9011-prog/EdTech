const Section=require('../models/section');
const Course=require('../models/course');
const course = require('../models/course');

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

        const updateCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {$push:{courseContent:newSection._id}},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updateCourseDetails
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create Section",
            error:err.message
        })

    }
}

exports.updateSection=async(req ,res)=>{
    try{
        const {sectionName,sectionId}=req.body;

        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        const section=await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Section Updated successfully"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to update Section"
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId,courseId}=req.body;

         if(!courseId||!sectionId){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }

        const sectionDeleted=await Section.findByIdAndDelete(sectionId);

        const updateCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {$pull:{courseContent:sectionDeleted._id}},
            {new:true}

        );

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            updateCourseDetails
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to delete section",
            error:err.message
        })
    }
}