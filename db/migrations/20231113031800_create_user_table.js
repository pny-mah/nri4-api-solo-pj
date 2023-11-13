/**
 * @param { import("knex").Knex }knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("id").primary();
    table.string("user_name", 60).notNullable();
  });
};

/**
 * @param { import("knex").Knex }knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
