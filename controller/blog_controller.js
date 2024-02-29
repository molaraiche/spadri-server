const Blogs = require('../model/blogs_model');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().exec();
    res.status(200).json({ response: blogs });
  } catch (error) {
    res.status(500).json({ getBlogsError: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blogImage = req.file.filename;

    const newBlogCreation = await new Blogs({
      title,
      description,
      blogImage,
    });
    newBlogCreation.save();
    res.status(201).json({ response: newBlogCreation });
  } catch (error) {
    res.status(500).json({ createBlogsError: error.message });
  }
};
const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blogImage = req.file.filename;
    const id = req.params.id;
    const updatedBlog = await Blogs.findByIdAndUpdate(id, {
      title,
      description,
      blogImage,
    });
    res.status(200).json({ response: updatedBlog });
  } catch (error) {
    res.status(500).json({ createBlogsError: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBlog = await Blogs.findByIdAndDelete(id);
    res.status(200).json({ response: `blog with id ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ createBlogsError: error.message });
  }
};
module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog };
