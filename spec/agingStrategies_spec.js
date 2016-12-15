/* globals decreaseSellIn, decreaseQuality, increaseQuality */
/* eslint-env jasmine */

'use strict'

describe('Given decreaseSellIn Strategy', () => {
  it('it decreases the sell_in property of the specified item by one', () => {
    const item = {
      sell_in: 1
    }
    decreaseSellIn(item)
    expect(item.sell_in).toEqual(0)

    decreaseSellIn(item)
    expect(item.sell_in).toEqual(-1)
  })
})

describe('Given decreaseQuality Strategy', () => {
  it('it decreases the quality property of the specified item by one', () => {
    const item = {
      quality: 2
    }
    decreaseQuality(item)
    expect(item.quality).toEqual(1)

    decreaseQuality(item)
    expect(item.quality).toEqual(0)
  })
  it('the quality never decreases to a negative number', () => {
    const item = {
      quality: 0
    }
    decreaseQuality(item)
    expect(item.quality).toEqual(0)

    decreaseQuality(item)
    expect(item.quality).toEqual(0)
  })
})

describe('Given increaseQuality Strategy', () => {
  it('it increases the quality property of the specified item by one', () => {
    const item = {
      quality: 0
    }
    increaseQuality(item)
    expect(item.quality).toEqual(1)

    increaseQuality(item)
    expect(item.quality).toEqual(2)
  })
  it('the quality never increases beyond 50', () => {
    const item = {
      quality: 49
    }
    increaseQuality(item)
    expect(item.quality).toEqual(50)

    increaseQuality(item)
    expect(item.quality).toEqual(50)
  })
})
