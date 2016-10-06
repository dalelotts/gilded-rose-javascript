function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_qualityOld() {
    for (var i = 0; i < items.length; i++) {
        if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (items[i].quality > 0) {
                if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                    items[i].quality = items[i].quality - 1
                }
            }
        } else {
            if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
                if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (items[i].sell_in < 11) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1
                        }
                    }
                    if (items[i].sell_in < 6) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1
                        }
                    }
                }
            }
        }

        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
            items[i].sell_in = items[i].sell_in - 1;
        }

        if (items[i].sell_in < 0) {
            if (items[i].name != 'Aged Brie') {
                if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                    if (items[i].quality > 0) {
                        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                            items[i].quality = items[i].quality - 1
                        }
                    }
                } else {
                    items[i].quality = items[i].quality - items[i].quality
                }
            } else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1
                }
            }
        }
    }
}

function update_quality() {

    for (var i = 0; i < items.length; i++) {

        if (items[i].name === ('Sulfuras, Hand of Ragnaros')) {
            continue
        }

        items[i].sell_in = items[i].sell_in - 1;

        switch (items[i].name) {
            case 'Aged Brie':
                agedBrieAging(items[i])
                break;

            case 'Backstage passes to a TAFKAL80ETC concert':
                backStateAging(items[i])
                break;

            case 'Conjured Mana Cake':
                conjuredAging(items[i])
                break;

            default:
                normalAging(items[i])
        }
    }
}

function agedBrieAging(item) {
    if (item.sell_in < 0) {
        item.quality = item.quality + 2
    } else {
        item.quality = item.quality + 1
    }

    if (item.quality > 50) {
        item.quality = 50
    }
}

function backStateAging(item) {
    if (item.sell_in < 0) {
        item.quality = 0
        return
    }

    item.quality = item.quality + 1

    if (item.sell_in < 5) {
        item.quality = item.quality + 1
    }

    if (item.sell_in < 10) {
        item.quality = item.quality + 1
    }
}

function conjuredAging(item) {
    if (item.quality > 0) {
        item.quality = item.quality - 2
    }
}

function normalAging(item) {
    if (item.quality > 0) {
        item.quality = item.quality - 1
    }

    if (item.sell_in < 0) {
        if (item.quality >= 2) {
            item.quality = item.quality - 2
        } else if (item.quality > 0) {
            item.quality = item.quality - 1
        }
    }
}

function update_qualityNewest() {
    for (var i = 0; i < items.length; i++) {
        item.update_details();
    }
}
