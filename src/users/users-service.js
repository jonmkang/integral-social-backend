const UsersService = {
  hasUserWithUsername(db, username) {
    return db("integral_user")
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("integral_user")
      .returning("*")
      .then(([user]) => user);
  },
};

module.exports = UsersService;
