'use strict'



describe("Gilded Rose", function() {

  it("should do something", function() {
    update_quality()
    expect(true).toEqual(true)
  })

  it('Sell in item should decrease', () =>{
    items = [{name:'+5 Dexterity Vest', sell_in:10, quality: 20}]
    update_quality()
    expect(items[0].sell_in).toEqual(9) // 10 it fails
    expect(items[0].quality).toEqual(19) // 20 it fails

  })

  it('Quality degrades twice as fast as sell in days is less than zero' , () =>
  {
    items = [{name:'+5 Dexterity Vest', sell_in:0, quality: 20}]
    update_quality()
    //update_quality()
    expect(items[0].quality).toEqual(18) // Update quality is called in every test from the above
    expect(items.filter(function (item) {
      return item.quality < 0
    })).toEqual([])

    update_quality()
    expect(items.filter(function (item) {
      return item.quality < 0
    })).toEqual([])
  })

  it('Items quality is increased as it gets older', () => {
    items = [{name:'Aged Brie', sell_in:0, quality: 20}]
    update_quality()
    expect(items[0].quality).toEqual(21)
  })

  it('quality must never be over 50', () =>{
   items = [{name:'Aged Brie', sell_in:10, quality: 50}]
   update_quality()
   expect(items[0].quality).toEqual(50)
   })

   it('Sulfuras attributes must never change', () =>{
     items = [{name:'Sulfuras, Hand of Ragnaros', sell_in:0, quality: 80}]
     update_quality()
     expect(items[0].quality).toEqual(80)
     expect(items[0].sell_in).toEqual(0)
    })

    it('testing Backstage passes quality logic', () =>{
      items = [{name:'Backstage passes to a TAFKAL80ETC concert', sell_in:15, quality: 20}]
      update_quality()
      expect(items[0].sell_in).toEqual(14)
      expect(items[0].quality).toEqual(21)

      items = [{name:'Backstage passes to a TAFKAL80ETC concert', sell_in:11, quality: 24}]
      update_quality()
      expect(items[0].sell_in).toEqual(10)
      expect(items[0].quality).toEqual(26)

      items = [{name:'Backstage passes to a TAFKAL80ETC concert', sell_in:6, quality: 34}]
      update_quality()
      expect(items[0].sell_in).toEqual(5)
      expect(items[0].quality).toEqual(37)

      items = [{name:'Backstage passes to a TAFKAL80ETC concert', sell_in:0, quality: 52}]
      update_quality()
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(0)
     })

     it('testing conjured item logic', () =>{
      items = [{name:'Conjured Mana Cake', sell_in:3, quality: 6}]
      update_quality()

      expect(items[0].sell_in).toEqual(2)
      expect(items[0].quality).toEqual(4)
      })

})
