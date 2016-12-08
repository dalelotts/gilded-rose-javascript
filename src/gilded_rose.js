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

var newItems = []

let itemInventory = {'Aged Brie': increasesOverTime,
'Backstage passes to a TAFKAL80ETC concert': increasesMoreTowardsDeadlineAndExpires,
'Sulfuras, Hand of Ragnaros': () => {},
'Conjured Mana Cake': doubleDecreases,
'+5 Dexterity Vest': regularDecrease}

function update_quality() {
  items.forEach((item) => {updateItemQuality(item)})
}

function updateItemQuality(item) {
  if(typeof itemInventory[item.name] !== 'function') {
    regularDecrease(item)
  } else {
    itemInventory[item.name](item)
  }
}

function increaseQuality(item, amt) {
  amt = amt || 1
  item.quality+=amt
  if(item.quality > 50) {
    item.quality = 50
  }
}

function degradeQuality(item, amt) {
  amt = amt || 1
  item.quality-=amt
  if(item.quality < 0) {
    item.quality =0
  }
}

function increasesOverTime(item) {
  decreaseDay(item)
  item.sell_in < 0 ? increaseQuality(item, 2) : increaseQuality(item)
}

function increasesMoreTowardsDeadlineAndExpires(item) {
  // decreaseDay(item)
  // if(item.sell_in < 5) {}
  //   increaseQuality(item, 3)
  // } else if (item.sell_in < 10) {
  //   increaseQuality(item, 2)
  // } else {
  //   increaseQuality(item)
  // }
  // if (item.sell_in < 0) {
  //   item.quality = 0
  // }
  increaseQuality(item)
  if (item.sell_in <= 10) {
    increaseQuality(item)
  }
  if (item.sell_in <= 5) {
    increaseQuality(item)
  }
  decreaseDay(item)
  if (item.sell_in < 0) {
    item.quality = 0
  }
}

function regularDecrease(item) {
  decreaseDay(item)
  item.sell_in < 0 ? degradeQuality(item, 2) : degradeQuality(item)
}

function doubleDecreases(item) {
  decreaseDay(item)
  item.sell_in < 0 ? degradeQuality(item, 4) : degradeQuality(item, 2)
}

function decreaseDay(item) {
  item.sell_in--
}
