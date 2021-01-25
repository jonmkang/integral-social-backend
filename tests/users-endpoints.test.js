const users = require("../src/users/users-router");
require("dotenv").config();
const knex = require("knex");
const app = require("../src/app");
const supertest = require("supertest");
const helpers = require("./test-helpers");

describe("Users Endpoints", function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

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

  describe(`POST /api/users`, () => {
    beforeEach(() => {
      helpers.seedUsers(db, testUsers);
    });

    const requiredFields = ["username", "user_password"];

    requiredFields.forEach((field) => {
      const registerAttemptBody = {
        username: "test",
        user_password: "testpassword",
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete registerAttemptBody[field];

        return supertest(app)
          .post("/api/users")
          .send(registerAttemptBody)
          .expect(400, {
            error: `Missing '${field}'`,
          });
      });
    });

    it(`responds with 400 error when User exists`, () => {
      const newUser = {
        username: "Alice",
        user_password: "Abcd1234!",
      };

      return supertest(app).post("/api/users").send(newUser).expect(400, {
        error: `Username has been taken.`,
      });
    });
  });
});
