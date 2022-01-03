import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";

const expect = chai.expect;
let db;
let user2token;



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

  describe("GET /api/movies/tmdb/discover, returns object", () => {
    
    describe("Movies endpoint", () => {
      before(() => {
        mongoose.connect(process.env.MONGO_DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        db = mongoose.connection;
      });
    
    it("should return tmdb movies and a status 200", (done) => {
      request(api)
        .get("/api/movies/tmdb/discover")
        .set("Authentication", "BEARER "+ user2token )
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          console.log(res.body)
          done();
        });
    });
  });

  
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
});

 
