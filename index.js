const express = require("express");
const { userRouter } = require("./routes/User.Router");
const { connection } = require("./config/db");
const { authenticate } = require("./middleware/authenticate");
const { postRouter } = require("./routes/Post.Router");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connection established");
    console.log("listening on port " + PORT + "...");
  } catch (error) {
    console.log("error: " + error);
  }
});
