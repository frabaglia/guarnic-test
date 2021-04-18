const {
    MEGA_COVERAGE
} = require('./constants');

class PriceRepo {
    constructor() {
        this.MEGA_COVERAGE_DEFAULT_PRICE = 80;
        this.MAX_PRICE = 50;
        this.MIN_PRICE = 0;
    }

    priceLimit(p, name) {
        if (name === MEGA_COVERAGE) return this.MEGA_COVERAGE_DEFAULT_PRICE;
        else return Math.max(this.MIN_PRICE, Math.min(p, this.MAX_PRICE));
    }
    lowUpdate(p, sellIn) {
        p = p - 1
        if (sellIn < 0) {
            p = p - 1
        }
        return p
    }
    medUpdate(p, sellIn) {
        p = p - 1
        if (sellIn < 0) {
            p = p - 1
        }
        return p
    }
    fullUpdate(p, sellIn) {
        p = p + 1
        if (sellIn < 0) {
            p = p + 1
        }
        return p
    }
    megaUpdate() {
        return this.MEGA_COVERAGE_DEFAULT_PRICE
    }
    sfUpdate(p, sellIn) {
        p = p + 1
        if (sellIn <= 10) {
            if (sellIn <= 5) {
                p = p + 1
            }
            p = p + 1
        }

        if (sellIn < 0) {
            p = 0
        }

        return p
    }
    ssUpdate(p) {
        return p - 2
    }
}

module.exports = new PriceRepo();