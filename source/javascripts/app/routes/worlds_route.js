
App.WorldsRoute = Ember.Route.extend({

  model: function() {
    console.log('WorldsRoute#model');
    return App.WorldName.all();
  }

});
