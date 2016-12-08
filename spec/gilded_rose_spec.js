describe("Gilded Rose", function() {
    describe("When given an array with a single item", () => {
        it("for item '+5 Dexterity Vest' check sell-in reduced to 9 from 10 and quality reduced to 19 from 20", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 10, 20));

            update_quality();
            expect(items[0].name).toEqual('+5 Dexterity Vest')
            expect(items[0].sell_in).toEqual(9)
            expect(items[0].quality).toEqual(19)
        });
        it("for item '+5 Dexterity Vest' check sell-in reduced and quality reduced twice as fast after sell-in value becomes zero", function() {
            items = []
            items.push(new Item('+5 Dexterity Vest', 0, 20))
            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(18)
        });
        it("for item 'Aged Brie' check sell-in reduced to 0 from 10 and quality reduced to 10 from 20", function() {
            items = []
            items.push(new Item('Aged Brie', 2, 0))

            update_quality()

            expect(items[0].sell_in).toEqual(1)
            expect(items[0].quality).toEqual(1)
        });
        it("for item 'Aged Brie' check sell-in reduced to 0 from 10 and quality reduced to 10 from 20", function() {
            items = []
            items.push(new Item('Aged Brie', 0, 0))

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(2)
        });

        it("for item 'Aged Brie' check sell-in and quality reduced appropriately after multiple calls", function() {
            items = []
            items.push(new Item('Aged Brie', 2, 0))
            while (items[0].quality < 50) {
                update_quality()
            }

            expect(items[0].sell_in).toEqual(-24)
            expect(items[0].quality).toEqual(50)
        });
        it("for item 'Sulfuras, Hand of Ragnaros' check sell-in and quality never changes", function() {
            items = []
            items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(80)
        });
        it("for item 'Sulfuras, Hand of Ragnaros' check sell-in and quality never changes after multiple update_quality", function() {
            items = []
            items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
            update_quality()
            update_quality()
            update_quality()
            update_quality()
            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(80)
        });
        it("for item 'Backstage passes to a TAFKAL80ETC concert' check sell-in decreases and quality increases after 1 call to update_quality", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
            update_quality()

            expect(items[0].sell_in).toEqual(14)
            expect(items[0].quality).toEqual(21)
        });
        it("for item 'Backstage passes to a TAFKAL80ETC concert' check sell-in decreases and quality increases by 2 after 1 call to update_quality after 10 days", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20));
            update_quality()

            expect(items[0].sell_in).toEqual(9)
            expect(items[0].quality).toEqual(22)
        });
        it("for item 'Backstage passes to a TAFKAL80ETC concert' check sell-in decreases and quality increases by 3 after 1 call to update_quality less than 5 days", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20));
            update_quality()

            expect(items[0].sell_in).toEqual(4)
            expect(items[0].quality).toEqual(23)
        });
        it("for item 'Backstage passes to a TAFKAL80ETC concert' check sell-in decreases and quality drops to zero after sell-in becomes 0", function() {
            items = []
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20));
            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        });
        it("for item 'Conjured' check that quality that reduces twice as fast", function() {
            items = []
            items.push(new Item('Conjured Mana Cake', 3, 6));
            update_quality()

            expect(items[0].sell_in).toEqual(2)
            expect(items[0].quality).toEqual(4)
        });
        it("for item 'Conjured' check that quality that reduces twice as fast when sell_in value is less than zero", function() {
            items = []
            items.push(new Item('Conjured Mana Cake', 0, 6));
            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(2)
        });

    })
    describe("When given an array with a multiple items", () => {

        it("Quality never decreases below zero", () => {

            items = []

            items.push(new Item('+5 Dexterity Vest', 10, 0));
            items.push(new Item('Aged Brie', 2, 0));
            items.push(new Item('Elixir of the Mongoose', 5, 0));
            items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 0));
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0));
            items.push(new Item('Conjured Mana Cake', 3, 0));

            expect(items[0].quality).toBeGreaterThan(-1)
            expect(items[1].quality).toBeGreaterThan(-1)
            expect(items[2].quality).toBeGreaterThan(-1)
            expect(items[3].quality).toBeGreaterThan(-1)
            expect(items[4].quality).toBeGreaterThan(-1)
            expect(items[5].quality).toBeGreaterThan(-1)
        })
        it("Quality never exceeds over 50", () => {

            items = []

            items.push(new Item('+5 Dexterity Vest', 10, 50));
            items.push(new Item('Aged Brie', 2, 50));
            items.push(new Item('Elixir of the Mongoose', 5, 50));
            items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 50));
            items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 50));
            items.push(new Item('Conjured Mana Cake', 3, 50));

            expect(items[0].quality).toBeLessThan(51)
            expect(items[1].quality).toBeLessThan(51)
            expect(items[2].quality).toBeLessThan(51)
            expect(items[3].quality).toBeLessThan(51)
            expect(items[4].quality).toBeLessThan(51)
            expect(items[5].quality).toBeLessThan(51)
        })
    })

})
