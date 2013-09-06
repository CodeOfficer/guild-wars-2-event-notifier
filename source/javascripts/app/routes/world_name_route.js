
App.WorldNameRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.find('world_name', params.world_name_id);
  }

});
