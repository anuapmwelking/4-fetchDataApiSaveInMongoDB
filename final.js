import fetch from "node-fetch";
import mongoose from "mongoose";
// const fetch = require("node-fetch");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/photos", (err) => {
  if (!err) {
    console.log("connection established");
  } else {
    console.log(err);
  }
});
// Content-Type: application/json
const postSchema = new mongoose.Schema({
  //   albumId: {
  //     type: Number,
  //     required: true,
  //   },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbUrl: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("Post", postSchema);
async function getPosts() {
  const myPosts = await fetch("https://jsonplaceholder.typicode.com/photos");
  const response = await myPosts.json();
  //   console.log(response);
  for (let i = 0; i < response.length; i++) {
    const post = new Post({
      user_id: response[i]["albumId"],
      id: response[i]["id"],
      title: response[i]["title"],
      url: response[i]["url"],
      thumbUrl: response[i]["thumbnailUrl"],
    });
    post.save();
    // console.log(response[i]["id"]);
    // console.log(response[i]["title"]);
    // console.log(response[i]["descirption"]);
    // console.log(response[i]["id"]);
  }
}

getPosts();
