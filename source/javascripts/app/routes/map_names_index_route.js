
App.MapNamesIndexRoute = Ember.Route.extend({

  model: function() {
    return this.modelFor('mapNames');
  }

});
