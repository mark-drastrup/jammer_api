exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Link" },
        { username: "Zelda" },
        { username: "Ganon" },
        { username: "Mario" },
        { username: "Peach" },
        { username: "Yoshi" },
        { username: "Luigi" }
      ]);
    });
};
