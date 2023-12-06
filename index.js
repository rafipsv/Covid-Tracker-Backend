const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const userRouter = require("./routes/userRoutes");
app.use("/uploads", express.static("uploads"));
app.use(userRouter);

app.listen(3000, () => {
  console.log("Server started");
});
