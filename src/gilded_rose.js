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

function update_quality() {

    for (var i = 0; i < items.length; i++) {
        switch (items[i].name) {
            case 'Aged Brie':
                update_brie(items[i])
                break
            case 'Backstage passes to a TAFKAL80ETC concert':
                update_concert(items[i])
                break
            case 'Sulfuras, Hand of Ragnaros':
                break
            case 'Conjured Mana Cake':
                update_conjured(items[i])
                break
            default:
                update_normal(items[i])
        }
    }
}

function update_normal(item) {
    item.quality = item.quality - 1
    item.sell_in = item.sell_in - 1
    if (item.sell_in < 0) item.quality = item.quality - 1
}

function update_conjured(item) {
    item.quality = item.quality - 2
    item.sell_in = item.sell_in - 1
    if (item.sell_in < 0) item.quality = item.quality - 2
}

function update_brie(item) {
    item.sell_in = item.sell_in - 1;
    if (item.quality < 50) {
        // Quality Increases
        item.quality = item.quality + 1
        if (item.sell_in < 0) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
    }
}

function update_concert(item) {
    if (item.quality < 50) {
        item.quality = item.quality + 1
    }

    if (item.sell_in < 11) {
        // If backstage pass sell in within 10 days, increase quality again
        if (item.quality < 50) {
            // Backstage pass quality increases again (second time)
            item.quality = item.quality + 1
        }
    }

    if (item.sell_in < 6) {
        // If backstage pass sell in within 5 days, increase quality again
        if (item.quality < 50) {
            // Backstage pass quality increases again (third time)
            item.quality = item.quality + 1
        }
    }

    item.sell_in = item.sell_in - 1

    if (item.sell_in < 0)
        item.quality = item.quality - item.quality
}
