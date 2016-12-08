function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));


function update_quality() {
  // for (var i = 0; i < items.length; i++) {
  //   if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //     if (items[i].quality > 0) {
  //       if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //         items[i].quality = items[i].quality - 1
  //       }
  //     }
  //   } else {
  //     if (items[i].quality < 50) {
  //       items[i].quality = items[i].quality + 1
  //       if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (items[i].sell_in <= 11) { // Made change from <  to <=
  //           if (items[i].quality < 50) {
  //             items[i].quality = items[i].quality + 1
  //           }
  //         }
  //         if (items[i].sell_in <= 6) { // Made change from <  to <=
  //           if (items[i].quality < 50) {
  //             items[i].quality = items[i].quality + 1
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //     items[i].sell_in = items[i].sell_in - 1;
  //   }
  //   if (items[i].sell_in < 0) {
  //     if (items[i].name != 'Aged Brie') {
  //       if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (items[i].quality > 0) {
  //           if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //             items[i].quality = items[i].quality - 1
  //           }
  //         }
  //       } else {
  //         items[i].quality = items[i].quality - items[i].quality
  //       }
  //     } else {
  //       if (items[i].quality < 50) {
  //         items[i].quality = items[i].quality + 1
  //       }
  //     }
  //   }
  // }
var numUpdateby = 1
  items.forEach((index) => {
    index.sell_in -=1
    switch(index.name)
    {
      case 'Sulfuras, Hand of Ragnaros':
        index.sell_in +=1
      break

      case 'Backstage passes to a TAFKAL80ETC concert':
        if (index.sell_in > 5 && index.sell_in <= 10)
        {
          numUpdateby = 2
        }
        else if (index.sell_in <= 5)
        {
          numUpdateby = 3
        }
      break

      case 'Conjured Mana Cake':
        numUpdateby = -2
      break

      default :
        index.name == 'Aged Brie' ? numUpdateby : numUpdateby = -1
      break
    }
    updateQuality(index,numUpdateby)
  })
}

function updateQuality(item, numtoUpdateBy)
{
  numtoUpdateBy < 0 ? (item.sell_in <= 0  ? numtoUpdateBy *= 2 : numtoUpdateBy) :
                      (item.quality >= 50 ? numtoUpdateBy =  0 : numtoUpdateBy)
  item.quality += numtoUpdateBy

  if(item.sell_in < 0 && item.name == 'Backstage passes to a TAFKAL80ETC concert')
  {
   item.quality = 0
  }

}
