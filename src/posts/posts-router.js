const express = require("express");
const path = require("path");
const app = require("../app");
const PostsService = require("./posts-service");
const postsRouter = express.Router();
const jsonBodyParser = express.json();

postsRouter
  .route("/:user_id")
  .get((req, res, next) => {
    PostsService.getPostsByUserId(req.app.get("db"), req.params.user_id)
      .then((posts) => {
        if (!posts)
          return res.status(404).json({
            error: { message: `No posts found for user` },
          });

        res.posts = posts;
        res.status(200).json(res.posts);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { content } = req.body;
    const { user_id } = req.params;
    const newPost = {
      user_id,
      content,
    };

    if (!user_id)
      return res.status(404).json({
        error: { message: "Missing user id in request body" },
      });

    if (!content)
      return res.status(404).json({
        error: { message: "Missing content in request body" },
      });

    PostsService.addPostByUserId(req.app.get("db"), newPost)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(next);
  });

module.exports = postsRouter;
