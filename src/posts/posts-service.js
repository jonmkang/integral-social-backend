const PostsService = {
  getPostsByUserId(db, id) {
    return db.select("*").from("publish").where("publish.user_id", id);
  },
  addPostByUserId(db, post) {
    return db
      .insert(post)
      .into("publish")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = PostsService;
