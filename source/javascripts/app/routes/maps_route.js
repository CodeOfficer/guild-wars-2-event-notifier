
App.MapsRoute = Ember.Route.extend({

  model: function() {
    console.log('MapsRoute#model');
    return App.MapName.all();
  }

});
