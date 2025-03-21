const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary/cloudinary'); 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
        folder: 'travler',
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

const upload = multer({ storage });
module.exports = upload;


