const knex = require("./knex");

const RECORD_TABLE = "record";
const BOOK_TABLE = "book";
const USER_TABLE = "user";

module.exports = {
  RECORD_TABLE,
  BOOK_TABLE,
  USER_TABLE,

  /**
   * @param {number} userId - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */
  getBookRecord(userId, bookId, recordId) {
    return knex(RECORD_TABLE)
      .join(BOOK_TABLE, "record.book_id", "book.id")
      .select({
        id: "record.id",
        bookId: "record.book_id",
        date: "record.date",
        time: "record.time",
        place: "record.place",
        review: "record.review",
      })
      .from(RECORD_TABLE)
      .where({
        "book.id": bookId,
        "book.user_id": userId,
        "record.id": recordId,
      })
      .catch((err) => {
        throw Error(err);
      });
  },

  /**
   * @param {number} limit - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */
  getBookRecords(userId, bookId, limit = 200) {
    return knex(RECORD_TABLE)
      .join(BOOK_TABLE, "record.book_id", "book.id")
      .select({
        id: "record.id",
        book_id: "record.book_id",
        date: "record.date",
        time: "record.time",
        place: "record.place",
        review: "record.review",
      })
      .from(RECORD_TABLE)
      .where({
        "book.id": bookId,
        "book.user_id": userId,
      })
      .limit(limit)
      .catch((err) => {
        throw Error(err);
      });
  },

  /**
   * @param {number} userId - The user id.
   * @param {number} bookId - The book id.
   * @return {Promise<Object>} A promise that resolves to the customer that matches the id.
   */
  getBook(userId, bookId) {
    return knex
      .select({
        id: "id",
      })
      .from(BOOK_TABLE)
      .where({
        id: bookId,
        user_id: userId,
      })
      .catch((err) => {
        throw Error(err);
      });
  },

  /**
   * @param {Object} record - The new reading record to add.
   * @return {Promise<number>} A promise that resolves to the id of created customer.
   */
  addRecord(record) {
    return knex(RECORD_TABLE)
      .returning("id")
      .insert(record)
      .catch((err) => {
        throw Error(err);
      });
  },

  /**
   * @param {number} id - The unique id of the existing record.
   * @param {Object} record - The record data to change.
   * @return {Promise<number>} A promise that resolves to the id of the updated customer.
   */
  recordUpdate(id, record) {
    return knex(RECORD_TABLE)
      .returning("id")
      .update(record)
      .where("id", id)
      .then(() => id);
  },

  /**
   * @param {number} id - The unique id of the existing record.
   * @return {Promise<number>} A promise that resolves to the id of the updated customer.
   */
  recordDelete(id) {
    return knex(RECORD_TABLE)
      .returning("id")
      .where("id", id)
      .del()
      .then(() => id);
  },
};
