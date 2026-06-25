
const Profile=require('../models/profile');
const User=require('../models/user');
const Course=require('../models/course');
require("dotenv").config();
const {uploadFileToCloudinary}=require('../utils/FileUpload');


// ❓🙋‍♂️ /^[6-9]\d{9}$/ ❓🙋‍♂️
// ^ → start of number
// [6-9] → first digit must be 6, 7, 8, or 9
// \d{9} → after that, exactly 9 digits
// $ → end of number

exports.updateProfile=async(req,res)=>{
    try{
        //fetchData
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        const userId=req.user.id;

        console.log("gender,dateOfBirth,contactNumber,about,userId",gender,dateOfBirth,contactNumber,about,userId)

        //validation
        if(!userId||!gender||!contactNumber){
            return res.status(400).json({
                success:false,
                message:"Required All Fields"
            });
        }

        //validate the mobile number
		const phoneRegex = /^[6-9]\d{9}$/;
        if(!phoneRegex.test(String(contactNumber))){
			return res.status(400).json({
				success:false,
				message:"Enter a valid 10-digit mobile number"
			})
		}

        const userDetails=await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const profileId=userDetails.additionalDetails;

        const profileDetails=await Profile.findById(profileId);

        if(!profileDetails){
            return res.status(404).json({
                success:false,
                message:"Profile not found"
            });
        }

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        profileDetails.about=about;

        await profileDetails.save(); //On calling save(), mongoDB detects which fields were changed and generates an update query only for those modified fields, instead of updating the entire document. ✅

          

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to update Profile",
            error:err.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        userDetails.isDeleted = true;

        userDetails.deletedAt = new Date(
            Date.now() + 3* 24* 60* 60 * 1000
        );

        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Account scheduled for deletion after 3 days"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.getUserDetails = async (req, res) => {
    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate("additionalDetails");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: userDetails
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

//updateDisplayPicture
exports.updateDisplayPicture=async(req,res)=>{
    try{
       const displayPicture = req.files?.displayPicture;
        const userId = req.user.id;

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture is required"
            });
        }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
       const uploadDetails = await uploadFileToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            
        );
        console.log("uploadDetails",uploadDetails);

        const updatedUser=await User.findByIdAndUpdate(userId,
            {
                image:uploadDetails.secure_url
            },
            {new:true}
        )
        console.log("updatedUser",updatedUser);

       return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: updatedUser
        });

    }catch(err){

        return res.status(500).json({
            success: false,
            message: err.message
        });


    }
}