
const Tag=require('../models/tags');

exports.createTag=async(req,res)=>{
    try{
        //fetch Data 
        const {name,description}=req.body;
        //validation
        if(!name||!description){
            return res.satus(400).json({
                success:false,
                message:"All fields are Required"
            })
        }
        //create entry in DB
        const tagDetails=await Tag.create({name,description});
        console.log("tagDetails",tagDetails);

        return res.status(200).json({
            success:true,
            message:"Tag created succcessfully",
            tagDetails
        })

    }catch(Error){
        return res.status(500).json({
            success:false,
            message:Error.message
        })
    }

}

exports.showAllTags=async(req , res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true});

        
        return res.status(200).json({
            success:true,
            message:"All Tags Return Successfully",
            allTags
        })

    }catch(Error){
         return res.status(500).json({
            success:false,
            message:Error.message
        })

    }
}