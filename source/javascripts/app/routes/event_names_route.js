
App.EventNamesRoute = Ember.Route.extend({

  // We actually return a collection of Events here, not EventNames
  model: function() {
    var store = this.store;
    var worldName = this.modelFor('worldName');
    var mapName = this.modelFor('mapName');

    return store.find('event', {
      world_id: worldName.get('id'),
      map_id: mapName.get('id')}
    );
  }

});
