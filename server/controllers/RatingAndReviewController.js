const Course=require('../models/course');
const User=require('../models/user');
const RatingAndReview=require('../models/ratingAndReview');
const mongoose=require('mongoose')

exports.createRating=async (req,res)=>{
    try{

        let userId=req.user.id;
        const {rating,review,courseId}=req.body;


        if(!rating||!review||!courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        
        //check if user already enrolled or not ( Use these code for just testing and later on when you enrolled students then use below code )

        // const courseDetails = await Course.findById(courseId);

        // const isEnrolled = courseDetails.studentsEnrolled.some(
        //     (studentId) => studentId.toString() === userId
        // );

        // console.log("isEnrolled:", isEnrolled);
        // console.log("courseDetails:", courseDetails);

        // if(!isEnrolled){
        //      return res.status(403).json({
        //         success:false,
        //         message:"You must be enrolled in the course to submit a review"
        //     });
        // }


        // userId=new mongoose.Types.ObjectId(userId); // no neeed because find() functions automatically convert it into objectId  (findOne() automatically converts userId string to an ObjectId because Mongoose sees the schema typeSo Mongoose automatically casts:"userId as string"==>ObjectId("userId") before sending the query to MongoDB.)

        // const courseDetails= await Course.findOne({
        //     _id:courseId,
        //      studentsEnrolled:{
        //         $elemMatch:{
        //             $eq:userId
        //         }
        //     }
        // });

        //  OR

        // const courseDetails = await Course.findOne({
        //      _id: courseId,
        //       studentsEnrolled: userId
        // });

        console.log("courseDetails",courseDetails)
       
        if(!courseDetails){
             return res.status(403).json({
                success:false,
                message:"You must be enrolled in the course to submit a review"
            })
        }
        
        //check if student already reviewed the course
        const alreadyReviewed=await RatingAndReview.findOne(
            {
                course:courseId,
                user:userId
            }
        );

        if(alreadyReviewed){
            return res.status(409).json({
                success:false,
                message:"You have already reviewed this course"
            });
        }
      
        
        //create review and rating
        const newReview =await RatingAndReview.create({
            user:userId,
            rating,
            review,
            course:courseId
        });

          // Add review to course
        const updatedCourse=await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:newReview._id
                }
            },
            {new:true}
        ).populate("ratingAndReviews");

       
        //send responce
        return res.status(200).json({
            success:true,
            message:"Review submitted successfully",
            updatedCourse
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAverageRating=async (req,res)=>{
    try{
        let {courseId} =req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course ID is required"
            })
        }
  
        courseId=new mongoose.Types.ObjectId(courseId); // aggregation pipelines do not automatically cast values using the Mongoose schema, so I manually convert courseId to ObjectId before using it in $match.

        const result=await RatingAndReview.aggregate([
            {
                $match: {
                    course: courseId
                }     
            },
            {
                $group:{
                    _id:null,
                    averageRating: {
                        $avg:"$rating"
                    }
                }
            }
        ]);

        console.log("result",result);

        if(result.length===0){
            return res.status(200).json({
                success:true,
                message:"No ratings found for this course",
                averageRating:0

            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating fetched successfully",
            averageRating:result[0].averageRating
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllRating=async(req,res)=>{
    try{

         const allReviews = await RatingAndReview.find({}) // sort({ rating:-1 }) ==> Highest ratings come first.
            .sort({ rating:-1 })
            .populate({
                path:"user",
                select:"firstName lastName email image"
            })
            .populate({
                path:"course",
                select:"courseName"
            }).exec();

    
        return res.status(200).json({
            success: true,
            message: "All Reviews fetched successfully",
            data: allReviews
        });

        

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
}