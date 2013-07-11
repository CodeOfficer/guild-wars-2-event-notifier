
App.WorldIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('world');
  }

});
