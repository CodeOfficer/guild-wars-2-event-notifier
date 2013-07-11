
App.EventIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('event');
  }

});
