
App.MapNameIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('map_name');
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

    // this should have been fixed in ember data 3
    // association is somces a promise and sometimes not
    if (model.get('map').then) {
      model.get('map').then(setMapAndMapFloor);
      console.log("_________________")
    } else {
      console.log("++++++++++")
      setMapAndMapFloor.call(this, model.get('map'));
    }
  }
});
