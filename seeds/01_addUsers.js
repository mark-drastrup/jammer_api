exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "FunkMaster",
          password: "Funkmaster9000"
        },
        {
          id: 2,
          username: "RockMonster",
          password: "thunderstruck"
        },
        {
          id: 3,
          username: "PopDiva",
          password: "rihanna"
        },
        {
          id: 4,
          username: "MetalGod",
          password: "sadbuttrue"
        }
      ]);
    });
};
