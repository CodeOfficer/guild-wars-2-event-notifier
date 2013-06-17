
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldsWorldRoute#model');
    return App.World.find(params.world_id);
    // return App.World.filter(function(world){ return world.get('id') === params.world_id }).get('firstObject');
  }

});
