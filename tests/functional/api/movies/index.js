import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let user2token;

describe("Movies endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    request(api) 
    .post("/api/users?action=authenticate")
    .send({
      username: "user2",
      password: "test2",
    })
    .expect(200)
    .then((res) => {
      expect(res.body.success).to.be.true;
      expect(res.body.token).to.not.be.undefined;
      user2token = res.body.token.substring(7);
      console.log(user2token)
    });
    
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });

 });
