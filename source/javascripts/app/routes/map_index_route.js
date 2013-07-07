
App.MapIndexRoute = Ember.Route.extend({

  model: function(params) {
    console.log('MapIndexRoute#model');
    return this.modelFor('map');
  }

});
