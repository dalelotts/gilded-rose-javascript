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

function itemClass(name) {
    if (name === 'Aged Brie') {
        return 'brie'
    }
    if (name === 'Sulfuras, Hand of Ragnaros') {
        return 'sulfuras'
    }
    if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        return 'backstage'
    }
    return 'normal'
}

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        var itemType = itemClass(items[i].name)
        console.log(itemType);
        if (itemType === 'normal') {
            items[i].sell_in -= 1
            items[i].quality -= 1

            if (items[i].sell_in < 0) {
                items[i].quality -= 1
            }

            if (items[i].quality < 0) {
                items[i].quality = 0
            }
        } else if (itemType === 'brie') {
            items[i].sell_in -= 1
            items[i].quality += 1

            if (items[i].sell_in < 0) {
                items[i].quality += 1
            }

            if (items[i].quality > 50) {
                items[i].quality = 50
            }
        } else if (itemType === 'sulfuras') {

        } else if (itemType === 'backstage') {
            items[i].sell_in -= 1

            items[i].quality += 1
            if (items[i].sell_in <= 10) {
                items[i].quality += 1
            }
            if (items[i].sell_in <= 5) {
                items[i].quality += 1
            }

            if (items[i].sell_in <= 0) {
                items[i].quality = 0
            }

            if (items[i].quality > 50) {
                items[i].quality = 50
            }

        }

    }
}
