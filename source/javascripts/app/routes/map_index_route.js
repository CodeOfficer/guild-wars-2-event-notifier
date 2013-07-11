
App.MapIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('map');
  }

});
