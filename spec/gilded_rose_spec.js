'use strict'

function resetItems(){
  items = []
}

function populateItems(){
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 20));
}

describe("Gilded Rose", function() {
  describe("items have a sell-in value", () => {
    it("should initialize a quality", function() {
      resetItems()
      populateItems()

      expect(items[0].sell_in).toEqual(10)
      expect(items[1].sell_in).toEqual(2)
      })
    })
  describe("items have a quality value", () => {
    it("should initialize a quality", () => {
      resetItems()
      populateItems()

      expect(items[4].quality).toEqual(20)
      expect(items[5].quality).toEqual(20)
    })
  })
  describe("Dexterity Vest", () => {
    it("sell_in value decrease by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[0].sell_in).toEqual(9)
      })

    it("quality value decrease by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[0].quality).toEqual(19)
      })
    it("sell_in is negative after 11 days", () => {
      resetItems()
      populateItems()
      let time = items[0].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[0].sell_in).toEqual(-1)
    })
    it("quality decreases by 2 each day of a negative sell_in", () => {
      resetItems()
      populateItems()
      let time = items[0].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[0].quality).toEqual(8)
    })
    it("quality can never be negative", () => {
      resetItems()
      populateItems()
      for (var i = 0; i < 16; i++){
        update_quality()
      }
      expect(items[0].sell_in).toEqual(-6)
      expect(items[0].quality).toEqual(0)
    })
  })
  describe("Aged Brie", () => {
    it("quality should increase by 1 for sell_in >= 0", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[1].quality).toEqual(1)
    })
    it('sell_in should decrease each day by 1', () =>{
      resetItems()
      populateItems()
      update_quality()

      expect(items[1].sell_in).toEqual(1)
    })
    it('quality should increase by two when sell_in is negative', () =>{
      resetItems()
      populateItems()
      update_quality()
      update_quality()
      update_quality()
      expect(items[1].sell_in).toEqual(-1)
      expect(items[1].quality).toEqual(4)
    })
    it('quality shouldn\'t increase above 50 ', () =>{
      resetItems()
      populateItems()
      let time = items[1].sell_in
      for(var i = 0; i < time + 24; i++){
        update_quality()
      }
      expect(items[1].sell_in).toEqual(-24)
      expect(items[1].quality).toEqual(50)
    })
  })
  describe("Elixir of the Mongoose", () => {
    it("sell_in value decrease by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[2].sell_in).toEqual(4)
      })

    it("quality value decrease by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[2].quality).toEqual(6)
      })
    it("sell_in is negative after 6 days", () => {
      resetItems()
      populateItems()
      let time = items[2].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[2].sell_in).toEqual(-1)
    })
    it("quality decreases by 2 each day of a negative sell_in", () => {
      resetItems()
      populateItems()
      let time = items[2].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[2].quality).toEqual(0)
    })
    it("quality can never be negative", () => {
      resetItems()
      populateItems()
      let time = items[2].sell_in
      for (var i = 0; i < time + 1; i++){
        update_quality()
      }
      expect(items[2].sell_in).toEqual(-1)
      expect(items[2].quality).toEqual(0)
    })
  })
  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should not decrease in quality", () => {
      resetItems()
      populateItems()
      update_quality()
      expect(items[3].quality).toEqual(80)
    })
    it("should not decrease sell_in", () => {
      resetItems()
      populateItems()
      update_quality()
      expect(items[3].sell_in).toEqual(0)
    })
  })
  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("sell_in value decreases by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[4].sell_in).toEqual(14)
    })
    it("quality value increase by 1 when sell_in >= 10", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[4].quality).toEqual(21)
    })
    it("quality value increases by 2 when (5 <= sell_in > 10)", () => {
      resetItems()
      populateItems()
      let time = items[4].sell_in
      for (var i = 0; i < 6; i++){
        update_quality()
      }
      expect(items[4].sell_in).toEqual(9)
      expect(items[4].quality).toEqual(27)
    })
    it("quality value increase by 3 when 0 <= sell_in < 5", () => {
      resetItems()
      populateItems()

      for (var i = 0; i < 11; i++){
        update_quality()
      }

      expect(items[4].sell_in).toEqual(4)
      expect(items[4].quality).toEqual(38)
    })
    it("quality value drops to 0 after concert sell_in < 0", () => {
      resetItems()
      populateItems()

      let time = items[4].sell_in
      for (var i = 0; i < time + 1; i++){
        update_quality()
      }

      expect(items[4].sell_in).toEqual(-1)
      expect(items[4].quality).toEqual(0)
    })
  })
  describe("Conjured Mana Cake", () => {
    it("sell_in value decrease by 1 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[5].sell_in).toEqual(2)
      })

    it("quality value decrease by 2 each day", () => {
      resetItems()
      populateItems()
      update_quality()

      expect(items[5].quality).toEqual(18)
      })
    it("sell_in is negative after 4 days", () => {
      resetItems()
      populateItems()
      let time = items[5].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[5].sell_in).toEqual(-1)
    })
    it("quality decreases by 4 each day of a negative sell_in", () => {
      resetItems()
      populateItems()
      let time = items[5].sell_in
      for (var i = 0; i < time+1; i++){
        update_quality()
      }
      expect(items[5].quality).toEqual(10)
    })
    it("quality can never be negative", () => {
      resetItems()
      populateItems()
      for (var i = 0; i < 8; i++){
        update_quality()
      }
      expect(items[5].sell_in).toEqual(-5)
      expect(items[5].quality).toEqual(0)
    })
  })
  
})
