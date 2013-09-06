
App.MapNameRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.find('map_name', params.map_name_id);
  }

});
