
App.EventNameRoute = Ember.Route.extend({

  // We actually return an Event here, not an EventName
  model: function(params) {
    var store = this.store;
    var worldName = this.modelFor('worldName');
    var mapName = this.modelFor('mapName');

    return new Ember.RSVP.Promise(function(resolve) {
      store.find('event', {
        world_id: worldName.get('id'),
        map_id: mapName.get('id'),
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
