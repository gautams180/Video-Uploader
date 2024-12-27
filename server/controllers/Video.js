const Video = require("../models/Video");
const cloudinary = require("cloudinary").v2;

uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = {folder};
    //for compression
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.UploadVideo = async(req, res) => {
    try {

        console.log("Entered UploadVideo");
        const {title, description} = req.body;
        const {thumbnail, video} = req.files;

        

        if( !title || !description || !thumbnail || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //upload video and thumbnail file to cloudinary

        const uploadThumbnailDetails = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const uploadVideoDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create a new entry
        const newVideo = await Video.create({
            title: title,
            description: description,
            thumbnailUrl: uploadThumbnailDetails.secure_url,
            videoUrl: uploadVideoDetails.secure_url,
        });

        console.log("New video uploaded", newVideo);

        return res.status(200).json({
            success:true,
            message:"Video uploaded successfully",
            data: newVideo
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}

exports.getVideos = async (req,res) => {
    try {
        const videos = await Video.find();
        console.log("Videos", videos);

        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            videos
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}