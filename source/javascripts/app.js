//= require_self
//= require_tree ./app/

// FastClick is a simple, easy-to-use library for eliminating the 300ms delay between a physical
// tap and the firing of a click event on mobile browsers. The aim is to make your application
// feel less laggy and more responsive while avoiding any interference with your current logic.
window.addEventListener('load', function() {
  new FastClick(document.body);
}, false);

Ember.RSVP.configure('onerror', function(e) {
  console.error(e.message);
  console.error(e.stack);
});

App = Ember.Application.create({
  // LOG_STACKTRACE_ON_DEPRECATION : true,
  // LOG_BINDINGS : true,
  LOG_TRANSITIONS : true,
  LOG_TRANSITIONS_INTERNAL : true,
  // LOG_VIEW_LOOKUPS : true,
  // LOG_ACTIVE_GENERATION : true,

  rootElement: '#app',

  ready: function(){
    console.log('App.ready()')

    // create default settings in from localstorage if needed
    if (App.Setting.all().get('length') === 0) {
      // return App.Setting.createRecord({
      //   id: 'settings',
      //   region: 'NA',
      //   interval: 5
      // }).save();
    }
  },

  lookupStore: function() {
    return this.__container__.lookup('store:main');
  },

  lookupRouter: function() {
    return this.__container__.lookup('router:main');
  },

  lookupController: function(controllerName, options) {
    return this.__container__.lookup('controller:' + controllerName, options);
  },

  lookupContainer: function() {
    return this.__container__;
  }
});

App.deferReadiness();
