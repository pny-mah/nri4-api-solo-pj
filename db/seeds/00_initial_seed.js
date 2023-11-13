/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // 依存関係解消のため全消し
    await knex('record').del();
    await knex('book').del();
    await knex('user').del();
    await knex('genre').del();
};
