// テストの準備
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

// サーバー起動
const server = setupServer();

// テストコード処理部分
describe("Reading API Server", () => {
  // テストの都度リクエスト作成
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  // ベースシナリオ
  describe("basics", () => {
    // 【GET】読書の記録取得API
    describe("GET /users/:user_id/books/:book_id/ - get all Record per book", () => {
      // 正常系
      it("should return all Record per book", async () => {
        // 準備
        const compareData1 = {
          book_id: 1,
          date: "2023/11/01",
          time: 100,
          place: "home",
          review: 3.0,
        };
        const compareData2 = {
          book_id: 1,
          date: "2023/11/07",
          time: 150,
          place: "home",
          review: 4.0,
        };
        const compareData3 = {
          book_id: 1,
          date: "2023/11/10",
          time: 180,
          place: "home",
          review: 5.0,
        };

        // 実行
        const res = await request.get("/users/1/books/1");
        const resData = JSON.parse(res.text);

        //検証準備（ID自動採番のため検証対象外）
        compareData1.id = resData.records[0].id;
        compareData2.id = resData.records[1].id;
        compareData3.id = resData.records[2].id;

        // 検証
        res.should.be.json;
        resData.records.length.should.equal(3);
        resData.records[0].should.deep.equal(compareData1);
        resData.records[1].should.deep.equal(compareData2);
        resData.records[2].should.deep.equal(compareData3);
      });

      // 異常系 - 0件検証
      it("should return empty", async () => {
        // 実行
        const res = await request.get("/users/0/books/0");
        const resData = JSON.parse(res.text);

        //検証
        resData.should.deep.equal({ records: [] });
      });

      // 異常系 - パラメータ不備
      it("should return Status 400", async () => {
        // 実行
        const res = await request.get("/users/AAA/books/AAA");

        //検証
        res.should.have.status(400);
      });
    });

    // 【POST】読書の記録投稿API
    describe("POST /users/:user_id/books/:book_id - Add Record per book", () => {
      // 正常系
      it("should Add a Record", async () => {
        // 準備
        const addData = {
          date: "2023/11/14",
          time: 200,
          place: "cafe",
          review: 1.0,
        };

        // 実行
        const resPost = await request.post("/users/2/books/6").send(addData);

        //検証準備
        request = chai.request(server);
        const resGet = await request.get("/users/2/books/6");
        const resData = JSON.parse(resGet.text);

        //検証
        resPost.should.have.status(200);

        resData.records[resData.records.length - 1].book_id.should.equal(6);
        resData.records[resData.records.length - 1].date.should.equal(
          addData.date
        );
        resData.records[resData.records.length - 1].time.should.equal(
          addData.time
        );
        resData.records[resData.records.length - 1].place.should.equal(
          addData.place
        );
        resData.records[resData.records.length - 1].review.should.equal(
          addData.review
        );
      });

      // 異常系 - 対象データなし
      it("should return Status 404", async () => {
        // 準備
        const addData = {
          date: "2023/11/14",
          time: 200,
          place: "cafe",
          review: 1.0,
        };
        // 実行
        const res = await request.post("/users/0/books/0").send(addData);

        //検証
        res.should.have.status(404);
      });

      // 異常系 - リクエストデータの型誤り
      it("should return Status 400", async () => {
        // 準備
        const nonRegularData = {
          date: "2023/11/14",
          time: "AAA",
          place: 100,
          review: "A",
        };

        // 実行
        const res = await request.post("/users/2/books/6").send(nonRegularData);

        //検証
        res.should.have.status(400);
      });
    });

    // 【PATCH】読書の記録修正API
    describe("PATCH /users/:user_id/books/:book_id/records/:redord_id - Update Record", () => {
      // 正常系
      it("should Update a Record", async () => {
        // 準備
        const resGet = await request.get("/users/3/books/11");
        const resData = JSON.parse(resGet.text);
        const targetRecordId = resData.records[0].id;
        const patchData = {
          date: "2022/11/14",
          time: 200,
          place: "home",
          review: 4.5,
        };
        const compareData = {
          id: targetRecordId,
          book_id: 11,
          date: "2022/11/14",
          time: 200,
          place: "home",
          review: 4.5,
        };

        // 実行
        request = chai.request(server);
        const resPatch = await request
          .patch("/users/3/books/11/records/" + targetRecordId)
          .send(patchData);

        request = chai.request(server);
        const resGet2 = await request.get("/users/3/books/11");
        const resData2 = JSON.parse(resGet2.text);
        //検証
        resPatch.should.have.status(200);
        //console.log(resData2);
        const targetRecord = resData2.records.filter(
          (data) => data.id == targetRecordId
        );
        //console.log("targetId"+targetRecordId);
        targetRecord[0].book_id.should.equal(11);
        targetRecord[0].date.should.equal(compareData.date);
        targetRecord[0].time.should.equal(compareData.time);
        targetRecord[0].place.should.equal(compareData.place);
        targetRecord[0].review.should.equal(compareData.review);
      });

      // 異常系 - 対象データなし
      it("should return Status 404", async () => {
        // 実行
        const res = await request.patch("/users/3/books/11/records/0");

        //検証
        res.should.have.status(404);
      });

      // 異常系 - リクエストデータの型誤り
      it("should return Status 400", async () => {
        // 準備
        const resGet = await request.get("/users/3/books/11");
        const resData = JSON.parse(resGet.text);
        const targetRecordId = resData.records[0].id;
        const patchData = {
          date: "2022/11/14",
          time: "AA",
          place: 10,
          review: "S",
        };

        // 実行
        request = chai.request(server);
        const resPatch = await request
          .patch("/users/3/books/11/records/" + targetRecordId)
          .send(patchData);

        //検証
        resPatch.should.have.status(400);
      });
    });

    // 【DELETE】読書の記録削除API
    describe("DELETE /users/:user_id/books/:book_id/records/:redord_id - Delete Record", () => {
      // 正常系
      it("should Delete a Record", async () => {
        // 準備
        const addData = {
          date: "2023/11/14",
          time: 200,
          place: "cafe",
          review: 1.0,
        };
        const resPost = await request.post("/users/3/books/12").send(addData);

        request = chai.request(server);
        const resGet = await request.get("/users/3/books/12");
        const resData = JSON.parse(resGet.text);
        const targetRecordId = resData.records[0].id;

        // 実行
        request = chai.request(server);
        const res = await request.delete(
          "/users/3/books/12/records/" + targetRecordId
        );

        //検証
        res.should.have.status(200);
      });

      // 異常系 - 対象データなし
      it("should return Status 404", async () => {
        // 実行
        const res = await request.delete("/users/4/books/160/records/0");

        //検証
        res.should.have.status(404);
      });
    });
  });
});
