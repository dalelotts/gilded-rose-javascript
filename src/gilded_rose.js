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

function normal_aging(x) {
  x.quality -= 1
  if (x.sell_in<=0) x.quality-=1
  if (x.quality < 0) x.quality = 0
}

function update_quality() {items.forEach((x) => {
    if (x.name!='Aged Brie' && x.name!='Sulfuras, Hand of Ragnaros' && x.name!='Backstage passes to a TAFKAL80ETC concert') {
      normal_aging(x)}
    if (x.name==='Aged Brie') {
      x.quality+=1
      if (x.sell_in < 0) x.quality+=1}
    if (x.name==='Backstage passes to a TAFKAL80ETC concert') {
      if(x.sell_in<=0) x.quality=0
      else if (x.sell_in < 6) x.quality += 3
      else if (x.sell_in < 11) x.quality += 2
      else x.quality += 1}
    if(x.name.includes("Conjured"))
      normal_aging(x)
    if (x.name !='Sulfuras, Hand of Ragnaros' )
      x.sell_in -= 1
    if (x.quality>50) x.quality=50})}
