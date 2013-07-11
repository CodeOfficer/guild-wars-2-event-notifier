
App.WorldsRoute = Ember.Route.extend({

  model: function() {
    return App.WorldName.all();
  }

});
