const express = require("express");
require("./db/mongoose");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
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
