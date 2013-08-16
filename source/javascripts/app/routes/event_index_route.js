
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
      var mapFloor = App.MapFloor.find({
        continent_id: model.get('map.continent_id'),
        floor_id: model.get('map.default_floor')
      });

      mapFloor.one("didLoad", function() {
        controller.set('mapFloor', mapFloor.get('firstObject'));
      });
    });
  }

});
