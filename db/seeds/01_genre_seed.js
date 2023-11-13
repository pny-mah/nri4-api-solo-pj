/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('genre').insert([
    {id: 1, genre_name: 'novels - the classics'},
    {id: 2, genre_name: 'novels - romance'},
    {id: 3, genre_name: 'novels - mystery'},
    {id: 4, genre_name: 'novels - adventure'},
    {id: 5, genre_name: 'comic books'},
    {id: 6, genre_name: 'textbooks'},
    {id: 7, genre_name: 'self-help books'},
    {id: 8, genre_name: 'essay'},
    {id: 9, genre_name: 'cookbooks'},
  ]);
};
