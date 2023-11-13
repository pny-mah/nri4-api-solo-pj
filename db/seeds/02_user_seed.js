/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('user').insert([
    {id: 1, user_name: 'user01'},
    {id: 2, user_name: 'user02'},
    {id: 3, user_name: 'user03'},
    {id: 4, user_name: 'user04'},
    {id: 5, user_name: 'user05'},
    {id: 6, user_name: 'user06'},
    {id: 7, user_name: 'user07'},
  ]);
};
