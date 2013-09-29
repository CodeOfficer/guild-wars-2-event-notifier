
App.WorldNameRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.find('worldName', params.world_name_id);
  }

});
