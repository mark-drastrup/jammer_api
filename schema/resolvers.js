require("dotenv").config();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

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
  createUser: async ({ id, username, password }) => {
    const newUser = await database("users")
      .insert({ id, username, password })
      .returning("*")
      .into("users");
    return newUser;
  },
  updateUser: async ({ id, newData }) => {
    const updatedUser = await database("users")
      .where({ id })
      .update(newData)
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
    const jam = await database("jams").where({ id });
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
  updateJam: async ({ id, newData }) => {
    const updatedJam = await database("jams")
      .where({ id })
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

module.exports = root;
