/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('book').insert([
    {id: 1, user_id: 1, book_name: "book1", author: "author1", genre_id: 1, media: "Physical book"},
    {id: 2, user_id: 1, book_name: "book2", author: "author2", genre_id: 2, media: "Kindle"},
    {id: 3, user_id: 1, book_name: "book3", author: "author3", genre_id: 3, media: "PDF"},
    {id: 4, user_id: 1, book_name: "book4", author: "author4", genre_id: 4, media: "PDF"},
    {id: 5, user_id: 1, book_name: "book5", author: "author5", genre_id: 5, media: "PDF"},
    {id: 6, user_id: 2, book_name: "book6", author: "author6", genre_id: 6, media: "Kindle"},
    {id: 7, user_id: 2, book_name: "book7", author: "author7", genre_id: 7, media: "Kindle"},
    {id: 8, user_id: 2, book_name: "book8", author: "author8", genre_id: 8, media: "Kindle"},
    {id: 9, user_id: 2, book_name: "book9", author: "author9", genre_id: 9, media: "Kindle"},
    {id: 10, user_id: 2, book_name: "book10", author: "author10", genre_id: 1, media: "Physical book"},
    {id: 11, user_id: 3, book_name: "book1", author: "author1", genre_id: 1, media: "Physical book"},
    {id: 12, user_id: 3, book_name: "book2", author: "author2", genre_id: 2, media: "Kindle"},
    {id: 13, user_id: 3, book_name: "book3", author: "author3", genre_id: 3, media: "PDF"},
    {id: 14, user_id: 3, book_name: "book4", author: "author4", genre_id: 4, media: "PDF"},
    {id: 15, user_id: 3, book_name: "book5", author: "author5", genre_id: 5, media: "PDF"},
    {id: 16, user_id: 4, book_name: "book6", author: "author6", genre_id: 6, media: "Kindle"},
    {id: 17, user_id: 4, book_name: "book7", author: "author7", genre_id: 7, media: "Kindle"},
    {id: 18, user_id: 4, book_name: "book8", author: "author8", genre_id: 8, media: "Kindle"},
    {id: 19, user_id: 4, book_name: "book9", author: "author9", genre_id: 9, media: "Kindle"},
    {id: 20, user_id: 4, book_name: "book10", author: "author10", genre_id: 1, media: "Physical book"},
    {id: 21, user_id: 5, book_name: "book1", author: "author1", genre_id: 1, media: "Physical book"},
    {id: 22, user_id: 5, book_name: "book2", author: "author2", genre_id: 2, media: "Kindle"},
    {id: 23, user_id: 5, book_name: "book3", author: "author3", genre_id: 3, media: "PDF"},
    {id: 24, user_id: 5, book_name: "book4", author: "author4", genre_id: 4, media: "PDF"},
    {id: 25, user_id: 5, book_name: "book5", author: "author5", genre_id: 5, media: "PDF"},
    {id: 26, user_id: 5, book_name: "book6", author: "author6", genre_id: 6, media: "Kindle"},
    {id: 27, user_id: 5, book_name: "book7", author: "author7", genre_id: 7, media: "Kindle"},
    {id: 28, user_id: 5, book_name: "book8", author: "author8", genre_id: 8, media: "Kindle"},
    {id: 29, user_id: 6, book_name: "book9", author: "author9", genre_id: 9, media: "Kindle"},
    {id: 30, user_id: 6, book_name: "book10", author: "author10", genre_id: 1, media: "Physical book"},
  ]);
};
