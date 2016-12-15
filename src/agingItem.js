'use strict'

class AgingItem {
  constructor (name, sellIn, quality, sellInStragegy, qualityStragegy) {
    this.name = name
    this.sell_in = sellIn
    this.quality = quality
    this.sellInStragegy = sellInStragegy
    this.qualityStragegy = qualityStragegy
  }
  update () {
    this.sellInStragegy(this)
    this.qualityStragegy(this)
  }
}
