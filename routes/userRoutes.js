const express = require("express");
const multer = require("multer");

const router = express.Router();
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", (req, res, next) => {
  res.json("Homepage");
});
router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.post("/add-blog", upload.single("image"), blogController.addBlog);
router.get("/get-blog", blogController.getBlogs);
router.patch("/edit-blog", blogController.editBlog);
router.delete("/delete-blog", blogController.deleteBlog);

module.exports = router;
