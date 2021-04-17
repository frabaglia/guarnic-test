const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;
const { LOW_COVERAGE, MEDIUM_COVERAGE, FULL_COVERAGE, MEGA_COVERAGE, SPECIAL_FULL_COVERAGE, SUPER_SALE } = require('../src/constants');

const carInsuarenceExample = () => new CarInsurance([
  new Product(LOW_COVERAGE, 1, 20),
  new Product(MEDIUM_COVERAGE, 1, 20),
  new Product(FULL_COVERAGE, 1, 20),
  new Product(MEGA_COVERAGE, 1, 20),
  new Product(SPECIAL_FULL_COVERAGE, 1, 20),
  new Product(SUPER_SALE, 1, 20)
]);

const lowUpdateTest = p => p - 1
const medUpdateTest = p => p - 1
const fullUpdateTest = p => p + 1
const megaUpdateTest = p => p
const sfUpdateTest = (p, sellIn) => {
  p = p + 1
  if (sellIn <= 10) {
    if (sellIn <= 5) {
      p = p + 1
    }
    p = p + 1
  }
  return p
}
const ssUpdateTest = p => p - 2

describe("Co Test", function() {

  it("Crear productos y actualizarlos corre sin excepciones.", function() {
    const ci = carInsuarenceExample();
    const products = ci.updatePrice();
    expect(products.length).equal(6);
  });

  it("updatePrice actualiza los precios correctamente.", function() {
    const ci = carInsuarenceExample(), ciInitialState = carInsuarenceExample();
    let products;

    console.log(ci.products);
    products = ci.updatePrice();
    console.log(products);
    
    /* LOW_COVERAGE */
    expect(products[0].price).equal(lowUpdateTest(ciInitialState.products[0].price));
    /* MEDIUM_COVERAGE */
    expect(products[1].price).equal(medUpdateTest(ciInitialState.products[1].price));
    /* FULL_COVERAGE */
    expect(products[2].price).equal(fullUpdateTest(ciInitialState.products[2].price));
    /* MEGA_COVERAGE */
    expect(products[3].price).equal(megaUpdateTest(ciInitialState.products[3].price));
    /* SPECIAL_FULL_COVERAGE */
    expect(products[4].price).equal(sfUpdateTest(ciInitialState.products[4].price, ciInitialState.products[4].sellIn));
    /* SUPER_SALE */
    expect(products[5].price).equal(ssUpdateTest(ciInitialState.products[5].price));
  });

  // El price del producto nunca es negativo.
  // El producto "Full Coverage" aumenta el price en vez de reducirlo a medida que pasa el tiempo.
  // El price de un producto nunca es más de 50.
  // "Mega Coverage" es un producto legendario así que no baja de precio ni tiene expiración.
  // "Special Full Coverage", al igual que Full Coverage, aumenta el price a medida que sellIn llega a 0:
  // price aumenta en 2 cuando solo quedan 10 días o menos y por 3 cuando quedan 5 días o menos. Pero...
  // price baja directo a 0 cuando ya no quedan días y está expirado.
});
