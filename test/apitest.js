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
    beforeEach(() =>{
        request = chai.request(server);
    });
    
    // ベースシナリオ
    describe("basics", () => {
        // 【GET】読書の記録取得API
        describe("GET /users/:user_id/books/:book_id/ - get all Record per book", () => {
            // 正常系
            it("should return all Record per book", async () => {
              // 準備
              const compareData1 = {id: 1, book_id: 1, date: "2023/11/01", time: 100, place: "home", review: 3.0};
              const compareData2 = {id: 2, book_id: 1, date: "2023/11/07", time: 150, place: "home", review: 4.0};
              const compareData3 = {id: 3, book_id: 1, date: "2023/11/10", time: 180, place: "home", review: 5.0};
              
              // 実行
              const res = await request.get("/users/1/books/1/");
              const resData = JSON.parse(res.text);
      
              //検証
              res.should.be.json;
              resData.length.should.equal(3);
              resData[0].should.deep.equal(compareData1);
              resData[1].should.deep.equal(compareData2);
              resData[2].should.deep.equal(compareData3);
            });
            
            // 異常系 - 0件検証
            it("should return empty", async () => {
              // 実行
              const res = await request.get("/users/0/books/0/");
              const resData = JSON.parse(res.text);
      
              //検証
              resData.should.deep.equal([]);
            });

            // 異常系 - パラメータ不備
            it("should return Status 400", async () => {
                // 実行
                const res = await request.get("/users/AAA/books/AAA/");
        
                //検証
                res.should.have.status(400);
              });
          });


        // 【POST】読書の記録投稿API
        describe("POST /users/:user_id/books/:book_id/ - Add Record per book", () => {
            // 正常系
            it("should Add a Record", async () => {
                // 準備
                const addData = { date: "2023/11/14", time: 200, place: "cafe", review: 1.0 };

                // 実行
                const resPost = await request.post("/users/1/books/1/").send(addData);
                
                //検証準備
                const resGet = await request.get("/users/1/books/1/");
                const resData = JSON.parse(resGet.text);
        
                //検証
                resPost.should.have.status(200);

                resData.should.be.json;
                resData[resData.length - 1].book_id.should.equal(1);
                resData[resData.length - 1].date.should.equal(addData.date);
                resData[resData.length - 1].time.should.equal(addData.time);
                resData[resData.length - 1].place.should.equal(addData.place);
                resData[resData.length - 1].review.should.equal(addData.review);

            });
            
            // 異常系 - 対象データなし
            it("should return Status 404", async () => {
              // 実行
              const res = await request.post("/users/0/books/0/");
      
              //検証
              res.should.have.status(404);
            });

            // 異常系 - リクエストデータの型誤り
            it("should return Status 400", async () => {
                // 準備
                const nonRegularData = { date: "2023/11/14", time: "AAA", place: 100, review: "A" };

                // 実行
                const res = await request.post("/users/1/books/1/");
        
                //検証
                res.should.have.status(400);
              });
          });
        
        // 【PATCH】読書の記録修正API
        describe("POST /users/:user_id/books/:book_id/ - Add Record per book", () => {
            // 正常系
            it("should Add a Record", async () => {
                // 準備
                const addData = { date: "2023/11/15", time: 300, place: "cafe", review: 2.0 };
                const resPost = await request.post("/users/1/books/1/").send(addData);
                const resGet = await request.get("/users/1/books/1/");
                const resData = JSON.parse(resGet.text);
                const targetRecordId = resData[resData.length - 1].id;
                const patchData = {date: "2022/11/14", time: 200, place: "home", review: 4.5};
                const compareData = { id: targetRecordId, book_id: 1, date: "2022/11/14", time: 200, place: "home", review: 4.5};

                // 実行
                const resPatch = await request.patch("/users/1/books/1/records/"+targetRecordId+"/").send(patchData);
        
                //検証
                resPatch.should.be.json;
                const compareRes = resPatch.filter(data => data.id = targetRecordId);
                compareRes[0].book_id.should.equal(1);
                compareRes[0].date.should.equal(compareData.date);
                compareRes[0].time.should.equal(compareData.time);
                compareRes[0].place.should.equal(compareData.place);
                compareRes[0].review.should.equal(compareData.review);

            });
            
            // 異常系 - 対象データなし
            it("should return Status 404", async () => {
              // 実行
              const res = await request.patch("/users/1/books/1/records/0/");
      
              //検証
              res.should.have.status(404);
            });

            // 異常系 - リクエストデータの型誤り
            it("should return Status 400", async () => {
                // 準備
                const addData = { date: "2023/11/15", time: 300, place: "cafe", review: 2.0 };
                await request.post("/users/1/books/1/").send(addData);
                const resGet = await request.get("/users/1/books/1/");
                const resData = JSON.parse(resGet.text);
                const targetRecordId = resData[resData.length - 1].id;
                const patchData = {date: "2022/11/14", time: "AA", place: 10, review: "S"};

                // 実行
                const resPatch = await request.patch("/users/1/books/1/records/"+targetRecordId+"/").send(patchData);

        
                //検証
                resPatch.should.have.status(400);
              });
          });

        // 【DELETE】読書の記録削除API
            // 正常系
            it("should Add a Record", async () => {
                // 準備
                const addData = { date: "2023/11/15", time: 300, place: "cafe", review: 2.0 };
                const resPost = await request.post("/users/1/books/1/").send(addData);
                const resGet = await request.get("/users/1/books/1/");
                const resData = JSON.parse(resGet.text);
                const targetRecordId = resData[resData.length - 1].id;

                // 実行
                const resDelete = await request.delete("/users/1/books/1/records/"+targetRecordId+"/");
        
                //検証
                resDelete.shoud.have.status(400);
                const res = resDelete.filter(data => data.id = targetRecordId);
                res.length.should.equal(0);

            });
            
            // 異常系 - 対象データなし
            it("should return Status 404", async () => {
              // 実行
              const res = await request.patch("/users/1/books/1/records/0/");
      
              //検証
              res.should.have.status(404);
            });
    });
});