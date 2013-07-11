
App.EventsRoute = Ember.Route.extend({

  model: function() {
    var world = this.modelFor('world');
    var map = this.modelFor('map');

    return App.Event.find({
      world_id: world.get('id'),
      map_id: map.get('id')}
    );
  }

});
