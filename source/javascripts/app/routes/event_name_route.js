
App.EventNameRoute = Ember.Route.extend({

  serialize:  function(model, params) {
    return { event_name_id: model.get('eventName.id') };
  },

  model: function(params) {
    var world_name = this.modelFor('world_name');
    var map_name = this.modelFor('map_name');

    var event = App.Event.find({
      world_id: world_name.get('id'),
      map_id: map_name.get('id'),
      event_id: params.event_name_id
    });

    event.one("didLoad", function() {
      event.resolve(event.get("firstObject"));
    });

    return event;
  }

});
