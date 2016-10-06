class GildedRoseItem {
    constructor(name, sell_in, quality) {
        this.name = name;
        this.sell_in = sell_in;
        this.quality = quality;
    }

    update_details() {
        update_sell_in()
        update_quality()
    }

    update_quality() {
        if (this.sell_in < 0) {
            if (this.quality >= 2) {
                this.quality -= 2
            } else if (this.quality > 0) {
                this.quality -= 1
            }
        } else {
            if (this.quality > 0) {
                this.quality = this.quality - 1
            }
        }
    }

    update_sell_in() {
        this.sell_in -= 1;
    }
}

class AgedBrie extends GildedRoseItem {
    constructor(name, sell_in, quality) {
        super(name, sell_in, quality)
    }

    update_quality() {
        if (this.sell_in < 0) {
            this.quality += 2
        } else {
            this.quality += 1
        }

        if (this.quality > 50) {
            this.quality = 50
        }
    }
}

class Sulfuras {
    constructor(name, sell_in, quality) {
        super(name, sell_in, quality)
    }

    update_details() {}

    update_quality() {}

    update_sell_in() {}
}

class BackstagePasses {
    constructor(name, sell_in, quality) {
        super(name, sell_in, quality)
    }

    update_quality() {
        if (this.sell_in < 0) {
            this.quality = 0
        } else if (this.sell_in < 5) {
            this.quality += 3
        } else if (this.sell_in < 10) {
            this.quality += 2
        } else if (this.sell_in >= 10) {
            this.quality += 1
        }
    }
}

class Conjured {
    constructor(name, sell_in, quality) {
        super(name, sell_in, quality)
    }

    update_quality() {
        if (this.quality > 0) {
            this.quality -= 2
        }
    }
}
