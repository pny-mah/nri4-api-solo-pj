const express = require("express");
const model = require("./model");
const paramChk = function (userId, bookId, recordId = 1) {
  if (
    !userId ||
    isNaN(userId) ||
    !bookId ||
    isNaN(bookId) ||
    !recordId ||
    isNaN(recordId)
  ) {
    return true;
  }
};

const formatDate = function (date) {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const validateRecords = function (
  date = "2020/01/01",
  time = 1,
  place = "home",
  review = 0.0
) {
  const tmpDate = new Date(date);
  const dateFlg = isNaN(tmpDate.getDate());

  if (
    dateFlg ||
    typeof time !== "number" ||
    typeof place !== "string" ||
    typeof review !== "number"
  ) {
    return false;
  } else {
    return true;
  }
};

const BAD_REQUEST = { msg: "Bad Request" };
const NOT_FOUND = { msg: "Not Found" };
const SERVER_ERROR = { msg: "Internal Server Error" };
const SUCCESS = { msg: "Success" };

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/users/:user_id/books/:book_id", async (req, res) => {
    // 各クエリパラメータのチェック`400
    const paramUserId = req.params.user_id;
    const paramBookId = req.params.book_id;
    if (paramChk(paramUserId, paramBookId)) {
      return res.status(400).json(BAD_REQUEST);
    }

    // クエリ処理
    try {
      const record = await model.getBookRecords(paramUserId, paramBookId, 200);
      for (data of record) {
        data.date = formatDate(data.date);
      }
      // レスポンス作成（なければ空を返す）
      return res.status(200).json({ records: record });
    } catch (e) {
      return res.status(500).json({ msg: e });
    }
  });

  app.post("/users/:user_id/books/:book_id", async (req, res) => {
    // 各クエリパラメータのチェック`400
    const paramUserId = req.params.user_id;
    const paramBookId = req.params.book_id;
    if (paramChk(paramUserId, paramBookId)) {
      return res.status(400).json(BAD_REQUEST);
    }

    // TODO: reqBodyChk
    const data = req.body;
    if (!validateRecords(data.date, data.time, data.place, data.review)) {
      return res.status(400).json(BAD_REQUEST);
    }

    try {
      // 本、ユーザの対象件数確認。対象がなければ４０４返す
      const userOrBook = await model.getBook(paramUserId, paramBookId);
      if (userOrBook.length === 0) {
        return res.status(404).json(NOT_FOUND);
      }
      // レコード追加処理
      data.book_id = paramBookId;
      const addRes = await model.addRecord(data);

      // レスポンス作成
      res.status(200).json(SUCCESS);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: e });
    }
  });

  app.patch(
    "/users/:user_id/books/:book_id/records/:record_id",
    async (req, res) => {
      // 各クエリパラメータのチェック`400
      const paramUserId = req.params.user_id;
      const paramBookId = req.params.book_id;
      const paramRecordId = req.params.record_id;
      if (paramChk(paramUserId, paramBookId, paramRecordId)) {
        return res.status(400).json({ msg: "Bad Request" });
      }

      // TODO: reqBodyChk
      const data = req.body;
      if (!validateRecords(data.date, data.time, data.place, data.review)) {
        return res.status(400).json(BAD_REQUEST);
      }
      console.log(data);

      try {
        // 本、ユーザの対象件数確認。対象がなければ４０４返す
        const userOrBook = await model.getBook(paramUserId, paramBookId);
        console.log(paramBookId + ": " + paramUserId);
        console.log(userOrBook);
        if (userOrBook.length === 0) {
          return res.status(404).json(NOT_FOUND);
        }
        // レコード更新処理
        data.book_id = paramBookId;
        const patchRes = await model.recordUpdate(paramRecordId, data);
        console.log(patchRes);
        // レスポンス作成
        if (patchRes == 0) {
          return res.status(404).json(NOT_FOUND);
        }
        res.status(200).json(SUCCESS);
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: e });
      }
    }
  );

  app.delete(
    "/users/:user_id/books/:book_id/records/:record_id",
    async (req, res) => {
      // 各クエリパラメータのチェック`400
      const paramUserId = req.params.user_id;
      const paramBookId = req.params.book_id;
      const paramRecordId = req.params.record_id;
      if (paramChk(paramUserId, paramBookId, paramRecordId)) {
        return res.status(400).json({ msg: "Bad Request" });
      }

      // クエリ処理
      try {
        const targetRecord = await model.getBook(
          paramUserId,
          paramBookId,
          paramRecordId
        );
        console.log("targetRecord" + targetRecord);
        if (targetRecord.length === 0) {
          return res.status(404).json(NOT_FOUND);
        }
        const deleteRes = await model.recordDelete(paramRecordId);
        console.log(deleteRes);
        if (deleteRes) {
          return res.status(200).json(SUCCESS);
        } else {
          return res.status(404).json(NOT_FOUND);
        }
      } catch (e) {
        return res.status(500).json({ msg: e });
      }
    }
  );
  return app;
};

module.exports = { setupServer };
