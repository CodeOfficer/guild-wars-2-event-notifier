
App.MapNameRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.find('mapName', params.map_name_id);
  }

});
