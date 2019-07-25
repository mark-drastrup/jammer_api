
exports.up = function (knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments().index();
    t.string("username").unique().notNullable().index();
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
