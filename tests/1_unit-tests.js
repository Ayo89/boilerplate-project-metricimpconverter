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

    test("should return the correct return unit for each valid input unit.", function () {
      const unitMap = {
        gal: "l",
        l: "gal",
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
        l: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };
      Object.keys(unitNames).forEach((unit) => {
        assert.equal(convertHandler.spellOutUnit(unit), unitNames[unit]);
      });
    });

    test("should correctly convert", function () {
      const conversionFactors = {
        gal: 3.78541,
        L: 1 / 3.78541,
        mi: 1.60934,
        km: 1 / 1.60934,
        lbs: 0.453592,
        kg: 1 / 0.453592,
      };

      const unitMap = {
        gal: "L",
        L: "gal",
        mi: "km",
        km: "mi",
        lbs: "kg",
        kg: "lbs",
      };

      for (let unit in unitMap) {
        let input = 5;
        let expectedOutput = (input * conversionFactors[unit]).toFixed(5);
        assert.equal(
          convertHandler.convert(input, unit),
          expectedOutput
        );
      }
    });
  });
});
