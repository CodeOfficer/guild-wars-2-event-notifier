
App.WorldsIndexRoute = Ember.Route.extend({

  model: function() {
    return this.modelFor('worlds');
  }

});
