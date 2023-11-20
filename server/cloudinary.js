const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


//cloudinary upload image
const cloudinary_Upload_Img=async(file)=>{
// try {
    const data=await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    })

    return data
// } catch (error) {
//     const err=new Error(error.message);
//     err.status=501;
//     return err
// }
}

module.exports={
    cloudinary_Upload_Img
}