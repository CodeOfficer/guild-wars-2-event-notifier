
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    return App.World.find(params.world_id);
  }

});
