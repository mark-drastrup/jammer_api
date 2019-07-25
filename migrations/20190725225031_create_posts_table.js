
exports.up = function (knex) {
  return knex.schema.createTable("posts", (t) => {
    t.increments().index();
    t.string("title").notNullable();
    t.text("post_content").notNullable();
    t.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
