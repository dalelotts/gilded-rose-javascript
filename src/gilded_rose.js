'use strict'

function Normal(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}
Normal.prototype.update_quality = function () {
  this.quality--
  if (this.sell_in <= 0) {
    changeQuality(this, -1)
  }
  this.quality = (this.quality < 0) ?  0 : this.quality
  this.sell_in--
};
Normal.prototype.changeQuality = function (item, changeBy) {
  item.quality = item.quality + changeBy
  item.quality = (this.quality < 0) ? 0 : this.quality
  item.quality = (this.quality > 50) ? 50 : this.quality
};

function AgedBrie(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}
AgedBrie.prototype.update_quality = function () {
  changeQuality(this, 1)
  this.sell_in--
};
AgedBrie.prototype.changeQuality = function (item, changeBy) {
  item.quality = item.quality + changeBy
  item.quality = (this.quality < 0) ? 0 : this.quality
  item.quality = (this.quality > 50) ? 50 : this.quality
};

function Sulfuras(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}
Sulfuras.prototype.update_quality = function () {
};


function Conjured(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}
Conjured.prototype.update_quality = function () {
  changeQuality(this, -2)
  if (this.sell_in <= 0) {
    changeQuality(this, -2)
  }
  this.quality = (this.quality < 0) ?  0 : this.quality
  this.sell_in--
};
// Conjured.prototype.changeQuality = function (item, changeBy) {
//   item.quality = item.quality + changeBy
//   item.quality = (this.quality < 0) ? 0 : this.quality
//   item.quality = (this.quality > 50) ? 50 : this.quality
// };

function Backstage(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}
Backstage.prototype.update_quality = function () {
  changeQuality(this, 1)
  if (this.sell_in < 11 ) {
      changeQuality(this, 1)
  }
  if (this.sell_in < 6 ) {
      changeQuality(this, 1)
  }
  this.quality = (this.sell_in <= 0) ?  0 : this.quality
  this.sell_in--
};
Backstage.prototype.changeQuality = function (item, changeBy) {
  item.quality = item.quality + changeBy
  item.quality = (this.quality < 0) ? 0 : this.quality
  item.quality = (this.quality > 50) ? 50 : this.quality
};

var items = []
items.push(new Normal('+5 Dexterity Vest', 10, 20));
items.push(new AgedBrie('Aged Brie', 2, 0));
items.push(new Normal('Elixir of the Mongoose', 5, 7));
items.push(new Sulfuras('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Backstage('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Conjured('Conjured Mana Cake', 3, 6));

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    items[i].update_quality()
  }
}

function changeQuality (item, changeBy) {
  item.quality = item.quality + changeBy
  if (item.quality > 50) {
    item.quality  = 50
  } else if (item.quality < 0) {
    item.quality = 0
  }
}
