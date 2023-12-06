const blogModel = require("../models/blogModel");
exports.addBlog = (req, res, next) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  blogModel.addBlogs(title, desc, imageUrl, (blog) => {
    data = {
      status: "Success",
      messege: "Blog added successfully",
      blog: blog,
    };
    res.status(200).json(data);
  });
};

exports.getBlogs = (req, res, next) => {
  blogModel.getBlogs((blogs) => {
    if (blogs.length == 0) {
      data = {
        status: "Failed",
        messege: "No blog found",
        blogs: blogs,
      };
      res.status(200).json(data);
    } else {
      data = {
        status: "Success",
        messege: "Blogs given below",
        blogs: blogs,
      };
      res.status(200).json(data);
    }
  });
};
exports.editBlog = (req, res, next) => {
  let id = req.query.id;
  let title = req.body.title;
  let desc = req.body.desc;
  blogModel.editBlogs(id, title, desc, (blog) => {
    if (blog.length == 0) {
      data = {
        status: "Failed",
        messege: "No blog found",
        blogs: [],
      };
      res.status(200).json(data);
    } else {
      data = {
        status: "Success",
        messege: "Edited blog given below",
        blogs: blog,
      };
      res.status(200).json(data);
    }
  });
};

exports.deleteBlog = (req, res, next) => {
  let id = req.query.id;
  blogModel.deleteBlog(id, (result) => {
    if (result.affectedRows == 0) {
      data = {
        status: "Failed",
        messege: "No blog found",
        blogID: id,
      };
    } else {
      data = {
        status: "Success",
        messege: "Blog deleted Successfully",
        blogID: id,
      };
    }
    res.status(200).json(data);
  });
};
