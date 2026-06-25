const cloudinary=require('cloudinary').v2;

exports.uploadFileToCloudinary= async function (file,folder,height,quality){

    let options={
        folder:folder,
        resource_type:"auto"
    };

    if(height){
        options.height=height;
    }

    if(quality){
        options.quality=quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath,options);

};

