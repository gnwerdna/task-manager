const cors = require('cors');
require("dotenv").config();
const express = require("express");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
//db config
const db = require("./src/config/keys").mongoURL;

//connect to mongodb
mongoose
  .connect(db, { 
    useNewUrlParser: true, 
    useCreateIndex: true 
  })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log("cannot connect to server!"));
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
}); 

//try test multer
const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 100000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.endsWith(".pdf")) {
      return callback(new Error("please upload a pdf file."));
    }
    callback(undefined, true);
  }
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  res.send();
});
// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisissecretkey", {
//     expiresIn: "3 seconds"
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisissecretkey");
//   console.log(data);
// };
// myFunction();
