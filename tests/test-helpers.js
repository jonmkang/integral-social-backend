function makeUsersArray() {
  return [
    {
      username: "Alice",
      user_password: "Abcd1234!",
    },
    {
      username: "Bob",
      user_password: "aBcd1234!",
    },
    {
      username: "Charlie",
      user_password: "abCd1234!",
    },
  ];
}

function makePostsArray() {
  return [
    {
      publish_id: 1,
      content: "I love the weather today",
      user_id: 1,
      date_created: new Date().toISOString(),
    },
    {
      publish_id: 2,
      content: "Damn! We Lost!",
      user_id: 2,
      date_created: new Date().toISOString(),
    },
    {
      publish_id: 3,
      content: "Good game though.",
      user_id: 2,
      date_created: new Date().toISOString(),
    },
    {
      publish_id: 4,
      content: "I'm in New York today! Anyone wants to have a coffee?",
      user_id: 3,
      date_created: new Date().toISOString(),
    },
  ];
}

function makeFollowedUsersArray() {
  return [
    {
      user_id: 3,
      followed_user: 1,
    },
    {
      user_id: 3,
      followed_user: 2,
    },
  ];
}

function seedTables(db, users, posts, followed_users) {
  return db.transaction(async (trx) => {
    await trx.into("integral_user").insert(users);
    await trx.into("publish").insert(posts);
    await trx.into("followed_users").insert(followed_users);
  });
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    username: user.username,
    user_password: user.user_password,
  }));

  return db.into("integral_user").insert(preppedUsers).catch();
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
            integral_user,
            publish,
            followed_users
            RESTART IDENTITY CASCADE;
        `
  );
}

module.exports = {
  makeUsersArray,
  makePostsArray,
  makeFollowedUsersArray,
  seedTables,
  seedUsers,
  cleanTables,
};
