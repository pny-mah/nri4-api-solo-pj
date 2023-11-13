/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("record", function(table){
        table.increments("id").primary();
        table.integer("book_id").notNullable();
        table.date("date");
        table.integer("time");
        table.string("place", 60);
        table.float("review", 8, 1);

        table.foreign("book_id").references("book.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    // 念の為外部制約を解除した上で削除
    await knex.schema.alterTable("record", function(table){
        table.dropForeign("book_id");
    });
    return knex.schema.dropTable("record");
};
