
App.EventNamesRoute = Ember.Route.extend({

  // We actually return a collection of Events here, not EventNames
  model: function() {
    var store = this.store;
    var worldName = this.modelFor('world_name');
    var mapName = this.modelFor('map_name');

    return store.find('event', {
      world_id: worldName.get('id'),
      map_id: mapName.get('id')}
    );
  }

});
