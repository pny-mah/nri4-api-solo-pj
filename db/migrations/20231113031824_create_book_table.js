/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("book", function(table){
        table.increments("id").primary();
        table
            .integer("user_id")
            .notNullable();
        table.string("book_name", 100).notNullable();
        table.string("author", 60);
        table.integer("genre_id");
        table.string("media", 60);

        table.foreign("user_id").references("user.id");
        table.foreign("genre_id").references("genre.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    // 念の為外部制約を解除した上で削除
    await knex.schema.alterTable("book", function(table){
        table.dropForeign("user_id");
        table.dropForeign("genre_id");
    });
    return knex.schema.dropTable("book");
};
