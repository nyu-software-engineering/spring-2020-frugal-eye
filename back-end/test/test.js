const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

let mongoServer;
const opts = { useMongoClient: true };

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts);

  chai
    .request(app)
    .post("/register")
    .send({new_username: "testUser", new_password: "testPassword"})
    .end((err, res) => {
      const token = res.body.token;
    });

});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const { expect } = chai;
chai.use(chaiHttp);

describe("Login", () => {
  it("Sends a 200 code for a valid user", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "testUser", password: "testPassword"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        const token = res.body.token;
        expect(token).to.exist;
        done(); 
      });
  });

  it("Sends a 204 code if a user's name and password don't match", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "testUser", password: "badPassword"})
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it("Sends a 205 code if a user does not exist", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "noUser", password: "testPassword"})
      .end((err, res) => {
        expect(res).to.have.status(205);
        done();
      });
  });
});

describe("Register", () => {
  it("Sends a 200 code for a password > 8 characters", done => {
    chai
      .request(app)
      .post("/register")
      .send({new_username: "newUser", new_password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends a 205 code for already registered user", done => {
    chai
      .request(app)
      .post("/register")
      .send({new_username: "testUser", new_password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(205);
        done();
      });
  });

  it("Sends a 204 code for a password < 8 characters", done => {
    chai
      .request(app)
      .post("/register")
      .send({new_username: "newUser2", new_password: "test"})
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

/*describe("Settings", () => {
  let token;

  beforeEach(() => {
    chai
      .request(app)
      .post("/")
      .send({username: "testUser", password: "testPassword"})
      .then((err, res) => {
        token = res.body.token;
      });
  });

  it("Sends a 200 code when user information is changed", done => {
    chai
      .request(app)
      .post("/settings")
      .send({username: "testUser", password: "testPassword",
        new_username: "newUserName", new_password: "newPassword"})
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends a 205 code when user does not exist", done => {
    chai
      .request(app)
      .post("/settings")
      .send({username: "nonUser", password: "badPassword",
        new_username: "newUserName2", new_password: "newPassword"})
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(205);
        done();
      });
  });

  it("Sends a 204 code when new password is < 8 characters", done => {
    chai
      .request(app)
      .post("/settings")
      .send({username: "testUser", password: "testPassword",
        new_username: "newUserName2", new_password: "newpass"})
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

/*describe("Ingredients Page", () => { 
  it("Sends a 200 code when ingredients is passed", done => {
    chai
      .request(app)
      .post("/add-ingredients")
      .send({ingredientsList: ["test1", "test2"]})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Recipe List Page", () => { 
  it("Sends a 200 code when recipes are requested from API", done => {
    chai
      .request(app)
      .get("/recipelist")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Returns a non-empty object as data", done => {
    chai
      .request(app)
      .get("/recipelist")
      .end((err, res) => {
        expect(res).to.be.an('object').that.is.not.empty;
        done();
      });
  });
});

describe("Favorite List Page", () => { 
  it("Sends a 200 code when favorite recipes are requested from API", done => {
    chai
      .request(app)
      .get("/favoritelist")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Returns a non-empty object as data", done => {
    chai
      .request(app)
      .get("/recipelist")
      .end((err, res) => {
        expect(res).to.be.an('object').that.is.not.empty;
        done();
      });
  });
});

describe("Recipe Page", () => { 
  it("Returns a non-empty object as data", done => {
    chai
      .request(app)
      .get("/recipe/1")
      .end((err, res) => {
        expect(res).to.be.an('object').that.is.not.empty;
        done();
      });
  });
  it("Returns a non-empty object as data", done => {
    chai
      .request(app)
      .get("/recipe/2")
      .end((err, res) => {
        expect(res).to.be.an('object').that.is.not.empty;
        done();
      });
  });
    it("Returns a non-empty object as data", done => {
    chai
      .request(app)
      .get("/recipe/3")
      .end((err, res) => {
        expect(res).to.be.an('object').that.is.not.empty;
        done();
      });
  });
});*/
