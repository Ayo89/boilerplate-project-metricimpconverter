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
      const units = ["gal", "L", "mi", "km", "lbs", "kg"];
      units.forEach((unit) => {
        assert.equal(convertHandler.getUnit(`5${unit}`), unit);
      });
    });

    test("should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.getUnit("5gall"), "invalid unit");
    });

    test("should return the correct return unit for each valid input unit.", function () {
      const unitMap = {
        gal: "L",
        L: "gal",
        mi: "km",
        km: "mi",
        lbs: "kg",
        kg: "lbs",
      };
      Object.keys(unitMap).forEach((unit) => {
        assert.equal(convertHandler.getReturnUnit(unit), unitMap[unit]);
      });
    });

    test(" should correctly return the spelled-out string unit for each valid input unit.", function () {
      const unitNames = {
        gal: "gallons",
        L: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };
      Object.keys(unitNames).forEach((unit) => {
        assert.equal(convertHandler.spellOutUnit(unit), unitNames[unit]);
      });
    });

    test("should return the correct return unit for 'gal'", function () {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });

    test("should return the correct return unit for 'L'", function () {
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
    });

    test("should return the correct return unit for 'mi'", function () {
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
    });

    test("should return the correct return unit for 'km'", function () {
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
    });

    test("should return the correct return unit for 'lbs'", function () {
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });

    test("should return the correct return unit for 'kg'", function () {
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
  });
});
