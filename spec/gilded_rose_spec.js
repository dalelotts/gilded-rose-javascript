'use strict'

describe("Gilded Rose", function() {

  xit("should do something", function() {
    console.log('test')
    update_quality()
    expect(true).toEqual(false)
  });

  describe('When update quality is called', () => {
    it('Then the quality of a normal item decreases by 1', () => {
      // let item  = new Item('Test item', 4, 5)
      items = [new Item('Test item', 4, 5)]
      update_quality()
      expect(items[0].quality).toEqual(4)
      expect(items[0].sell_in).toEqual(3)
    })

    it('Then the quality of a normal item decreases by 2 when sell_in is less than 0', () => {
      items = [new Item('Test item', 0, 5)]
      update_quality()
      expect(items[0].quality).toEqual(3)
      expect(items[0].sell_in).toEqual(-1)
    })

    it('Then the quality of a normal item does not decrease below 0', () => {
      items = [new Item('Test item', 6, 0)]
      update_quality()
      expect(items[0].quality).toEqual(0)
      expect(items[0].sell_in).toEqual(5)
    })

    it('Then the quality of a normal item does not decrease below 0 when executing sell_in below 0 rule', () => {
      items = [new Item('Test item', -1, 1)]
      update_quality()
      expect(items[0].quality).toEqual(0)
      expect(items[0].sell_in).toEqual(-2)
    })

  })

  describe('When the quality of Aged Brie is updated', () => {
    it('Then the quality should increase over time', () => {
      // let item = findItem('Aged Brie')
      items = [new Item('Aged Brie', 14, 2)]
      update_quality()
      expect(items[0].quality).toEqual(3)
      expect(items[0].sell_in).toEqual(13)
    })

    it('Then the quality should never surpass 50', () => {
      // let item = findItem('Aged Brie')
      items = [new Item('Aged Brie', 14, 50)]
      update_quality()
      expect(items[0].quality).toEqual(50)
      expect(items[0].sell_in).toEqual(13)
    })
  })

  describe('When processing Sulfuras', ()=>{
    it('Then the quality and sell_in are not changed.', ()=>{
      items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)]
      update_quality()
      expect(items[0].quality).toEqual(80)
      expect(items[0].sell_in).toEqual(0)
    })
  })

  describe('When processing Backstage passes', () => {
    it('Then the quality increases as the sell_in date decreases', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 6)]
      update_quality()
      expect(items[0].quality).toEqual(7)
      expect(items[0].sell_in).toEqual(10)
    })

    it('Then quality increases by 2 when sell_in is equal to 10', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 6)]
      update_quality()
      expect(items[0].quality).toEqual(8)
      expect(items[0].sell_in).toEqual(9)
    })

    it('Then quality increases by 2  when sell_in is less than 10', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 6)]
      update_quality()
      expect(items[0].quality).toEqual(8)
      expect(items[0].sell_in).toEqual(8)
    })

    it('Then quality increases by 3 when the sell_in value is equal to 5', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 6)]
      update_quality()
      expect(items[0].quality).toEqual(9)
      expect(items[0].sell_in).toEqual(4)
    })

    it('Then quality increases by 3 when the sell_in value is less than 5', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 6)]
      update_quality()
      expect(items[0].quality).toEqual(9)
      expect(items[0].sell_in).toEqual(0)
    })

    it('Then quality becomes 0 after the concert', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 6)]
      update_quality()
      expect(items[0].quality).toEqual(0)
      expect(items[0].sell_in).toEqual(-1)
    })
    it('Then the quality should never surpass 50', () => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 49)]
      update_quality()
      expect(items[0].quality).toEqual(50)
      expect(items[0].sell_in).toEqual(0)
    })
  })

  describe('When processing Conjured items', () => {
    it('Then the quality decreases at double the normal rate', () => {
      items = [new Item('Conjured Mana Cake', 2, 20)]
      update_quality()
      expect(items[0].quality).toEqual(18)
      expect(items[0].sell_in).toEqual(1)
    })

    it('Then the quality of a Conjured item decreases by 4 when sell_in is less than 0', () => {
      items = [new Item('Conjured Mana Cake', 0, 20)]
      update_quality()
      expect(items[0].quality).toEqual(16)
      expect(items[0].sell_in).toEqual(-1)
    })

    it('Then the quality of a Conjured item does not decrease below 0', () => {
      items = [new Item('Conjured Mana Cake', 6, 0)]
      update_quality()
      expect(items[0].quality).toEqual(0)
      expect(items[0].sell_in).toEqual(5)
    })


  })
});
