const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;
const {
  LOW_COVERAGE,
  MEDIUM_COVERAGE,
  FULL_COVERAGE,
  MEGA_COVERAGE,
  SPECIAL_FULL_COVERAGE,
  SUPER_SALE
} = require('../src/constants');

const pr = require('../src/priceRepo');

const carInsuarenceExample = () => new CarInsurance([
  new Product(LOW_COVERAGE, 1, 20),
  new Product(MEDIUM_COVERAGE, 1, 20),
  new Product(FULL_COVERAGE, 1, 20),
  new Product(MEGA_COVERAGE, 1, 20),
  new Product(SPECIAL_FULL_COVERAGE, 1, 20),
  new Product(SUPER_SALE, 1, 20)
]);

const copyCiState = ci => new CarInsurance(ci.products.map(p => new Product(p.name, p.sellIn, p.price)))

describe("Co Test", function () {
  const ITERATIONS = 3;
  
  it("Todos los productos tienen un sellIn que representa la cantidad de días restantes para poder vender el producto.", function () {
    const ci = carInsuarenceExample();
    expect(ci.products[0].sellIn).to.be.a('number');
    expect(ci.products[1].sellIn).to.be.a('number');
    expect(ci.products[2].sellIn).to.be.a('number');
    expect(ci.products[3].sellIn).to.be.a('number');
    expect(ci.products[4].sellIn).to.be.a('number');
    expect(ci.products[5].sellIn).to.be.a('number');
    const products = ci.updatePrice();
    expect(products[0].sellIn).to.be.a('number');
    expect(products[1].sellIn).to.be.a('number');
    expect(products[2].sellIn).to.be.a('number');
    expect(products[3].sellIn).to.be.a('number');
    expect(products[4].sellIn).to.be.a('number');
    expect(products[5].sellIn).to.be.a('number');
  });


  it("El price del producto nunca es negativo ni más de 50.", function () {
    // El price del producto nunca es negativo.
    // El price de un producto nunca es más de 50.

    ci = carInsuarenceExample();
    ciPrevState = copyCiState(ci);

    for (let i = 0; i < 100; i++) {
      products = ci.updatePrice();
      expect(products[0].price).not.to.be.above(pr.MAX_PRICE);
      expect(products[0].price).not.to.be.below(pr.MIN_PRICE);
      expect(products[1].price).not.to.be.above(pr.MAX_PRICE);
      expect(products[1].price).not.to.be.below(pr.MIN_PRICE);
      expect(products[2].price).not.to.be.above(pr.MAX_PRICE);
      expect(products[2].price).not.to.be.below(pr.MIN_PRICE);
      expect(products[3].price).to.be.equal(pr.MEGA_COVERAGE_DEFAULT_PRICE);
      expect(products[3].price).to.be.equal(pr.MEGA_COVERAGE_DEFAULT_PRICE);
      expect(products[4].price).not.to.be.above(pr.MAX_PRICE);
      expect(products[4].price).not.to.be.below(pr.MIN_PRICE);
      expect(products[5].price).not.to.be.above(pr.MAX_PRICE);
      expect(products[5].price).not.to.be.below(pr.MIN_PRICE);
      ciPrevState = copyCiState(ci);
    }    
  });

  /* LOW_COVERAGE */
  it(LOW_COVERAGE, function() {
    // Cuando el producto expira (ya no hay días restantes en sellIn), price se reduce al doble de velocidad.
    ci = carInsuarenceExample();
    ciPrevState = copyCiState(ci);

    for (let i = 0; i < ITERATIONS; i++) {
      products = ci.updatePrice();
      expect(products[0].price).equal(pr.lowUpdate(ciPrevState.products[0].price, ciPrevState.products[0].sellIn));
      ciPrevState = copyCiState(ci);
    }    
  });
  

  describe("updatePrice actualiza los precios correctamente.", function () {
    let ci, ciPrevState, products;
    
      /* LOW_COVERAGE */
      it(LOW_COVERAGE, function() {
        // Cuando el producto expira (ya no hay días restantes en sellIn), price se reduce al doble de velocidad.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[0].price).equal(pr.lowUpdate(ciPrevState.products[0].price, ciPrevState.products[0].sellIn));
          ciPrevState = copyCiState(ci);
        }    
      });
      
      /* MEDIUM_COVERAGE */
      it(MEDIUM_COVERAGE, function() {
        // Cuando el producto expira (ya no hay días restantes en sellIn), price se reduce al doble de velocidad.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[1].price).equal(pr.medUpdate(ciPrevState.products[1].price, ciPrevState.products[1].sellIn));
          ciPrevState = copyCiState(ci);
        }    
      });

      /* FULL_COVERAGE */
      it(FULL_COVERAGE, function() {
        // El producto "Full Coverage" aumenta el price en vez de reducirlo a medida que pasa el tiempo.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[2].price).equal(pr.fullUpdate(ciPrevState.products[2].price, ciPrevState.products[2].sellIn));
          ciPrevState = copyCiState(ci);
        }
      });

      /* MEGA_COVERAGE */
      it(MEGA_COVERAGE, function() {
        //"Mega Coverage" es un producto legendario así que no baja de precio ni tiene expiración.
        // Un producto nunca puede tener su price por encima de 50, sin embargo "Mega Coverage" es un producto legendario y su price es fijo en 80, nunca cambia.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[3].price).equal(pr.megaUpdate(ciPrevState.products[3].price));
          ciPrevState = copyCiState(ci);
        }
      });

      /* SPECIAL_FULL_COVERAGE */
      it(SPECIAL_FULL_COVERAGE, function() {
        //"Special Full Coverage", al igual que Full Coverage, aumenta el price a medida que sellIn llega a 0:
        //price aumenta en 2 cuando solo quedan 10 días o menos y por 3 cuando quedan 5 días o menos. Pero...
        //price baja directo a 0 cuando ya no quedan días y está expirado.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[4].price).equal(pr.sfUpdate(ciPrevState.products[4].price, ciPrevState.products[4].sellIn));
          ciPrevState = copyCiState(ci);
        }
      });

      /* SUPER_SALE */
      it(SUPER_SALE, function() {
        // "Super Sale" Baja el price al doble de la velocidad de los productos normales.
        ci = carInsuarenceExample();
        ciPrevState = copyCiState(ci);

        for (let i = 0; i < ITERATIONS; i++) {
          products = ci.updatePrice();
          expect(products[5].price).equal(pr.ssUpdate(ciPrevState.products[5].price));
          ciPrevState = copyCiState(ci);
        }
      });

  });
});