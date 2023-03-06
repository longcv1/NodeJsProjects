const CarFactory = require('./car-factory');

const typeCar = {
    petrol: 'petrol',
    electric: 'electric',
}

const car = CarFactory.createType(typeCar.electric, 'TOY');
console.log(car);

