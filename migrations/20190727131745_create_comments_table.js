exports.up = function(knex) {
  return knex.schema.createTable("comments", t => {
    t.increments().index();
    t.integer("creator_id").notNullable();
    t.foreign("creator_id")
      .references("id")
      .inTable("users");
    t.text("comment").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
