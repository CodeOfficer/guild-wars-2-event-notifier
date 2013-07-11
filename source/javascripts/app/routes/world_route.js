
App.WorldRoute = Ember.Route.extend({

  model: function(params) {
    return App.WorldName.find(params.world_id);
  }

});
