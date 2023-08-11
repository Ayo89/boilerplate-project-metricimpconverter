function ConvertHandler() {
this.getNum = function (input) {
  let result;
  const regex = /^[\d+\-*/.]+/;
  const fractionRegex = /^(\d*(?:\.\d+)?)(?:\/(\d*(?:\.\d+)?))?$/;
  const doubleFractionRegex = /\/.*\//;

  const numString = input.split(/[a-zA-Z]/)[0]; // Split input to get the number string

  if (doubleFractionRegex.test(numString)) {
    return "invalid number";
  }

  if (!numString) {
    return 1; // Default value if no number is provided
  }

  const fractionMatch = numString.match(fractionRegex);
  if (!fractionMatch) {
    return "invalid number";
  }

  if (fractionMatch[2]) {
    // If there's a denominator in the fraction
    result = parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
  } else {
    result = parseFloat(fractionMatch[1]);
  }

  return isNaN(result) ? "invalid number" : result;
};

this.getUnit = function (input) {
  let result;
  const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
  const unitRegex = /[a-zA-Z]+$/;
  result = input.match(unitRegex);

  if (result) {
    const unit = result[0].toLowerCase();
    if (unit === "l") {
      return "L"; 
    }
    if (validUnits.includes(unit)) {
      return unit;
    }
  }

  return "invalid unit";
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
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    result = unitNames[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = parseFloat(initNum * galToL);
        break;
      case "lbs":
        result = parseFloat(initNum * lbsToKg);
        break;
      case "mi":
        result = parseFloat(initNum * miToKm);
        break;
      case "L":
        result = parseFloat(initNum / galToL);
        break;
      case "kg":
        result = parseFloat(initNum / lbsToKg);
        break;
      case "km":
        result = parseFloat(initNum / miToKm);
        break;
    }
    
    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if(initNum === "invalid number" && initUnit === "invalid unit"){
      return 'invalid number and unit';
    }
    result = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${
        returnNum === "invalid number" ? "invalid number" : parseFloat(returnNum)
      } ${this.spellOutUnit(returnUnit)}`,
    };

    return result;
  };

}

module.exports = ConvertHandler;
