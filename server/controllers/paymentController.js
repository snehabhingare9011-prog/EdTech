
const Course=require('../models/course');
const {instance}=require('../config/razorpay');
const User=require('../models/user');
const sendMail=require('../utils/mailSender');

exports.createOrder= async(req, res)=>{
    try{

        const {courseId}=req.body;
        const userId=req.user.id;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course Id is required"
            })
        };

        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not Found"
            })
        }
        
        // Check Enrollment
        const isEnrolled=course.studentsEnrolled.some((studentId) => studentId.toString()=== userId );

        if(isEnrolled){
            return res.status(409).json({
                success:false,
                message:"You are already enrolled in this course"
            })
        };


         // Create Razorpay Order
        const orderOptions={
            amount:course.price*100,
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
            notes:{
                courseId,
                userId
            }

        };

        const order =await instance.orders.create(orderOptions);

        res.status(200).json({
            success:true,
            message:"Order created Successfully",
            data:{
                orderId:order.id,
                amount:order.amount,
                currency:order.currency,
                courseName:course.courseName,
                courseDescription: course.courseDescription,
                courseThumbnail:course.thumbnail
            }
        });



    }catch(err){
        console.error("Order Creation Error:", err);
        return res.status(500).json({
            success:false,
            message:"Failed to create payment order"
        });
    }

};

exports.verifySignature=async(req,res)=>{
    try{
        const webhookSecret=process.env.WEBHOOK_SECRET;
        const signature=req.headers["x-razorpay-signature"];

        if(!signature){
            return res.status(400).json({
                success:false,
                message:"Razorpay signature is missing"
            });
        }

        const shasum=crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest=shasum.digest('hex');

        if(digest!==signature){
            return res.status(400).json({
                success:false,
                message:"Invalid Razorpay signature"
            })
        }

       const { userId, courseId } = req.body.payload.payment.entity.notes;

        // Add Student to Course
       await Course.findByIdAndUpdate(courseId,
        {$push:{studentsEnrolled:userId}},
        {new:true}
       );
       
       // Add Course to User
       const updatedUser= await User.findByIdAndUpdate(userId,
        {$push:{courses:courseId}},
        {new:true}
       );

       // Send Email
        await sendMail(
            updatedUser.email,
            "Course Enrollment Successful",
            "Congratulations! You have been enrolled successfully."
        );

         return res.status(200).json({
            success: true,
            message: "Payment verified and student enrolled successfully"
        });



    }catch(error){
         return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}