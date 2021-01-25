process.env.TZ = "UTC";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";
process.env.JWT_EXPIRY = "3m";

const { expect } = require("chai");
const supertest = require("supertest");

require("dotenv").config();
global.expect = expect;
global.supertest = supertest;
