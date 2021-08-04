const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // Sync
  events.push(event);

  // Posts Service - send back event
  axios.post("http://posts-cluterip-srv:4000/events", event).catch((err) => {
    // axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // Comments Service - send back event
  axios.post("http://comments-cluterip-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  // Query Service - send back event
  axios.post("http://query-clusterip-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  // Moderation Service - send back event
  axios
    .post("http://moderation-clusterip-srv:4003/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
