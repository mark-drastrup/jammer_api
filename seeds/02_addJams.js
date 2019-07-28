exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("jams")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("jams").insert([
        {
          creator_id: 1,
          genre: "Funk",
          when: "2019-08-01",
          where: "Shinjuku"
        },
        {
          creator_id: 1,
          genre: "Funk",
          when: "2019-08-04",
          where: "Shibuya"
        },
        {
          creator_id: 2,
          genre: "Heavy Metal",
          when: "2019-08-01",
          where: "Roppongi"
        },
        {
          creator_id: 3,
          genre: "Rock",
          when: "2019-08-015",
          where: "Code Chrysalis"
        }
      ]);
    });
};
