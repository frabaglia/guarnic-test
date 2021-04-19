const { Product, CarInsurance } = require('./src/coTest');
const fs = require('fs');

const productsAtDayZero = [
    new Product('Medium Coverage', 10, 20),
    new Product('Full Coverage', 2, 0),
    new Product('Low Coverage', 5, 7),
    new Product('Mega Coverage', 0, 80),
    new Product('Mega Coverage', -1, 80),
    new Product('Special Full Coverage', 15, 20),
    new Product('Special Full Coverage', 10, 49),
    new Product('Special Full Coverage', 5, 49),
    new Product('Super Sale', 3, 6),
];

const carInsurance = new CarInsurance(productsAtDayZero);
const data = {};

carInsurance.products.forEach((product, index) => {
    data[index] = {
        name : product.name,
        prices: []
    };
    data[index].prices.push(product.price);
});

for (let i = 1; i <= 30; i += 1) {
    carInsurance.updatePrice().forEach((product, index) => {
        data[index].prices.push(product.price);
    });
}

fs.writeFile(__dirname + '/viz/public/30days.json', JSON.stringify(data), function (){
    console.log(data);
});