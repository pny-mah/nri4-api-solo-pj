/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user").insert([
    { user_name: "user01" },
    { user_name: "user02" },
    { user_name: "user03" },
    { user_name: "user04" },
    { user_name: "user05" },
    { user_name: "user06" },
    { user_name: "user07" },
  ]);
};
