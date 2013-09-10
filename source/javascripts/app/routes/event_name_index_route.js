
App.EventNameIndexRoute = Ember.Route.extend({

  // We actually return an Event here, not an EventName
  model: function(params) {
    return this.modelFor('event_name');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var store = this.store;

    var mapPromise = model.get('map').then(function(map) {
      controller.set('map', map);
      return map;
    }).then(function(map) {
      var mapFloorPromise = store.find('map_floor', map.get('continent_id') + '.' + map.get('default_floor'));

      return mapFloorPromise.then(function(mapFloor) {
        controller.set('mapFloor', mapFloor);
      })
    });

    var eventDetailPromise = model.get('eventDetail').then(function(eventDetail) {
      controller.set('eventDetail', eventDetail);
    });

    new Ember.RSVP.all([mapPromise, eventDetailPromise]);
  }

});
