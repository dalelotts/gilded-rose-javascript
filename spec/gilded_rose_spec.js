'use strict'

// items.push(new Item('+5 Dexterity Vest', 10, 20));
// items.push(new Item('Aged Brie', 2, 0));
// items.push(new Item('Elixir of the Mongoose', 5, 7));
// items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
// items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
// items.push(new Item('Conjured Mana Cake', 3, 6));

describe('Gilded Rose', function() {
   describe('starting functionality', () => {

    it('sell in and quality should decrement by 1 each', function() {
      items[0].name = '+5 Dexterity Vest'
      items[0].sell_in = 10  //10->9
      items[0].quality = 20 //20->19

      update_quality();

      expect(items[0].name).toEqual('+5 Dexterity Vest')
      expect(items[0].sell_in).toEqual(9)  //10->9
      expect(items[0].quality).toEqual(19) //20->19
    });



    it('Sulfuras, Hand of Ragnaros should never change sell in date and quaity', function() {
      items[0].name = 'Sulfuras, Hand of Ragnaros'
      items[0].sell_in= 0 //0
      items[0].quality = 80 //80
      update_quality()
      expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros')
      expect(items[0].sell_in).toEqual(0) //0
      expect(items[0].quality).toEqual(80) //80
    })

    it('Once the sell_in days is less then zero, quality degrades twice as fast', () => {
      items[0].name = '+5 Dexterity Vest'
      items[0].sell_in = 0
      items[0].quality = 2

      update_quality()

      expect(items[0].name).toEqual('+5 Dexterity Vest')
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(0)
    })

    it('The quality of an item is never negative', () => {
      items[0].name = '+5 Dexterity Vest'
      items[0].sell_in = 0
      items[0].quality = 0

      update_quality()

      expect(items[0].name).toEqual('+5 Dexterity Vest')
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(0)
    })


  })

  describe('Aged Brie', () => {
    it('Aged Brie should increase in quality each day', function() {
      items[0].name= 'Aged Brie'
      items[0].sell_in = 2
      items[0].quality = 0

      update_quality()
      expect(items[0].name).toEqual('Aged Brie')
      expect(items[0].sell_in).toEqual(1) //2->1
      expect(items[0].quality).toEqual(1) //0->1
    });

    it('The quality of an item is never more than 50', () => {
      items[0].name= 'Aged Brie'
      items[0].sell_in = 3
      items[0].quality = 50

      update_quality()
      expect(items[0].name).toEqual('Aged Brie')
      expect(items[0].sell_in).toEqual(2) //2->1
      expect(items[0].quality).toEqual(50)
    })

    it('Aged Brie should increases in quality double each day when negative', function() {
      items[0].name= 'Aged Brie'
      items[0].sell_in = 0
      items[0].quality = 0

      update_quality()
      expect(items[0].name).toEqual('Aged Brie')
      expect(items[0].sell_in).toEqual(-1)
      expect(items[0].quality).toEqual(2)
    });
   })


  describe('Backstage passes', () => {
    it('Backstage passes to a TAFKAL80ETC concert should increases in quality as its sell_in value decreases', () => {
     items[4].name= 'Backstage passes to a TAFKAL80ETC concert'
      items[4].sell_in= 15 //15->14
      items[4].quality= 20 //20->21
      update_quality()
      expect(items[4].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
      expect(items[4].sell_in).toEqual(14)
      expect(items[4].quality).toEqual(21)
     })

      it('The quality of an item is never more than 50', () => {
        items[4].name= 'Backstage passes to a TAFKAL80ETC concert'
         items[4].sell_in= 15 //15->14
         items[4].quality= 50 //20->21
         update_quality()
         expect(items[4].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
         expect(items[4].sell_in).toEqual(14) //15->14
         expect(items[4].quality).toEqual(50) //20->21

       })

       it('The quality of an item is never negative', () => {
         items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
         items[0].sell_in = -1
         items[0].quality = 0

         update_quality()

         expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
         expect(items[0].sell_in).toEqual(-2)
         expect(items[0].quality).toEqual(0)
       })

       it('quality increases by 2 when there are 10 days or less', () => {
         items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
         items[0].sell_in = 9
         items[0].quality = 0
         update_quality()

         expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
         expect(items[0].sell_in).toEqual(8)
         expect(items[0].quality).toEqual(2)
        })

         it('quality increases by 3 when there are 5 days or less', () => {
           items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
           items[0].sell_in = 4
           items[0].quality = 2
           update_quality()

           expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
           expect(items[0].sell_in).toEqual(3)
           expect(items[0].quality).toEqual(5)
          })

          it('quality drops to zero after concert', () => {
            items[0].name = 'Backstage passes to a TAFKAL80ETC concert'
            items[0].sell_in = 0
            items[0].quality = 10

            update_quality()

            expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
          })

   }) //Backstage passes

  describe('Conjured items', () => {
     it('Conjured items degrade in quality twice as fast as normal items', () => {
       items[0].name = 'Conjured Mana Cake'
       items[0].sell_in = 3
       items[0].quality = 10

       update_quality()

       expect(items[0].name).toEqual('Conjured Mana Cake')
       expect(items[0].sell_in).toEqual(2)
       expect(items[0].quality).toEqual(8)
      })

      it('The quality of an item is never negative', () => {
        items[0].name = 'Conjured Mana Cake'
        items[0].sell_in = 0
        items[0].quality = 1

        update_quality()

        expect(items[0].name).toEqual('Conjured Mana Cake')
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(0)
      })

      it('Once the sell_in days is less then zero, quality degrades twice as fast', () => {
        items[0].name = 'Conjured Mana Cake'
        items[0].sell_in = 0
        items[0].quality = 8

        update_quality()

        expect(items[0].name).toEqual('Conjured Mana Cake')
        expect(items[0].sell_in).toEqual(-1)
        expect(items[0].quality).toEqual(4)
      })
   })
});
