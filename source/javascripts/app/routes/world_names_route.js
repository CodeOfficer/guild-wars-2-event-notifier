
App.WorldNamesRoute = Ember.Route.extend({

  model: function() {
    return App.WorldName.all();
  }

});
