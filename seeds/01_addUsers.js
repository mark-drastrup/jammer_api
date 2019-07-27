const faker = require("faker");

const createFakeUser = id => ({
  id,
  username: faker.internet.userName(),
  password: faker.internet.password()
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function() {
      // Inserts seed entries
      const users = [];
      const numberOfUsers = 21;
      for (let i = 1; i < numberOfUsers; i++) {
        users.push(createFakeUser(i));
      }
      await knex("users").insert(users);
    });
};
