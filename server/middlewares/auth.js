const jwt=require('jsonwebtoken');

exports.auth=async(req,res,next)=>{
    try{
        const token=req.header("Authorization")?.replace("Bearer ","")||req.cookies.token||req.body?.token;
        console.log("header",req.header("Authorization")?.replace("Bearer ",""));
        console.log("cookie",req.cookies.token);
        // console.log("body",req.body.token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        try{
             const payload= jwt.verify(token,process.env.SECRET_KEY);
             console.log("payload",payload);
             req.user=payload;
             next();

         }catch(Err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })

         }
       


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for students"
            })
        }

        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for Instructors"
            })
        }

        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"This is protected route for Admins"
            })
        }

        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}