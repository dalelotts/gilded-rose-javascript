'use strict'

function decreaseSellIn (item) {
  item.sell_in -= 1
}

function decreaseQuality (item) {
  if (item.quality === 0) {
    return
  }
  item.quality -= 1

  if (item.sell_in < 0) {
    item.quality -= 1
  }
}

function increaseQuality (item) {
  if (item.quality < 50) {
    item.quality += 1
  }
}
