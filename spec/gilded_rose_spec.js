function rollbackItems() {
    var items = []

    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Conjured Mana Cake', 3, 6));

}

describe("Gilded Rose", function() {
    it("should do something", function() {
        items = [new Item('Elixir of the Mongoose', 5, 20)]
        const qualityBeforeUpdate = items[0].quality
        update_quality();
        const qualityAfterUpdate = items[0].quality
        expect(qualityAfterUpdate).toBeLessThan(qualityBeforeUpdate)
    });

    it("the items is '+5 Dexterity Vest', the sell in date decreases by 1", function() {
        items = [new Item('+5 Dexterity Vest', 10, 20)]
        const sellInDate = items[0].sell_in
        update_quality();
        expect(items[0].sell_in).toEqual(sellInDate - 1)
    })
});

describe("For 'normal' item", function() {


    it("quality and sell in date of +5 Dexterity Vest should decrease by 1 ", function() {
        items = []
        items.push(new Item('+5 Dexterity Vest', 10, 20))
        update_quality()
        console.log('after update quality', items[0]);
        expect(items[0].sell_in).toEqual(9)
        expect(items[0].quality).toEqual(19)
    })
    it("quality decreases by 2 when sell_in date < 0", function() {
        items = []
        items.push(new Item('+5 Dexterity Vest', -1, 20))
        update_quality()
        expect(items[0].quality).toEqual(18)
    })
    it("quality cannot drop below 0", function() {
        items = []
        items.push(new Item('+5 Dexterity Vest', 1, 0))
        update_quality()
        expect(items[0].quality).toEqual(0)
            //console.log(items[2].sell_in);
        update_quality()
        expect(items[0].quality).toEqual(0)
            //console.log(items[2].sell_in);
            //console.log(items[2].quality);
        update_quality()
        expect(items[0].quality).toEqual(0)
    })
})

describe("Aged Brie", function() {
    // describe("Quality of 'Aged Brie' cannot exceed 50 ",
    //  function(){
    it("update_quality will increase the quality of 'Aged Brie'", function() {
        items = [{
            name: 'Aged Brie',
            sell_in: 2,
            quality: 0
        }]
        const agedBrieQuality = items[0].quality
        console.log('quality before', agedBrieQuality);
        update_quality()
        console.log(items[0].quality);
        expect(items[0].quality).toEqual(1)
        expect(items[0].sell_in).toEqual(1)
    })

    it("quality does not exceed 50", function() {
        items = []
        items.push(new Item('Aged Brie', 20, 50));
        update_quality()
        expect(items[0].quality).toEqual(50)
    })

    it("quality does not exceed 50 when sell in date = 0", function() {
        items = []
        items.push(new Item('Aged Brie', 0, 49));
        update_quality()
        expect(items[0].quality).toEqual(50)
    })

    it('increases by 2 when sell in date is below 0', function() {
        items = []
        items.push(new Item('Aged Brie', -1, 40));
        update_quality()
        expect(items[0].quality).toEqual(42)
        expect(items[0].sell_in).toEqual(-2)
    })

    // })
})

describe("Sulfuras", function() {
    it("for Sulfuras, sell_in and quality do not change and quality is 80 always", function() {
        items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)]
        const sulfurasBeforeUpdate = items[0]
        update_quality()
        expect(sulfurasBeforeUpdate.sell_in).toEqual(items[0].sell_in)
        expect(sulfurasBeforeUpdate.quality).toEqual(items[0].quality)
    })
})


describe("Backstage", function() {
    it("for Backstage Passes, quality increases", function() {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20)]
        update_quality()
        expect(items[0].quality).toEqual(21)

        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20)]
        update_quality()
        expect(items[0].quality).toEqual(22)

        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 3, 20)]
        update_quality()
        expect(items[0].quality).toEqual(23)

        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]
            //  console.log('Before', items[0].quality);
        update_quality()
        expect(items[0].quality).toEqual(0)
            //  console.log('After', items[0].quality);

        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 6, 49)]
            //console.log('Before', items[0].quality);
        update_quality()
        expect(items[0].quality).toEqual(50)
            //console.log('After', items[0].quality);
        update_quality()
        expect(items[0].quality).toEqual(50)
            //console.log('After', items[0].quality);
    })

})


// it('item created with quality > 50 will have quality reduced below 50 on update_quality', function() {
//   items = [new Item('Elixir of the Mongoose', 5, 60)]
//   console.log('Before', items[0].quality);
//   update_quality()
//   console.log('After', items[0].quality);
//   expect(items[0].quality).toBeLessThan(51)
// })
