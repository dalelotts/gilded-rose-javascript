'use strict'

describe("Gilded Rose", function() {

  it("At the end of each day our system lowers both values for every item", function() {
    items = []
    items.push(new Normal('+5 Dexterity Vest', 10, 20))
    update_quality();
    expect(items[0].quality).toBe(19)
    expect(items[0].sell_in).toBe(9)
  });
  it("Once the sell_in days is less then zero, quality degrades twice as fast", function() {
    items = []
    items.push(new Normal('Elixir of the Mongoose', -1, 20))
    update_quality();
    expect(items[0].quality).toBe(18)
  });
  it("The quality of an item is never negative", function() {
    items = []
    items.push(new Normal())
    items[0].name = '+5 Dexterity Vest'
    items[0].sell_in = -1
    items[0].quality = 0
    update_quality();
    expect(items[0].quality).toBe(0)
  });
  it("Aged Brie actually increases in quality the older it gets", function() {
    items = []
    items.push(new AgedBrie())
    items[0].name = 'Aged Brie'
    items[0].sell_in = 2
    items[0].quality = 6
    update_quality();
    expect(items[0].quality).toBe(7)
  });
  it("The quality of an item is never more than 50", function() {
    items = []
    items.push(new AgedBrie('Aged Brie', 2, 50))
    update_quality();
    expect(items[0].quality).toBe(50)
  });
  it("Sulfuras, being a legendary item, never has to be sold nor does it decrease in quality", function() {
    items = []
    items.push(new Sulfuras())
    items[0].name = 'Sulfuras, Hand of Ragnaros'
    items[0].sell_in = 0
    items[0].quality = 80
    update_quality();
    expect(items[0].sell_in).toBe(0)
    expect(items[0].quality).toBe(80)
  });
  it("Backstage passes increases in quality as the sell_in value decreases", function() {
    items = []
    items.push(new Backstage())
    items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
    items[0].sell_in = 15
    items[0].quality = 20
    update_quality();
    expect(items[0].sell_in).toBe(14)
    expect(items[0].quality).toBe(21)
  });
  it("Backstage passes quality increases by 2 when there are 10 days or less", function() {
    items = []
    items.push(new Backstage())
    items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
    items[0].sell_in = 9
    items[0].quality = 20
    update_quality();
    expect(items[0].quality).toBe(22)
  });
  it("Backstage passes quality increases by 5 when there are 5 days or less", function() {
    items = []
    items.push(new Backstage())
    items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
    items[0].sell_in = 5
    items[0].quality = 20
    update_quality();
    expect(items[0].quality).toBe(23)
  });
  it("Backstage passes quality drops to 0 after the concert(sell_in=0)", function() {
    items = []
    items.push(new Backstage())
    items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
    items[0].sell_in = 0
    items[0].quality = 20
    update_quality();
    expect(items[0].quality).toBe(0)
  });
  it("Conjured items degrade in quality twice as fast as normal items", function() {
    items = []
    items.push(new Conjured())
    items[0].name = 'Conjured Mana Cake'
    items[0].sell_in = 3
    items[0].quality = 6
    update_quality();
    expect(items[0].quality).toBe(4)

    items[0].name = 'Conjured Mana Cake'
    items[0].sell_in = 3
    items[0].quality = 1
    update_quality();
    expect(items[0].quality).toBe(0)

    items[0].name = 'Conjured Mana Cake'
    items[0].sell_in = -2
    items[0].quality = 10
    update_quality();
    expect(items[0].quality).toBe(6)
  });
});
