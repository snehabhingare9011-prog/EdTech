
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
        });

    }catch(Error){
        return res.status(500).json({
            success:false,
            message:Error.message
        })
    }

}

exports.showallCategories=async(req , res)=>{
    try{
        // const allCategories=await Category.find({},{description:false}); This returns all fields except description.
        // const allCategories=await Category.find({},{name:true}); //This return only name and _id fields
        // const allCategories=await Category.find({},{name:true,_id:false}); //This return only name not _id .
        // const allCategories=await Category.find({},{name:true,description:false}); //Error


       const allCategories=await Category.find({},{name:true,description:true});

        
        return res.status(200).json({
            success:true,
            message:"All allCategories Return Successfully",
           allCategories
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
                message:"Category ID is required"
            })
        }

        //// Get selected category and its courses
         const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                // match: { status: "Published" }
            })
            .exec();
            

        console.log("selectedCategory",selectedCategory);

        // Handle the case when the category is not found
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category Not Found"
            })
        }

        // Handle the case when there are no courses
        if(selectedCategory.courses.length===0){
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category."
            })
        }

     
      // Get other categories and their published courses
        const differentCategory = await Category.find({
            _id: { $ne: categoryId }
        })
        .populate({
            path: "courses",
             match: { status: "Published" }
        })
        .exec();
       


        // //TODO: got top 10 selling courses
        // const topSellingCourses=await Course.find({status:"Published"});
        // topSellingCourses.sort((a,b)=>b.studentsEnrolled.length-a.studentsEnrolled.length);
        // const top10Courses=topSellingCourses.slice(0,10);

        // Another Way to Get 10 selling courses

        const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
			.slice(0, 10);


        //return responce
        return res.status(200).json({
            success:true,
            message:"Category page details fetched successfully",
            data:{
                selectedCategory,
                differentCategory,
                // top10Courses
                mostSellingCourses
            }
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
