
App.MapNamesRoute = Ember.Route.extend({

  model: function() {
    return App.MapName.all();
  }

});
