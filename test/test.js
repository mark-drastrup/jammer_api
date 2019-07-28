const { expect } = require("chai");
const url = "http://localhost:4000";
const request = require("supertest")(url);

describe("graphql", () => {
  describe("users", () => {
    it("should return a specific user", done => {
      const data = request
        .post("/graphql")
        .send({ query: "{getUser(id: 2) {id username}}" })
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getUser[0].username).to.equal("RockMonster");
        done();
      });
    });
    it("should return a list of all users", done => {
      const data = request
        .post("/graphql")
        .send({ query: "{getAllUsers {id username}}" })
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getAllUsers.length).to.equal(4);
        done();
      });
    });
    it("should be possible to create a user", done => {
      const queryBody = {
        query: `mutation{
          createUser(id: 5, username: "Jazzy", password: "gypsyswing") {
            id
            username
            password
          }
        }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.createUser[0].username).to.equal("Jazzy");
        done();
      });
    });
    it("should be possible to modify a user", done => {
      const queryBody = {
        query: `mutation{
        updateUser(id: 5, newData: {username: "Jazzhands"}) {
            id
            username
        }
      }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.updateUser[0].username).to.equal("Jazzhands");
        done();
      });
    });
    it("should be possible to delete a user", done => {
      const queryBody = {
        query: `mutation{
        deleteUser(username: "Jazzhands") {
          id
          username
          password
        }
      }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.deleteUser[0].username).to.equal("Jazzhands");
        done();
      });
    });
  });
  describe("jams", () => {
    it("should a return a specific a jam", done => {
      const data = request
        .post("/graphql")
        .send({ query: "{getJam(id: 4) {id when where}}" })
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getJam[0].where).to.equal("Code Chrysalis");
        done();
      });
    });
    it("should return a list of all jams", done => {
      const data = request
        .post("/graphql")
        .send({ query: "{getAllJams {id when where}}" })
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getAllJams[1].where).to.equal("Shibuya");
        expect(res.body.data.getAllJams[2].where).to.equal("Roppongi");
        done();
      });
    });
    it("should be possible to create a new jam", done => {
      const queryBody = {
        query: `mutation{
          createJam(creator_id: 4, genre: "Rock", when: "2019-09-09", where: "My house") {
            genre
            when
            where
          }
        }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.createJam[0].where).to.equal("My house");
        expect(res.body.data.createJam[0].genre).to.equal("Rock");
        done();
      });
    });
    it("should be possible to modify a jam", done => {
      const queryBody = {
        query: `mutation{
        updateJam(creator_id: 4, newData: {where: "Rock Bar"}) {
            when
            where
            genre
        }
      }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.updateJam[0].where).to.equal("Rock Bar");
        expect(res.body.data.updateJam[0].genre).to.equal("Rock");
        done();
      });
    });
    it("should be possible to delete a jam", done => {
      // make id manually to pass test!
      const queryBody = {
        query: `mutation{
        deleteJam(id: 5) {
          genre
          when
          where
        }
      }`
      };
      const data = request
        .post("/graphql")
        .send(queryBody)
        .expect(200);
      data.end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.deleteJam[0].where).to.equal("Rock Bar");
        done();
      });
    });
  });
});
