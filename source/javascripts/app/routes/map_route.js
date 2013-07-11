
App.MapRoute = Ember.Route.extend({

  model: function(params) {
    return App.MapName.find(params.map_id);
  }

});
