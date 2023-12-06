const dataBase = require("../utils/dbConnection");
class AuthModel {
  static register(userName, password, cb) {
    dataBase.connect((error) => {
      let sql = "SELECT * FROM users WHERE username = '" + userName + "'";
      dataBase.query(sql, (error, result) => {
        if (result.length == 0) {
          let sql2 =
            "INSERT INTO users (username, password) VALUES ('" +
            userName +
            "', '" +
            password +
            "');";
          dataBase.query(sql2, (error, result2) => {
            cb(result2.insertId);
          });
        } else {
          cb(0);
        }
      });
    });
  }

  static login(userName, cb) {
    dataBase.connect((error) => {
      let sql = "SELECT * FROM users WHERE username = '" + userName + "'";
      dataBase.query(sql, (error, result) => {
        cb(result);
      });
    });
  }
}

module.exports = AuthModel;
