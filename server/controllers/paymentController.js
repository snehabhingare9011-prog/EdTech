const Course=require('../models/course');
const {instance}=require('../config/razorpay');
const User=require('../models/user');
const sendMail=require('../utils/mailSender');
const { default: mongoose } = require('mongoose');
const {courseEnrollmentEmail} =require("../mail/templates/courseEnrollmentEmail")
require("dotenv").config();
const crypto=require("crypto");

exports.createPaymentOrder= async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    // 400 → Bad request: courses missing/empty
    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide course IDs",
      });
    }

    let totalAmount = 0;

    for (let course_id of courses) {
      const course = await Course.findById(course_id);

      // 404 → Course doesn't exist
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      // 400 → Request is invalid because already enrolled
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student is already enrolled",
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    // 200 → Successfully created payment order
    return res.status(200).json({
      success: true,
      message: "Payment order created successfully",
      data: paymentResponse,
    });

  } catch (error) {
    console.log("CAPTURE PAYMENT ERROR:", error);

    // 500 → Unexpected server error
    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.verifySignature = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, } = req.body;

    const userId = req.user.id;

    // Validate required fields
   if ( !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || courses.length === 0 ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

    // Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    // Verify signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed",
      });
    }

    // Find all courses
    const courseDetails = await Course.find({
      _id: { $in: courses },
    });

    // Check whether all courses exist
    if (courseDetails.length !== courses.length) {
      return res.status(404).json({
        success: false,
        message: "One or more courses not found",
      });
    }

    // Check if already enrolled
    for (const course of courseDetails) {
      if ( course.studentsEnrolled.some( (studentId) => studentId.toString() === userId.toString() )) {
        return res.status(400).json({
          success: false,
          message: `Already enrolled in ${course.courseName}`,
        });
      }
    }

    // Add student to all courses
    await Course.updateMany(
      {
        _id: { $in: courses },
      },
      {
        $addToSet: {
          studentsEnrolled: userId,
        },
      }
    );

    // Add all courses to user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: {
            $each: courses,
          },
        },
      },
      {
        new: true,
      }
    );

     // 9. Get course names
    const courseNames = courseDetails.map(
      (course) => course.courseName
    );

    // 10. Send ONE email containing all courses
    await sendMail(
      updatedUser.email,
      "Course Enrollment Successful",
      courseEnrollmentEmail(
        courseNames,
        updatedUser.firstName
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified and courses enrolled successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.log("VERIFY SIGNATURE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

