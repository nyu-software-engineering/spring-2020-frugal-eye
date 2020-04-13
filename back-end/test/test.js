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