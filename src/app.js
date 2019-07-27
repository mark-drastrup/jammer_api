/* const express = require('express');
const app = express();
require('dotenv').config()

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my page</h1>");
});

app.listen(4000, () => {
  console.log("App is running on port 4000");
}); */

var express = require('express');
require('dotenv').config()
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
// GraphQL schema
var schema = buildSchema(`
    type User {
      id: ID
      username: String
      created_at: String
    }
    type Query {
      getUser(username: String): [User]
      getAllUsers: [User]
    }
    type Mutation {
      createUser(username: String): [User]
      updateUser(id: Int, username: String, update: String): [User]
      deleteUser(username: String): [User]
    }
`);
// Root resolver
var root = {
  getUser: async ({ username }) => {
    const user = await database("users").where({ username: username });
    return user;
  },
  getAllUsers: async () => {
    const users = await database("users").select();
    return users;
  },
  createUser: async ({ username }) => {
    const newUser = await database("users").insert({ username: username }).returning("*").into("users");
    return newUser;
  },
  updateUser: async ({ id, username, update }) => {
    const updatedUser = await database("users").where({ id: id }).orWhere({ username: username }).update({ username: update }).returning("*").into("users");
    return updatedUser;
  },
  deleteUser: async ({ username }) => {
    const deletedUser = await database("users").where({ username: username }).del().returning("*").into("users");
    return deletedUser;
  }
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));