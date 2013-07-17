
var server;

sinon.config = {
  useFakeTimers: false
}

Ember.Test.adapter = Ember.Test.MochaAdapter.create();

App.rootElement = '#mocha';
App.setupForTesting();
App.injectTestHelpers();
App.advanceReadiness();

beforeEach(function(done) {
  server = sinon.fakeServer.create();
  server.autoRespond = true;
  Ember.run(function() {
    App.advanceReadiness();
    App.then(function() {
      done();
    });
  });
});

afterEach(function() {
  App.reset();
  server.restore();
});
