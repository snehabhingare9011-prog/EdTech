
const Section=require('../models/section');
const subSection = require('../models/subSection');
const SubSection=require('../models/subSection');
require('dotenv').config();
const {uploadFileToCloudinary}=require('../utils/FileUpload');

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body

    if (!sectionId || !title || !description || !req.files?.video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const video = req.files.video

    // Upload video to Cloudinary
    const uploadResult = await uploadFileToCloudinary(
      video,
      process.env.FOLDER_NAME
    )

    // Create subsection
    const subSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadResult.secure_url,
    })

    // Add subsection to section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSection._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to create SubSection",
    })
  }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description, } = req.body

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and SubSection ID are required",
      })
    }

    const updateData = {}

    if (title !== undefined) {
      updateData.title = title
    }

    if (description !== undefined) {
      updateData.description = description
    }

    // If new video is uploaded
    if (req.files?.video) {
      const video = req.files.video

      const uploadResult = await uploadFileToCloudinary(
        video,
        process.env.FOLDER_NAME
      )

      updateData.videoUrl = uploadResult.secure_url
    }

    const updatedSubSection =
      await SubSection.findByIdAndUpdate(
        subSectionId,
        { $set: updateData },
        { new: true }
      )

    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection,
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to update SubSection",
    })
  }
}


exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Section ID are required",
      })
    };


    // Remove subsection ID from Section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    ).populate("subSection");

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }

    // Delete subsection document
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to delete SubSection",
    })
  }
}