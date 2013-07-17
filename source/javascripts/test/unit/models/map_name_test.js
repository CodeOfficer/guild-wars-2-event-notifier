
describe("Models: App.MapName", function() {
  var store;

  beforeEach(function() {
    store = App.lookupStore();
  });

  it("is a DS.Model", function() {
    assert.ok(App.MapName);
    assert.ok(DS.Model.detect(App.MapName));
  });
});
