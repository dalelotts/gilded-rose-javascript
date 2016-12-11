'use strict'

class AgingItem {
  constructor(name, sell_in, quality, sellInStragegy, qualityStragegy ) {
    this.name = name
    this.sell_in = sell_in
    this.quality = quality
    this.sellInStragegy = sellInStragegy
    this.qualityStragegy = qualityStragegy
  }
  update() {
    this.sellInStragegy(this)
    this.qualityStragegy(this)
  }
}
