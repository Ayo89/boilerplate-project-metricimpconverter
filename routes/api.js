"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.status(500).send("invalid number AND unit");
    } else if (initNum === "invalid number") {
      return res.status(500).send("invalid number");
    } else if (initUnit === "invalid unit") {
      return res.status(500).send("invalid unit");
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json(toString);
  });
};
