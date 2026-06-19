
const Category=require('../models/Category');

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