const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { CloudinaryStorage ,v2} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "raushanraj", // ✅ Use string
    api_key: "662612333428276", // ✅ Use string
    api_secret: "U3F9PigWvnLUVKO9gONTFeDMyw" // ✅ Use string
});

const storage =new CloudinaryStorage ({
    cloudinary:cloudinary,
    params:{
        folder:"travales",
        allowerdformat:["pnj","jpg"," jpeg"]
    }
})
module.exports={cloudinary,storage}