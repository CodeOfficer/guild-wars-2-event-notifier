
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldsWorldRoute#model');
    return App.World.find(params.world_id);
  }

});
