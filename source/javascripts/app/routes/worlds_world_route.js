
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    return App.World.find(params.world_id);
    // return App.World.filter(function(world){ return world.get('id') === params.world_id }).get('firstObject');
  }

});