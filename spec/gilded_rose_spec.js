'use strict'

describe("Gilded Rose", function () {
  let guildedRose;

  beforeAll(()=> {
    guildedRose = new GuildedRose()
  })

  it("should do something", function () {
    console.log("Where is this logged?")
    guildedRose.updateQuality();
    expect(true).toEqual(false)
  });
});
