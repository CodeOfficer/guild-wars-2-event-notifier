
App.EventsIndexRoute = Ember.Route.extend({

  model: function() {
    return this.modelFor('events');
  }

});
