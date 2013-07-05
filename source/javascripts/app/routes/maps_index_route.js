
App.MapsIndexRoute = Ember.Route.extend({

  model: function() {
    console.log('MapsIndexRoute#model');
    return this.modelFor('maps');
  }

});
