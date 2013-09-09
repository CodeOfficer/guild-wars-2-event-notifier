
App.EventNameRoute = Ember.Route.extend({

  // We actually return an Event here, not an EventName
  model: function(params) {
    var store = this.store;
    var world_name = this.modelFor('world_name');
    var map_name = this.modelFor('map_name');

    return new Ember.RSVP.Promise(function(resolve) {
      store.find('event', {
        world_id: world_name.get('id'),
        map_id: map_name.get('id'),
        event_id: params.event_name_id
      }).then(function(events) {
        return resolve(events.get("firstObject"));
      });
    });
  },

  serialize:  function(model, params) {
    return { event_name_id: model.get('eventName.id') };
  }

});
