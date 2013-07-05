
App.WorldIndexRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldIndexRoute#model');
    return this.modelFor('world');
  }

});
