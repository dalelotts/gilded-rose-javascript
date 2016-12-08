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

var functions = {}

functions['Sulfuras, Hand of Ragnaros'] = function (item){}

functions['Aged Brie'] = function (item){
  item.sell_in--
  item.quality = item.quality < 50 ? item.quality+1 : item.quality
}

functions['Backstage passes to a TAFKAL80ETC concert'] = function (item){
  item.sell_in--
  item.quality++
  if(item.sell_in <  10){
    item.quality++
  }
  if(item.sell_in < 5){
    item.quality++
  }
  if(item.quality > 50) item.quality = 50
  if(item.sell_in < 0) item.quality = 0
}

functions['Conjured Mana Cake'] = function(item) {
  item.sell_in--
  item.quality -= 2
  if(item.sell_in < 0) item.quality-=2
  if(item.quality < 0) item.quality=0
}

function defaultAging(item){
  item.sell_in--
  item.quality--
  if(item.sell_in < 0) item.quality--
  if(item.quality<0) item.quality=0
}

 function update_quality() {

    items.forEach((item)=>{
      
      let agingFunction = functions[item.name]

      if (agingFunction) {
        agingFunction(item)
      } else {
        defaultAging(item)
      }
    })


 //    for (var i = 0; i < items.length; i++) {
 //      if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
 //        if (items[i].quality > 0) {
 //          if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
 //            items[i].quality = items[i].quality - 1
 //          }
 //        }
 //      } else {
 //        if (items[i].quality < 50) {
 //          items[i].quality = items[i].quality + 1
 //          if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
 //            if (items[i].sell_in < 11) {
 //              if (items[i].quality < 50) {
 //                items[i].quality = items[i].quality + 1
 //              }
 //            }
 //            if (items[i].sell_in < 6) {
 //              if (items[i].quality < 50) {
 //                items[i].quality = items[i].quality + 1
 //              }
 //            }
 //          }
 //        }
 //      }
 //      if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
 //        items[i].sell_in = items[i].sell_in - 1;
 //      }
 //      if (items[i].sell_in < 0) {
 //        if (items[i].name != 'Aged Brie') {
 //          if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
 //            if (items[i].quality > 0) {
 //              if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
 //                items[i].quality = items[i].quality - 1
 //              }
 //            }
 //          } else {
 //            items[i].quality = items[i].quality - items[i].quality
 //          }
 //        } else {
 //          if (items[i].quality < 50) {
 //            items[i].quality = items[i].quality + 1
 //          }
 //        }
 //      }
 // }
}
