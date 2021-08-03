const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

const posts = {};
// QUICK EXAMPLE
// posts ===
//   {
//     "randomStringId": {
//       id: "",
//       title: "post title",
//       comments: [{ id: "id123", content: "comment!" }],
//     },
//     "randomStringId2": {
//       id: "",
//       title: "post title",
//       comments: [{ id: "id123", content: "comment!" }],
//     },
//   };

// Fetch collection of data
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Parse Data
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  //Sync
  const res = await axios.get("http://localhost:4005/events");
  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
