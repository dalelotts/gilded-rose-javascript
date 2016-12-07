'use strict'

describe("Given Gilded Rose", function () {
  let guildedRose

  beforeAll(() => {
    guildedRose = new GuildedRose()
  })

  describe("When shop contains a normal item before the sell date", function () {

    it("quality and sell in days remaining should go down", function () {
      const item = new Item('normal', 10, 20)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(19)
    })
  })

  describe("When shop contains a normal item with one day to sell", function () {

    it("quality and sell in days remaining should go down", function () {
      const item = new Item('normal', 1, 20)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(19)
    })
  })
  describe("When shop contains a normal item with zero days to sell", function () {

    it("sell in days remaining should go down, but quality decrease doubles", function () {
      const item = new Item('normal', 0, 2)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(-1)
      expect(item.quality).toEqual(0)
    })
  })
  describe("When shop contains a normal item with a quality of ", function () {

    it("1, sell in days remaining should go down", function () {
      const item = new Item('normal', 3, 1)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(2)
      expect(item.quality).toEqual(0)
    })

    it("0, sell in days remaining should go down, quality remains at zero", function () {
      const item = new Item('normal', 9, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(8)
      expect(item.quality).toEqual(0)
    })
  })

  // missing test: sell_in === 0, quality === 1 then quality should be zero as it does not go negative.

  describe('When shop contains aged bree', function () {
    it('quality increase as it ages', function () {
      const item = new Item('Aged Brie', 10, 20)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(21)
    })
    it('quality stops increasing at 50', function () {
      const item = new Item('Aged Brie', 10, 49)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(50)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(8)
      expect(item.quality).toEqual(50)
    })

  })

  describe('Given the shop only contains Sulfuras', function () {

    it('it never has to be sold and nor does it decrease in quality', function () {
      const item = new Item('Sulfuras, Hand of Ragnaros', 0, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(0)
    })
  })

  describe('Given the shop only contains back stage tickets', function () {
    it('quality increases as sell in days remaining decreases', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 20, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(19)
      expect(item.quality).toEqual(1)
    })
    it('quality increases as sell in days remaining decreases to 10', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(10)
      expect(item.quality).toEqual(1)
    })
    it('quality increases by 2 when there are 10 days', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(9)
      expect(item.quality).toEqual(3)
    })
    it('quality increases by 3 when there are 5 days', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 2)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(4)
      expect(item.quality).toEqual(5)
    })
    it('quality increases by 3 when there are 1 days', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 30)
      guildedRose.items = []
      guildedRose.items.push(item)

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(0)
      expect(item.quality).toEqual(33)
    })

    it('quality drops to zero after the concert', function () {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)
      guildedRose.items = []
      guildedRose.items.push(item);

      guildedRose.updateQuality()

      expect(item.sell_in).toEqual(-1)
      expect(item.quality).toEqual(0)
    })
  })
})
