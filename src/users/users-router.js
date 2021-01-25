const express = require("express");
const path = require("path");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { username, user_password } = req.body;

  for (const field of ["username", "user_password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}'`,
      });

  UsersService.hasUserWithUsername(req.app.get("db"), username)
    .then((hasUserNameWithUserName) => {
      if (hasUserNameWithUserName) {
        return res.status(400).json({ error: `Username has been taken.` });
      }

      const newUser = {
        username,
        user_password,
      };

      return UsersService.insertUser(req.app.get("db"), newUser).then(
        (user) => {
          res.status(201).json(user);
        }
      );
    })
    .catch(next);
});

module.exports = usersRouter;
