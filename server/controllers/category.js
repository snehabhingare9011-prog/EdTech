
const Category=require('../models/Category');
const Course=require('../models/course');


exports.createCategory=async(req,res)=>{
    try{
        //fetch Data 
        const {name,description}=req.body;

        //validation
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"All fields are Required"
            })
        }

        //create entry in DB
        const CategoryDetails=await Category.create({name,description});
        console.log("CategoryDetails",CategoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created succcessfully",
            CategoryDetails
        })

    }catch(Error){
        return res.status(500).json({
            success:false,
            message:Error.message
        })
    }

}

exports.showAllCategorys=async(req , res)=>{
    try{
        const allCategorys=await Category.find({},{name:true,description:true});

        
        return res.status(200).json({
            success:true,
            message:"All Categorys Return Successfully",
            allCategorys
        })

    }catch(Error){
         return res.status(500).json({
            success:false,
            message:Error.message
        })

    }
}

exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryId}= req.body;

        if(!categoryId){
            return res.status(400).json({
                success:false,
                mesage:"Category ID is required"
            })
        }

        //get courses for specified category
        const selectedCategory=await Category.findById(categoryId)
        .populate("courses").exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category Not Found"
            })
        }
        // Handle the case when there are no courses

        if(selectedCategory.courses.length===0){
            return res.satus(404).json({
                success:false,
                message:"No courses found for the selected category."
            })
        }

        //get courses for diffrent categories
        const differentCategory=await Category.find({
            _id:{$ne:categoryId}
        }).populate("courses").exec();

        //TODO: got top 10 selling courses

        const topSellingCourses=await Course.find({status:"Published"});
        topSellingCourses.sort((a,b)=>b.studentEnrolled.length-a.studentEnrolled.length);
        const top10Courses=topSellingCourses.slice(0,10);

        //return responce
        return res.status(200).json({
            success:true,
            message:"Category page details fetched successfully",
            data:{
                selectedCategory,
                diffrentCategory,
                top10Courses

            }
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}