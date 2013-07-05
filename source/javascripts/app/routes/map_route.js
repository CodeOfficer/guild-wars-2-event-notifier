
App.MapRoute = Ember.Route.extend({

  model: function(params) {
    console.log('MapRoute#model');
    return App.MapName.find(params.map_id);
  }

});
