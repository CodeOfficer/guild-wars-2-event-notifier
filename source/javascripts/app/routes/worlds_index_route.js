
App.WorldsIndexRoute = Ember.Route.extend({

  model: function() {
    console.log('WorldsIndexRoute#model');
    return this.modelFor('worlds');
  }

});
