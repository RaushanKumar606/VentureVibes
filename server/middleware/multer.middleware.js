// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../cloudinary/cloudinary'); 

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary, 
//     params: {
//         folder: 'travler',
//         allowed_formats: ['jpeg', 'png', 'jpg']
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require('multer');
const path = require('path');

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save images in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

