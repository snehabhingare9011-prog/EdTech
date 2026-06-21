const cron = require("node-cron");
const User = require("../models/user");
const Profile = require("../models/profile");
const Course = require("../models/course");

cron.schedule("0 0 * * *", async () => {
    try {
        
        // Find all users whose account is marked for deletion and whose deletion date has arrived (or already passed).
        const usersToDelete = await User.find({
            isDeleted: true,
            deletedAt: { $lte: new Date() }
        });
        
        // TODO: Find all courses where the user is enrolled and remove the user ID from Course's studentEnrolled Array: :Completed ✅
        for (const user of usersToDelete) {

            await Course.updateMany(
                {
                    studentsEnrolled: user._id
                },
                {
                    $pull: {
                        studentsEnrolled: user._id
                    }
                }
            );
            
            //user profile deleted
            await Profile.findByIdAndDelete(
                user.additionalDetails
            );

            //user Account is deleted
            await User.findByIdAndDelete(
                user._id
            );
        }

        console.log("Scheduled account cleanup completed");

    } catch (err) {

        console.log(err);

    }
});