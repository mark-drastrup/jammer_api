const express = require("express");
require("dotenv").config();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
// GraphQL schema
const schema = buildSchema(`
    type User {
      id: ID
      username: String
      password: String
      created_at: String
    }
    type Jam {
      id: ID
      creator_id: Int
      genre: String
      when: String
      where: String
      created_at: String
    }
    input UpdateJam {
      genre: String
      when: String
      where: String
    }
    type Query {
      getUser(id: Int): [User]
      getAllUsers: [User]
      getUserJams(id: Int): [Jam]

      getJam(id: Int): [Jam]
      getAllJams: [Jam]
    }
    type Mutation {
      createUser(username: String, password: String): [User]
      updateUser(id: Int, username: String, update: String): [User]
      deleteUser(username: String): [User]

      createJam(id: Int, creator_id: Int, genre: String, when: String, where: String): [Jam]
      updateJam(creator_id: Int, newData: UpdateJam): [Jam]
      deleteJam(id: Int): [Jam]
    }
`);
// Root resolver
const root = {
  getUser: async ({ id }) => {
    const user = await database("users").where({ id });
    return user;
  },
  getUserJams: async ({ id }) => {
    const jams = await database("users")
      .where({ id })
      .then(user => database("jams").where({ creator_id: user[0].id }));
    return jams;
  },
  getAllUsers: async () => {
    const users = await database("users").select();
    return users;
  },
  createUser: async ({ username, password }) => {
    const newUser = await database("users")
      .insert({ username, password })
      .returning("*")
      .into("users");
    return newUser;
  },
  updateUser: async ({ id, username, update }) => {
    const updatedUser = await database("users")
      .where({ id })
      .orWhere({ username })
      .update({ username: update })
      .returning("*")
      .into("users");
    return updatedUser;
  },
  deleteUser: async ({ username }) => {
    const deletedUser = await database("users")
      .where({ username })
      .del()
      .returning("*")
      .into("users");
    return deletedUser;
  },

  getJam: async ({ id }) => {
    const jam = await database("jams").where({ creator_id: id });
    return jam;
  },
  getAllJams: async () => {
    const jams = await database("jams").select();
    return jams;
  },
  createJam: async ({ id, creator_id, genre, when, where }) => {
    const jam = await database("jams")
      .insert({
        id,
        creator_id,
        genre,
        when,
        where
      })
      .returning("*")
      .into("jams");
    return jam;
  },
  updateJam: async ({ creator_id, newData }) => {
    const updatedJam = await database("jams")
      .where({ creator_id })
      .update(newData)
      .returning("*")
      .into("jams");
    return updatedJam;
  },
  deleteJam: async ({ id }) => {
    const deletedJam = await database("jams")
      .where({ id })
      .del()
      .returning("*")
      .into("jams");
    return deletedJam;
  }
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
