exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "FunkMaster",
          password: "Funkmaster9000"
        },
        {
          username: "RockMonster",
          password: "thunderstruck"
        },
        {
          username: "PopQueen",
          password: "rihanna"
        },
        {
          username: "MetalGod",
          password: "sadbuttrue"
        }
      ]);
    });
};
