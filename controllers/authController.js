const authModel = require("../models/authModel");

exports.userRegister = (req, res, next) => {
  let userName = req.body.username;
  let password = req.body.password;
  authModel.register(userName, password, (userID) => {
    if (userID == 0) {
      data = {
        status: "Failed",
        messege: "User already exist with this credentials",
        user: {},
      };
      res.status(400).json(data);
    } else {
      user = {
        name: userName,
        userId: userID,
      };
      data = {
        status: "Success",
        messege: "User successfully registered",
        user: user,
      };
      res.status(200).json(data);
    }
  });
};
exports.userLogin = (req, res, next) => {
  let userName = req.body.username;
  let password = req.body.password;
  authModel.login(userName, (user) => {
    if (user.length == 0) {
      data = {
        status: "Failed",
        messege: "No user found with this credentials",
        user: [],
      };
      res.status(400).json(data);
    } else {
      if (user[0].password == password) {
        data = {
          status: "Successs",
          messege: "User logged in successfully",
          user: user,
        };
        res.status(200).json(data);
      } else {
        data = {
          status: "Failed",
          messege: "Incorrect password",
          user: [],
        };
        res.status(400).json(data);
      }
    }
  });
};
