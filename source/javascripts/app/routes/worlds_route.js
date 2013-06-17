
App.WorldsRoute = Ember.Route.extend({

  model: function() {
    console.log('WorldsRoute#model');
    return this.modelFor('application');
  }

});
