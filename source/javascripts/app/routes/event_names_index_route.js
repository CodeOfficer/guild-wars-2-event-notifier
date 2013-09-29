
App.EventNamesIndexRoute = Ember.Route.extend({

  // We actually return a collection of Events here, not EventNames
  model: function() {
    return this.modelFor('eventNames');
  }

});
