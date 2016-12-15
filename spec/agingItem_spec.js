/* globals AgingItem */
/* eslint-env jasmine */

describe('Given Aging Item', () => {
  'use strict'

  it('update method delegates to sellInStrategy function', () => {
    const sellInStrategy = jasmine.createSpy('sellInStrategy')
    const agingItem = new AgingItem('Item', 0, 0, sellInStrategy, () => {})
    agingItem.update()
    expect(sellInStrategy).toHaveBeenCalledWith(agingItem)
  })
  it('update method delegates to qualityStrategy function', () => {
    const qualityStrategy = jasmine.createSpy('qualityStrategy')
    const agingItem = new AgingItem('Item', 0, 0, () => {}, qualityStrategy)
    agingItem.update()
    expect(qualityStrategy).toHaveBeenCalledWith(agingItem)
  })
})
