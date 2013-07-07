
App.EventIndexRoute = Ember.Route.extend({

  model: function(params) {
    console.log('EventIndexRoute#model');
    return this.modelFor('event');
  }

});
