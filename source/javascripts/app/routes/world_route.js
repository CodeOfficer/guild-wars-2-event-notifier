
App.WorldRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldRoute#model');
    return App.WorldName.find(params.world_id);
  }

});
