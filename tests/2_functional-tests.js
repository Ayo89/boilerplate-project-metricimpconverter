const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.property(res.body, "initNum");
        assert.property(res.body, "initUnit");
        assert.property(res.body, "returnNum");
        assert.property(res.body, "returnUnit");
        done();
      });
  });

  test("Convert an invalid input such as 32g", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test("Convert an invalid input such as 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (error, res) {
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test("Convert an invalid input such as 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=33/7.2/4kilomegagram")
      .end(function (error, res) {
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number such as kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (error, res) {
        assert.property(res.body, "initNum");
        assert.property(res.body, "initUnit");
        assert.property(res.body, "returnNum");
        assert.property(res.body, "returnUnit");
        done();
      });
  });
});
