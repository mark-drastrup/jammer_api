exports.up = function(knex) {
  return knex.schema.createTable("jams", t => {
    t.increments().index();
    t.integer("creator_id").notNullable();
    t.foreign("creator_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    t.text("genre");
    t.text("when").notNullable();
    t.text("where").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("jams");
};
