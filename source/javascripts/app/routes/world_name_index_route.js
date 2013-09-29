
App.WorldNameIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('worldName');
  }

});
