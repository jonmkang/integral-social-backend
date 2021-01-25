require("dotenv").config();
const express = require("express");
const app = express();

const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is online.");
});

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
