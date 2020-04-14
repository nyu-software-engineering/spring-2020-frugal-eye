const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Login", () => {
  it("Sends a 200 code for a valid user", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "goodUser", password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends a 204 code if a user's name and password don't match", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "badUser", password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it("Sends a 202 code if a user does not exist", done => {
    chai
      .request(app)
      .post("/")
      .send({username: "testUser", password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });
});

describe("Register", () => {
  it("Sends a 200 code for a password > 8 characters", done => {
    chai
      .request(app)
      .post("/register")
      .send({new_username: "testUser", new_password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends a 204 code for a password < 8 characters", done => {
    chai
      .request(app)
      .post("/register")
      .send({new_username: "testUser", new_password: "test"})
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe("Settings", () => {
  it("Sends a 200 code when user information is passed", done => {
    chai
      .request(app)
      .post("/settings")
      .send({username: "testUser", password: "testpass"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Ingredients Page", () => { 
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
  it("Sends a 200 code when loads recipe information", done => {
    chai
      .request(app)
      .get("/recipe")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});