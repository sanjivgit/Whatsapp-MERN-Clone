// importing
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Messages from "./dbmessages.js";
import Pusher from "pusher";
import cors from "cors";
import Users from "./dbusers.js";
import Conversations from "./dbconversation.js";

// app config
const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

const pusher = new Pusher({
  appId: "1351577",
  key: "77dac813d70497340af6",
  secret: "c3341a7774f47a8cfe0f",
  cluster: "ap2",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Original", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// DB config
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    // console.log(change);
    if ((change.operationType = "insert")) {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        senderId: messageDetails.senderId,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello Guys!!!");
});

app.post("/users/new", async (req, res) => {
  const userDB = req.body;
  let exist = await Users.findOne({ localId: req.body.localId });
  if (exist) {
    res.send("already exist");
  } else {
    Users.create(userDB, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.get("/users/sync", (req, res) => {
  Users.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const messageDB = req.body;
  Messages.create(messageDB, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/messages/sync/:id", (req, res) => {
  Messages.find({ conversationId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/conversation/new", async (req, res) => {
  const conversationDB = req.body;
  let senderId = req.body.members[0];
  let receiverId = req.body.members[1];
  const exist = await Conversations.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (exist) {
    res.send("all ready exist");
  } else {
    Conversations.create(conversationDB, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.get("/conversation/sync/:id1/:id2", async (req, res) => {
  let senderId = req.params.id1;
  let receiverId = req.params.id2;
  Conversations.findOne(
    {
      members: { $all: [senderId, receiverId] },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
        console.log(data);
      }
    }
  );
});
// listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
