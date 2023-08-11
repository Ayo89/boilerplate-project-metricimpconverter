const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("32L"), 32);
    });

    test("should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("3.1mi"), 3.1);
    });

    test("should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("3/2km"), 1.5);
    });

    test("should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("3.6/2km"), 1.8);
    });

    test("should correctly return an error on a double-fraction", function () {
      assert.equal(convertHandler.getNum("3/2/3L"), "invalid number");
    });

    test("should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("km"), 1);
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("should correctly read each valid input unit", function () {
      const units = ["gal", "l", "mi", "km", "lbs", "kg"];
      units.forEach((unit) => {
        assert.equal(convertHandler.getUnit(`5${unit}`), unit);
      });
    });

    test("should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.getUnit("5gall"), "invalid unit");
    });
  });
});
