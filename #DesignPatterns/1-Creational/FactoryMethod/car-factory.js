const PetrolCar = require("./petrol-car");
const ElectricCar = require("./electric-car");

class CarFactory {
  constructor() {}
  createType(type, name) {
    switch (type) {
      case "petrol":
        return new PetrolCar(name);
        break;
      case "electric":
        return new ElectricCar(name);
        break;
    }
  }
};

module.exports = new CarFactory();
