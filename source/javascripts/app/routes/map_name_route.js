
App.MapNameRoute = Ember.Route.extend({

  model: function(params) {
    return App.MapName.find(params.map_name_id);
  }

});
