const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  //Send event to event bus with data
  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err.message));
  res.status(201).send(posts[id]);
});

//Receive event bus
app.post("/events", (req, res) => {
  console.log("Received Event in `Posts Service`", req.body);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
