
App.EventRoute = Ember.Route.extend({

  serialize:  function(model, params) {
    return { event_id: model.get('eventName.id') };
  },

  model: function(params) {
    var world = this.modelFor('world');
    var map = this.modelFor('map');

    var event = App.Event.find({
      world_id: world.get('id'),
      map_id: map.get('id'),
      event_id: params.event_id
    });

    event.one("didLoad", function() {
      event.resolve(event.get("firstObject"));
    });

    return event;
  }

});
