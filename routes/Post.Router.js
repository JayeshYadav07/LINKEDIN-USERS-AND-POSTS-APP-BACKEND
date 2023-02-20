const express = require("express");
const { PostModel } = require("../model/Post.Model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find({ userId: req.body.userId });
  res.send({ userId: req.body.userId, posts: posts });
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({ msg: `Post created successfully`, user: payload.userId });
  } catch (error) {
    req.send({ msg: "Something went wrong", error: error.message });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate(req.params.id, payload);
    res.send({ msg: `Post updated successfully`});
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  try {
    await PostModel.findOneAndDelete(req.params.id);
    res.send({ msg: `Post deleted successfully`});
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

module.exports = { postRouter };
