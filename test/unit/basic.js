"use strict";
describe("Sidenav", function() {
  function FixtureHelper(baseDOM) {
    return {
      sidenav: baseDOM[1],
      backdrop: baseDOM[0],
      content: baseDOM[2]
    }
  }

  before(function() {
    fixture.setBase("test/fixtures")
  });

  beforeEach(function() {
    this.result = fixture.load("basicSite.html");
  });

  afterEach(function() {
    fixture.cleanup()
  });

  describe("open programmatically", function() {
    it("should return a promise that is resolved when animation is completed", function() {
      var Sidenav = require("../../src/sidenav.js");
      var fixtureHelper = FixtureHelper(this.result);

      var sidenav = new Sidenav({
        sidenav: fixtureHelper.sidenav,
        backdrop: fixtureHelper.backdrop,
        content: fixtureHelper.content
      });
      var promise = sidenav.open();
      promise.should.be.a.Promise();
      return promise.should.be.eventually.fulfilled();
    });
  });
});
