
App.EventNameIndexRoute = Ember.Route.extend({

  // We actually return an Event here, not an EventName
  model: function(params) {
    return this.modelFor('event_name');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var store = this.store;

    function setMapAndMapFloor(map) {
      controller.set('map', map);
      var mapFloorPromise = store.find('mapFloor', map.get('continent_id') + '.' + map.get('default_floor'));

      mapFloorPromise.then(function(mapFloor) {
        controller.set('mapFloor', mapFloor);
      });
    }

    if (model.get('map').then) {
      model.get('map').then(setMapAndMapFloor);
    } else {
      setMapAndMapFloor.call(this, model.get('map'));
    }

    model.get('eventDetail').then(function(eventDetail) {
      controller.set('eventDetail', eventDetail);
    });
  }

});
