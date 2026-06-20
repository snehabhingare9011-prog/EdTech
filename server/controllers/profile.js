
const Profile=require('../models/profile');
const User=require('../models/user');
const Course=require('../models/course');

exports.updateProfile=async(req,res)=>{
    try{
        //fetchData
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        const userId=req.user.id;

        //validation
        if(!userId||!gender||!contactNumber){
            return res.status(400).json({
                success:false,
                message:"Required All Fields"
            });
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
            Date.now() + 3 * 24 * 60 * 60 * 1000
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