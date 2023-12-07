const fs = require("fs");
const path = require("path");
const blogModel = require("../models/blogModel");
function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}
function cutString(url) {
  // Find the index of the "/uploads" substring
  const index = url.indexOf("/uploads");

  // Check if the substring is found
  if (index !== -1) {
    // Cut the string starting from the index and store it in the variable
    const cutString = url.slice(index);
    return cutString;
  } else {
    // If the substring is not found, return the original URL
    return url;
  }
}
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
  blogModel.deleteBlog(id, (result, result2) => {
    if (result2.affectedRows == 0) {
      data = {
        status: "Failed",
        messege: "No blog found",
        blogID: id,
      };
      res.status(200).json(data);
    } else {
      console.log(result);
      let splittedPath = cutString(result[0].image);
      let rootDir = getAppRootDir();
      fs.unlink(rootDir + splittedPath, (error) => {
        data = {
          status: "Success",
          messege: "Blog deleted Successfully",
          blogID: id,
        };
        res.status(200).json(data);
      });
    }
  });
};
