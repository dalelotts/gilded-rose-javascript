/* globals Item, AgingItem, GuildedRose, decreaseSellIn, decreaseQuality, increaseQuality */
/* eslint-env jasmine */
describe('Given Gilded Rose', () => {
  'use strict'
  let guildedRose

  beforeAll(() => {
    guildedRose = new GuildedRose()
  })

  describe('When shop contains a normal item before the sell date', () => {
    it('quality and sell in days remaining should go down', () => {
      const item = new AgingItem('normal age', 10, 20, decreaseSellIn, decreaseQuality)
      spyOn(item, 'update').and.callThrough()
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(19)
    })
  })

  describe('When shop contains a normal item with one day to sell', () => {
    it('quality and sell in days remaining should go down', () => {
      const item = new AgingItem('normal', 1, 20, decreaseSellIn, decreaseQuality)
      spyOn(item, 'update').and.callThrough()
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(19)
    })
  })

  describe('When shop contains a normal item with zero days to sell', () => {
    it('sell in days remaining should go down, but quality decrease doubles', () => {
      const item = new AgingItem('normal', 0, 2, decreaseSellIn, decreaseQuality)
      spyOn(item, 'update').and.callThrough()
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(-1)
      expect(item.quality).toEqual(0)
    })
  })
  describe('When shop contains a normal item with a quality of ', () => {
    it('1, sell in days remaining should go down', () => {
      const item = new AgingItem('normal', 3, 1, decreaseSellIn, decreaseQuality)
      spyOn(item, 'update').and.callThrough()

      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(2)
      expect(item.quality).toEqual(0)
    })

    it('0, sell in days remaining should go down, quality remains at zero', () => {
      const item = new AgingItem('normal', 9, 0, decreaseSellIn, decreaseQuality)
      spyOn(item, 'update').and.callThrough()

      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(8)
      expect(item.quality).toEqual(0)
    })
  })

  // missing test: sell_in === 0, quality === 1 then quality should be zero as it does not go negative.

  describe('When shop contains aged bree', () => {
    it('quality increase as it ages', () => {
      const item = new AgingItem('Aged Brie', 10, 20, decreaseSellIn, increaseQuality)
      spyOn(item, 'update').and.callThrough()

      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(21)
    })
    it('quality stops increasing at 50', () => {
      const item = new AgingItem('Aged Brie', 10, 49, decreaseSellIn, increaseQuality)
      spyOn(item, 'update').and.callThrough()

      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.update).toHaveBeenCalled()
      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(50)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(8)
      expect(item.quality).toEqual(50)
    })
  })

  describe('Given an item with no-op sellIn and quality strategies', () => {
    it('it never has to be sold and nor does it decrease in quality', () => {
      const item = new AgingItem('Sulfuras, Hand of Ragnaros', 0, 0, () => {}, () => {})
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(0)
    })
  })

  describe('Given the shop only contains back stage tickets', () => {
    it('quality increases as sell in days remaining decreases', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 20, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(19)
      expect(item.quality).toEqual(1)
    })
    it('quality increases as sell in days remaining decreases to 10', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(10)
      expect(item.quality).toEqual(1)
    })
    it('quality increases by 2 when there are 10 days', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(3)
    })
    it('quality increases by 3 when there are 5 days', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 2)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(4)
      expect(item.quality).toEqual(5)
    })
    it('quality increases by 3 when there are 1 days', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 30)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(33)
    })

    it('quality drops to zero after the concert', () => {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(-1)
      expect(item.quality).toEqual(0)
    })
  })
  it('if item is AgingItem, updateQuality delegates to AgingItem.update()', () => {
    const item = new AgingItem('Backstage passes to a TAFKAL80ETC concert', 0, 50, () => {}, () => {})
    spyOn(item, 'update')
    guildedRose.items = []
    guildedRose.items.push(item)

    guildedRose.updateQuality()

    expect(item.update).toHaveBeenCalled()
  })
})