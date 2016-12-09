describe("Gilded Rose", function() {

    function resetItems(itemName, sell_in, quality) {
        items = new Array()
        items.push(new Item(itemName, sell_in, quality))
    }

    describe("For an example item", function() {

        it("when we add an item to the empty items array, its length increases to 1", function() {
            resetItems('Wizard Hat', 14, 39)

            expect(items.length).toEqual(1)
        });

        it("when we create a new item it should have properties name, sell_in, quality", function() {
            expect(items[0].name).toEqual('Wizard Hat')
            expect(items[0].sell_in).toEqual(14)
            expect(items[0].quality).toEqual(39)
        });

        it("the quality and sell_in decrease by 1 when sell_in >= 2 and previous quality >= 1", function() {
            resetItems('Wizard Hat', 2, 1)

            update_quality()

            expect(items[0].sell_in).toEqual(1)
            expect(items[0].quality).toEqual(0)
        })

        it("The quality degrades by 2 when sell_in < 0 and previous quality was >= 2", function() {

            resetItems('Wizard Hat', 0, 2)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        })

        it("The quality degrades by 1 when sell_in < 0 and previous quality was 1", function() {

            resetItems('Wizard Hat', 0, 1)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        })

        it("The quality never falls below 0", function() {

            resetItems('Wizard Hat', 1, 0)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(0)
        })
    })

    describe("For Aged Brie", function() {

        it("The quality increases by 2 as the sell_in decreases with sell_in 0 and quality 0", function() {

            resetItems('Aged Brie', 0, 0)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(2)
        })

        it("The quality increases as the sell_in decreases, with sell_in 0 and quality 35", function() {

            resetItems('Aged Brie', 0, 35)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(37)
        })

        it("The quality increases as the sell_in decreases, with sell_in 0 and quality 49", function() {

            resetItems('Aged Brie', 0, 49)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(50)
        })

        it("The quality of an item never exceeds 50", function() {

            resetItems('Aged Brie', 0, 50)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(50)
        })

        it("The quality increases by 1 as the sell_in decreases with sell_in > 0 and quality 0", function() {

            resetItems('Aged Brie', 1, 0)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(1)
        })

        it("The quality increases as the sell_in decreases, with sell_in 0 and quality 35", function() {

            resetItems('Aged Brie', 1, 12)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(13)
        })

        it("The quality increases as the sell_in decreases, with sell_in 0 and quality 49", function() {

            resetItems('Aged Brie', 1, 49)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(50)
        })

        it("The quality of an item never exceeds 50", function() {

            resetItems('Aged Brie', 1, 50)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(50)
        })
    })

    describe("For Sulfuras", function() {

        it("The quality and the sell_in never changes", function() {

            resetItems('Sulfuras, Hand of Ragnaros', 455, 1045)

            for (i = 0; i < 1000; i++) {
                update_quality()
            }

            expect(items[0].sell_in).toEqual(455)
            expect(items[0].quality).toEqual(1045)
        })
    })

    describe("For Backstage passes", function() {

        it("the quality increases as the sell_in decreases if the sell_in > 10 days", function() {

            resetItems('Backstage passes to a TAFKAL80ETC concert', 11, 9)

            update_quality()

            expect(items[0].sell_in).toEqual(10)
            expect(items[0].quality).toEqual(10)
        })

        it("when sell_in <= 10 days, the quality increases by 2 per day ", function() {

            resetItems('Backstage passes to a TAFKAL80ETC concert', 6, 18)

            update_quality()

            expect(items[0].sell_in).toEqual(5)
            expect(items[0].quality).toEqual(20)
        })

        it("when sell_in <= 5 days, the quality increases by 3 per day ", function() {

            resetItems('Backstage passes to a TAFKAL80ETC concert', 1, 32)

            update_quality()

            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(35)
        })

        it("when sell_in < 0 days, the quality immediately drops to 0", function() {

            resetItems('Backstage passes to a TAFKAL80ETC concert', 0, 35)

            update_quality()

            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        })
    })

    // describe("For Conjured items", function() {
    //
    //     it("the quality decreases by 2 as the sell_in decreases", function() {
    //
    //         resetItems('Conjured muffins', 21, 33)
    //
    //         update_quality()
    //
    //         expect(items[0].sell_in).toEqual(20)
    //         expect(items[0].quality).toEqual(31)
    //     })
    // })
});
