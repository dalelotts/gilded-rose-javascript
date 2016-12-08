'use strict'

describe("Given Gilded Rose products", function() {
  describe("When the day changes for normal item", function() {

    it("product sell_in and value properties should decrease by 1", function() {
      update_quality();
      expect(items[0].sell_in).toEqual(9)
      expect(items[0].quality).toEqual(19)
      expect(items[2].sell_in).toEqual(4)
      expect(items[2].quality).toEqual(6)
    })
  })
  describe("When update_quality on Aged Brie", function() {
    it("Then Brie sell_in decreases", function() {
      items[0] = new Item('Aged Brie', 2, 0)
      update_quality();
      expect(items[0].sell_in).toEqual(1)
    })
  })

  describe("When update_quality on backstage pass", function() {
    it("Then backstage pass sell_in decreases", function() {
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
      update_quality();
      expect(items[0].sell_in).toEqual(14)
      })
  })

  describe("When sell in <0", function() {
    it("Then normal item decreases twice in quality", function() {
      items[0] = new Item('normal item', -1, 5)
      update_quality();
      expect(items[0].sell_in).toEqual(-2)
      expect(items[0].quality).toEqual(3)
    })
    it("Then normal item quality doesn't go < 0", function() {
      items[0] = new Item('normal item', -1, 1)
      update_quality();
      expect(items[0].sell_in).toEqual(-2)
      expect(items[0].quality).toEqual(0)
    })
  })

  describe("When sell in <0", function() {
    it("Then normal item decreases to zero when quality <2", function() {
      items[0] = new Item('normal item', -1, 1)
      update_quality();
      expect(items[0].sell_in).toEqual(-2) //-2
      expect(items[0].quality).toEqual(0) //0
    })
  })

  describe("When sell in = 0", function() {
    it("Then normal item quality decreases by -2", function() {
      items[0] = new Item('normal item', 0, 6)
      update_quality();
      expect(items[0].sell_in).toEqual(-1) // -1
      expect(items[0].quality).toEqual(4) //4
    })
  })

  describe("When quality reaches 0", function() {
    it("cannot decrease anymore", function() {
      items[0] = new Item('cat', 0, 0)
      update_quality();
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(0)
    })
  })

  describe("When quality reaches 0", function() {
    it("cannot decrease anymore", function() {
      items[0] = new Item('cat', 0, 1)
      update_quality();
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(0)
    })
  })

  describe("When Aged Brie is the item", function() {
    it("quality increases", function() {
      items[0] = new Item('Aged Brie', 5, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(4) //4
      expect(items[0].quality).toEqual(11) //11
    })
  })
  // describe("When Aged Brie is the item and quality < 0", function() {
  //   it("quality increases normally", function() {
  //     items[0] = new Item('Aged Brie', -2, -3)
  //     update_quality();
  //     expect(items[0].sell_in).toEqual(0) //-3
  //     expect(items[0].quality).toEqual(0) //1
  //   })
  // })
  describe("When Aged Brie sell_in < 0", function() {
    it("quality increases by 2", function() {
      items[0] = new Item('Aged Brie', -1, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(-2) //-2
      expect(items[0].quality).toEqual(12) //12
    })
  })
  describe("When Backstage pass sell_in < 0", function() {
    it("quality remains 0", function() {
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)
      update_quality();
      expect(items[0].sell_in).toEqual(-2) //-2
      expect(items[0].quality).toEqual(0) //0
    })
  })

  describe("When quality reaches 50", function() {
    it("cannot increase anymore", function() {
      items[0] = new Item('Aged Brie', 12, 50)
      items[1] = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 49)
      items[2] = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 50)
      items[3] = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 48)
      update_quality();
      expect(items[0].sell_in).toEqual(11) //11
      expect(items[0].quality).toEqual(50) //50
      expect(items[1].quality).toEqual(50) //50
      expect(items[2].quality).toEqual(50) //50
      expect(items[3].quality).toEqual(50) //50
    })
  })

  describe("When Sulfras is the item", function() {
    it("never has to be sold", function() {
      items[0] = new Item('Sulfuras, Hand of Ragnaros', 0, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(0) //0
      console.log(items);
    })
    it("never decreases in quality", function() {
      items[0] = new Item('Sulfuras, Hand of Ragnaros', 0, 10)
      update_quality();
      expect(items[0].quality).toEqual(10) //10
    })
  })

  describe("When Backstage pass is the item", function() {
    it("quality increases by 1 if sell_in > 10", function() {
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(10) // 10
      expect(items[0].quality).toEqual(11) // 11
    })
    it("quality increases by 2 if sell_in <= 10", function() {
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(9) //9
      expect(items[0].quality).toEqual(12) //12
    })
    it("quality increases by 3 if sell_in <= 5", function() {
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(4) //4
      expect(items[0].quality).toEqual(13) //13
    })
    it("quality drops to zero if sell_in <= 0", function() {
      //items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10))
      items[0] = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(-1) // -1
      expect(items[0].quality).toEqual(0) // 0
    })
  })

  describe("When item is conjured", function() {
    it("decreases in value twice as quickly", function() {
      items[0] = new Item('Conjured Mana Cake', 10, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(9)  //9
      expect(items[0].quality).toEqual(8) //8
    })
  })

  describe("When update_quality on conjured", function() {
    it("Then normal item decreases twice in quality", function() {
      items[0] = new Item('Conjured Mana Cake', 3, 1)
      update_quality();
      expect(items[0].sell_in).toEqual(2)
      expect(items[0].quality).toEqual(0)
      })
  })

  describe("When update_quality on conjured with sell_in < 0", function() {
    it("Then conjured item decreases four in quality", function() {
      items[0] = new Item('Conjured Mana Cake', -3, 10)
      update_quality();
      expect(items[0].sell_in).toEqual(-4)
      expect(items[0].quality).toEqual(6)
      })
  })

  describe("When update_quality on conjured with sell_in < 0 and quality < 4", function() {
    it("Then quality = 0", function() {
      items[0] = new Item('Conjured Mana Cake', -3, 3)
      update_quality();
      expect(items[0].sell_in).toEqual(-4)
      expect(items[0].quality).toEqual(0)
      })
  })
})
