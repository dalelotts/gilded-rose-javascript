'use strict'

function Item (name, sell_in, quality) {
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

function update_quality () {

  items.forEach((item) => {

    switch (item.name) {
      case 'Aged Brie':
        brieAging(item)
        break
      case 'Sulfuras, Hand of Ragnaros':

        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        ticketAging(item)
        break
      default:
        normalAging(item)

    }
  })

}

function conditional(condition, trueDelegate, falseDelegate) {
  return (item) => {
    if (condition(item)) {
      console.log("true")
       return trueDelegate(item)
    } else {
      console.log("false")
      return falseDelegate(item)
    }
  }
}


function zeroQuality(item) {
  item.quality = 0
  return item
}


var decreaseSellIn= decreaseNumber('sell_in');
var decreaseQuality= decreaseNumber('quality');
var increaseQuality= increaseNumber('quality');
var expireOrIncreaseQuality = conditional((item) => item.sell_in < 0, zeroQuality, increaseQuality)
var increaseQualityLessThan10DaysOrNoOp = conditional((item) => item.sell_in < 10, increaseQuality, (item) => item)
var increaseQualityLessThan5DaysOrNoOp = conditional((item) => item.sell_in < 5, increaseQuality, (item) => item)

function ticketAging (item) {
  expireOrIncreaseQuality(
    increaseQualityLessThan10DaysOrNoOp(
      increaseQualityLessThan5DaysOrNoOp(
        decreaseSellIn(item)
      )
    )
  )
}

function normalAging (item) {

  decreaseSellIn(item)

  if (item.quality === 0) {
    return
  }

  decreaseQuality(item)

  if (item.sell_in < 0) {
    decreaseQuality(item)
  }
}

function brieAging (item) {
  decreaseSellIn(item)
  if (item.quality < 50) {
    increaseQuality(item)
  }
}



function decreaseNumber (property) {
  return (item) => {
    item[property] -= 1
    return item
  }
}
function increaseNumber (property) {
  return (item) => {
    item[property] += 1
    return item
  }
}
