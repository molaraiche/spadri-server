const router = require('express').Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog_controller');
const { blogUpload } = require('../utils/uploader');

router.get('/', getAllBlogs);
router.post('/newBlog', blogUpload, createBlog);
router.put('/:id', blogUpload, updateBlog);
router.delete('/:id', deleteBlog);
module.exports = router;
