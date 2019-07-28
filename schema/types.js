const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
      id: ID
      username: String
      password: String
      created_at: String
    }
    input UpdateUser {
      username: String
      password: String
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
      createUser(id: Int, username: String, password: String): [User]
      updateUser(id: Int, newData: UpdateUser): [User]
      deleteUser(username: String): [User]

      createJam(id: Int, creator_id: Int, genre: String, when: String, where: String): [Jam]
      updateJam(id: Int, newData: UpdateJam): [Jam]
      deleteJam(id: Int): [Jam]
    }
`);

module.exports = schema;
