/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("genre").insert([
    { genre_name: "novels - the classics" },
    { genre_name: "novels - romance" },
    { genre_name: "novels - mystery" },
    { genre_name: "novels - adventure" },
    { genre_name: "comic books" },
    { genre_name: "textbooks" },
    { genre_name: "self-help books" },
    { genre_name: "essay" },
    { genre_name: "cookbooks" },
  ]);
};
