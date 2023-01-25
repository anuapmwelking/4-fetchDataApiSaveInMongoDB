import fetch from "node-fetch";
import mongoose from "mongoose";
// const mongoose = require("mongoose");
// const fetch = require("fetch");
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI = "mongodb://localhost:27017/new";

const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Connected to Mongo Successfully");
    }
  );
};
mongoose.set("strictQuery", true);
const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  descirption: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("Post", postSchema);
async function getPosts() {
  const myPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await myPosts.json();
  //   console.log(response);
  for (let i = 0; i < response.length; i++) {
    // const post = new Post({
    //   user_id: response[i]["userId"],
    //   id: response[i]["id"],
    //   title: response[i]["title"],
    //   descirption: response[i]["body"],
    // });
    Post.insertMany(response);
    // Post.save();
    // console.log("USER_ID ----" + response[i]["userId"]);
    // console.log("ID ----" + response[i]["id"]);
    // console.log("TITLE ----" + response[i]["title"]);
    // console.log("BODY ----" + response[i]["body"]);
    // console.log("---------------");
  }
}

getPosts();
// module.exports = connectToMongo;
connectToMongo();
