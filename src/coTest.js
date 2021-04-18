const {
  LOW_COVERAGE,
  MEDIUM_COVERAGE,
  FULL_COVERAGE,
  MEGA_COVERAGE,
  SPECIAL_FULL_COVERAGE,
  SUPER_SALE
} = require('./constants');

const pr = require('../src/priceRepo');

class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    if (name === MEGA_COVERAGE) this.price = pr.MEGA_COVERAGE_DEFAULT_PRICE;
    else this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }

  updatePrice() {
    for (var i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      let price = product.price;
      let sellIn = product.sellIn;

      switch (product.name) {
        case LOW_COVERAGE:
          price = pr.lowUpdate(product.price, product.sellIn);
          break;
        case MEDIUM_COVERAGE:
          price = pr.medUpdate(product.price, product.sellIn);
          break;
        case FULL_COVERAGE:
          price = pr.fullUpdate(product.price, product.sellIn);
          break;
        case MEGA_COVERAGE:
          price = pr.megaUpdate(product.price, product.sellIn);
          break;
        case SPECIAL_FULL_COVERAGE:
          price = pr.sfUpdate(product.price, product.sellIn);
          break;
        case SUPER_SALE:
          price = pr.ssUpdate(product.price, product.sellIn);
          break;

        default:
          price = pr.lowUpdate(product.price, product.sellIn);
          break;
      }

      if (product.name != MEGA_COVERAGE) {
        sellIn = this.products[i].sellIn - 1;
      }
      product.price = pr.priceLimit(price, product.name);
      product.sellIn = sellIn;
    }

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
