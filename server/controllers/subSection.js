
const Section=require('../models/section');
const subSection = require('../models/subSection');
const SubSection=require('../models/subSection');
require('dotenv').config();
const {uploadFileToCloudinary}=require('../utils/FileUpload');

exports.createSubSection=async(req,res)=>{
    try{

        const {title,timeDuration,description,sectionId}=req.body;
        const video=req.files.videoFile;

        if(!title||!timeDuration||!description||! video||!sectionId){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            });
        }

        const uploadDetails=await uploadFileToCloudinary(video,process.env.FOLDER_NAME);

        const SubSectionDetails=await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:uploadDetails.secure_url
        });

        const updateSection=await Section.findByIdAndUpdate(
            sectionId,
            {$push:{subSection:SubSectionDetails._id}},
            {new:true}

        ).populate("subSection").exec();

        return res.status(200).json({
            success:true,
            message:"Sub Section created successfully",
           updateSection,
           SubSectionDetails
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create Sub Section",
            error:err.message
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {

        const { subSectionId, title, description, timeDuration } = req.body;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Sub Section ID is required"
            });
        }

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub Section not found"
            });
        }

        const updateData = {};

        if (title) {
            updateData.title = title;
        }

        if (description) {
            updateData.description = description;
        }

        if (timeDuration) {
            updateData.timeDuration = timeDuration;
        }

        if (req.files && req.files.videoFile) {

            const uploadDetails = await uploadFileToCloudinary(
                req.files.videoFile,
                process.env.FOLDER_NAME
            );

            updateData.videoUrl = uploadDetails.secure_url;
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Sub Section updated successfully",
            data: updatedSubSection
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


exports.deleteSubSection=async(req,res)=>{
    try{

        
        const {subSectionId, sectionId } = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and Sub Section ID are required"
            });
        }

        //Find section first
        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

         //  Check subsection belongs to this section
        const subSectionExistsInSection = section.subSection.some(
            (id) => id.toString() === subSectionId
        );

        if (!subSectionExistsInSection) {
            return res.status(400).json({
                success: false,
                message: "This subsection does not belong to this section"
            });
        }

        //Delete subsection document
        const deletedSubSection=await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "Sub Section not found"
            });
        } 
        
        // Remove subsection ID from section's array
        const updateSection=await Section.findByIdAndUpdate(
            sectionId,
            {$pull:{subSection:deletedSubSection._id}},
            {new:true}

        );


        console.log("updateSection",updateSection);


        return res.status(200).json({
            success:true,
            message:"Sub Section deleted successfully",
            data:{updateSection,
            deletedSubSection}
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to delete Sub Section",
            error:err.message
        })
    }
}