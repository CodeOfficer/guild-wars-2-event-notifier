
App.EventNamesIndexRoute = Ember.Route.extend({

  model: function() {
    return this.modelFor('event_names');
  }

});
