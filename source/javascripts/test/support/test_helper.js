
var server;

sinon.config = {
  useFakeTimers: false
}

Ember.testing = true;
Ember.Test.adapter = Ember.Test.MochaAdapter.create();

App.rootElement = '#mocha-fixture';
App.setupForTesting();
App.injectTestHelpers();

beforeEach(function(done) {
  // Fake XHR
  // server = sinon.fakeServer.create();
  // server.autoRespond = true;

  Ember.testing = true;
  App.reset();
  done();
});

afterEach(function(done) {
  Ember.testing = false;
  done();

  // Restore XHR
  // server.restore();

});
