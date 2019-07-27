const { expect } = require("chai");
const url = "http://localhost:4000";
const request = require("supertest")(url);

describe("graphql", () => {
  it("Should return a specific user", done => {
    const data = request
      .post("/graphql")
      .send({ query: '{getUser(username: "Ganon") {id username}}' })
      .expect(200);
    data.end((err, res) => {
      if (err) return done(err);
      expect(res.body.data.getUser[0].username).to.equal("Ganon");
      done();
    });
  });
});
