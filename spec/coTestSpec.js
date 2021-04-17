const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  it("Cuando el producto expira (ya no hay días restantes en sellIn), price se reduce al doble de velocidad.", function() {
    const coTest = new CarInsurance([
      new Product("Full Coverage", 10, 10)
    ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("fixme");
  });

  // El price del producto nunca es negativo.
  // El producto "Full Coverage" aumenta el price en vez de reducirlo a medida que pasa el tiempo.
  // El price de un producto nunca es más de 50.
  // "Mega Coverage" es un producto legendario así que no baja de precio ni tiene expiración.
  // "Special Full Coverage", al igual que Full Coverage, aumenta el price a medida que sellIn llega a 0:
  // price aumenta en 2 cuando solo quedan 10 días o menos y por 3 cuando quedan 5 días o menos. Pero...
  // price baja directo a 0 cuando ya no quedan días y está expirado.
});
