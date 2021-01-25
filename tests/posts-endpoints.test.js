require("dotenv").config();
const knex = require("knex");
const app = require("../src/app");
const supertest = require("supertest");
const helpers = require("./test-helpers");
const { request } = require("../src/app");
const { expect } = require("chai");

describe("Posts Endpoints", function () {
  let db;

  const testPosts = helpers.makePostsArray();
  const testPostOne = testPosts[0];

  beforeAll(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeAll(() => helpers.cleanTables(db));

  afterAll(() => db.destroy());

  afterEach(() => helpers.cleanTables(db));

  describe(`POST /api/post/`, () => {
    //Insert posts, users, followed_users
    beforeEach(() => {
      helpers.seedTables(
        db,
        helpers.makeUsersArray(),
        helpers.makePostsArray(),
        helpers.makeFollowedUsersArray()
      );
    });

    it("GET /posts/:user_id/ responds with 200 and all posts by user", () => {
      return supertest(app)
        .get("/api/posts/1")
        .expect(200, [
          {
            ...testPostOne,
            date_created:
              new Date().toISOString().split("T")[0] + "T05:00:00.000Z",
          },
        ]);
    });

    it("POST /posts/:user_id", async (done) => {
      return await supertest(app)
        .post("/api/posts/2")
        .send({
          content: "This is a new post",
        })
        .expect(201, [
          {
            content: "This is a new post",
            user_id: 2,
            publish_id: 5,
            date_created:
              new Date().toISOString().split("T")[0] + "T05:00:00.000Z",
          },
        ])
        .catch(() => done());
    });
  });
});
