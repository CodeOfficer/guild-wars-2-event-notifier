
App.EventNamesRoute = Ember.Route.extend({

  // We actually return a collection of Events here, not EventNames
  model: function() {
    var world_name = this.modelFor('world_name');
    var map_name = this.modelFor('map_name');

    return App.Event.find({
      world_id: world_name.get('id'),
      map_id: map_name.get('id')}
    );
  }

});
