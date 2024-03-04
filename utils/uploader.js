const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dkglanpln',
  api_key: '436749385572845',
  api_secret: '85MfkykF_QD10El-5F4hnIHMazc',
  secure: true,
});

// Setting up Cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Spadri', // Optional: specify a folder name to organize your images
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'], // file formats allowed
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional: specify transformations
  },
});

const fileUploadLimits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadSettings = multer({
  storage: cloudinaryStorage,
  limits: fileUploadLimits,
  fileFilter: fileFilter,
});

// Define multer upload settings for blog and product images
// Since you're using Cloudinary now, you might not need separate storages for blogs and products
// unless you want to categorize them in different folders in Cloudinary.
const blogUpload = uploadSettings.single('blogImage');
const productUpload = uploadSettings.single('productImage');

module.exports = { blogUpload, productUpload };
