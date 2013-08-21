
App.EventIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('event');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('map', model.get('map'));
    controller.set('eventDetail', model.get('eventDetail'));
    controller.set('mapFloor', null);

    model.get('map').then(function(map) {
      var mapFloor = App.MapFloor.find(model.get('map.continent_id') + '.' + model.get('map.default_floor'));

      if (mapFloor.get('isLoaded')) {
        controller.set('mapFloor', mapFloor);
      } else {
        mapFloor.one("didLoad", function() {
          if (Ember.isArray(mapFloor)) {
            controller.set('mapFloor', mapFloor.get('firstObject'));
          } else {
            controller.set('mapFloor', mapFloor);
          }
        });
      }
    });
  }

});
