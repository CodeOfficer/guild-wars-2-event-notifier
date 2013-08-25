
App.WorldNameRoute = Ember.Route.extend({

  model: function(params) {
    return App.WorldName.find(params.world_name_id);
  }

});
