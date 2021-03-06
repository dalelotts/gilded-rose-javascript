'use strict'

class GuildedRose {
  constructor () {
    this.items = []

    this.items.push(new Item('+5 Dexterity Vest', 10, 20))
    this.items.push(new Item('Aged Brie', 2, 0))
    this.items.push(new Item('Elixir of the Mongoose', 5, 7))
    this.items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
    this.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20))
    this.items.push(new Item('Conjured Mana Cake', 3, 6))
  }

  updateQuality() {
    this.items.forEach((item) =>{
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality -= 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sell_in < 11) {
              if (item.quality < 50) {
                item.quality += 1
              }
            }
            if (item.sell_in < 6) {
              if (item.quality < 50) {
                item.quality += 1
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sell_in -= 1
      }
      if (item.sell_in < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality -= 1
              }
            }
          } else {
            item.quality -= item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality += 1
          }
        }
      }
    })
  }
}
