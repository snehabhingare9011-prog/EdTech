
const User=require('../models/user');
const Category=require('../models/Category');
const {uploadImageToCloudinary}=require('../utils/imageUpload');
require('dotenv').config();
const Course=require('../models/course');

exports.createCourse=async(req,res)=>{
    try{
        const {courseName,courseDescription,category,price,whatYouWillLearn,tag}=req.body;

        const thumbnail=req.files?.thumbnailImage;

        if(!courseName||!courseDescription||!category||!whatYouWillLearn||!price||!thumbnail||!tag){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("instructor Details",instructorDetails);
        //TODO:verify that user.id and instructorDetails._id are same or not 

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        const categoryDetails=await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found"
            })
        }

        const thumbnailImageUrl=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail:thumbnailImageUrl.secure_url,
            category:categoryDetails._id,
            tag

        })

        await User.findByIdAndUpdate(userId,{$push:{courses:newCourse._id}},{new:true});

        await Category.findByIdAndUpdate(category,{$push:{courses:newCourse._id}},{new:true});

       return res.status(201).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
})


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:err.message
        })
    }
}


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