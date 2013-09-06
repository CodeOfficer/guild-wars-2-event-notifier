
App.MapNameIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('map_name');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    var store = this.store;
    var map = model.get('map');

    controller.set('map', map);
    controller.set('mapFloor', null);

    map.then(function() {
      var mapFloor = store.find('map_floor', map.get('continent_id') + '.' + map.get('default_floor'));

      if (mapFloor.get('isLoaded')) {
        controller.set('mapFloor', mapFloor);
      } else {
        mapFloor.one("didLoad", function() {
          controller.set('mapFloor', mapFloor);
        });
      }
    });
  }

});
