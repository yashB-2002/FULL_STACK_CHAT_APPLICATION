const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
const bcrypt = require("bcrypt");
require("dotenv").config();
const http = require("http");
const server_http = http.createServer(app);
const io = socket(server_http);
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/myChatApp", () => {
  console.log("db connected");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  userModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ error: "user already registered" });
    } else {
      bcrypt.hash(password, 12).then((hashedPswd) => {
        const new_user = new userModel({
          name,
          email,
          password: hashedPswd,
        });
        new_user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "user added is successfull." });
          }
        });
      });
    }
  });
});
app.post("/signin", (req, res) => {
  const { name, password } = req.body;
  userModel.findOne({ name: name }, (err, user) => {
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            res.send({ message: "Login Successfull.", user: user });
          } else {
            res.send({ error: "Enter valid password." });
          }
        })
        .catch((err) => alert(err));
    } else {
      res.send({ error: "User not registered." });
    }
  });
});

const totalUsers = [{}];
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("joined", ({ name_of_user }) => {
    console.log(name_of_user);
    totalUsers[socket.id] = name_of_user;
    socket.broadcast.emit("user_Joined", {
      user: "Admin",
      message: `${totalUsers[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: ` ${totalUsers[socket.id]} joined the chat.`,
    });
  });
  socket.on("send_message", (data) => {
    io.emit("sendmessage", {
      user: totalUsers[data.id],
      message: data.message,
      id: data.id,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user_Left", {
      user: "Admin",
      message: `${totalUsers[socket.id]} left the chat.`,
    });
  });
});
server_http.listen(PORT, () => {
  console.log("listening at port " + process.env.PORT);
});
