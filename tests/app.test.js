const app = require("../src/app.js");
const supertest = require("supertest");

describe("App is running", () => {
  test("the tests run", () => {
    return supertest(app).get("/").expect(200, "Server is online.");
  });
});
