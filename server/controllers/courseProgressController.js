
const SubSection =require("../models/subSection");
const CourseProgress=require("../models/courseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body
  const userId = req.user.id

  console.log("course Id:", courseId)
  console.log("user id:", userId)
  console.log("subsection id:", subSectionId)

  try {
    // Check if the subsection exists
    const subsection = await SubSection.findById(subSectionId)

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection",
      })
    }

    // Find the course progress of this user
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    // Course progress does not exist
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress does not exist",
      })
    }

    // Check if lecture is already completed
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Subsection already completed",
      })
    }

    // Add subsection to completed lectures
    courseProgress.completedVideos.push(subSectionId)

    // Save progress
    await courseProgress.save()

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
    })

  } catch (error) {

    console.error(
      "Error while updating course progress:",
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    })
  }
}