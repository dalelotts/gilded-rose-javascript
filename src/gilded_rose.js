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

  updateQuality () {
    this.items.forEach((item) => {

      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return
      }

      item.sell_in -= 1

      switch (item.name) {
        case  'Aged Brie':

          if (item.quality < 50) {
            item.quality += 1
          }
          break
        case 'Backstage passes to a TAFKAL80ETC concert' :
          item.quality += 1
          if (item.sell_in < 10) {
            item.quality += 1
          }
          if (item.sell_in < 5) {
            item.quality += 1
          }
          if (item.sell_in < 0) {
            item.quality = 0
          }

          break
        default:
          if (item.quality === 0) {
            return
          }
          item.quality -= 1

          if (item.sell_in < 0) {
            item.quality -= 1
          }
      }
    })
  }
}
