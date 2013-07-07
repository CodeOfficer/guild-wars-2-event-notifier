
App.EventsIndexRoute = Ember.Route.extend({

  model: function() {
    console.log('EventsIndexRoute#model');
    return this.modelFor('events');
  }

});
