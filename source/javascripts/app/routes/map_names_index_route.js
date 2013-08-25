
App.MapNamesIndexRoute = Ember.Route.extend({

  model: function() {
    return this.modelFor('map_names');
  }

});
