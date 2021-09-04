const kafka = require("kafka-node");
const express = require("express");
const port = 3001;
const app = express();

const Consumer = kafka.Consumer,
  client = new kafka.KafkaClient("localhost:9092"),
  consumer = new Consumer(
    client,
    [
      { topic: "login_processed", partition: 0 },
      { topic: "likes_processed", partition: 0 },
      { topic: "shares_processed", partition: 0 },
      { topic: "comments_processed", partition: 0 },
      { topic: "posts_processed", partition: 0 },
      { topic: "emotion_processed", partition: 0 },
    ],
    {
      autoCommit: false,
    }
  );

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {

  console.log('Connected');

  consumer.on("message", function (message) {
    client.emit("message", message.value);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
