// const cloudinary = require('cloudinary').v2;

// require('dotenv').config();
// cloudinary.config({
//     cloud_name: "raushanraj", 
//     api_key: "662612333428276",
//     api_secret: "U3F9PigWvnLUVKO9gONTFeDMyw" 
// });
// module.exports = cloudinary;

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: "raushanraj", 
    api_key: "662612333428276",
    api_secret: "U3F9PigWvnLUVKO9gONTFeDMyw" 
});

module.exports = cloudinary;



 // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_API_KEY,
    // api_secret: process.env.CLOUD_API_SECRET