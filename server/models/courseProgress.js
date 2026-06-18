const mongoose=require('mogoose');

const courseProgress=new mongoose.Schema({

   courseID:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"Course"
    },

    completedVideos:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:"SubSection",
    }]

});

module.exports=mongoose.model('courseProgress',courseProgress);