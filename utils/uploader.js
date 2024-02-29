const multer = require('multer');

const fileUploadLimits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const blogsStorage = multer.diskStorage({
  destination: (err, file, cb) => cb(null, 'public/upload/blogs'),
  filename: (err, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const productsStorage = multer.diskStorage({
  destination: (err, file, cb) => cb(null, 'public/upload/products'),
  filename: (err, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const blogsUploadSettings = multer({
  storage: blogsStorage,
  limits: fileUploadLimits,
  fileFilter: fileFilter,
});

const productUploadSettings = multer({
  storage: productsStorage,
  limits: fileUploadLimits,
  fileFilter: fileFilter,
});
const blogUpload = blogsUploadSettings.single('blogImage');
const productUpload = productUploadSettings.single('productImage');

module.exports = blogUpload;
module.exports = productUpload;
