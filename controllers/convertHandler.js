function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    const regex = /^[\d+\-*/.]+$/;
    const doubleFractionRegex = /\/.*\//;
    filter = Array.from(input).filter((char) => regex.test(char));
    result = filter.join("");
    result = eval(result);
    if (doubleFractionRegex.test(input)) {
      return "invalid number";
    }
    if (isNaN(result)) {
      result = 1;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const unitRegex = /[a-zA-Z]+$/;
    result = input.match(unitRegex);

    if (result && validUnits.includes(result[0].toLowerCase())) {
      return result[0].toLowerCase();
    } else {
      return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    result = unitMap[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const unitNames = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    result = unitNames[unit];
    return result;
  };

  this.convert = function (initUnit, initNum = 1) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return result.toFixed(5);
  };
  console.log(this.convert('L'))

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
    };

    return result;
  };
}

module.exports = ConvertHandler;
