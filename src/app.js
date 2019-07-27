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
    type Query {
      getUser(id: Int): [User]
      getAllUsers: [User]
      getUserJams(id: Int): [Jam]

      getJam(id: Int): [Jam]
      getAllJams: [Jam]
    }
    type Mutation {
      createUser(username: String): [User]
      updateUser(id: Int, username: String, update: String): [User]
      deleteUser(username: String): [User]
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
  createUser: async ({ username }) => {
    const newUser = await database("users")
      .insert({ username })
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
