const dataBase = require("../utils/dbConnection");
class BlogModel {
  static addBlogs(title, desc, image, cb) {
    dataBase.connect((error) => {
      if (error) console.log(error);
      else {
        let sql =
          "INSERT INTO blogs (title, des, image) VALUES ('" +
          title +
          "', '" +
          desc +
          "','" +
          image +
          "');";
        dataBase.query(sql, (error, result) => {
          if (error) console.log(error);
          else {
            this.getBlogsByID(result.insertId, (blog) => {
              cb(blog);
            });
          }
        });
      }
    });
  }
  static getBlogsByID(id, cb) {
    dataBase.connect((error) => {
      if (error) console.log(error);
      else {
        let sql = "SELECT * FROM blogs WHERE id = '" + id + "'";
        dataBase.query(sql, (error, result) => {
          if (error) console.log(error);
          else {
            cb(result);
          }
        });
      }
    });
  }

  static getBlogs(cb) {
    dataBase.connect((error) => {
      if (error) console.log(error);
      else {
        let sql = "SELECT * FROM blogs";
        dataBase.query(sql, (error, result) => {
          if (error) console.log(error);
          else {
            cb(result);
          }
        });
      }
    });
  }
  static editBlogs(id, title, desc, cb) {
    dataBase.connect((error) => {
      if (error) console.log(error);
      else {
        let sql =
          "UPDATE blogs SET title='" +
          title +
          "', des='" +
          desc +
          "' WHERE id='" +
          id +
          "'";
        dataBase.query(sql, (error, result) => {
          this.getBlogsByID(id, (blog) => {
            cb(blog);
          });
        });
      }
    });
  }
  static deleteBlog(id, cb) {
    dataBase.connect((error) => {
      if (error) console.log(error);
      else {
        let mainSql = "SELECT * FROM blogs WHERE id='" + id + "'";
        dataBase.query(mainSql, (error, result) => {
          if (error) console.log(error);
          else {
            let sql = "DELETE FROM blogs WHERE id='" + id + "'";
            dataBase.query(sql, (error, result2) => {
              if (error) console.log(error);
              else {
                cb(result, result2);
              }
            });
          }
        });
      }
    });
  }
}

module.exports = BlogModel;
